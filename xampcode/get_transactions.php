<?php
// Allow CORS
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: *");

// Connect to database
include "connect.php";
// Check connection
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Database connection failed"]);
    exit();
}

// Fetch transactions
$result = $conn->query("SELECT * FROM transactions ORDER BY id DESC");

$transactions = [];

while ($row = $result->fetch_assoc()) {
    $transactions[] = $row;
}

echo json_encode(["status" => "success", "data" => $transactions]);

$conn->close();
