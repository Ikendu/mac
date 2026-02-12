<?php
include "connect.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


$account = null;
if (isset($_GET['account'])) {
    $account = $_GET['account'];
} else {
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['account'])) $account = $data['account'];
}

if (!$account) {
    http_response_code(400);
    echo json_encode(["found" => false, "message" => "No account provided"]);
    exit();
}

// Query loan_requests table for the account
$stmt = $conn->prepare("SELECT account_name FROM loan_requests WHERE account_number = ? ORDER BY created_at DESC LIMIT 1");
$stmt->bind_param("s", $account);
$stmt->execute();
$res = $stmt->get_result();
if ($row = $res->fetch_assoc()) {
    echo json_encode(["found" => true, "name" => $row['account_name']]);
} else {
    echo json_encode(["found" => false]);
}

$stmt->close();
$conn->close();
