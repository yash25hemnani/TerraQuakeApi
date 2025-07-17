import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [userLogin, setUserLogin] = useState({
    email: '',
    password: ''
  })

  const togglePassword = () => setShowPassword((prev) => !prev)

  return (
    <section className='min-h-screen flex items-center justify-center p-6 rounded-lg'>
      <div className='p-8 rounded-lg w-full max-w-md'>
        <h2 className='text-3xl text-center text-pink-600 font-bold mb-6'>Sign In</h2>
        <form action=''>
          <div className='mb-6'>
            <label className='block text-white text-sm font-semibold mb-2'>Email</label>
            <input
              className='w-full px-3 py-2 border rounded-2xl text-white focus:border-purple-600 focus:outline-none'
              type='email'
              autoComplete='off'
              required
            />
          </div>
          <div className='relative mb-6'>
            <label className='block text-white text-sm font-semibold mb-2'>Password</label>
            <input 
              className='w-full px-3 py-2 border rounded-2xl text-white focus:border-purple-600 focus:outline-none'
              type={showPassword ? 'text' : 'password'}
              autoComplete='off'
              required
            />
            <button
              type='button'
              onClick={togglePassword}
              className='absolute top-10 right-3 text-gray-800 hover:text-purple-600 cursor-pointer'
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            className='w-full bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-2xl transition duration-300 cursor-pointer'
            type='submit'
          >
            Continue
          </button>
          <p className='text-white mt-4 text-center'>Don't have an account? <Link className='hover:text-purple-800' to='/signup'>Sign Up</Link></p>
        </form>
      </div>
    </section>
  )
}
