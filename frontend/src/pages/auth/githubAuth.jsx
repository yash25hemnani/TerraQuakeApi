import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function GithubAuth() {
  const navigate = useNavigate();
  const { search } = useLocation();

  const BACKEND_URL = import.meta.env.VITE_URL_BACKEND;

  useEffect(() => {
    const params = new URLSearchParams(search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);

      fetch(`${BACKEND_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((user) => {
          localStorage.setItem("user", JSON.stringify(user.user));
          navigate("/");
        });
    } else {
      navigate("/signin");
    }
  }, [search, navigate]);

  return <p>Logging you in with GitHub...</p>;
}
