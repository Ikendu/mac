<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Connect to database
include 'connect.php';


// Get last transaction's balance
$sql = "SELECT balance FROM transactions ORDER BY id DESC LIMIT 1";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode(["balance" => $row["balance"]]);
} else {
    echo json_encode(["balance" => 0]); // or null/false depending on your use case
}

$conn->close();
