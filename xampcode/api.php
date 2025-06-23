<?php
// Allow CORS (for development only; secure properly in production)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: *");

// Connect Database
$conn = new mysqli("localhost", "root", "", "macdone");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
session_start();

ini_set('display_errors', 1);
error_reporting(E_ALL);
