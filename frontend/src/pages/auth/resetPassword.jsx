import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "@config/axios.js";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// NOTE: No SEO here, as we want to hide this page from users

export default function resetPassword() {
	const [showPassword, setShowPassword] = useState(false);
	const togglePassword = () => setShowPassword((prev) => !prev);

	const resetPasswordSchema = yup
		.object()
		.shape({
			password: yup.string().required("Password is required !").min(8, "Password must be at least 8 characters !").matches(/[A-Z]/, "Must contain an uppercase letter !").matches(/\d/, "Must contain a number !"),

			confirmPassword: yup
				.string()
				.required("Please confirm your password !")
				.oneOf([yup.ref("password")], "Passwords must match !")
		})
		.required();

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({ resolver: yupResolver(resetPasswordSchema) });

	let navigate = useNavigate();

	const handleForgotPassword = (data) => {
		const formData = {
			email: localStorage.getItem("passwordChangeRequestingEmail"),
			password: data.password
		};
		axios
			.post("/auth/reset-password", formData)
			.then((res) => {
				console.log("Hi");
				console.log(res);
				Swal.fire({
					title: "Success!",
					text: "Your password has been successfully reset! Please sign in again",
					icon: "success",
					allowOutsideClick: false,
					allowEscapeKey: false,
					confirmButtonText: "Okay"
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
			<div className="p-8 flex flex-col items-center justify-between h-[40rem] rounded-lg w-full">
				<h2 className="text-3xl text-center text-pink-600 font-bold">Reset Password</h2>
				<form onSubmit={handleSubmit(handleForgotPassword)}>
					<div className="relative mb-6">
						<label className="block text-white text-sm font-semibold mb-2">New Password</label>
						<input className="w-full px-3 py-2 border rounded-2xl text-white focus:border-purple-600 focus:outline-none" name="password" autoComplete="off" {...register("password")} type={showPassword ? "text" : "password"} />
						<p className="text-red-600 pt-1">{errors.password?.message}</p>
						<button type="button" onClick={togglePassword} className="absolute top-10 right-3 text-gray-300 hover:text-purple-600 cursor-pointer">
							{showPassword ? <FaEyeSlash /> : <FaEye />}
						</button>

						<div className="my-6">
							<label className="block text-white text-sm font-semibold mb-2">Confirm Password</label>
							<input className="w-full px-3 py-2 border rounded-2xl text-white focus:border-purple-600 focus:outline-none" name="password" autoComplete="off" {...register("confirmPassword")} type={showPassword ? "text" : "password"} />
							<p className="text-red-600 pt-1">{errors.confirmPassword?.message}</p>
						</div>
					</div>

					<button className="w-full bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-2xl transition duration-300 cursor-pointer" type="submit">
						Reset
					</button>
				</form>
				<Link className="mt-4 capitalize text-white hover:text-pink-600 focus:text-pink-600 duration-300 ease-in-out" to="/">
					Go Home
				</Link>
			</div>
		</section>
	);
}
