import React from 'react'
import './statement.css' // Assuming you have a CSS file for styling

export default function Statement() {
  return (
    <div className='pdfcontainer'>
      <img src='image/firstbank.jpg' alt='Bank Logo' width={100} />
      <p className='caution'>
        CAUTION: Please ensure you do not reveal your online banking password(s), token number(s)
        and ATM PIN(s) to a third party. Do not open links, respond to suspicious calls, mails or
        letters requesting your banking details. These messages are fraudulent and are not from
        FirstBank.
      </p>
      <div>
        <div className='accountdetails'>
          <div className='account-info'>
            <p>
              <span>Account No:</span> 3016487936
            </p>
            <p>
              <span>Account Type:</span> SAVINGS A/C-PERSONAL
            </p>
            <p>
              <span>For the Period of:</span> 01-Jan-2025 to 31-Jan-2025
            </p>
            <p>
              <span>Account Name:</span> ABANA wakir Mohammed
            </p>
            <p>
              <span>Address:</span> LIFE'S COMPOUND, AKPO STREET, ACHARA, Lagos
            </p>
          </div>
          <div class='account-info'>
            <p>
              <span>Currency:</span> NGN
            </p>
            <p>
              <span>Opening Balance:</span> 100,000.00
            </p>
            <p>
              <span>Closing Balance:</span> 150,000.00
            </p>
            <p>
              <span>Total Credit:</span> 314,600.00
            </p>
            <p>
              <span>Total Debit:</span> 264,600.00
            </p>
          </div>
        </div>
        <table cellspacing='0'>
          <thead>
            <tr>
              <th>TransDate</th>
              <th>Reference</th>
              <th>Transaction Details</th>
              <th>ValueDate</th>
              <th>Deposit</th>
              <th>Withdrawal</th>
              <th>Balance</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  )
}
