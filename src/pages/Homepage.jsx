import React from 'react'
import Form from '../components/Form'

export default function Homepage() {
  return (
    <div>
      <header className='flex justify-between items-center p-2 px-22 bg-[#022e64]'>
        <div className=''>
          <a href='https://www.firstbanknigeria.com/'>
            <img src='image/logo-DarkBg.png' alt='Firstbank logo' />
          </a>
        </div>
        <div className='left-title'>
          <img src='image/banksnap.jpg' alt='left title' />
        </div>
      </header>
      <main>
        <div className='main-container text-sm'>
          <div className='main p-4 md:px-25'>
            <Form/>
            <div className=' rounded-lg py-3 mt-8 bg-[#e0ad0f] w-[300px]'>
              <div className='last-items'>
                <div className=' px-3 pl-4 flex items-center gap-3 text-sm'>
                  <img src='image/bulb.png' alt='' />
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
