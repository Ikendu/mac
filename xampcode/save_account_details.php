<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["success" => false, "message" => "Only POST requests are accepted."]);
    exit;
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!is_array($data) || empty($data['account']) || empty($data['name'])) {
    echo json_encode(["success" => false, "message" => "Account number and name are required."]);
    exit;
}

// TODO: Replace this with a real database save or session update.
// For now, return success and echo back the received details.

$response = [
    "success" => true,
    "message" => "Profile details received.",
    "details" => [
        "account" => $data['account'],
        "name" => $data['name'],
    ],
];

echo json_encode($response);
