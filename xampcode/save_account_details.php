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

if (!is_array($data) || empty($data['account']) || empty($data['name'])) {
    echo json_encode(["success" => false, "message" => "Account number and name are required."]);
    exit;
}

// Get user_id from session or query parameter (default to 1 for now)
$user_id = isset($data['user_id']) ? intval($data['user_id']) : (isset($_SESSION['user_id']) ? intval($_SESSION['user_id']) : 1);

if ($user_id <= 0) {
    echo json_encode(["success" => false, "message" => "Invalid user ID."]);
    exit;
}

$account_number = $conn->real_escape_string($data['account']);
$account_name = $conn->real_escape_string($data['name']);

// Use INSERT ... ON DUPLICATE KEY UPDATE to handle insert or update
$stmt = $conn->prepare("INSERT INTO account_details (user_id, account_number, account_name) 
                        VALUES (?, ?, ?) 
                        ON DUPLICATE KEY UPDATE 
                            account_number = VALUES(account_number),
                            account_name = VALUES(account_name)");

if (!$stmt) {
    echo json_encode(["success" => false, "message" => "Database error: " . $conn->error]);
    exit;
}

$stmt->bind_param("iss", $user_id, $account_number, $account_name);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Account details updated successfully.",
        "details" => [
            "account" => $data['account'],
            "name" => $data['name'],
        ],
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to update account details: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
