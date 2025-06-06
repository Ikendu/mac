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
        <div className='main-container'>
          <div className='main p-4 px-25'>
            <form
              action=''
              className='form p-3 px-8 bg-[#d1d2d4] w-[320px] rounded-xl flex flex-col gap-4'
            >
              <div>
                <h3>Log on to Internet Banking</h3>
                <label htmlFor='username'>User ID*</label>
                <input type='text' id='username' />
                <p>For corporate customers, kindly use Corporate ID.User ID</p>
              </div>
              <div>
                <label htmlFor='verify'>Verification*</label>
                <div className='flex flex-col gap-4'>
                  <input type='text' id='verify' placeholder='4456' />
                  <input type='text' placeholder='Confirm Verification' />
                </div>
              </div>
              <button>Next</button>
              <div className='divider'></div>
              <p>New customer ?</p>
              <button>Self-Registration</button>
            </form>
            <div className='py-3 mt-8 bg-[#e0ad0f] w-[320px]'>
              <div className='px-5 pl-14 flex items-center gap-4 text-sm'>
                <img src='../src/assets/bulb.png' alt='' />
                <p className=' leading-3.5'>
                  Make multiple transfers in one transaction with FirstOnline
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default App
