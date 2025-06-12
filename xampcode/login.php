<?php
// DB connection
include "connet.php";
// Allow CORS
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: *");

// header("Access-Control-Allow-Origin: http://localhost:5173");
// header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
// header("Access-Control-Allow-Credentials: true");

// $cmd = "INSERT INTO users (email, password) VALUES ('admin', '" . password_hash("123456", PASSWORD_DEFAULT) . "')";
// $conn->query($cmd);

// Get raw POST data
$data = json_decode(file_get_contents("php://input"));


$username = $password = $verify = "";


// Get data
$username = $conn->real_escape_string($data->username);
$password = $conn->real_escape_string($data->password);
$verify = $conn->real_escape_string($data->verify);

// if ($password !== $verify) {
//     echo json_encode(["status" => "error", "message" => "Passwords do not match"]);
//     exit();
// }

// Check user
$sql = "SELECT * FROM users WHERE email='$username'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    if (password_verify($password, $user['password'])) {
        echo json_encode(["status" => "success", "message" => "Login successful"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Incorrect password"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "User not found"]);
}

$conn->close();
