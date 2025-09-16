export default function Info() {
	return (
		<section className="w-3/4 mx-auto min-h-[600px] flex flex-col justify-center items-center text-center px-6 py-20 bg-gradient-to-b text-white">
			<div className="w-full">
				<h2 className="text-3xl md:text-6xl">Introduction to TerraQuake API</h2>
				<p className="sm:text-sm md:text-xl mt-[56px] mx-auto">Earthquakes are natural phenomena caused by a sudden release of energy in the Earth's crust, generating seismic waves. Understanding and monitoring them is crucial for risk management and scientific research. TerraQuake API is designed to provide reliable and accessible earthquake data through a modern and developer-friendly interface.</p>
				<p className="sm:text-sm md:text-xl mt-[56px] mx-auto">Here's what you can do with it:</p>
				<div className="flex flex-col lg:flex-row justify-center mt-20 gap-1">
					<div className="flex flex-col justify-between md:m-auto min-h-[30rem] lg:m-5 w-full rounded-3xl bg-gradient-to-br from-white/5 to-violet-950/10 shadow-lg hover:shadow-xl transition-transform duration-500 p-6 border border-white/10 backdrop-blur-sm scale-95 hover:scale-100 ease-in-out">
						<h2 className="text-white text-2xl lg:text-2xl font-semibold text-center tracking-wide">Event Details</h2>
						<p className="text-slate-300 text-lg lg:text-base leading-relaxed text-center">Access comprehensive information about seismic events, including magnitude, depth, coordinates, time, and location.</p>
						<button className="bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-6 rounded-xl text-sm lg:text-base transition-colors duration-200 cursor-pointer">View Events</button>
					</div>

					<div className="flex flex-col justify-between md:m-auto min-h-[30rem] lg:m-5 w-full rounded-3xl bg-gradient-to-br from-white/5 to-violet-950/10 shadow-lg hover:shadow-xl transition-transform duration-500 p-6 border border-white/10 backdrop-blur-sm scale-95 hover:scale-100 ease-in-out">
						<h2 className="text-white text-2xl lg:text-2xl font-semibold text-center tracking-wide">Advanced Filtering</h2>
						<p className="text-slate-300 text-lg lg:text-base leading-relaxed text-center">Query earthquakes by time range, location, magnitude interval, and distance radius to get exactly the data you need.</p>
						<button className="bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-6 rounded-xl text-sm lg:text-base transition-colors duration-200 cursor-pointer">View Events</button>
					</div>

					<div className="flex flex-col justify-between md:m-auto min-h-[30rem] lg:m-5 w-full rounded-3xl bg-gradient-to-br from-white/5 to-violet-950/10 shadow-lg hover:shadow-xl transition-transform duration-500 p-6 border border-white/10 backdrop-blur-sm scale-95 hover:scale-100 ease-in-out">
						<h2 className="text-white text-2xl lg:text-2xl font-semibold text-center tracking-wide">Statistical Insights</h2>
						<p className="text-slate-300 text-lg lg:text-base leading-relaxed text-center">Generate customized statistics and summaries to analyze seismic activity over time or in specific regions.</p>
						<button className="bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-6 rounded-xl text-sm lg:text-base transition-colors duration-200 cursor-pointer">View Events</button>
					</div>

					<div className="flex flex-col justify-between md:m-auto min-h-[30rem] lg:m-5 w-full rounded-3xl bg-gradient-to-br from-white/5 to-violet-950/10 shadow-lg hover:shadow-xl transition-transform duration-500 p-6 border border-white/10 backdrop-blur-sm scale-95 hover:scale-100 ease-in-out">
						<h2 className="text-white text-2xl lg:text-2xl font-semibold text-center tracking-wide">Easy Integration</h2>
						<p className="text-slate-300 text-lg lg:text-base leading-relaxed text-center">Seamlessly integrate earthquake data into dashboards, monitoring tools, GIS platforms, mobile apps, or educational projects.</p>
						<button className="bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-6 rounded-xl text-sm lg:text-base transition-colors duration-200 cursor-pointer">View Events</button>
					</div>
				</div>
			</div>
		</section>
	);
}

