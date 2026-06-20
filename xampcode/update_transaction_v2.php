<?php
// Allow CORS
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: *");


include "connect.php";

if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Database connection failed"]);
    exit();
}

// Get POST data
$data = json_decode(file_get_contents("php://input"), true);

// Validate required fields
if (
    !isset($data['id']) ||
    !isset($data['date']) ||
    !isset($data['amount'])
) {
    echo json_encode(["status" => "error", "message" => "Missing required fields (id, date, amount)"]);
    exit();
}

$id = intval($data['id']);
$date = $data['date'];
// query-format date (YYYY-MM-DD)
$dates = isset($data['dates']) ? $data['dates'] : '';
$time = isset($data['time']) ? $data['time'] : '';
$account_number = isset($data['account_number']) ? $data['account_number'] : '';
$type = isset($data['type']) ? $data['type'] : '';
$amount = $data['amount'];
$description = isset($data['description']) ? $data['description'] : '';
$balance = isset($data['balance']) ? $data['balance'] : '';

// Update transaction
$stmt = $conn->prepare("UPDATE transactions SET date = ?, dates = ?, time = ?, account_number = ?, type = ?, amount = ?, description = ?, balance = ? WHERE id = ?");

if (!$stmt) {
    echo json_encode(["status" => "error", "message" => "Prepare failed: " . $conn->error]);
    exit();
}

$stmt->bind_param("ssssssssi", $date, $dates, $time, $account_number, $type, $amount, $description, $balance, $id);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Transaction updated successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to update transaction: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
