import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div
      className="fixed top-0 left-0 h-full w-[15%] bg-white flex flex-col items-center py-4 transition-all duration-300 z-50"
    >
      {/* Logo */}
      <div className="mt-2 mb-8 flex justify-center">
        <img
          src="/logo_payment.png"
          alt="Logo"
          className="w-32 h-32 rounded-full border-2 border-gray-300"
        />
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-6">
        <NavLink
          to="/students"
          className={({ isActive }) =>
            `text-lg flex items-center ${isActive ? "text-blue-500 font-bold" : "text-gray-700 hover:text-gray-500"
            } transition duration-300`
          }
        >
          <span className="ml-2">Students</span>
        </NavLink>
        <NavLink
          to="/teachers"
          className={({ isActive }) =>
            `text-lg flex items-center ${isActive ? "text-blue-500 font-bold" : "text-gray-700 hover:text-gray-500"
            } transition duration-300`
          }
        >
          <span className="ml-2">Teachers</span>
        </NavLink>
        <NavLink
          to="/classes"
          className={({ isActive }) =>
            `text-lg flex items-center ${isActive ? "text-blue-500 font-bold" : "text-gray-700 hover:text-gray-500"
            } transition duration-300`
          }
        >
          <span className="ml-2">Classes</span>
        </NavLink>
        <NavLink
          to="/subjects"
          className={({ isActive }) =>
            `text-lg flex items-center ${isActive ? "text-blue-500 font-bold" : "text-gray-700 hover:text-gray-500"
            } transition duration-300`
          }
        >
          <span className="ml-2">Subjects</span>
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="mt-auto">
        <NavLink
          to="/logout"
          className={({ isActive }) =>
            `text-lg flex items-center ${isActive ? "text-blue-500 font-bold" : "text-gray-700 hover:text-gray-500"
            } transition duration-300`
          }
        >
          <span className="material-icons">logout</span>
          <span className="ml-2">Logout</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;