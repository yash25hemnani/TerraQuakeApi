import { useState } from 'react';
import Sismic from '../../assets/images/tracciato.png';

export default function NavbarMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const listItems = [
    'Home',
    'Explore Data',
    'Api Access',
    'Use Cases',
    'About',
  ];

  return (
    <header className='fixed w-full bg-black bg-opacity-60 text-white shadow-lg rounded-full py-4 flex justify-between items-center p-10 z-50'>
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
        className='md:hidden flex items-center mr-10'
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
      <ul
        className={`${
          isOpen ? 'flex pointer-events-auto' : 'hidden pointer-events-auto'
        } absolute z-10 md:static top-full left-0 w-full md:w-auto md:flex flex-col md:flex-row items-center gap-4 md:gap-8 py-6 md:py-0 px-4 rounded-xl md:rounded-none backdrop-blur-md md:backdrop-blur-0 text-xl transition-all duration-300 ease-in-out`}
      >
        {listItems.map((item) => (
          <li
            key={item}
            className='hover:text-purple-400 transition-colors duration-200 md:text-[14px] lg:text-[16px] cursor-pointer'
          >
            <a href='/home'>{item}</a>
          </li>
        ))}
      </ul>

      {/* Button */}
      <button className='hidden lg:block bg-purple-600 hover:bg-purple-800 py-2 px-6 rounded-2xl md:text-[14px] lg:text-[16px] transition-colors duration-200 cursor-pointer'>
        Get Started
      </button>
    </header>
  );
}
