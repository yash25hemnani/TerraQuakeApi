export default function Info() {
  return (
    <section className='relative z-30 w-full min-h-[600px] flex flex-col justify-center items-center text-center px-6 py-20 bg-gradient-to-b text-white'>
      <div>
        <h2 className='text-3xl md:text-6xl md:w-full mx-auto'>
          Introduction to TerraQuake API
        </h2>
        <p className='sm:text-sm md:text-xl mt-[56px] md:w-full mx-auto'>
          Earthquakes are natural phenomena caused by a sudden release of energy
          in the Earth's crust, generating seismic waves. Understanding and
          monitoring them is crucial for risk management and scientific
          research. TerraQuake API is designed to provide reliable and
          accessible earthquake data through a modern and developer-friendly
          interface. Here's what you can do with it:
        </p>
        <div className='relative z-35 flex flex-col md:flex-col lg:flex-row justify-center mt-[50px] gap-5'>
          <div className='md:m-auto lg:m-5 w-full sm:w-auto md:w-auto lg:w-[320px] rounded-3xl bg-gradient-to-br from-white/5 to-violet-950/10 shadow-lg hover:shadow-xl transition-transform duration-500 p-6 border border-white/10 backdrop-blur-sm scale-95 hover:scale-100 ease-in-out'>
            <h2 className='text-white text-2xl lg:text-2xl font-semibold text-center tracking-wide mb-4'>
              Event Details
            </h2>
            <p className='text-slate-300 text-lg lg:text-base min-h-[150px] mt-[36px] leading-relaxed text-center'>
              Access comprehensive information about seismic events, including
              magnitude, depth, coordinates, time, and location.
            </p>
            <div className='mt-6 flex justify-center'>
              <button className='bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-6 rounded-xl text-sm lg:text-base transition-colors duration-200 cursor-pointer'>
                View Events
              </button>
            </div>
          </div>

          <div className='relative z-35 md:m-auto lg:m-5 w-full sm:w-auto md:w-auto lg:w-[320px] rounded-3xl bg-gradient-to-br from-white/5 to-violet-950/10 shadow-lg hover:shadow-xl transition-transform duration-300 p-6 border border-white/10 backdrop-blur-sm scale-95 hover:scale-100 ease-in-out'>
            <h2 className='text-white text-2xl lg:text-2xl font-semibold text-center tracking-wide mb-4'>
              Advanced Filtering
            </h2>
            <p className='text-slate-300 text-lg lg:text-base min-h-[150px] mt-[36px] leading-relaxed text-center'>
              Query earthquakes by time range, location, magnitude interval, and
              distance radius to get exactly the data you need.
            </p>
            <div className='mt-6 flex justify-center'>
              <button className='bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-6 rounded-xl text-sm lg:text-base transition-colors duration-200 cursor-pointer'>
                View Events
              </button>
            </div>
          </div>

          <div className='relative z-35 md:m-auto lg:m-5 w-full sm:w-auto md:w-auto lg:w-[320px] rounded-3xl bg-gradient-to-br from-white/5 to-violet-950/10 shadow-lg hover:shadow-xl transition-transform duration-300 p-6 border border-white/10 backdrop-blur-sm scale-95 hover:scale-100 ease-in-out'>
            <h2 className='text-white text-2xl lg:text-2xl font-semibold text-center tracking-wide mb-4'>
              Statistical Insights
            </h2>
            <p className='text-slate-300 text-lg lg:text-base min-h-[150px] mt-[36px] leading-relaxed text-center'>
              Generate customized statistics and summaries to analyze seismic
              activity over time or in specific regions.
            </p>
            <div className='mt-6 flex justify-center'>
              <button className='bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-6 rounded-xl text-sm lg:text-base transition-colors duration-200 cursor-pointer'>
                View Events
              </button>
            </div>
          </div>

          <div className='relative z-35 md:m-auto lg:m-5 w-full sm:w-auto md:w-auto lg:w-[320px] rounded-3xl bg-gradient-to-br from-white/5 to-violet-950/10 shadow-lg hover:shadow-xl transition-transform duration-300 p-6 border border-white/10 backdrop-blur-sm scale-95 hover:scale-100 ease-in-out'>
            <h2 className='text-white text-2xl lg:text-2xl font-semibold text-center tracking-wide mb-4'>
              Easy Integration
            </h2>
            <p className='text-slate-300 text-lg lg:text-base min-h-[150px] mt-[36px] leading-relaxed text-center'>
              Seamlessly integrate earthquake data into dashboards, monitoring
              tools, GIS platforms, mobile apps, or educational projects.
            </p>
            <div className='mt-6 flex justify-center'>
              <button className='bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-6 rounded-xl text-sm lg:text-base transition-colors duration-200 cursor-pointer'>
                View Events
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
