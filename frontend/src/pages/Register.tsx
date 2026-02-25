import { useState } from "react";
import {api} from "../api/client";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    await api.post("/auth/register", { email, password });
    navigate("/login");
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-6 border rounded w-80 space-y-3">
        <h2 className="text-lg font-semibold">Register</h2>

        <input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border w-full p-2 rounded"
        />

        <input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border w-full p-2 rounded"
        />

        <button
          onClick={register}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Register
        </button>
      </div>
    </div>
  );
}