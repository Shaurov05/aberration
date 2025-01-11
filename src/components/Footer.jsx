import React from "react";

const Footer = () => {
  return (
    <div className="h-[5%] flex bg-[#4e54c8] items-center justify-between p-3">
      <div className="text-base">
        <p className="text-white">© 2023 Aberration Auto</p>
      </div>
      <div className="flex justify-end text-base gap-3">
        <a href="/#" className="text-white">
          Privacy Policy
        </a>
        <a href="/#" className="text-white">
          Terms of Service
        </a>
      </div>
    </div>
  );
};

export default Footer;
