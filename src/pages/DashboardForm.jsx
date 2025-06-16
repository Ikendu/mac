import React, { useEffect, useState } from 'react'
import './form.css'
import { Link } from 'react-router-dom'
import DashboardHeader from '../components/DashboardHeader'

// Date formatting function
function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0')
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const month = months[date.getMonth()]
  const year = String(date.getFullYear()).slice(-2)
  let hours = date.getHours()
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = String(hours).padStart(2, '0')
  return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`
}

const now = formatDate(new Date())

export default function DashboardForm() {
  const [date, setDate] = useState(now)
  const [account, setAccount] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [deposit, setDeposit] = useState(false)
  const [balance, setBalance] = useState(0)

  // Auto-update date every 20s
  useEffect(() => {
    const interval = setInterval(() => {
      setDate(formatDate(new Date()))
    }, 20000)
    return () => clearInterval(interval)
  }, [])

  // Get latest balance for this account
  useEffect(() => {
    if (account.trim() !== '') {
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
    }
  }, [account])

  const handleSubmit = (e) => {
    e.preventDefault()

    const numericAmount = parseFloat(amount)
    if (isNaN(numericAmount)) {
      alert('Invalid amount')
      return
    }

    // Calculate new balance
    const newBalance = deposit ? balance + numericAmount : balance - numericAmount

    const formData = {
      date,
      account,
      type: deposit ? 'deposit' : 'withdraw',
      amount: numericAmount,
      description,
      balance: newBalance,
    }

    fetch('https://firsttechwallet.top/macdon/submit_transaction.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        alert(data.message)
      })
      .catch((err) => console.error('Error:', err))
  }

  return (
    <main className='dashform dashboard'>
      <DashboardHeader />

      <form onSubmit={handleSubmit}>
        <h3>Transaction Form</h3>
        <input type='text' placeholder='Date' value={date} readOnly />
        <input
          type='text'
          placeholder='Account Number'
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        />
        <div className='selecttype'>
          <label>
            Credit: <input type='radio' checked={deposit} onChange={() => setDeposit(true)} />
          </label>
          <label>
            Debit: <input type='radio' checked={!deposit} onChange={() => setDeposit(false)} />
          </label>
        </div>
        <input
          type='text'
          placeholder={deposit ? 'Credit Amount' : 'Debit Amount'}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type='text'
          placeholder='Transaction Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type='text'
          placeholder='Calculated Balance'
          value={
            deposit
              ? (balance + (parseFloat(amount) || 0)).toFixed(2)
              : (balance - (parseFloat(amount) || 0)).toFixed(2)
          }
          readOnly
        />
        <button type='submit' className='p-2 px-10 bg-blue-900 text-white rounded-lg m-5'>
          Submit
        </button>
      </form>
    </main>
  )
}
