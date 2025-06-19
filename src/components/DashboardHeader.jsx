import React, { useEffect, useState } from 'react'
import './compstyle.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function DashboardHeader() {
  const navigate = useNavigate()
  const [balance, setBalance] = useState(0)
  const [copy, setCopy] = useState(false)

  useEffect(() => {
    fetch(`https://firsttechwallet.top/macdon/get_last_balance.php`)
      .then((res) => res.json())
      .then((data) => {
        if (data.balance) {
          setBalance(data.balance)
          console.log(data.balance)
        } else {
          setBalance(0)
        }
      })
      .catch((err) => {
        console.error('Failed to fetch balance:', err)
        setBalance(0)
      })
  }, [])

  function handleCopy() {
    navigator.clipboard.writeText('3016487936').then(() => {
      setCopy(true)
      setTimeout(() => {
        setCopy(false)
      }, 2000).catch((err) => console.log('Failed to copy: ', err))
    })
  }

  const logout = async () => {
    await axios.get('https://firsttechwallet.top/macdon/logout.php')
    navigate('/')
  }
  return (
    <div className='dashheader'>
      <section className='upper '>
        <div className='user different '>
          <img src='icons/camera.png' alt='' />
          <p className='pt-5 font-bold'>
            <span className='text-blue-900'>Welcome</span> ABANA WAKIR Mohammed
          </p>
          <p className='pt-5 font-bold text-blue-900 text-sm'>Balance: {balance}</p>
        </div>

        <section className='user-account'>
          <p
            onClick={handleCopy}
            className='text-sm text-blue-700 font-bold mb-1 underline cursor-pointer'
          >
            Account: {copy ? 'copied' : 3016487936}
          </p>
          <button className='logoutbtn' onClick={logout}>
            Logout
          </button>
        </section>
      </section>
      <div className='nav-container'>
        <nav>
          <div onClick={() => navigate('/dashboard')}>
            <img src='icons/homesub.png' alt='' />
            <span>Home</span>
          </div>
          <div onClick={() => navigate('/dashboardform')}>
            <img src='icons/transfer.png' alt='' />
            <span>Tranfer</span>
          </div>
          <div>
            <img src='icons/loan.png' alt='' />
            <span>Loans</span>
          </div>
          <div>
            <img src='icons/airtime.png' alt='' />
            <span>Airtime</span>
          </div>
          <div>
            <img src='icons/card.png' alt='' />
            <span>Cards</span>
          </div>
          {/* <div>
          <img src='/public/icons/code.png' alt='' />
          <span>QR</span>
        </div> */}
          <div onClick={() => navigate('/all-transactions')} className='different'>
            <img src='icons/history.png' alt='' />
            <span>History</span>
          </div>
        </nav>
      </div>
    </div>
  )
}
