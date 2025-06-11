import React from 'react'
import Form from '../components/Form'

export default function Homepage() {
  return (
    <div>
      <main>
        <div className='main-container text-sm'>
          <div className='main p-4 md:px-25'>
            <Form />
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
      </main>
    </div>
  )
}
