<?php
// Simple PHP API to save videos to JSON file
// This file needs to be hosted on a PHP server

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$dataFile = 'videos-data.json';

// GET - Read videos
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($dataFile)) {
        $videos = json_decode(file_get_contents($dataFile), true);
        echo json_encode([
            'success' => true,
            'videos' => $videos,
            'count' => count($videos)
        ]);
    } else {
        echo json_encode([
            'success' => true,
            'videos' => [],
            'count' => 0
        ]);
    }
    exit();
}

// POST - Save videos
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (!isset($input['videos']) || !is_array($input['videos'])) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'Invalid input: videos array required'
        ]);
        exit();
    }

    $videos = $input['videos'];

    // Save to file
    if (file_put_contents($dataFile, json_encode($videos, JSON_PRETTY_PRINT))) {
        echo json_encode([
            'success' => true,
            'message' => 'Videos saved successfully',
            'count' => count($videos)
        ]);
    } else {
        http_response_code(500);
        echo json_stringify([
            'success' => false,
            'error' => 'Failed to save videos'
        ]);
    }
    exit();
}

http_response_code(405);
echo json_encode([
    'success' => false,
    'error' => 'Method not allowed'
]);
?>
