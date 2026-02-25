import { useState } from "react";
import { api } from "../api/client";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    console.log("login click");

    const res = await api.post("/auth/login", { email, password });

    localStorage.setItem("token", res.data.token);
    navigate("/chat");
  };

  return (
    <div className="p-8">
      <h2>Login</h2>
      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button className="cursor-pointer" onClick={login}>
        Login
      </button>
      <p className="text-sm text-center">
        No account?{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => navigate("/register")}
        >
          Register
        </span>
      </p>
    </div>
  );
};

export default Login;
