<?php
$conn = new mysqli("localhost", "root", "", "macdone");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
session_start();

ini_set('display_errors', 1);
error_reporting(E_ALL);
