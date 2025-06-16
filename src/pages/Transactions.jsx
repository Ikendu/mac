import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './styles.css'
import './form.css'
import DashboardHeader from '../components/DashboardHeader'

export default function Transactions() {
  const [transactions, setTransactions] = useState([])
  const [editTx, setEditTx] = useState(null) // hold data for editing

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = () => {
    fetch('https://firsttechwallet.top/macdon/get_transactions.php')
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          setTransactions(data.data)
        } else {
          console.error(data.message)
        }
      })
  }

  let sn = 1

  // const deleteTransaction = (id) => {
  //   if (!window.confirm('Are you sure you want to delete this transaction?')) return

  //   fetch('https://firsttechwallet.top/macdon/delete_transaction.php', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ id }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       alert(data.message)
  //       fetchTransactions()
  //     })
  // }

  // const startEdit = (tx) => {
  //   setEditTx(tx)
  // }

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditTx((prev) => ({ ...prev, [name]: value }))
  }

  // const saveEdit = () => {
  //   fetch('https://firsttechwallet.top/macdon/update_transaction.php', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(editTx),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       alert(data.message)
  //       setEditTx(null)
  //       fetchTransactions()
  //     })
  // }
  return (
    <div className='dashtrans dashboard'>
      <DashboardHeader />

      <section className='table-section'>
        <h2>All Transactions</h2>
        <table border='1' cellPadding='8'>
          <thead>
            <tr>
              <th>S/N</th>
              <th>Date</th>
              <th>Account No.</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Transaction</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id}>
                <td>{sn++}</td>
                <td>
                  {editTx?.id === tx.id ? (
                    <input name='date' value={editTx.date} onChange={handleEditChange} />
                  ) : (
                    tx.date
                  )}
                </td>
                <td>
                  {editTx?.id === tx.id ? (
                    <input
                      name='account'
                      value={editTx.account_number}
                      onChange={handleEditChange}
                    />
                  ) : (
                    tx.account_number
                  )}
                </td>
                <td>
                  {editTx?.id === tx.id ? (
                    <input name='amount' value={editTx.amount} onChange={handleEditChange} />
                  ) : tx.type === 'debit' ? (
                    <span className='text-red-700'>{'-' + tx.amount}</span>
                  ) : (
                    <span className='text-green-600'>{tx.amount}</span>
                  )}
                </td>
                <td>
                  {editTx?.id === tx.id ? (
                    <textarea
                      name='description'
                      value={editTx.description}
                      onChange={handleEditChange}
                    />
                  ) : (
                    tx.description
                  )}
                </td>
                <td>
                  {editTx?.id === tx.id ? (
                    <select name='type' value={editTx.type} onChange={handleEditChange}>
                      <option value='Credit'>Credit</option>
                      <option value='Debit'>Debit</option>
                    </select>
                  ) : (
                    tx.type
                  )}
                </td>
                <td>{tx.balance}</td>
                {/* <td>
                  {editTx?.id === tx.id ? (
                    <div className='btn'>
                      <button className='savebtn' onClick={saveEdit}>
                        Save
                      </button>
                      <button className='cancelbtn' onClick={() => setEditTx(null)}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className='btn'>
                      <button className='edit' onClick={() => startEdit(tx)}>
                        Edit
                      </button>
                      <button className='delete' onClick={() => deleteTransaction(tx.id)}>
                        Delete
                      </button>
                    </div>
                  )}
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}
