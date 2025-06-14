import React from 'react'
import './compstyle.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function DashboardHeader() {
  const navigate = useNavigate()
  const logout = async () => {
    await axios.get('https://firsttechwallet.top/macdon/logout.php')
    navigate('/')
  }
  return (
    <div className='dashheader'>
      <section className='upper'>
        <div className='user different '>
          <img src='/public/icons/camera.png' alt='' />
          <p className='pt-5 font-bold'>{'Welcome'} ABANA WAKIR</p>
        </div>
        <div className='different'>
          <img src='/public/icons/history.png' alt='' />
          <span>History</span>
        </div>
        <button className='logoutbtn' onClick={logout}>
          Logout
        </button>
      </section>
      <nav>
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
      </nav>
    </div>
  )
}
