import { useState } from 'react'

function App() {
  return (
    <>
      <header className='flex justify-between items-center p-2 px-22 bg-[#022e64]'>
        <div className=''>
          <img src='../src/assets/logo-DarkBg.png' alt='Firstbank logo' />
        </div>
        <div className=''>
          <img src='../src/assets/banksnap.jpg' alt='left title' />
        </div>
      </header>
      <main>
        <div className='main'>
          <form action='' className='form p-3 bg-[#d1d2d4] w-sm rounded-xl'>
            <div>
              <h3>Log on to Internet Banking</h3>
              <label htmlFor='username'>User ID*</label>
              <input type='text' id='username' />
              <p>
                Log on to Internet Banking User ID* For corporate customers, kindly use Corporate
                ID.User ID
              </p>
            </div>
            <div>
              <label htmlFor='verify'>Verification*</label>
              <input type='text' id='verify' placeholder='4456' />
              <input type='text' placeholder='Confirm Verification' />
            </div>
            <button>Next</button>
            <div className='divider'></div>
            <p>New customer ?</p>
            <button>Self-Registration</button>
          </form>
        </div>
      </main>
    </>
  )
}

export default App
