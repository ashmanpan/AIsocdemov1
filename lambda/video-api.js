const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient({ region: 'ap-southeast-1' });

const TABLE_NAME = 'CiscoAI-Videos';

// CORS headers
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS'
};

exports.handler = async (event) => {
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

        // GET /videos - List all videos
        if (httpMethod === 'GET' && path === '/videos') {
            const result = await dynamodb.scan({
                TableName: TABLE_NAME
            }).promise();

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
        if (httpMethod === 'GET' && path.startsWith('/videos/')) {
            const videoId = path.split('/')[2];

            const result = await dynamodb.get({
                TableName: TABLE_NAME,
                Key: { videoId }
            }).promise();

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
        if (httpMethod === 'POST' && path === '/videos') {
            const body = JSON.parse(event.body);

            // Generate unique ID if not provided
            const videoId = body.videoId || body.id || `video-${Date.now()}`;

            const video = {
                videoId,
                ...body,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            await dynamodb.put({
                TableName: TABLE_NAME,
                Item: video
            }).promise();

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
        if (httpMethod === 'PUT' && path.startsWith('/videos/')) {
            const videoId = path.split('/')[2];
            const body = JSON.parse(event.body);

            // First check if video exists
            const existing = await dynamodb.get({
                TableName: TABLE_NAME,
                Key: { videoId }
            }).promise();

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

            await dynamodb.put({
                TableName: TABLE_NAME,
                Item: updatedVideo
            }).promise();

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
        if (httpMethod === 'DELETE' && path.startsWith('/videos/')) {
            const videoId = path.split('/')[2];

            await dynamodb.delete({
                TableName: TABLE_NAME,
                Key: { videoId }
            }).promise();

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
        if (httpMethod === 'GET' && path.startsWith('/videos/category/')) {
            const category = path.split('/')[3];

            const result = await dynamodb.query({
                TableName: TABLE_NAME,
                IndexName: 'CategoryIndex',
                KeyConditionExpression: 'category = :category',
                ExpressionAttributeValues: {
                    ':category': category
                }
            }).promise();

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
                error: 'Route not found'
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
