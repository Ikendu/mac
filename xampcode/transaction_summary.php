<?php

// DB Connection and CORS headers
include 'connect.php';

// Get start_date and end_date from request (if provided)
$startDate = isset($_GET['start']) ? $_GET['start'] : null;
$endDate = isset($_GET['end']) ? $_GET['end'] : null;

// Build WHERE clause if date range is provided
$whereClause = "";
if ($startDate && $endDate) {
    $whereClause = "WHERE STR_TO_DATE(date, '%d-%b-%y %h:%i %p') BETWEEN '$startDate' AND '$endDate'";
}

// Get Opening Balance (first transaction in range OR overall if no range)
$openingSql = "SELECT balance FROM transactions $whereClause ORDER BY id ASC LIMIT 1";
$openingResult = $conn->query($openingSql);
$openingBalance = 0;
if ($openingResult && $openingResult->num_rows > 0) {
    $row = $openingResult->fetch_assoc();
    $openingBalance = floatval($row['balance']);
} else {
    // fallback: first ever transaction
    $fallbackSql = "SELECT balance FROM transactions ORDER BY id ASC LIMIT 1";
    $fallbackResult = $conn->query($fallbackSql);
    if ($fallbackResult && $fallbackResult->num_rows > 0) {
        $row = $fallbackResult->fetch_assoc();
        $openingBalance = floatval($row['balance']);
    }
}

// Get Closing Balance (last transaction in range OR overall if no range)
$closingSql = "SELECT balance FROM transactions $whereClause ORDER BY id DESC LIMIT 1";
$closingResult = $conn->query($closingSql);
$closingBalance = 0;
if ($closingResult && $closingResult->num_rows > 0) {
    $row = $closingResult->fetch_assoc();
    $closingBalance = floatval($row['balance']);
} else {
    // fallback: last ever transaction
    $fallbackSql = "SELECT balance FROM transactions ORDER BY id DESC LIMIT 1";
    $fallbackResult = $conn->query($fallbackSql);
    if ($fallbackResult && $fallbackResult->num_rows > 0) {
        $row = $fallbackResult->fetch_assoc();
        $closingBalance = floatval($row['balance']);
    }
}

// Get Total Credit
$creditSql = "SELECT SUM(amount) as total_deposit FROM transactions $whereClause " .
             ($whereClause ? "AND" : "WHERE") . " type = 'Deposit'";
$creditResult = $conn->query($creditSql);
$totalCredit = 0;
if ($creditResult) {
    $row = $creditResult->fetch_assoc();
    $totalCredit = floatval($row['total_deposit']);
}

// Get Total Debit
$debitSql = "SELECT SUM(amount) as total_withdraw FROM transactions $whereClause " .
            ($whereClause ? "AND" : "WHERE") . " type = 'Withdrawal'";
$debitResult = $conn->query($debitSql);
$totalDebit = 0;
if ($debitResult) {
    $row = $debitResult->fetch_assoc();
    $totalDebit = floatval($row['total_withdraw']);
}

// Output summary
echo json_encode([
    'currency' => 'NGN',
    'opening_balance' => number_format($openingBalance, 2),
    'closing_balance' => number_format($closingBalance, 2),
    'total_deposit' => number_format($totalCredit, 2),
    'total_withdrawal' => number_format($totalDebit, 2),
]);

$conn->close();
