<?php
// Allow CORS
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: *");

include "connect.php";

if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Database connection failed"]);
    exit();
}

// Read start & end from query string
$start = isset($_GET['start']) ? $_GET['start'] : null;
$end   = isset($_GET['end']) ? $_GET['end'] : null;

if ($start && $end) {
    // Ensure valid format YYYY-MM-DD
    $stmt = $conn->prepare("SELECT * FROM transactions WHERE dates BETWEEN ? AND ? ORDER BY id DESC");
    $stmt->bind_param("ss", $start, $end);
    $stmt->execute();
    $result = $stmt->get_result();
} else {
    // fallback: all transactions
    $result = $conn->query("SELECT * FROM transactions ORDER BY id DESC");
}

$transactions = [];
while ($row = $result->fetch_assoc()) {
    $transactions[] = $row;
}

echo json_encode(["status" => "success", "data" => $transactions]);

$conn->close();
