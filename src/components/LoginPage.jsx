import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/LoginPage.css";
import { login } from "../api";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  const validateLoginCredentials = (email, password) => {
    if (!email || !password) {
      setError("Email and password are required.");
      return false;
    }
    if (!validateEmail(email)) {
      setError("Invalid email provided.");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    setError("");
    setIsLoading(true);

    if (!validateLoginCredentials(email, password)) {
      setIsLoading(false);
      return;
    }

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center h-screen items-center form-container">
      <div className="bg-[#a9a9a9] px-8 rounded-3xl h-[75%] w-[35%] shadow-[2px_2px_4px _gba(255, 255, 255, 0.1)]">
        <p className="text-[#030303] text-4xl leading-[54px] font-semibold mt-[64px]">
          Auto Nexus
        </p>
        <div className="form-container flex gap-4 flex-col mt-8">
          <div className="w-full">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="bg-[#4e54c8] w-full h-14 border-0 px-2 text-[#94a3b8] font-light text-lg leading-[56px] outline-0 rounded-3xl"
            />
          </div>
          <div className="w-full">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="bg-[#4e54c8] w-full h-14 border-0 px-2 text-[#94a3b8] font-light text-lg leading-[56px] outline-0 rounded-3xl"
            />
          </div>
        </div>
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        <p
          className="text text-[#5a5959] text-lg font-light cursor-pointer mt-2"
          onClick={() => {
            console.log("forgot password click");
          }}
        >
          Forgot password?
        </p>
        <button
          className={`login-btn mt-8 ${
            isLoading ? "opacity-50 !cursor-not-allowed" : ""
          }`}
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Log In"}
        </button>
        <p className="text text-[#5a5959] text-lg font-light pt-4 pb-2">
          Don't have an account?
        </p>
        <button
          className="signup-btn"
          onClick={() => {
            navigate("/users/add");
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
