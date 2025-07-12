export default function Hero() {
  return (
    <section className='relative w-full min-h-screen flex flex-col justify-center items-center text-center px-6 py-20 bg-gradient-to-b text-white'>
      {/* Sfondo decorativo opzionale */}
      <div className='absolute inset-0 bg-noise opacity-10 z-0'></div>

      {/* Contenuto */}
      <div className='relative z-10 max-w-3xl'>
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
    </section>
  );
}
