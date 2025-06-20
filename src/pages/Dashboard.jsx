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
            <div onClick={() => navigate('/dashboardform')} className='dbicon'>
              <img src='icons/transfer.png' alt='' className='m-auto' />
              <p>Transfers</p>
            </div>
            <div onClick={() => navigate('/statement')} className='dbicon'>
              <img src='icons/statement.png' alt='' className='m-auto' />
              <p>Statement</p>
            </div>
            <div
              onClick={() => {
                alert('Service not available ')
              }}
              className='dbicon'
            >
              <img src='icons/card.png' alt='' className='m-auto' />
              <p>Card Data</p>
            </div>
            <div
              onClick={() => {
                alert('Service not available ')
              }}
              className='dbicon'
            >
              <img src='icons/loan.png' alt='' className='m-auto' />
              <p>Loan</p>
            </div>
            <div onClick={() => navigate('/all-transactions')} className='dbicon'>
              <img src='icons/history.png' alt='' className='m-auto' />
              <p>History</p>
            </div>
            <div
              onClick={() => {
                alert('Service not available ')
              }}
              className='dbicon'
            >
              <img src='icons/airtime.png' alt='' className='m-auto' />
              <p>Airtime</p>
            </div>
            <div
              onClick={() => {
                console.log('Other items are coming soon')
                alert('Other items are coming soon')
              }}
              className='dbicon'
            >
              <img src='icons/more.png' alt='' className='m-auto' />
              <p>More</p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
