import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navbar */}
      <NavBar />

      {/* Main content below navbar */}
      <main className="flex-grow p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
