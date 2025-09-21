import { useState, useContext } from 'react';
import Sismic from '@images/tracciato.png';
import { FaBars, FaTimes } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { Context } from '@components/modules/context';
import Swal from 'sweetalert2';

export default function NavbarMenu() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // hamburger mobile
  const [isOpenDropdown, setIsOpenDropdown] = useState(false); // user dropdown desktop
  const { userLogin, isLoggedIn, setIsLoggedIn, setUserLogin } =
    useContext(Context);

  const listItems = [
    { name: 'Home', path: '/' },
    { name: 'Explore Data', path: '/explore-data' },
    { name: 'API Access', path: '/api-access' },
    { name: 'Docs', path: '/docs' },
    { name: 'Use Cases', path: '/use-cases' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLogout = () => {
    setUserLogin({});
    setIsLoggedIn(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    Swal.fire({
      title: 'Success!',
      text: 'Logged Out Successfully!',
      icon: 'success',
      confirmButtonText: 'Ok',
    }).then(() => {
      navigate('/');
    });
  };

  return (
    <header className='fixed top-0 left-0 w-full backdrop-blur-2xl bg-black/60 text-white shadow-lg py-4 px-4 flex items-center justify-between lg:justify-around z-50'>
      {/* Logo */}
      <div className='flex items-center text-2xl font-bold w-fit h-12 relative'>
        <img
          src={Sismic}
          alt='Logo'
          className='absolute z-10 w-36 h-20 opacity-80 object-cover'
        />
        <span className='text-white z-20'>TerraQuake</span>
      </div>

      {/* Menu Desktop */}
      <nav className='hidden lg:flex justify-center gap-8 text-[14px] lg:text-[16px]'>
        {listItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `hover:text-purple-400 ${
                isActive
                  ? 'text-purple-400 font-semibold border-b-2 border-purple-500'
                  : 'text-gray-300'
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Auth Desktop */}
      <div className='lg:flex items-center gap-4 text-[14px] lg:text-[16px] relative'>
        {isLoggedIn ? (
          <>
            <button
              onClick={() => setIsOpenDropdown(!isOpenDropdown)}
              className='flex items-center gap-3'
              aria-label='User menu'
            >
              <img
                src={
                  userLogin.avatarUrl ||
                  'https://wallpapers.com/images/hd/default-user-profile-icon-0udyg8f0x3b3qqbw.png'
                }
                alt='avatar'
                className='w-8 h-8 rounded-full cursor-pointer'
              />
              <span className='text-purple-500'>{userLogin.name}</span>
            </button>

            {isOpenDropdown && (
              <div className='flex flex-col gap-3 bg-black/90 backdrop-blur-xl border border-purple-500/50 rounded-2xl absolute w-[200px] top-full right-0 p-3 mt-2 shadow-md z-50'>
                <button
                  onClick={() => {
                    setIsOpenDropdown(false);
                    navigate('/profile');
                  }}
                  className='text-left hover:text-purple-500 cursor-pointer'
                >
                  Profile
                </button>
                <button
                  onClick={() => {
                    setIsOpenDropdown(false);
                    navigate('/change-password');
                  }}
                  className='text-left hover:text-purple-500 cursor-pointer'
                >
                  Change Password
                </button>
                <button
                  onClick={() => {
                    setIsOpenDropdown(false);
                    navigate('/contact');
                  }}
                  className='text-left hover:text-purple-500 cursor-pointer'
                >
                  Messages
                </button>
                <button
                  onClick={() => {
                    setIsOpenDropdown(false);
                    navigate('/docs');
                  }}
                  className='text-left hover:text-purple-500 cursor-pointer'
                >
                  Documentacion
                </button>
                <button
                  onClick={() => {
                    setIsOpenDropdown(false);
                    navigate('/info');
                  }}
                  className='text-left hover:text-purple-500 cursor-pointer'
                >
                  Information
                </button>
                <hr className='border-t border-purple-200 my-2' />
                <button
                  onClick={handleLogout}
                  className='text-left hover:text-purple-500 cursor-pointer'
                >
                  Log Out
                </button>
              </div>
            )}
          </>
        ) : (
          <div className='hidden lg:flex gap-4'>
            <button
              className='border border-white hover:bg-white hover:text-black transition-colors duration-300 text-white font-semibold py-2 px-6 rounded-full cursor-pointer'
              onClick={() => navigate('/signin')}
              aria-label='Navigate to sign in page'
            >
              Sign In
            </button>
            <button
              className='bg-gradient-to-r from-pink-500 to-purple-600 py-2 px-6 rounded-full hover:scale-105 transform transition duration-300 cursor-pointer'
              onClick={() => navigate('/signup')}
              aria-label='Navigate to sign up page'
            >
              Sign Up
            </button>
          </div>
        )}
      </div>

      {/* Hamburger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='lg:hidden flex items-center relative w-6 h-6'
        aria-label='Toggle menu'
      >
        <div
          className={`w-full h-full transition-transform duration-500 ease-in-out ${
            isOpen ? 'rotate-[360deg]' : 'rotate-0'
          }`}
        >
          <FaBars
            className={`absolute inset-0 w-full h-full transition-opacity duration-200 ease-in-out ${
              isOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <FaTimes
            className={`absolute inset-0 w-full h-full transition-opacity duration-200 ease-in-out ${
              isOpen ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
      </button>

      {/* Mobile Dropdown */}
      <div
        className={`lg:hidden absolute top-full w-full bg-[#090414] text-white overflow-hidden transition-all duration-500 ease-in-out z-40 rounded-b-xl ${
          isOpen
            ? 'max-h-[500px] opacity-100 pointer-events-auto py-6 px-4'
            : 'max-h-0 opacity-0 pointer-events-none py-0 px-4'
        }`}
      >
        {/* Mobile Links */}
        <div className='flex flex-col items-center gap-4 text-xl mb-4'>
          {listItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `hover:text-purple-400 ${
                  isActive
                    ? 'text-purple-400 font-semibold border-b-2 border-purple-500'
                    : 'text-gray-300'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile Auth */}
        {isLoggedIn ? (
          <div className='flex flex-col gap-2 items-center'>
            <hr className='border-t border-purple-200 my-2' />
            <button
              onClick={handleLogout}
              className='text-left hover:text-purple-500'
            >
              Log Out
            </button>
          </div>
        ) : (
          <div className='flex flex-col gap-4'>
            <button
              className='border border-white hover:bg-white hover:text-black transition-colors duration-300 text-white font-semibold py-2 px-6 rounded-2xl'
              onClick={() => {
                navigate('/signin');
                setIsOpen(false);
              }}
              aria-label='Navigate to sign in page'
            >
              Sign In
            </button>
            <button
              className='bg-purple-600 hover:bg-purple-800 py-2 px-6 rounded-2xl transition-colors duration-200'
              onClick={() => {
                navigate('/signup');
                setIsOpen(false);
              }}
              aria-label='Navigate to sign up page'
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
