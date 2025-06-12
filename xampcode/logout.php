<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: *");

require 'db.php';
session_destroy();
echo json_encode(["success" => true]);
