<?php
ob_start();
include 'config.php';
require 'vendor/autoload.php';
use \Firebase\JWT\JWT;
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");


// Enable error reporting for development
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1); // Enable error logging
ini_set('error_log', 'error_log.txt'); // Point to the correct log file

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['key_code']) || !isset($data['user_id'])) {
    echo json_encode(["success" => false, "error" => "Missing key_code or user_id"]);
    error_log("Error missing key_code or user_id");
    ob_end_flush();
    exit();
}
$key_code = $data["key_code"];
$user_id = $data["user_id"];

$conn = new mysqli($hostname, $username, $password, $database);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "error" => "Database connection failed"]));
}


$stmt = $conn->prepare("SELECT * FROM activation_keys WHERE key_code = ? AND status = 'unused'");
$stmt->bind_param("s", $key_code);
$stmt->execute();
$result = $stmt->get_result();



if ($result->num_rows > 0) {
    $key = $result->fetch_assoc();

    if ($key['usage_limit'] <= $key['times_used']) {
        echo json_encode(["success" => false, "error" => "Usage limit exceeded"]);
        error_log("Usage limit exceeded");
        $stmt->close();
        $conn->close();
        return;
    }

    $subscription_type = $key['subscription_type']; // fetch the subscription type from the database
    error_log("subscription_type" . $subscription_type);

    #starts the transaction to link the key to the user and update the key's status.
    $conn->begin_transaction();


    try{

        //Update the key's status to 'active' and increment the 'times_used' counter
        $update_stmt = $conn->prepare("UPDATE activation_keys SET status = 'active', user_id = ?, activated_at = NOW(), times_used = times_used + 1 WHERE key_code = ?");
        $update_stmt->bind_param("is", $user_id, $key_code);
        error_log("Activated the key and set as active/used");
        $update_stmt->execute();
        $update_stmt->close();


        #Updated the key's status to 'active' and increment the time_used counter
        $subscription_end = ($subscription_type === 'monthly') ? date('Y-m-d H:i:s', strtotime('+1 month')) : null;
        $update_user_stmt = $conn->prepare("UPDATE users set subscription_type = ?, subscription_end = ? where id = ?");
        $update_user_stmt-> bind_param('ssi',$subscription_type,$subscription_end,$user_id);
        $update_user_stmt->execute();
        $update_user_stmt->close();
        error_log("Updated the key's status to 'active' and increment the time_used counter");
        $conn->commit();


        #Generation of JWT
        $issuedat = time();
        $expiration = strtotime($subscription_end);
        $payload = [
            "user_id" => $user_id,
            "subscription_type" => $subscription_type,
            "subscription_end" => $subscription_end,
            "iat" => $issuedat,
            "exp" => $expiration
        ];


        $jwt = JWT::encode($payload, $jwt_secret, 'HS256');

        #payload back too python script,
        echo json_encode([
                "success" => true, 
                "subscription_type" => $subscription_type,
                "subscription_end" => $subscription_end,
                "jwt" => $jwt
                ]);
        
        error_log("Key successfully activated and JWT returned.");
    }catch(Exception $e){
        $conn->rollback();
        echo json_encode(["success" => false, "error" => "Transaction failed: ". $e->getMessage()]);
        error_log("Transaction failed: " . $e->getMessage());
    }
     $stmt->close();
     $conn->close();
     ob_end_flush();
     exit();
}else {
    echo json_encode(["success" => false, "error" => "Invalid or already used key"]);
    error_log("Invalid or used key");
    $stmt->close();
    $conn->close();
    ob_end_flush();
    exit();
}
?>