import JsonApi1 from '../../assets/images/json-api-1.png'
import JsonApi2 from '../../assets/images/json-api-2.png'

export default function Hero() {
  return (
    <section className='relative w-full min-h-screen flex flex-col justify-center items-center text-center px-6 py-20 bg-gradient-to-b text-white'>
      {/* Sfondo decorativo opzionale */}
      <div className='absolute inset-0 bg-noise opacity-10 z-0'></div>

      {/* Contenuto */}
      <div className='flex-col md:flex-row justify-center items-center'>
        <div className='flex-2 relative z-10 max-w-3xl'>
          <h1 className='text-4xl md:text-7xl font-extrabold leading-tight'>
            Practice with Real Seismic Data
          </h1>
          <p className='mt-6 text-lg md:text-xl text-gray-300'>
            A training and experimentation environment powered by real seismic
            events from official sources. Perfect for students, developers, and
            technicians looking to learn by working with real-world data.
          </p>

          <div className='mt-10 flex flex-col sm:flex-row justify-center gap-4'>
            <button className='bg-purple-600 hover:bg-purple-800 transition-colors duration-300 text-white font-semibold py-3 px-8 rounded-full cursor-pointer'>
              Get Started
            </button>
            <button className='border border-white hover:bg-white hover:text-black transition-colors duration-300 text-white font-semibold py-3 px-8 rounded-full cursor-pointer'>
              Explore Seismic Events
            </button>
          </div>
        </div>
        <div className="mx-auto md:w-auto md:h-auto lg:w-[860px] lg:h-[400px] rounded-2xl mt-[36px]">
          <img
            src={JsonApi2}
            alt="Image json api postman"
            className="rounded-2xl md:w-auto md-h-auto lg:w-[860px] lg:h-[400px] shadow-2xl filter brightness-120 contrast-160"
          />
        </div>

      </div>
    </section>
  );
}
