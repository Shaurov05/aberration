import React from "react";
import Icon_car from "../assets/icons/Icon_car.svg";
import "../style/LoginPage.css";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/");
  };

  return (
    <div className="p-6 flex bg-[#4e54c8] h-[8%] w-full items-center">
      <div className="flex flex-1 items-center">
        <div
          className="w-6 h-8 cursor-pointer"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          <img className="w-full" src={Icon_car} alt="logo" />
        </div>
        <p
          className="font-semibold text-xl text-white ml-5 tracking-tighter cursor-pointer"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          Auto Nexus
        </p>
      </div>
      <div className="flex flex-1 justify-end gap-6">
        <button
          className="cursor-pointer h-9 text-white font-medium text-lg leading-5"
          onClick={() => {
            navigate("/user-management");
          }}
        >
          User management
        </button>
        <button
          className="cursor-pointer h-9 text-white font-medium text-lg leading-5"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Header;
