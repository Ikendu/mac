import React, { useEffect, useState } from 'react'
import './statement.css' // Assuming you have a CSS file for styling
import html2pdf from 'html2pdf.js'
import axios from 'axios'

export default function Statement() {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    axios
      .get('https://firsttechwallet.top/macdon/get_transactions.php')
      .then((res) => setTransactions(res.data.data))
      .catch((err) => console.error(err))
  }, [])
  console.log(transactions)

  const generateAndUploadPDF = async () => {
    // const element = document.getElementById('pdf-content')

    // Generate PDF as blob
    // const pdfBlob = await html2pdf().from(element).outputPdf('blob')
    // html2pdf().from(element).save('transactions.pdf')
    print()

    // Upload blob to server
    // const formData = new FormData()
    // formData.append('pdf', pdfBlob, 'transactions.pdf')

    // axios
    //   .post('https://firsttechwallet.top/macdon-api/upload_pdf.php', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   })
    //   .then((res) => {
    //     console.log('Upload success:', res.data)
    //     alert(`PDF uploaded successfully: ${res.data.file}`)
    //   })
    //   .catch((err) => {
    //     console.error('Upload failed:', err)
    //     alert('Failed to upload PDF')
    //   })
  }

  return (
    <div className='pdfcontainer' id='pdf-content'>
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
          <tbody>
            {transactions?.map((tx, idx) => (
              <tr key={idx}>
                <td>{tx.date}</td>
                <td>{tx.reference}</td>
                <td>{tx.description}</td>
                <td>{tx.date}</td>
                <td>{tx.type === 'credit' || tx.type === 'deposit' ? tx.amount : ''}</td>
                <td>
                  {tx.type === 'debit' || tx.type === 'withdrawal' || tx.type === 'withdraw'
                    ? tx.amount
                    : ''}
                </td>
                <td>{tx.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className='printbtn' onClick={generateAndUploadPDF}>
        Send PDF
      </button>
      <button onClick={() => print()} className='printbtn'>
        Get PDF
      </button>
    </div>
  )
}
