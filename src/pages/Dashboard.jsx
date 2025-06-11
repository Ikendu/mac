import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import './styles.css'

export default function Dashboard() {
  const navigate = useNavigate()
  const logout = async () => {
    await axios.get('http://localhost/macdon/logout.php')
    navigate('/')
  }

  return (
    <>
      <main className='h-[80vh] bg-[url(image/bgdb.jpg)] bg-no-repeat bg-cover'>
        <h2>Dashboard</h2>
        <button onClick={logout}>Logout</button>
        <div>
          <div className='dbicon'>
            <img src='icons/form.png' alt='' className='m-auto' />
            <p>Enter Details</p>
          </div>
          <div className='dbicon'>
            <img src='icons/form.png' alt='' className='m-auto' />
            <p>All Entries</p>
          </div>
          <div className='dbicon'>
            <img src='icons/form.png' alt='' className='m-auto' />
            <p>Download Data</p>
          </div>
          <div className='dbicon'>
            <img src='icons/form.png' alt='' className='m-auto' />
            <p>Send All</p>
          </div>
        </div>
      </main>
    </>
  )
}
