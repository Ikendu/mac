<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: *");

// Connect to database
include "connect.php";

// Read JSON input
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['id'])) {
    $id = $data['id'];

    $stmt = $conn->prepare("DELETE FROM transactions WHERE id = ?");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Transaction deleted"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Delete failed"]);
    }
    $stmt->close();
} else {
    echo json_encode(["status" => "error", "message" => "Invalid data"]);
}

$conn->close();
