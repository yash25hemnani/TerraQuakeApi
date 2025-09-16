import { useState, useContext } from "react";
import Sismic from "@images/tracciato.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from "@components/modules/context";
import Swal from "sweetalert2";

export default function NavbarMenu() {
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);
	const { userLogin, isLoggedIn, setIsLoggedIn, setUserLogin } = useContext(Context);

	const listItems = [
		{ name: "Home", path: "/" },
		{ name: "Explore Data", path: "/explore-data" },
		{ name: "API Access", path: "/api-access" },
		{ name: "Docs", path: "/docs" },
		{ name: "Use Cases", path: "/use-cases" },
		{ name: "About", path: "/about" }
	];

	const handleLogout = () => {
		setUserLogin({});
		setIsLoggedIn(false);
		localStorage.removeItem("user");
		localStorage.removeItem("token");
		Swal.fire({
			title: "Success!",
			text: "Logged Out Successfully!",
			icon: "success",
			confirmButtonText: "Okay"
		}).then((result) => {
			navigate("/");
		});
	};

	return (
		<header className="fixed w-full backdrop-blur-2xl bg-opacity-60 text-white shadow-lg py-4 px-6 flex items-center justify-between lg:justify-around z-50">
			{/* Logo Start */}
			<div className="flex order-first items-center text-2xl font-bold w-fit h-12 relative">
				<img src={Sismic} alt="Logo" className="absolute z-20 w-38 h-20 opacity-40" />
				<span className="text-white z-30">TerraQuake</span>
			</div>
			{/* Logo End */}

			{/* Menu Start */}
			<nav className="hidden lg:flex justify-center gap-8 text-[14px] lg:text-[16px]">
				{listItems.map((item) => (
					<NavLink key={item.name} to={item.path} className={({ isActive }) => `hover:text-purple-400 ${isActive ? "text-purple-400 font-semibold border-b-2 border-purple-500" : "text-gray-300"}`}>
						{item.name}
					</NavLink>
				))}
			</nav>

			<div className="hidden lg:flex items-center gap-4 text-[14px] lg:text-[16px]">
				{isLoggedIn ? (
					<>
						<img src={userLogin.avatarUrl || "https://wallpapers.com/images/hd/default-user-profile-icon-0udyg8f0x3b3qqbw.png"} alt="avatar" className="w-8 h-8 rounded-full" />
						<span>{userLogin.name}</span>
						<button onClick={handleLogout} className="font-semibold border-purple-500 hover:border-b-2 hover:text-purple-400">
							Logout
						</button>
					</>
				) : (
					<>
						<button className="border border-white hover:bg-white hover:text-black transition-colors duration-300 text-white font-semibold py-2 px-6 rounded-2xl cursor-pointer" onClick={() => navigate("/signin")}>
							Sign In
						</button>
						<button className="bg-purple-600 hover:bg-purple-800 py-2 px-6 rounded-2xl transition-colors duration-200 cursor-pointer" onClick={() => navigate("/signup")}>
							Sign Up
						</button>
					</>
				)}
			</div>
			{/* Menu End */}

			{/* Hamburger (only on < lg) */}
			<button onClick={() => setIsOpen(!isOpen)} className="lg:hidden flex items-center relative w-6 h-6" aria-label="Toggle menu">
				<div className={`w-full h-full transition-transform duration-500 ease-in-out ${isOpen ? "rotate-[360deg]" : "rotate-0"}`}>
					<FaBars className={`absolute inset-0 w-full h-full transition-opacity duration-200 ease-in-out ${isOpen ? "opacity-0" : "opacity-100"}`} />
					<FaTimes className={`absolute inset-0 w-full h-full transition-opacity duration-200 ease-in-out ${isOpen ? "opacity-100" : "opacity-0"}`} />
				</div>
			</button>

			{/* === Mobile Dropdown === */}
			<div className={`lg:hidden absolute top-full left-0 w-full bg-[#090414] text-white overflow-hidden transition-all duration-500 ease-in-out px-6 z-40 rounded-b-xl ${isOpen ? "max-h-[500px] opacity-100 pointer-events-auto py-6" : "max-h-0 opacity-0 pointer-events-none py-0"}`}>
				{/* Mobile Nav Links */}
				<div className="flex flex-col items-center gap-4 text-xl mb-4">
					{listItems.map((item) => (
						<NavLink
							key={item.name}
							to={item.path}
							onClick={() => setIsOpen(false)} // Close menu on click
							className={({ isActive }) => `hover:text-purple-400 ${isActive ? "text-purple-400 font-semibold border-b-2 border-purple-500" : "text-gray-300"}`}>
							{item.name}
						</NavLink>
					))}
				</div>

				{/* Mobile Auth Section */}
				{isLoggedIn ? (
					<div className="flex items-center gap-3">
						<img src={userLogin.avatarUrl || "https://wallpapers.com/images/hd/default-user-profile-icon-0udyg8f0x3b3qqbw.png"} alt="avatar" className="w-8 h-8 rounded-full" />
						<span>{userLogin.name}</span>
						<button type="button" onClick={handleLogout} className="font-semibold border-purple-500 hover:border-b-2 hover:text-purple-400">
							Logout
						</button>
					</div>
				) : (
					<div className="flex flex-col gap-4">
						<button
							className="border border-white hover:bg-white hover:text-black transition-colors duration-300 text-white font-semibold py-2 px-6 rounded-2xl"
							onClick={() => {
								navigate("/signin");
								setIsOpen(false);
							}}>
							Sign In
						</button>
						<button
							className="bg-purple-600 hover:bg-purple-800 py-2 px-6 rounded-2xl transition-colors duration-200"
							onClick={() => {
								navigate("/signup");
								setIsOpen(false);
							}}>
							Sign Up
						</button>
					</div>
				)}
			</div>
		</header>
	);
}
