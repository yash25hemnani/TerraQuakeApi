import { useNavigate } from "react-router-dom";
import JsonApi2 from "@images/json-api-2.png";

export default function Hero() {
	const navigate = useNavigate();

	return (
		<section className="relative z-30 w-full min-h-screen flex flex-col justify-center items-center text-center px-6 py-20 bg-gradient-to-b text-white">
			{/* Contenuto */}
			<div className="flex-col md:flex-row justify-center items-center">
				<div className="flex flex-col">
					<h1 className="lg:w-3xl text-4xl mx-auto md:text-7xl font-extrabold leading-tight mt-[50px]">Practice with Real Seismic Data</h1>
					<p className="lg:w-3xl mt-6 text-lg mx-auto md:text-xl text-gray-300">A training and experimentation environment powered by real seismic events from official sources. Perfect for students, developers, and technicians looking to learn by working with real-world data.</p>

					<div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
						<button className="relative z-30 bg-purple-600 hover:bg-purple-800 transition-colors duration-300 text-white font-semibold py-3 px-8 rounded-full cursor-pointer" onClick={() => navigate("/signup")}>
							Sign Up
						</button>
						<button className="relative z-30 border border-white hover:bg-white hover:text-black transition-colors duration-300 text-white font-semibold py-3 px-8 rounded-full cursor-pointer" onClick={() => navigate("/explore-data")}>
							Explore Seismic Events
						</button>
					</div>
				</div>
				<div className="mx-auto md:w-auto md:h-auto lg:w-[860px] lg:h-[400px] rounded-2xl mt-[60px]">
					<img src={JsonApi2} alt="Image json api postman" className="border border-gray-600 p-2 rounded-2xl md:w-auto md-h-auto lg:w-[860px] lg:h-[400px] shadow-2xl filter brightness-120 contrast-160" />
				</div>
			</div>
		</section>
	);
}
