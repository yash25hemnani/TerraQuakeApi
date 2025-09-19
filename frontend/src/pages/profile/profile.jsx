import React, { useContext, useState } from 'react';
import MetaData from '../noPage/metaData';
import { Context } from '@/components/modules/context';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import EditProfile from './editProfile';
import DeleteProfile from './deleteProfile';

export default function Profile() {
  const { userLogin, isLoggedIn, setIsLoggedIn, setUserLogin } =
    useContext(Context);
  const navigate = useNavigate();

  // Stato unico per gestire la sezione attiva
  const [activeSection, setActiveSection] = useState(null);
  // valori possibili: "edit", "delete", "password", oppure null

  const handleLogout = () => {
    setUserLogin({});
    setIsLoggedIn(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    Swal.fire({
      title: 'Success!',
      text: 'Logged Out Successfully!',
      icon: 'success',
      confirmButtonText: 'Okay',
    }).then(() => {
      navigate('/');
    });
  };

  const handleGenerateToken = () => {
    alert('Generate token')
  }

  return (
    <>
      <MetaData
        title='Profile'
        description='Profile page of TerraQuake'
      />

      <section className='relative z-30 w-full flex flex-col items-center justify-center text-center px-6 py-30 text-white'>
        {isLoggedIn ? (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl'>
            {/* Left Column: Avatar + Info */}
            <div className='bg-black/30 backdrop-blur-xl shadow-2xl rounded-2xl p-10 flex flex-col items-center border border-purple-500/50'>
              <img
                src={
                  userLogin.avatarUrl ||
                  'https://wallpapers.com/images/hd/default-user-profile-icon-0udyg8f0x3b3qqbw.png'
                }
                alt='avatar'
                className='w-32 h-32 rounded-full mx-auto border-4 border-pink-500 shadow-lg'
              />

              <h1 className='text-3xl font-extrabold mt-6'>
                Hello, {userLogin.name || 'Anonymus'}
              </h1>
              <p className='text-pink-300 text-sm mt-2'>
                TerraQuake <span className='uppercase'>{userLogin.role}</span>
              </p>

              <button
                onClick={handleLogout}
                className='mt-6 w-full py-3 px-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full font-semibold text-lg shadow-lg hover:scale-105 transform transition duration-300 cursor-pointer'
                aria-label='Log out of your account'
              >
                Logout
              </button>
            </div>

            {/* Right Column */}
            <div className='flex flex-col justify-center items-center p-6 bg-black/20 backdrop-blur-lg rounded-2xl shadow-lg'>
              <h1 className='text-4xl font-extrabold mb-4'>Profile</h1>
              <p className='text-slate-300 max-w-md text-center'>
                Welcome to your TerraQuake profile!
              </p>

              {activeSection === null && (
                <>
                  <button
                    onClick={() => setActiveSection('edit')}
                    className='mt-6 w-60 border border-white hover:bg-white hover:text-black transition-colors duration-300 text-white font-semibold py-3 px-8 rounded-full cursor-pointer'
                    aria-label='Edit profile'
                  >
                    Edit profile
                  </button>

                  <button
                    onClick={() => setActiveSection('delete')}
                    className='mt-6 w-60 border border-white hover:bg-white hover:text-black transition-colors duration-300 text-white font-semibold py-3 px-8 rounded-full cursor-pointer'
                    aria-label='Delete your profile'
                  >
                    Delete profile
                  </button>

                  <button
                    onClick={() => setActiveSection('password')}
                    className='mt-6 w-60 border border-white hover:bg-white hover:text-black transition-colors duration-300 text-white font-semibold py-3 px-8 rounded-full cursor-pointer'
                    aria-label='change password profile'
                  >
                    Change password
                  </button>
                </>
              )}

              {activeSection !== null && (
                <button
                  onClick={() => setActiveSection(null)}
                  className='mt-6 w-60 py-3 px-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full font-semibold text-lg shadow-lg hover:scale-105 transform transition duration-300 cursor-pointer'
                  aria-label='Return to profile page'
                >
                  Back to profile
                </button>
              )}
            </div>

            {/* Right Bottom Area */}
            {activeSection === 'edit' ? (
              <EditProfile setEditProfile={() => setActiveSection(null)} />
            ) : activeSection === 'delete' ? (
              <DeleteProfile />
            ) : activeSection === 'password' ? (
              <div className='text-left py-4'>
                <p className='text-xl text-yellow-400'>
                  🔑 Change your password here...
                </p>
              </div>
            ) : (
              <>
                {/* Info profile user */}
                <div className='text-left py-4'>
                  <p className='text-xl py-2'>
                    Name:{' '}
                    <span className='font-semibold'>{userLogin.name}</span>
                  </p>
                  <p className='text-xl py-2'>
                    Email:{' '}
                    <span className='font-semibold'>{userLogin.email}</span>
                  </p>
                  <p className='text-xl py-2'>
                    Role:{' '}
                    <span className='font-semibold'>{userLogin.role}</span>
                  </p>
                  <p className='text-xl py-2'>
                    Experience:{' '}
                    <span className='font-semibold'>
                      {userLogin.experience}
                    </span>
                  </p>
                  <p className='text-xl py-2'>
                    Student:{' '}
                    <span className='font-semibold'>{userLogin.student}</span>
                  </p>
                </div>

                {/* Generate a token for accessing the TerraQuake API */}
                <div className='text-left py-4'>
                  <h2 className='text-xl'>Generate Token for accessing API</h2>
                  <button
                    onClick={handleGenerateToken}
                    className='mt-6 w-60 py-3 px-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full font-semibold text-lg shadow-lg hover:scale-105 transform transition duration-300 cursor-pointer'
                    aria-label='Generate token api'
                  >
                    Generate token
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className='flex flex-col gap-4'>
            <button
              onClick={() => navigate('/signin')}
              className='py-2 px-8 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-lg hover:scale-105 transition-transform cursor-pointer'
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/signup')}
              className='py-2 px-8 rounded-xl bg-gradient-to-r from-pink-600 to-purple-700 text-white font-bold shadow-lg hover:scale-105 transition-transform cursor-pointer'
            >
              Sign Up
            </button>
          </div>
        )}
      </section>
    </>
  );
}
