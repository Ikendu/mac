<?php

// CORS headers
header('Access-Control-Allow-Origin: https://macdon.vercel.app');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

include "connect.php"; // Include database connection file

if (!isset($_FILES['pdf'])) {
    echo json_encode(['status' => 'error', 'message' => 'No PDF received']);
    exit;
}

// Create folder if not exists
$dir = 'statements/';
if (!is_dir($dir)) {
    mkdir($dir, 0777, true);
}

$targetFile = $dir . basename($_FILES['pdf']['name']);

if (move_uploaded_file($_FILES['pdf']['tmp_name'], $targetFile)) {
    echo json_encode(['status' => 'success', 'file' => $targetFile]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to save PDF']);
}



require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
require 'PHPMailer/src/Exception.php';

$mail = new PHPMailer(true);

try {
    // SMTP Configuration
    $mail->isSMTP();
    $mail->Host = 'smtp.example.com';        // e.g., smtp.gmail.com
    $mail->SMTPAuth = true;
    $mail->Username = 'your-email@example.com';     // Your email
    $mail->Password = 'your-email-password';        // Your email password or app password
    $mail->SMTPSecure = 'tls';              // Or 'ssl'
    $mail->Port = 587;                      // 587 for TLS, 465 for SSL

    // Sender & recipient
    $mail->setFrom('your-email@example.com', 'Your Name');
    $mail->addAddress('recipient@example.com', 'Customer');

    // Attachment
    $mail->addAttachment($targetFile);

    // Content
    $mail->isHTML(true);
    $mail->Subject = 'Your Bank Statement';
    $mail->Body    = 'Hello, your bank statement is attached.';

    $mail->send();

    echo json_encode([
        'status' => 'success',
        'file' => $targetFile,
        'message' => 'Email sent successfully'
    ]);
} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Email could not be sent. Error: ' . $mail->ErrorInfo
    ]);
}
