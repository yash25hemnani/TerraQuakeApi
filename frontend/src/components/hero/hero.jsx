import { useNavigate } from 'react-router-dom';
import JsonApi2 from '@images/json-api-2.png';
import { useContext, useState } from 'react';
import { Context } from '../modules/context';

export default function Hero() {
  const { isLoggedIn } = useContext(Context);
  const navigate = useNavigate();

  const [transformStyle, setTransformStyle] = useState(
    "translate(0px, 0px) rotateX(0deg) rotateY(0deg) scale(1)"
  );

  const handleMouseMove = (e) => {
    const { offsetX, offsetY, currentTarget } = e.nativeEvent;
    const { clientWidth, clientHeight } = currentTarget;

    // Normalizza posizione da -1 a 1
    const xRatio = offsetX / clientWidth - 0.5;
    const yRatio = offsetY / clientHeight - 0.5;

    // Movimento + rotazione
    const translateX = xRatio * 20; // max ±20px
    const translateY = yRatio * 20; // max ±20px
    const rotateX = -yRatio * 15;   // max ±15°
    const rotateY = xRatio * 15;    // max ±15°

    setTransformStyle(
      `translate(${translateX}px, ${translateY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.10)`
    );
  };

  const handleMouseLeave = () => {
    setTransformStyle(
      "translate(0px, 0px) rotateX(0deg) rotateY(0deg) scale(1)"
    );
  };


  return (
    <section className='relative z-30 w-full min-h-screen flex flex-col justify-center items-center text-center px-6 py-20 bg-gradient-to-b text-white'>
      {/* Container */}
      <div className="flex flex-col 2xl:flex-row justify-center items-center gap-10">
        <div className='flex flex-col max-w-2xl'>
          <h1 className='text-4xl mx-auto md:text-6xl font-extrabold leading-tight mt-[50px]'>
            Practice with Real Seismic Data
          </h1>
          <p className='mt-6 text-lg md:text-xl text-gray-300'>
            A training and experimentation environment powered by real seismic
            events from official sources. Perfect for students, developers, and
            technicians looking to learn by working with real-world data.
          </p>

          <div className='flex flex-col md:flex-row justify-center items-center gap-6 w-auto mt-6 text-lg md:text-xl text-gray-300'>
            {!isLoggedIn && (
              <button
                className='relative z-30 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-3 px-8 rounded-full hover:scale-105 transform transition duration-300 cursor-pointer'
                onClick={() => navigate('/signup')}
                aria-label='Navigate to sign up page'
              >
                Sign Up
              </button>
            )}
            <button
              className='relative z-30 border border-white hover:bg-white hover:text-black transition-colors duration-300 text-white font-semibold py-3 px-8 rounded-full cursor-pointer'
              onClick={() => navigate('/explore-data')}
              aria-label='Navigate to explore seismic events page'
            >
              Explore Seismic Events
            </button>
          </div>
        </div>

        {/* Image Hero */}
        <div 
          className='flex justify-center items-center'
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: "1000px" }}
        >
          <img
            src={JsonApi2}
            alt='Image json api postman'
            style={{ transform: transformStyle }}
           className='border border-gray-600 p-2 rounded-2xl w-full max-w-[640px] h-auto shadow-2xl filter brightness-120 contrast-160 transition-transform duration-200 ease-out'
          />
        </div>
      </div>
    </section>
  );
}
