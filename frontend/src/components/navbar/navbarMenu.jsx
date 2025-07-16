import { useState } from 'react';
import Sismic from '../../assets/images/tracciato.png';
import { NavLink } from 'react-router-dom';

export default function NavbarMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const listItems = [
    { name: 'Home', path: '/' },
    { name: 'Explore Data', path: '/explore-data' },
    { name: 'Api Access', path: '/api-access' },
    { name: 'Use Cases', path: '/use-cases' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header className='fixed w-full backdrop-blur-2xl bg-opacity-60 text-white shadow-lg rounded-full py-4 px-[50px] flex justify-between items-center z-50'>
      {/* Logo */}
      <div className='relative flex justify-center items-center text-3xl font-bold w-fit h-12'>
        {/* Logo sovrapposto */}
        <img
          src={Sismic}
          alt='Tracciato logo'
          className='absolute z-20 w-38 h-20 opacity-40'
        />
        {/* Testo sotto il logo */}
        <span className='text-white'>TerraQuake</span>
      </div>

      {/* Hamburger Icon */}
      <button
        className='md:hidden flex items-center ml-[130px]'
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className='w-6 h-6 transition-transform duration-200 ease-in-out'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          {isOpen ? (
            // Icona X
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M6 18L18 6M6 6l12 12'
              className='transition-transform duration-200 ease-in-out'
            />
          ) : (
            // Icona Hamburger
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16M4 18h16'
              className='transition-transform duration-200 ease-in-out'
            />
          )}
        </svg>
      </button>

      {/* Menu Items */}
      <div
        className={`${
          isOpen ? 'flex pointer-events-auto' : 'hidden pointer-events-auto'
        } absolute z-40 md:static top-full left-0 w-full md:w-auto md:flex flex-col md:flex-row items-center gap-4 md:gap-8 py-6 md:py-0 rounded-xl md:rounded-none bg-[#090414] text-xl transition-all duration-300 ease-in-out`}
      >
        {listItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            isActive
              ? 'md:text-[14px] lg:text-[16px] text-purple-400 font-semibold border-b-2 border-purple-500'
              : 'md:text-[14px] lg:text-[16px] text-gray-300 hover:text-purple-400'
          }
        >
          {item.name}
        </NavLink>
      ))}
      </div>

      {/* Button */}
      <div className='flex gap-4'>
        <button className='hidden lg:block border border-white hover:bg-white hover:text-black transition-colors duration-300 text-white font-semibold py-2 px-6 rounded-2xl md:text-[14px] lg:text-[16px] cursor-pointer'>
          Sign In
        </button>
        <button className='hidden lg:block bg-purple-600 hover:bg-purple-800 py-2 px-6 rounded-2xl md:text-[14px] lg:text-[16px] transition-colors duration-200 cursor-pointer'>
          Sign Up
        </button>
      </div>
    </header>
  );
}
