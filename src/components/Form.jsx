import React from 'react'

export default function Form() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('http://localhost/macdon/login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })

    const data = await res.json()
    setMsg(data.message)

    if (data.status === 'success') {
      // Redirect to dashboard or store token
      alert('Logged in successfully')
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className='form p-3 px-8  rounded-xl flex flex-col gap-4'>
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
    </div>
  )
}
