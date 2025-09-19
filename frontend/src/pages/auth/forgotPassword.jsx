import axios from '@config/axios.js';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import MetaData from '@pages/noPage/metaData';

export default function forgotPassword() {
  const forgotPasswordSchema = yup
    .object({
      email: yup.string().email().required('Email is required !'),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(forgotPasswordSchema) });

  let navigate = useNavigate();

  const handleForgotPassword = (data) => {
    const formData = {
      email: data.email,
    };
    axios
      .post('/auth/forgot-password', formData)
      .then((res) => {
        localStorage.setItem(
          'passwordChangeRequestingEmail',
          res.data.user.email
        );
        Swal.fire({
          title: 'Success! Redirecting...',
          text: 'Redirecting you to the appropriate URL',
          icon: 'info',
          allowOutsideClick: false,
          allowEscapeKey: false,
          confirmButtonText: 'Okay',
        }).then((result) => {
          navigate('/U2FsdGVkX188Vmt4gt5JTCUT9P8HbN3TUFkNxsrwWac='); // Custom reset-password route. See App.jsx routes for this
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: 'Error!',
          text: `${err.response.data.message}`,
          icon: 'error',
          confirmButtonText: 'OK',
        }).then((result) => {
          navigate('/signup');
        });
      });
  };

  return (
    <>
      <MetaData
        title='Forgot Password'
        description='Forgot Password page of TerraQuake'
      />
      <section className='min-h-screen flex items-center justify-center p-6 rounded-lg'>
        <div className='p-8 flex flex-col items-center justify-between h-[40rem] rounded-lg w-full'>
          <h2 className='text-3xl text-center text-pink-600 font-bold'>
            Forgot Password ?
          </h2>
          <form onSubmit={handleSubmit(handleForgotPassword)}>
            <div className='mb-6'>
              <label className='block text-white text-sm font-semibold mb-2'>
                Enter your email
              </label>

              <input
                className='w-full px-3 py-2 border rounded-2xl text-white focus:border-purple-600 focus:outline-none'
                name='email'
                autoComplete='off'
                {...register('email')}
              />
              <p className='text-red-600 pt-1'>{errors.email?.message}</p>
            </div>

            <button
              className='w-full bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-2xl transition duration-300 cursor-pointer'
              type='submit'
							aria-label='Recover your account password'
            >
              Submit
            </button>
          </form>
          <p className='text-gray-300 text-justify'>
            We will send you a link, if your email matches the one in our
            database.
          </p>
          <Link
            className='mt-4 text-white hover:text-pink-600 focus:text-pink-600 duration-300 ease-in-out'
            to='/signin'
            aria-label='Navigate to sign in page'
          >
            Sign in
          </Link>
        </div>
      </section>
    </>
  );
}
