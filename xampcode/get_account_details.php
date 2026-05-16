<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'connect.php';

// Get user_id from session or query parameter (default to 1 for now)
$user_id = isset($_GET['user_id']) ? intval($_GET['user_id']) : (isset($_SESSION['user_id']) ? intval($_SESSION['user_id']) : 1);

if ($user_id <= 0) {
    echo json_encode(["success" => false, "message" => "Invalid user ID."]);
    exit;
}

$stmt = $conn->prepare("SELECT account_number, account_name FROM account_details WHERE user_id = ?");
if (!$stmt) {
    echo json_encode(["success" => false, "message" => "Database error: " . $conn->error]);
    exit;
}

$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode([
        "success" => true,
        "account_number" => $row['account_number'],
        "account_name" => $row['account_name']
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Account details not found."
    ]);
}

$stmt->close();
$conn->close();
?>
