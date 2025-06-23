<?php
include 'api.php'; // Include database connection

// Include TCPDF library
require_once('tcpdf/tcpdf.php');


// Fetch data
$query = "SELECT * FROM transactions ORDER BY date ASC";
$result = $conn->query($query);

// Create PDF
$pdf = new TCPDF();
$pdf->AddPage();
$pdf->SetFont('helvetica', '', 10);

// Header
$html = '
<body style="font-family: system-ui, Open Sans; font-size: 8px;">
    <div style=" padding: 100px;
        width: 80%;
        margin: auto;">
      <img src="image/firstbank.jpg" alt="Bank Logo" width="80" />
      <p style="color: red; padding: 20px;text-align: center; border: 2px solid black;width: 600px;margin: 40px auto;">
        CAUTION: Please ensure you do not reveal your online banking password(s), token number(s)
        and ATM PIN(s) to a third party. Do not open links, respond to suspicious calls, mails or
        letters requesting your banking details. These messages are fraudulent and are not from
        FirstBank.
      </p>
      <div>
        <div style="display: flex; justify-content: space-between; width: 100%; margin: auto;">
          <div class="account-info">
            <p><span>Account No:</span> 3016487936</p>
            <p><span>Account Type:</span> SAVINGS A/C-PERSONAL</p>
            <p><span>For the Period of:</span> 01-Jan-2025 to 31-Jan-2025</p>
            <p><span>Account Name:</span> ABANA wakir Mohammed</p>
            <p><span>Address:</span> LIFE\'S COMPOUND, AKPO STREET, ACHARA, Lagos</p>
          </div>
          <div class="account-info">
            <p><span style="display: inline-block; width: 150px; font-weight: bold;">Currency:</span> NGN</p>
            <p><span style="display: inline-block; width: 150px; font-weight: bold;">Opening Balance:</span> 100,000.00</p>
            <p><span style="display: inline-block; width: 150px; font-weight: bold;">Closing Balance:</span> 150,000.00</p>
            <p><span style="display: inline-block; width: 150px; font-weight: bold;">Total Credit:</span> 314,600.00</p>
            <p><span style="display: inline-block;
        width: 150px;
        font-weight: bold;">Total Debit:</span> 264,600.00</p>
            <p><span style="display: inline-block; width: 150px; font-weight: bold;">Total Debit:</span> 264,600.00</p>
          </div>
        </div>
        <table cellspacing="0" style="width: 100%; border: 2px solid black; margin-top: 20px;">
          <thead>
            <tr style="background-color: #0616f8; color: white">
              <th style="padding: 10px; text-align: left;">TransDate</th>
              <th style="padding: 10px; text-align: left;">Reference</th>
              <th style="padding: 10px; text-align: left;">Transaction Details</th>
              <th style="padding: 10px; text-align: left;">ValueDate</th>
              <th style="padding: 10px; text-align: left;">Deposit</th>
              <th style="padding: 10px; text-align: left;">Balance</th>
            </tr>
          </thead>
       
';

// Add rows
while ($row = $result->fetch_assoc()) {
    $html .= "<tr>
        <td style='padding: 10px; text-align: left;'>{$row['date']}</td>
        <td style='padding: 10px; text-align: left;'>{$row['account_number']}</td>
        <td style='padding: 10px; text-align: left;'>{$row['type']}</td>
        <td style='padding: 10px; text-align: left;'>{$row['description']}</td>
        <td style='padding: 10px; text-align: left;'>{$row['amount']}</td>
        <td style='padding: 10px; text-align: left;'>{$row['balance']}</td>
    </tr>";
}

$html .= ' </table>
      </div>
    </div>
  </body>';
$pdf->writeHTML($html, true, false, true, false, '');
$file_path = 'statements/bank_statement.pdf';
$pdf->Output($file_path, 'F'); // Save to file

echo json_encode(['status' => 'success', 'file' => $file_path]);

?>
<style>
    body {
        font-family: system-ui, 'Open Sans';
    }

    .pdfcontainer {
        padding: 100px;
        width: 80%;
        margin: auto;
    }

    .caution {
        font-size: 20px;
        color: red;
        padding: 20px;
        text-align: center;
        border: 2px solid black;
        width: 78%;
        margin: 40px auto;
    }

    .accountdetails {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin: auto;
    }

    .account-info p span {
        display: inline-block;
        width: 150px;
        font-weight: bold;
    }

    table {
        width: 100%;
        border: 2px solid black;
    }

    table th,
    table td {
        padding: 10px;
        text-align: left;
        margin: -2px;
    }
</style>