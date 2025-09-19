import MetaData from '@pages/noPage/metaData';
import { TbError404 } from 'react-icons/tb';
import { NavLink } from 'react-router-dom';

export default function NoPage() {
  return (
    <>
      <MetaData
        title='404 Not Found'
        description='Page Not Found'
      />
      <section className='z-30 w-full min-h-screen mt-30 flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-b text-white'>
        <TbError404 className='text-9xl text-purple-600' />
        <h1 className='text-3xl md:text-6xl lg:text-9xl mx-auto font-extrabold leading-tight mt-[50px] select-none'>
          Page Not Found
        </h1>
        <p className='mt-6 mx-auto md:text-xl text-gray-300'>
          The page you are looking for does not exist
        </p>
        <NavLink
          to='/'
          className='text-white hover:text-purple-600 transition-colors duration-200 mt-30'
					aria-label='Navigate to home page'
        >
          Back To Home
        </NavLink>
      </section>
    </>
  );
}
