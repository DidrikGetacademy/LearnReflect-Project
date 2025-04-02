<?php
// Load .env file
require_once __DIR__ . '../vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Get the YouTube API key
$api_key = getenv('REACT_APP_YOUTUBE_API_KEY');


header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

if (!isset($_GET['video_id'])) {
    echo json_encode(["error" => "No video ID provided"]);
    exit;
}

$video_id = $_GET['video_id'];
$api_key = "YOUR_YOUTUBE_API_KEY";

$url = "https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId={$video_id}&key={$api_key}";
$response = file_get_contents($url);
$data = json_decode($response, true);

if (!isset($data['items']) || count($data['items']) === 0) {
    echo json_encode(["transcript" => "No transcript found."]);
    exit;
}

$caption_id = $data['items'][0]['id'];
$caption_url = "https://www.googleapis.com/youtube/v3/captions/{$caption_id}?tfmt=srt&key={$api_key}";

// Fetch transcript
$transcript = file_get_contents($caption_url);
if (!$transcript) {
    echo json_encode(["transcript" => "Could not fetch transcript."]);
    exit;
}

// Clean transcript format
$transcript = preg_replace('/\\d+\\n\\d+:\\d+:\\d+,\\d+ --> \\d+:\\d+:\\d+,\\d+\\n/', '', $transcript);
$transcript = trim($transcript);

echo json_encode(["transcript" => $transcript]);
?>
