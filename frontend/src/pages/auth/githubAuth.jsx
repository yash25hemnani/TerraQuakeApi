import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

export default function GithubAuth() {
  const navigate = useNavigate();
  const { search } = useLocation();

  const BACKEND_URL = import.meta.env.VITE_URL_BACKEND;

  useEffect(() => {
    const params = new URLSearchParams(search);
    const token = params.get("token");
    const message = params.get("message");

    if (token) {
      localStorage.setItem("token", token);

      fetch(`${BACKEND_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((user) => {
          localStorage.setItem("user", JSON.stringify(user.user));

          Swal.fire({
            title: "Success!",
            text: message || "Login with GitHub successful!",
            icon: "success",
            confirmButtonText: "Ok",
          }).then(() => {
            navigate("/profile");
          });
        });
    } else {
      Swal.fire({
        title: "Error!",
        text: "Login with GitHub failed.",
        icon: "error",
        confirmButtonText: "Ok",
      }).then(() => {
        navigate("/signin");
      });
    }
  }, [search, navigate]);

  return <p>Logging you in with GitHub...</p>;
}
