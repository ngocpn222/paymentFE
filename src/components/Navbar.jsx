import React, { useState } from "react";

const Navbar = ({ onToggle }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleNavbar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    onToggle(newState); // Thông báo trạng thái thu gọn
  };

  return (
    <>
      {/* Navbar */}
      <div
        className={`fixed top-0 ${
          isCollapsed ? "left-[-100%]" : "left-0"
        } h-screen w-[15%] bg-gradient-to-b from-red-500 to-orange-500 flex flex-col items-center py-4 transition-all duration-300`}
      >
        {/* Close Button */}
        <button
          onClick={toggleNavbar}
          className="absolute top-4 right-4 bg-white text-red-500 rounded-full p-2 shadow-lg hover:bg-gray-200 transition"
        >
          <span className="material-icons">chevron_left</span>
        </button>

        {/* Logo */}
        <div className="mb-8">
          <img
            src="https://via.placeholder.com/80"
            alt="Logo"
            className="rounded-full border-2 border-white"
          />
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-6">
          <a
            href="#"
            className="text-white text-lg hover:text-gray-200 transition duration-300 flex items-center"
          >
            <span className="material-icons">home</span>
            <span className="ml-2">Home</span>
          </a>
          <a
            href="#"
            className="text-white text-lg hover:text-gray-200 transition duration-300 flex items-center"
          >
            <span className="material-icons">inbox</span>
            <span className="ml-2">Inbox</span>
          </a>
          <a
            href="#"
            className="text-white text-lg hover:text-gray-200 transition duration-300 flex items-center"
          >
            <span className="material-icons">calendar_today</span>
            <span className="ml-2">Calendar</span>
          </a>
          <a
            href="#"
            className="text-white text-lg hover:text-gray-200 transition duration-300 flex items-center"
          >
            <span className="material-icons">settings</span>
            <span className="ml-2">Settings</span>
          </a>
        </nav>

        {/* Footer */}
        <div className="mt-auto">
          <a
            href="#"
            className="text-white text-lg hover:text-gray-200 transition duration-300 flex items-center"
          >
            <span className="material-icons">logout</span>
            <span className="ml-2">Logout</span>
          </a>
        </div>
      </div>

      {/* Open Button */}
      {isCollapsed && (
        <button
          onClick={toggleNavbar}
          className="fixed top-4 left-4 bg-white text-red-500 rounded-full p-2 shadow-lg hover:bg-gray-200 transition"
        >
          <span className="material-icons">menu</span>
        </button>
      )}
    </>
  );
};

export default Navbar;