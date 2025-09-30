import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ImSpinner9 } from 'react-icons/im';
import axios from '@config/axios.js';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import MetaData from '@pages/noPage/metaData';

export default function SignUp() {
  const [loading, setLoading] = useState(false);

  const signUpSchema = yup
    .object({
      name: yup.string().required('Name is required!'),
      email: yup.string().email('Invalid email!').required('Email is required!'),
      password: yup.string().required('Password is required !').min(8, 'Password must be at least 8 characters !').matches(/[A-Z]/, 'Must contain an uppercase letter !').matches(/\d/, 'Must contain a number !'),
      confirmPassword: yup.string().required('Please confirm your password!').oneOf([yup.ref('password')], 'Passwords must match!'),
      terms: yup.bool().oneOf([true], 'You must accept the Terms and Conditions!'),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signUpSchema) });

  let navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleSignUp = (data) => {
    setLoading(true);

    const formData = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: 'user',
      terms: data.terms,
    };
    axios
      .post('auth/signup', formData)
      .then((res) => {
        Swal.fire({
          title: 'Success!',
          text: `${res.data.message}`,
          icon: 'success',
          confirmButtonText: 'Log In',
        }).then(() => {
          navigate('/signin');
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: 'Error!',
          text: `${err?.response?.data?.errors[0].msg}`,
          icon: 'error',
          confirmButtonText: 'Ok',
        }).then(() => {
          navigate('/signup');
          setLoading(false);
        });
      });
  };

  return (
    <>
      <MetaData
        title='Sign Up'
        description='Sign Up Page of TerraQuake'
      />
      
      {/* === THIS IS THE FIX === */}
      {/* This invisible div acts as a spacer to push the content down. */}
      <div className="h-28"></div>

      {/* I removed min-h-screen from this section */}
      <section className='flex items-center justify-center p-6'>
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-4xl font-extrabold text-center mb-10 text-teal-400">
            Create account
          </h2>
          <form onSubmit={handleSubmit(handleSignUp)}>
            <div className='mb-8'>
              <label className="block text-gray-400 mb-2 font-semibold">
                Name
              </label>
              <input
                className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                name='name'
                autoComplete='off'
                {...register('name')}
              />
              <p className='text-red-600 pt-1'>{errors.name?.message}</p>
            </div>
            <div className='mb-6'>
              <label className="block text-gray-400 mb-2 font-semibold">
                Email
              </label>
              <input
                className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                name='email'
                autoComplete='off'
                {...register('email')}
              />
              <p className='text-red-600 pt-1'>{errors.email?.message}</p>
            </div>
            <div className='relative mb-6'>
              <label className="block text-gray-400 mb-2 font-semibold">
                Password
              </label>
              <input
                className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                name='password'
                autoComplete='off'
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
              />
              <p className='text-red-600 pt-1'>{errors.password?.message}</p>
              <button
                type='button'
                onClick={togglePassword}
                className='absolute top-10 right-3 text-gray-300 hover:text-teal-400 cursor-pointer'
                aria-label='Toggle password view'
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>

              <div className='relative my-6'>
                <label className="block text-gray-400 mb-2 font-semibold">
                  Confirm Password
                </label>
                <input
                  className="w-full p-3 bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  name='confirmPassword'
                  autoComplete='off'
                  {...register('confirmPassword')}
                  type={showPassword ? 'text' : 'password'}
                />
                <p className='text-red-600 pt-1'>
                  {errors.confirmPassword?.message}
                </p>
              </div>

              <div className='relative my-6 flex items-start'>
                <input
                  type='checkbox'
                  id='terms'
                  {...register('terms')}
                  className='mt-1 w-5 h-5 text-teal-600 bg-gray-800 border-gray-600 rounded focus:ring-teal-500'
                />
                <label
                  htmlFor='terms'
                  className='mt-1 ml-4 text-sm text-white cursor-pointer select-none'
                >
                  I accept the{' '}
                  <Link
                    to='/terms-and-conditions'
                    className='text-teal-400 hover:underline'
                    aria-label='Navigate to terms and conditions page'
                  >
                    Terms and Conditions
                  </Link>
                </label>
              </div>
              <p className='text-red-600 pt-1'>{errors.terms?.message}</p>
            </div>
            <button
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 text-lg"
              type='submit'
              aria-label='Click to create a new account'
            >
              {loading ? (
                <p className='text-white'>
                  <ImSpinner9 className='text-2xl mx-auto animate-spin' />
                </p>
              ) : (
                <span>Create your account</span>
              )}
            </button>
            <div className='mt-6 flex flex-col items-center'>
              <p className='text-gray-200 text-sm cursor-default'>
                Already have an account?
              </p>
              <Link
                to='/signin'
                className='mt-2 text-teal-400 hover:text-teal-600 font-semibold transition duration-300'
                aria-label='Navigate to sign in page'
              >
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}