import React from 'react'
import './compstyle.css'
const history = '../assets/icons/transfer.png'

export default function DashboardHeader() {
  return (
    <div className='dashheader'>
      <div>
        <img src='icons/transfer.png' alt='' />
        <span>Tranfer</span>
      </div>

      <div>
        <img src='/public/icons/loan.png' alt='' />
        <span>Loans</span>
      </div>
      <div>
        <img src='/public/icons/airtime.png' alt='' />
        <span>Buy Airtime</span>
      </div>
      <div>
        <img src='/public/icons/card.png' alt='' />
        <span>Virtual Cards</span>
      </div>
      <div>
        <img src='/public/icons/code.png' alt='' />
        <span>QR Payment</span>
      </div>
      <div className='history'>
        <img src='/public/icons/history.png' alt='' />
        <span>History</span>
      </div>
    </div>
  )
}
