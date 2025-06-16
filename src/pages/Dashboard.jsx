import React from 'react'
import { useNavigate } from 'react-router-dom'
import './styles.css'
import DashboardHeader from '../components/DashboardHeader'

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <>
      <main className='dashboard'>
        <DashboardHeader />
        <div className='flex justify-between py-4 align-middle'>
          <h2 className='maintext'>Dashboard</h2>
        </div>
        <div className='dashcontainer'>
          <div className='dbicons'>
            <div className='flex'>
              <div onClick={() => navigate('/dashboardform')} className='dbicon'>
                <img src='icons/transfer.png' alt='' className='m-auto' />
                <p>Tranfers</p>
              </div>
            </div>
            <div className='flex'>
              <div className='dbicon'>
                <img src='icons/card.png' alt='' className='m-auto' />
                <p>Card Data</p>
              </div>
              <div className='dbicon'>
                <img src='icons/loan.png' alt='' className='m-auto' />
                <p>Request Loan</p>
              </div>
              <div onClick={() => navigate('/all-transactions')} className='dbicon'>
                <img src='icons/history.png' alt='' className='m-auto' />
                <p>History</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
