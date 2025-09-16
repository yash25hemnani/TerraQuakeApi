export default function Info() {
  return (
    <section className='relative z-30 w-full min-h-[600px] flex flex-col justify-center items-center text-center px-6 py-20 bg-gradient-to-b text-white'>
      <div className='w-full max-w-7xl'>
        <h2 className='text-3xl md:text-6xl mx-auto'>
          Introduction to TerraQuake API
        </h2>
        <p className='sm:text-sm md:text-xl mt-[56px] mx-auto max-w-3xl'>
          Earthquakes are natural phenomena caused by a sudden release of energy
          in the Earth's crust, generating seismic waves. Understanding and
          monitoring them is crucial for risk management and scientific
          research. TerraQuake API is designed to provide reliable and
          accessible earthquake data through a modern and developer-friendly
          interface. Here's what you can do with it:
        </p>

        {/* GRID RESPONSIVE */}
        <div className='relative z-35 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-[50px]'>
          {[
            {
              title: 'Event Details',
              text: 'Access comprehensive information about seismic events, including magnitude, depth, coordinates, time, and location.'
            },
            {
              title: 'Advanced Filtering',
              text: 'Query earthquakes by time range, location, magnitude interval, and distance radius to get exactly the data you need.'
            },
            {
              title: 'Statistical Insights',
              text: 'Generate customized statistics and summaries to analyze seismic activity over time or in specific regions.'
            },
            {
              title: 'Easy Integration',
              text: 'Seamlessly integrate earthquake data into dashboards, monitoring tools, GIS platforms, mobile apps, or educational projects.'
            }
          ].map((card, index) => (
            <div
              key={index}
              className='rounded-3xl bg-gradient-to-br from-white/5 to-violet-950/10 shadow-lg hover:shadow-xl transition-transform duration-500 p-6 border border-white/10 backdrop-blur-sm transform scale-95 hover:scale-100 ease-in-out'
            >
              <h2 className='text-white text-2xl font-semibold text-center tracking-wide mb-4'>
                {card.title}
              </h2>
              <p className='text-slate-300 text-lg lg:text-base min-h-[150px] mt-[36px] leading-relaxed text-center'>
                {card.text}
              </p>
              <div className='mt-6 flex justify-center'>
                <button className='bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-6 rounded-xl text-sm lg:text-base transition-colors duration-200 cursor-pointer'>
                  View Events
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

