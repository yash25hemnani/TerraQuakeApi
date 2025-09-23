import { Context } from '@/components/modules/context';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditProfile() {
  const { userLogin, isLoggedIn, setIsLoggedIn, setUserLogin } =
    useContext(Context);

  return (
    <>
      <div className='text-left py-4'>
        <p className='text-xl text-red-400'>
          ⚠️ Edit profile in progress...
        </p>
      </div>
    </>
  );
}
