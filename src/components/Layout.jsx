import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen w-screen">
      <Header />
      <main className="h-[87%] w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
