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
      <main className='dashboard'>
        <div className='flex justify-between py-4 align-middle'>
          <h2 className='maintext'>Dashboard</h2>
          <button className='logoutbtn' onClick={logout}>
            Logout
          </button>
        </div>
        <div className='dashcontainer'>
          <div className='dbicons'>
            <div onClick={() => navigate('/dashboardform')} className='dbicon'>
              <img src='icons/form.png' alt='' className='m-auto' />
              <p>New Entry</p>
            </div>
            <div onClick={() => navigate('/all-transactions')} className='dbicon'>
              <img src='icons/all.png' alt='' className='m-auto' />
              <p>All Entries</p>
            </div>
            <div className='dbicon'>
              <img src='icons/download.png' alt='' className='m-auto' />
              <p>Download Data</p>
            </div>
            <div className='dbicon'>
              <img src='icons/form.png' alt='' className='m-auto' />
              <p>Send Email</p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
