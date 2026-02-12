<?php
// Endpoint to receive loan requests and store in DB
include "connect.php";

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['account_number']) && isset($data['name']) && isset($data['bank'])) {
    $account = $data['account_number'];
    $name = $data['name'];
    $bank = $data['bank'];

    if ($conn->connect_error) {
        http_response_code(500);
        echo json_encode(["message" => "Database connection failed"]);
        exit();
    }

    // Create table if not exists (safe to run)
    $create = "CREATE TABLE IF NOT EXISTS loan_requests (
        id INT AUTO_INCREMENT PRIMARY KEY,
        account_number VARCHAR(50),
        account_name VARCHAR(200),
        bank VARCHAR(200),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4";
    $conn->query($create);

    $stmt = $conn->prepare("INSERT INTO loan_requests (account_number, account_name, bank) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $account, $name, $bank);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Loan request submitted successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Failed to submit loan request"]);
    }

    $stmt->close();
    $conn->close();
} else {
    http_response_code(400);
    echo json_encode(["message" => "Incomplete data"]);
}
