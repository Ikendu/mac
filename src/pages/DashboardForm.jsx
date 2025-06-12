import React, { useState } from 'react'
import './form.css'

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
// End of date formatting function
const now = formatDate(new Date())

export default function DashboardForm() {
  const [date, setDate] = useState(now)
  const [account, setAccount] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [deposit, setDeposit] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = {
      date,
      account,
      type: deposit ? 'deposit' : 'withdraw',
      amount,
      description,
    }

    fetch('http://localhost/macdon/submit_transaction.php', {
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
    <main className='dashboard'>
      <form onSubmit={handleSubmit}>
        <h3 className=''>Transaction Form</h3>
        <input type='text' name='' id='' placeholder='Date' value={date} readOnly />
        <input
          type='text'
          placeholder='Account Number'
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        />
        <div className='selecttype'>
          <label>
            Deposit:{' '}
            <input type='radio' checked={deposit} onChange={(e) => setDeposit(e.target.checked)} />
          </label>

          <label>
            Withdraw:{' '}
            <input
              type='radio'
              checked={!deposit}
              onChange={(e) => setDeposit(!e.target.checked)}
            />
          </label>
        </div>
        <input
          type='text'
          placeholder={deposit ? 'Deposit Amount' : 'Withdrawal Amount'}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type='text'
          placeholder='Transaction Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </form>
    </main>
  )
}
