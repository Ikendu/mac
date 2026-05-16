<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["success" => false, "message" => "Only POST requests are accepted."]);
    exit;
}

require_once 'connect.php';

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!is_array($data) || empty($data['username']) || empty($data['password'])) {
    echo json_encode(["success" => false, "message" => "Username and password are required."]);
    exit;
}

$user_id = isset($data['user_id']) ? intval($data['user_id']) : 1;
if ($user_id <= 0) {
    echo json_encode(["success" => false, "message" => "Invalid user ID."]);
    exit;
}

$username = $conn->real_escape_string(trim($data['username']));
$password = password_hash(trim($data['password']), PASSWORD_DEFAULT);

// Update existing user or insert if the record does not exist.
$stmt = $conn->prepare(
    "INSERT INTO users (id, email, password) VALUES (?, ?, ?) 
     ON DUPLICATE KEY UPDATE email = VALUES(email), password = VALUES(password)"
);

if (!$stmt) {
    echo json_encode(["success" => false, "message" => "Database error: " . $conn->error]);
    exit;
}

$stmt->bind_param("iss", $user_id, $username, $password);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Login details updated successfully.",
        "details" => [
            "username" => $username,
        ],
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Update failed: " . $stmt->error]);
}

$stmt->close();
$conn->close();
