import React from 'react'

export default function Header() {
  return (
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
  )
}
