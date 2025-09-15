import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "../../config/axios.js";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function SignUp() {
	const signUpSchema = yup
		.object({
			name: yup
				.string()
				.required("Name is required!"),

			email: yup
				.string()
				.email("Invalid email!")
				.required("Email is required!"),

			password: yup
  			.string()
  			.required("Password is required!")
  			.min(8, "Password must be at least 8 characters!")
  			.matches(/^[A-Z]/, "Password must start with an uppercase letter!")
  			.matches(/[^A-Za-z0-9]/, "Password must contain at least one special character!"),

			confirmPassword: yup
				.string()
				.required("Please confirm your password!")
				.oneOf([yup.ref("password")], "Passwords must match!")
		})
		.required();

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({ resolver: yupResolver(signUpSchema) });


	let navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);

	const togglePassword = () => setShowPassword((prev) => !prev);

  const handleSignUp = (data) => {
		const formData = {
			name: data.name,
			email: data.email,
			password: data.password,
			role: "user"
		};
		axios
			.post("/auth/signup", formData)
			.then((res) => {
				Swal.fire({
					title: "Success!",
					text: "User Registered Successfully!",
					icon: "success",
					confirmButtonText: "Log In"
				}).then((result) => {
					navigate("/signin");
				});
			})
      .catch((err) => {
				Swal.fire({
					title: "Error!",
					text: `${err.response.data.message}`,
					icon: "error",
					confirmButtonText: "OK"
				}).then((result) => {
					navigate("/signup");
				});
			});
	};

	return (
		<section className="min-h-screen flex items-center justify-center p-6 rounded-lg">
			<div className="p-8 rounded-lg w-full max-w-md">
				<h2 className="text-3xl text-center text-pink-600 font-bold mb-6">Sign Up</h2>
				<form onSubmit={handleSubmit(handleSignUp)}>
					<div className="mb-8">
						<label className="block text-white text-sm font-semibold mb-2">Name</label>
						<input className="w-full px-3 py-2 border rounded-2xl text-white focus:border-purple-600 focus:outline-none" name="name" autoComplete="off" {...register("name")} />
						<p className="text-red-600 pt-1">{errors.name?.message}</p>
					</div>
					<div className="mb-6">
						<label className="block text-white text-sm font-semibold mb-2">Email</label>
						<input className="w-full px-3 py-2 border rounded-2xl text-white focus:border-purple-600 focus:outline-none" name="email" autoComplete="off" {...register("email")} />
						<p className="text-red-600 pt-1">{errors.email?.message}</p>
					</div>
					<div className="relative mb-6">
						<label className="block text-white text-sm font-semibold mb-2">Password</label>
						<input className="w-full px-3 py-2 border rounded-2xl text-white focus:border-purple-600 focus:outline-none" name="password" autoComplete="off" {...register("password")} type={showPassword ? "text" : "password"} />
						<p className="text-red-600 pt-1">{errors.password?.message}</p>
						<button type="button" onClick={togglePassword} className="absolute top-10 right-3 text-gray-800 hover:text-purple-600 cursor-pointer">
							{showPassword ? <FaEyeSlash /> : <FaEye />}
						</button>

						<div className="my-6">
							<label className="block text-white text-sm font-semibold mb-2">Confirm Password</label>
							<input className="w-full px-3 py-2 border rounded-2xl text-white focus:border-purple-600 focus:outline-none" name="confirmPassword" autoComplete="off" {...register("confirmPassword")} type={showPassword ? "text" : "password"} />
							<p className="text-red-600 pt-1">{errors.confirmPassword?.message}</p>
						</div>
					</div>
					<button className="w-full bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-2xl transition duration-300 cursor-pointer" type="submit">
						Create your account
          </button>
          
          <div className="mt-6 flex flex-col items-center">
            <p className="text-white cursor-default">Already have an account?</p>
            <Link className="mt-4 text-white hover:text-pink-600 focus:text-pink-600 duration-300 ease-in-out" to="/signin">Sign in</Link>
          </div>
				</form>
			</div>
		</section>
	);
}
