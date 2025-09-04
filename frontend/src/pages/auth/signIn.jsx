import { useContext } from 'react'
import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Context } from '../../components/modules/context'
import Swal from 'sweetalert2'

export default function SignIn() {
  const API_URL = import.meta.env.VITE_URL_BACKEND || 'http://localhost:5001'
  const [showPassword, setShowPassword] = useState(false)
  const { isLoggedIn, setIsLoggedIn, seUserLogin } = useContext(Context)
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: ''
  })
  
  const [login, setLogin] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setLogin({
      ...login,
      [name]: value,
    })
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }))
  }

  const handleLoginSubmit = async (event) => {
    event.preventDefault()
    console.log(login)
    setErrors({ email: '', password: '', general: '' })

    try {
      const response = await fetch(`${API_URL}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(login)
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.errors) {
          setErrors(prevErrors => ({
            ...prevErrors,
            ...data.errors
          }));
        } else if (data.message) {
          setErrors(prevErrors => ({
            ...prevErrors,
            general: data.message
          }));
        }
        console.log(errors.general)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: data.message,
          confirmButtonColor: '#6b21a8'
        });
        return;
      }

      console.log("visualizza i dati:", data)
      setIsLoggedIn(true)
      
      Swal.fire({
        icon: 'success',
        title: data.message,
        confirmButtonColor: '#6b21a8',
        customClass: {
          popup: 'custom-swal-popup'
        }
      });

    } catch (error) {
      console.error(error.message)
    }
  }

  const togglePassword = () => setShowPassword((prev) => !prev)

  return (
    <section className='min-h-screen flex items-center justify-center p-6 rounded-lg'>
      <div className='p-8 rounded-lg w-full max-w-md'>
        <h2 className='text-3xl text-center text-pink-600 font-bold mb-6'>Sign In</h2>
        <form onSubmit={handleLoginSubmit}>
          <div className='mb-6'>
            <label className='block text-white text-sm font-semibold mb-2'>Email</label>
            <input
              className='w-full px-3 py-2 border rounded-2xl text-white focus:border-purple-600 focus:outline-none'
              type='email'
              autoComplete='off'
              name='email'
              onChange={handleInputChange}
              isInvalid={!!errors.email}
              required
            />
            <p className='text-red-500 text-sm'>{errors.email}</p>
          </div>
          <div className='relative mb-6'>
            <label className='block text-white text-sm font-semibold mb-2'>Password</label>
            <input 
              className='w-full px-3 py-2 border rounded-2xl text-white focus:border-purple-600 focus:outline-none'
              type={showPassword ? 'text' : 'password'}
              autoComplete='off'
              name='password'
              onChange={handleInputChange}
              isInvalid={!!errors.password}
              required
            />
            <button
              type='button'
              onClick={togglePassword}
              className='absolute top-10 right-3 text-gray-800 hover:text-purple-600 cursor-pointer'
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            <p className='text-red-500 text-sm'>{errors.password}</p>
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
