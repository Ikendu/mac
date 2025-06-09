import React from 'react'

export default function Homepage() {
  return (
    <div>
      <header className='flex justify-between items-center p-2 px-22 bg-[#022e64]'>
        <div className=''>
          <a href='https://www.firstbanknigeria.com/'>
            <img src='../src/assets/logo-DarkBg.png' alt='Firstbank logo' />
          </a>
        </div>
        <div className='left-title'>
          <img src='../src/assets/banksnap.jpg' alt='left title' />
        </div>
      </header>
      <main>
        <div className='main-container text-sm'>
          <div className='main p-4 md:px-25'>
            <form action='' className='form p-3 px-8  rounded-xl flex flex-col gap-4'>
              <div className='leading-4'>
                <h3>Log on to Internet Banking</h3>
                <label htmlFor='username'>
                  User ID<span className='text-red-600'>*</span>
                </label>
                <input type='text' id='username' />
                <p>For corporate customers, kindly use Corporate ID.User ID</p>
              </div>
              <div className='-m-2'>
                <label htmlFor='verify'>
                  Verification<span className='text-red-600'>*</span>
                </label>
                <div className='flex flex-col gap-4'>
                  <input type='text' id='verify' placeholder='4456' className='font-bold' />
                  <input type='text' placeholder='Confirm Verification' />
                </div>
              </div>
              <button className='flex justify-start bg-[#e0ad0f] max-w-26 px-8 font-semibold p-1 text-[15px] rounded-lg'>
                Next
              </button>
              <div className='divider'></div>
              <p>New customer ?</p>
              <button className='registerbtn '>Self-Registration</button>
            </form>
            <div className=' rounded-lg py-3 mt-8 bg-[#e0ad0f] w-[300px]'>
              <div className='last-items'>
                <div className=' px-3 pl-4 flex items-center gap-3 text-sm'>
                  <img src='../src/assets/bulb.png' alt='' />
                  <p className='leading-3.5'>
                    Make multiple transfers in one transaction with FirstOnline
                  </p>
                </div>
                <p className='lastbtn flex justify-end font-bold mr-4'>
                  <a href='https://www.firstbanknigeria.com/personal-banking/ways-to-bank/online-banking/firstonline/firstonline-help-and-faqs/'>
                    Learn More
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <footer className='bg-[#022e64] text-[#f7fff0] text-center text-sm p-2'>
          <p>Copyright © 2018. First Bank of Nigeria Ltd. All Rights Reserved</p>
        </footer>
      </main>
    </div>
  )
}
