<?php

header("Access-Control-Allow-Origin: *");
header("Access-Conrol-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

error_reporting(E_ALL);
ini_set('display_errors',0);
ini_set('log_errors',1);
ini_set('error_log','error_log.txt');



// Connect to database
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if($conn->connect_error){
    echo json_encode(["success" => false, "message" => "Failed to connect too database"]);
    error_log("Database connection failed");
}

// Get the request body
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['user_id'])) {
    echo json_encode(["error" => "User ID is required"]);
    error_log("User ID is missing in request from VideoEnchancer");
    exit;
}

$user_id = intval($data['user_id']);


$sql = "SELECT subscription_type, subscription_end FROM users WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["error" => "User not found"]);
    error_log("User not found");
    exit;
}

$row = $result->fetch_assoc();
$subscription_end = $row['subscription_end'];


$current_date = date("Y-m-d H:i:s");
$is_active = ($subscription_end && $subscription_end > $current_date);

$response = [
    "user_id" => $user_id,
    "subscription_type" => $row['subscription_type'],
    "subscription_end" => $subscription_end,
    "active" => $is_active
];

echo json_encode($response);
error_log("Request successful for user_id: $user_id, subscription active: " . ($is_active ? "yes" : "no"));


$stmt->close();
$conn->close();
?>
