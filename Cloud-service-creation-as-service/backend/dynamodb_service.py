"""
DynamoDB Service for Cloud Service Creator
Stores service configurations, generated code, and conversation history
"""

import boto3
import json
import uuid
from datetime import datetime
from typing import Dict, List, Optional
from botocore.exceptions import ClientError

class DynamoDBService:
    def __init__(self, region_name='ap-south-1'):
        """Initialize DynamoDB and S3 clients"""
        self.dynamodb = boto3.resource('dynamodb', region_name=region_name)
        self.client = boto3.client('dynamodb', region_name=region_name)
        self.s3 = boto3.client('s3', region_name=region_name)
        self.region = region_name

        # Single table name
        self.table_name = 'CloudServiceCreator'

        # S3 bucket for code storage
        self.bucket_name = 'cloudservicecreator-code'

    def create_tables(self):
        """Create DynamoDB table and S3 bucket if they don't exist"""
        try:
            # Single DynamoDB table
            self._create_main_table()

            # S3 bucket for code files
            self._create_s3_bucket()

            print("✅ DynamoDB table and S3 bucket created successfully!")
            return True
        except Exception as e:
            print(f"❌ Error creating resources: {e}")
            return False

    def _create_main_table(self):
        """Create single DynamoDB table for all data"""
        try:
            table = self.dynamodb.create_table(
                TableName=self.table_name,
                KeySchema=[
                    {'AttributeName': 'pk', 'KeyType': 'HASH'},  # Partition key
                    {'AttributeName': 'sk', 'KeyType': 'RANGE'},  # Sort key
                ],
                AttributeDefinitions=[
                    {'AttributeName': 'pk', 'AttributeType': 'S'},
                    {'AttributeName': 'sk', 'AttributeType': 'S'},
                    {'AttributeName': 'created_at', 'AttributeType': 'S'},
                    {'AttributeName': 'user_email', 'AttributeType': 'S'},
                ],
                GlobalSecondaryIndexes=[
                    {
                        'IndexName': 'UserEmailIndex',
                        'KeySchema': [
                            {'AttributeName': 'user_email', 'KeyType': 'HASH'},
                            {'AttributeName': 'created_at', 'KeyType': 'RANGE'},
                        ],
                        'Projection': {'ProjectionType': 'ALL'},
                        'ProvisionedThroughput': {
                            'ReadCapacityUnits': 5,
                            'WriteCapacityUnits': 5
                        }
                    }
                ],
                ProvisionedThroughput={
                    'ReadCapacityUnits': 5,
                    'WriteCapacityUnits': 5
                }
            )
            table.wait_until_exists()
            print(f"✅ Created table: {self.table_name}")
        except ClientError as e:
            if e.response['Error']['Code'] == 'ResourceInUseException':
                print(f"ℹ️  Table {self.table_name} already exists")
            else:
                raise

    def _create_s3_bucket(self):
        """Create S3 bucket for code storage"""
        try:
            if self.region == 'us-east-1':
                self.s3.create_bucket(Bucket=self.bucket_name)
            else:
                self.s3.create_bucket(
                    Bucket=self.bucket_name,
                    CreateBucketConfiguration={'LocationConstraint': self.region}
                )

            # Enable versioning
            self.s3.put_bucket_versioning(
                Bucket=self.bucket_name,
                VersioningConfiguration={'Status': 'Enabled'}
            )

            # Block public access
            self.s3.put_public_access_block(
                Bucket=self.bucket_name,
                PublicAccessBlockConfiguration={
                    'BlockPublicAcls': True,
                    'IgnorePublicAcls': True,
                    'BlockPublicPolicy': True,
                    'RestrictPublicBuckets': True
                }
            )

            print(f"✅ Created S3 bucket: {self.bucket_name}")
        except ClientError as e:
            if e.response['Error']['Code'] in ['BucketAlreadyOwnedByYou', 'BucketAlreadyExists']:
                print(f"ℹ️  S3 bucket {self.bucket_name} already exists")
            else:
                raise

    # ==================== SERVICE OPERATIONS ====================

    def save_service(self, service_data: Dict) -> str:
        """Save a service configuration"""
        table = self.dynamodb.Table(self.table_name)

        service_id = str(uuid.uuid4())
        timestamp = datetime.utcnow().isoformat()

        item = {
            'pk': f'SERVICE#{service_id}',
            'sk': 'METADATA',
            'service_id': service_id,
            'created_at': timestamp,
            'updated_at': timestamp,
            'service_type': service_data.get('service_type', ''),
            'vendor': service_data.get('vendor', ''),
            'deployment_model': service_data.get('deployment_model', ''),
            'features': service_data.get('features', []),
            'sla': service_data.get('sla', ''),
            'scalability': service_data.get('scalability', ''),
            'integration': service_data.get('integration', ''),
            'user_email': service_data.get('user_email', 'anonymous'),
            'status': 'created',
            'full_data': json.dumps(service_data)
        }

        table.put_item(Item=item)
        print(f"✅ Saved service: {service_id}")
        return service_id

    def get_service(self, service_id: str) -> Optional[Dict]:
        """Get a service by ID"""
        table = self.dynamodb.Table(self.services_table_name)

        try:
            response = table.get_item(Key={'service_id': service_id})
            return response.get('Item')
        except ClientError as e:
            print(f"❌ Error getting service: {e}")
            return None

    def list_services(self, user_email: Optional[str] = None, limit: int = 50) -> List[Dict]:
        """List services, optionally filtered by user"""
        table = self.dynamodb.Table(self.services_table_name)

        try:
            if user_email:
                response = table.query(
                    IndexName='UserEmailIndex',
                    KeyConditionExpression='user_email = :email',
                    ExpressionAttributeValues={':email': user_email},
                    Limit=limit,
                    ScanIndexForward=False  # Most recent first
                )
            else:
                response = table.scan(Limit=limit)

            return response.get('Items', [])
        except ClientError as e:
            print(f"❌ Error listing services: {e}")
            return []

    def update_service_status(self, service_id: str, status: str) -> bool:
        """Update service status"""
        table = self.dynamodb.Table(self.services_table_name)

        try:
            table.update_item(
                Key={'service_id': service_id},
                UpdateExpression='SET #status = :status, updated_at = :timestamp',
                ExpressionAttributeNames={'#status': 'status'},
                ExpressionAttributeValues={
                    ':status': status,
                    ':timestamp': datetime.utcnow().isoformat()
                }
            )
            print(f"✅ Updated service {service_id} status to: {status}")
            return True
        except ClientError as e:
            print(f"❌ Error updating service status: {e}")
            return False

    # ==================== CONVERSATION OPERATIONS ====================

    def save_conversation(self, conversation_data: Dict) -> str:
        """Save a conversation"""
        table = self.dynamodb.Table(self.table_name)

        conversation_id = conversation_data.get('conversation_id') or str(uuid.uuid4())
        timestamp = datetime.utcnow().isoformat()

        item = {
            'pk': f'CONVERSATION#{conversation_id}',
            'sk': 'DATA',
            'conversation_id': conversation_id,
            'created_at': timestamp,
            'updated_at': timestamp,
            'messages': json.dumps(conversation_data.get('messages', [])),
            'service_id': conversation_data.get('service_id', ''),
            'status': conversation_data.get('status', 'active'),
            'user_email': conversation_data.get('user_email', 'anonymous'),
            'metadata': json.dumps(conversation_data.get('metadata', {}))
        }

        table.put_item(Item=item)
        print(f"✅ Saved conversation: {conversation_id}")
        return conversation_id

    def get_conversation(self, conversation_id: str) -> Optional[Dict]:
        """Get a conversation by ID"""
        table = self.dynamodb.Table(self.conversations_table_name)

        try:
            response = table.get_item(Key={'conversation_id': conversation_id})
            item = response.get('Item')
            if item and 'messages' in item:
                item['messages'] = json.loads(item['messages'])
            if item and 'metadata' in item:
                item['metadata'] = json.loads(item['metadata'])
            return item
        except ClientError as e:
            print(f"❌ Error getting conversation: {e}")
            return None

    # ==================== CODE OPERATIONS ====================

    def save_generated_code(self, service_id: str, code_files: Dict) -> str:
        """Save generated code files to S3"""
        code_id = str(uuid.uuid4())
        timestamp = datetime.utcnow().isoformat()

        # Upload each file to S3
        s3_keys = {}
        for filename, code_content in code_files.items():
            s3_key = f'{service_id}/{code_id}/{filename}'
            self.s3.put_object(
                Bucket=self.bucket_name,
                Key=s3_key,
                Body=code_content.encode('utf-8'),
                ContentType='text/plain'
            )
            s3_keys[filename] = s3_key

        # Save metadata to DynamoDB
        table = self.dynamodb.Table(self.table_name)
        item = {
            'pk': f'SERVICE#{service_id}',
            'sk': f'CODE#{code_id}',
            'code_id': code_id,
            'service_id': service_id,
            'created_at': timestamp,
            'user_email': 'anonymous',
            's3_bucket': self.bucket_name,
            's3_keys': json.dumps(s3_keys),
            'file_count': len(code_files),
            'total_lines': sum(len(code.split('\n')) for code in code_files.values())
        }

        table.put_item(Item=item)
        print(f"✅ Saved generated code to S3: {code_id}")
        return code_id

    def get_generated_code(self, service_id: str, code_id: str) -> Optional[Dict]:
        """Get generated code from S3"""
        table = self.dynamodb.Table(self.table_name)

        try:
            # Get metadata from DynamoDB
            response = table.get_item(Key={
                'pk': f'SERVICE#{service_id}',
                'sk': f'CODE#{code_id}'
            })
            item = response.get('Item')

            if not item:
                return None

            # Get S3 keys
            s3_keys = json.loads(item.get('s3_keys', '{}'))

            # Download code files from S3
            code_files = {}
            for filename, s3_key in s3_keys.items():
                obj = self.s3.get_object(Bucket=self.bucket_name, Key=s3_key)
                code_files[filename] = obj['Body'].read().decode('utf-8')

            item['code_files'] = code_files
            return item
        except ClientError as e:
            print(f"❌ Error getting generated code: {e}")
            return None

    def get_code_by_service(self, service_id: str) -> Optional[Dict]:
        """Get generated code by service ID"""
        table = self.dynamodb.Table(self.table_name)

        try:
            response = table.query(
                KeyConditionExpression='pk = :pk AND begins_with(sk, :sk)',
                ExpressionAttributeValues={
                    ':pk': f'SERVICE#{service_id}',
                    ':sk': 'CODE#'
                },
                Limit=1,
                ScanIndexForward=False  # Most recent first
            )
            items = response.get('Items', [])
            if items:
                item = items[0]
                code_id = item['code_id']
                return self.get_generated_code(service_id, code_id)
            return None
        except ClientError as e:
            print(f"❌ Error getting code by service: {e}")
            return None

    def generate_presigned_url(self, service_id: str, code_id: str, filename: str, expiration: int = 3600) -> Optional[str]:
        """Generate presigned URL for downloading code file"""
        try:
            s3_key = f'{service_id}/{code_id}/{filename}'
            url = self.s3.generate_presigned_url(
                'get_object',
                Params={'Bucket': self.bucket_name, 'Key': s3_key},
                ExpiresIn=expiration
            )
            return url
        except ClientError as e:
            print(f"❌ Error generating presigned URL: {e}")
            return None


# Utility functions
def init_dynamodb():
    """Initialize DynamoDB tables"""
    service = DynamoDBService()
    return service.create_tables()


if __name__ == "__main__":
    print("🚀 Initializing DynamoDB tables for Cloud Service Creator...")
    init_dynamodb()
    print("\n✅ Setup complete! Tables are ready to use.")
