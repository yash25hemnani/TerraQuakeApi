import { useState, useContext } from "react";
import Sismic from "../../assets/images/tracciato.png";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from "../../components/modules/context";
import Swal from "sweetalert2";

export default function NavbarMenu() {
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);
	const { userLogin, isLoggedIn, setIsLoggedIn, setUserLogin } = useContext(Context);

	const listItems = [
		{ name: "Home", path: "/" },
		{ name: "Explore Data", path: "/explore-data" },
		{ name: "Api Access", path: "/api-access" },
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
		<header className="fixed w-full backdrop-blur-2xl bg-opacity-60 text-white shadow-lg rounded-full py-4 flex justify-around items-center z-50">
			{/* Logo */}
			<div className="relative flex justify-center items-center text-3xl font-bold w-fit h-12">
				{/* Logo sovrapposto */}
				<img src={Sismic} alt="Tracciato logo" className="absolute z-20 w-38 h-20 opacity-40" />
				{/* Testo sotto il logo */}
				<span className="text-white">TerraQuake</span>
			</div>

			{/* Hamburger Icon */}
			<button className="md:hidden flex items-center" onClick={() => setIsOpen(!isOpen)}>
				<svg className="w-6 h-6 transition-transform duration-200 ease-in-out" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					{isOpen ? (
						// Icona X
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" className="transition-transform duration-200 ease-in-out" />
					) : (
						// Icona Hamburger
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" className="transition-transform duration-200 ease-in-out" />
					)}
				</svg>
			</button>

			{/* Menu Items */}
			<div className={`${isOpen ? "flex pointer-events-auto" : "hidden pointer-events-auto"} absolute z-40 md:static top-full left-0 w-full md:w-auto md:flex flex-col md:flex-row items-center gap-4 md:gap-8 py-6 md:py-0 rounded-xl md:rounded-none bg-[#090414] md:bg-transparent text-xl transition-all duration-300 ease-in-out`}>
				{listItems.map((item) => (
					<NavLink key={item.name} to={item.path} className={({ isActive }) => `md:text-[14px] lg:text-[16px] hover:text-purple-400 ${isActive ? "text-purple-400 font-semibold border-b-2 border-purple-500" : "text-gray-300"})`}>
						{item.name}
					</NavLink>
				))}
			</div>

			{/* Button */}
			{isLoggedIn ? (
				<div className="flex items-center gap-3">
					<img src={userLogin.avatarUrl || "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapers.com%2Fimages%2Fhd%2Fdefault-user-profile-icon-0udyg8f0x3b3qqbw.png&f=1&nofb=1&ipt=0566797b142159117e66e6ab7bdb19bcad93e634c9d7568d0016e92d0b300b39"} alt="avatar" className="w-8 h-8 rounded-full" />
					<span>{userLogin.name}</span>
					<button type="button" onClick={handleLogout} className="md:text-[14px] lg:text-[16px] font-semibold border-purple-500 hover:cursor-pointer hover:border-b-2 hover:text-purple-400">
						Logout
					</button>
				</div>
			) : (
				<div className="hidden flex gap-4">
					<button className="hidden lg:block border border-white hover:bg-white hover:text-black transition-colors duration-300 text-white font-semibold py-2 px-6 rounded-2xl md:text-[14px] lg:text-[16px] cursor-pointer" onClick={() => navigate("/signin")}>
						Sign In
					</button>
					<button className="hidden lg:block bg-purple-600 hover:bg-purple-800 py-2 px-6 rounded-2xl md:text-[14px] lg:text-[16px] transition-colors duration-200 cursor-pointer" onClick={() => navigate("/signup")}>
						Sign Up
					</button>
				</div>
			)}
		</header>
	);
}
