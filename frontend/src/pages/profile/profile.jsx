import React, { useContext } from "react";
import MetaData from "../noPage/metaData";
import { Context } from "@/components/modules/context";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { userLogin, isLoggedIn, setIsLoggedIn, setUserLogin } =
    useContext(Context);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserLogin({});
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    Swal.fire({
      title: "Success!",
      text: "Logged Out Successfully!",
      icon: "success",
      confirmButtonText: "Okay",
    }).then(() => {
      navigate("/");
    });
  };

  return (
    <>
      <MetaData title="Profile" description="Profile page of TerraQuake" />

      <section className="relative z-30 w-full flex flex-col items-center justify-center text-center px-6 py-30  to-indigo-900 text-white">
        {isLoggedIn ? (
          <div className="bg-black/30 backdrop-blur-xl shadow-2xl rounded-2xl p-10 max-w-md w-full border border-purple-500/50">
            {/* Avatar */}
            <img
              src={
                userLogin.avatarUrl ||
                "https://wallpapers.com/images/hd/default-user-profile-icon-0udyg8f0x3b3qqbw.png"
              }
              alt="avatar"
              className="w-32 h-32 rounded-full mx-auto border-2 border-pink-500 shadow-lg"
            />

            <h1 className="text-3xl font-extrabold mt-6">
              Hello, {userLogin.name || "Anonymus"}
            </h1>
            <p className="text-pink-300 text-sm mt-2">TerraQuake {userLogin.role}</p>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="mt-6 w-full py-2 px-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl font-semibold text-lg shadow-lg hover:scale-105 transform transition duration-300 cursor-pointer"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <button
              className="py-2 px-8 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-lg hover:scale-105 transition-transform cursor-pointer"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </button>
            <button
              className="py-2 px-8 rounded-xl bg-gradient-to-r from-pink-600 to-purple-700 text-white font-bold shadow-lg hover:scale-105 transition-transform cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>
        )}
      </section>
    </>
  );
}

