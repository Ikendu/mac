<?php

// Connect to database
include "connect.php";
// Allow CORS (for development only; secure properly in production)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: *");

// Get POST data
$data = json_decode(file_get_contents("php://input"), true);

// Check if required fields exist
if (
    isset($data['date']) &&
    isset($data['account']) &&
    isset($data['type']) &&
    isset($data['amount']) &&
    isset($data['description'])
) {
    $date = $data['date'];
    $account = $data['account'];
    $type = $data['type'];
    $amount = $data['amount'];
    $description = $data['description'];



    if ($conn->connect_error) {
        echo json_encode(["message" => "Database connection failed"]);
        exit();
    }

    // Insert into transactions table
    $stmt = $conn->prepare("INSERT INTO transactions (date, account_number, type, amount, description) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $date, $account, $type, $amount, $description);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Transaction saved successfully"]);
    } else {
        echo json_encode(["message" => "Failed to save transaction"]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["message" => "Incomplete data"]);
}
