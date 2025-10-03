// Lambda function to handle video CRUD operations
// This will be deployed as AWS Lambda function

const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const BUCKET_NAME = 'cisco-ai-demos-deploy-1754559785';
const FILE_KEY = 'videos.json';

exports.handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
        'Content-Type': 'application/json'
    };

    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    try {
        const method = event.httpMethod;

        switch(method) {
            case 'GET':
                return await getVideos(headers);

            case 'POST':
                return await saveVideos(event, headers);

            default:
                return {
                    statusCode: 405,
                    headers,
                    body: JSON.stringify({ error: 'Method not allowed' })
                };
        }
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'Internal server error',
                message: error.message
            })
        };
    }
};

// Get all videos from S3
async function getVideos(headers) {
    try {
        const data = await s3.getObject({
            Bucket: BUCKET_NAME,
            Key: FILE_KEY
        }).promise();

        const videos = JSON.parse(data.Body.toString('utf-8'));

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                videos: videos,
                count: videos.length
            })
        };
    } catch (error) {
        // If file doesn't exist, return empty array
        if (error.code === 'NoSuchKey') {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    success: true,
                    videos: [],
                    count: 0
                })
            };
        }
        throw error;
    }
}

// Save videos to S3
async function saveVideos(event, headers) {
    try {
        const body = JSON.parse(event.body);
        const videos = body.videos || [];

        // Validate videos array
        if (!Array.isArray(videos)) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                    error: 'Videos must be an array'
                })
            };
        }

        // Save to S3
        await s3.putObject({
            Bucket: BUCKET_NAME,
            Key: FILE_KEY,
            Body: JSON.stringify(videos, null, 2),
            ContentType: 'application/json'
        }).promise();

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                message: 'Videos saved successfully',
                count: videos.length
            })
        };
    } catch (error) {
        throw error;
    }
}
