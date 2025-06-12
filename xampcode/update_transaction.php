<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-headers: *");

// connect database
include "connect.php";

$data = json_decode(file_get_contents("php://input"), true);

if (
    isset($data['id']) &&
    isset($data['date']) &&
    isset($data['account']) &&
    isset($data['type']) &&
    isset($data['amount']) &&
    isset($data['description'])
) {
    $stmt = $conn->prepare("UPDATE transactions SET date=?, account_number=?, type=?, amount=?, description=? WHERE id=?");
    $stmt->bind_param(
        "sssssi",
        $data['date'],
        $data['account'],
        $data['type'],
        $data['amount'],
        $data['description'],
        $data['id']
    );

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Transaction updated"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Update failed"]);
    }

    $stmt->close();
} else {
    echo json_encode(["status" => "error", "message" => "Incomplete data"]);
}

$conn->close();
