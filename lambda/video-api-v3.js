// AWS SDK v3 compatible version for Node.js 18+
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand, GetCommand, PutCommand, DeleteCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: 'ap-southeast-1' });
const dynamodb = DynamoDBDocumentClient.from(client);

const TABLE_NAME = 'CiscoAI-Videos';

// CORS headers
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS'
};

export const handler = async (event) => {
    console.log('Event:', JSON.stringify(event, null, 2));

    // Handle OPTIONS request for CORS
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: corsHeaders,
            body: ''
        };
    }

    try {
        const httpMethod = event.httpMethod;
        const path = event.path;

        // GET /videos or /prod/videos - List all videos
        if (httpMethod === 'GET' && (path === '/videos' || path === '/prod/videos')) {
            const result = await dynamodb.send(new ScanCommand({
                TableName: TABLE_NAME
            }));

            return {
                statusCode: 200,
                headers: corsHeaders,
                body: JSON.stringify({
                    success: true,
                    videos: result.Items || []
                })
            };
        }

        // GET /videos/{id} - Get single video
        if (httpMethod === 'GET' && path.match(/\/(prod\/)?videos\/.+/)) {
            const pathParts = path.split('/');
            const videoId = pathParts[pathParts.length - 1];

            const result = await dynamodb.send(new GetCommand({
                TableName: TABLE_NAME,
                Key: { videoId }
            }));

            if (!result.Item) {
                return {
                    statusCode: 404,
                    headers: corsHeaders,
                    body: JSON.stringify({ success: false, error: 'Video not found' })
                };
            }

            return {
                statusCode: 200,
                headers: corsHeaders,
                body: JSON.stringify({
                    success: true,
                    video: result.Item
                })
            };
        }

        // POST /videos - Create new video
        if (httpMethod === 'POST' && (path === '/videos' || path === '/prod/videos')) {
            const body = JSON.parse(event.body);

            // Generate unique ID if not provided
            const videoId = body.videoId || body.id || `video-${Date.now()}`;

            const video = {
                videoId,
                ...body,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            await dynamodb.send(new PutCommand({
                TableName: TABLE_NAME,
                Item: video
            }));

            return {
                statusCode: 201,
                headers: corsHeaders,
                body: JSON.stringify({
                    success: true,
                    video
                })
            };
        }

        // PUT /videos/{id} - Update video
        if (httpMethod === 'PUT' && path.match(/\/(prod\/)?videos\/.+/)) {
            const pathParts = path.split('/');
            const videoId = pathParts[pathParts.length - 1];
            const body = JSON.parse(event.body);

            // First check if video exists
            const existing = await dynamodb.send(new GetCommand({
                TableName: TABLE_NAME,
                Key: { videoId }
            }));

            if (!existing.Item) {
                return {
                    statusCode: 404,
                    headers: corsHeaders,
                    body: JSON.stringify({ success: false, error: 'Video not found' })
                };
            }

            const updatedVideo = {
                ...existing.Item,
                ...body,
                videoId, // Ensure ID doesn't change
                updatedAt: new Date().toISOString()
            };

            await dynamodb.send(new PutCommand({
                TableName: TABLE_NAME,
                Item: updatedVideo
            }));

            return {
                statusCode: 200,
                headers: corsHeaders,
                body: JSON.stringify({
                    success: true,
                    video: updatedVideo
                })
            };
        }

        // DELETE /videos/{id} - Delete video
        if (httpMethod === 'DELETE' && path.match(/\/(prod\/)?videos\/.+/)) {
            const pathParts = path.split('/');
            const videoId = pathParts[pathParts.length - 1];

            await dynamodb.send(new DeleteCommand({
                TableName: TABLE_NAME,
                Key: { videoId }
            }));

            return {
                statusCode: 200,
                headers: corsHeaders,
                body: JSON.stringify({
                    success: true,
                    message: 'Video deleted successfully'
                })
            };
        }

        // GET /videos/category/{category} - Get videos by category
        if (httpMethod === 'GET' && path.match(/\/(prod\/)?videos\/category\/.+/)) {
            const pathParts = path.split('/');
            const category = pathParts[pathParts.length - 1];

            const result = await dynamodb.send(new QueryCommand({
                TableName: TABLE_NAME,
                IndexName: 'CategoryIndex',
                KeyConditionExpression: 'category = :category',
                ExpressionAttributeValues: {
                    ':category': category
                }
            }));

            return {
                statusCode: 200,
                headers: corsHeaders,
                body: JSON.stringify({
                    success: true,
                    videos: result.Items || []
                })
            };
        }

        // Route not found
        return {
            statusCode: 404,
            headers: corsHeaders,
            body: JSON.stringify({
                success: false,
                error: 'Route not found',
                path: path,
                method: httpMethod
            })
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({
                success: false,
                error: error.message
            })
        };
    }
};
