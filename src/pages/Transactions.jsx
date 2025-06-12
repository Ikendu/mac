import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './styles.css'
import './form.css'

export default function Transactions() {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    fetch('http://localhost/macdon/get_transactions.php')
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          setTransactions(data.data)
        } else {
          console.error(data.message)
        }
      })
      .catch((err) => console.error('Error fetching transactions:', err))
  }, [])
  return (
    <div className='dashboard'>
      <nav>
        <Link to={'/dashboard'}>
          <div className='dbicon formicons'>
            <img src='icons/home.png' alt='' className='m-auto' />
            <p>Home</p>
          </div>
        </Link>
        <Link to={'/dashboardform'}>
          <div className='dbicon formicons'>
            <img src='icons/form.png' alt='' className='m-auto' />
            <p>New Entry</p>
          </div>
        </Link>
        {/* <Link to={'/dashboard'}>Dashboard</Link> */}
      </nav>
      <section>
        <h2>All Transactions</h2>
        <table border='1' cellPadding='8'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Account</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((tx) => (
                <tr key={tx.id}>
                  <td>{tx.id}</td>
                  <td>{tx.date}</td>
                  <td>{tx.account_number}</td>
                  <td>{tx.type}</td>
                  <td>{tx.amount}</td>
                  <td>{tx.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='6'>No transactions found</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  )
}
