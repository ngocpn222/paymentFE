import React, { useState } from "react";
import Navbar from "./Navbar";

const Home = () => {
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);

  const handleNavbarToggle = (collapsed) => {
    setIsNavbarCollapsed(collapsed);
  };

  return (
    <div className="flex h-screen">
      {/* Navbar */}
      <Navbar onToggle={handleNavbarToggle} />

      {/* Main Content */}
      <main
        className={`flex-1 bg-white p-8 transition-all duration-300 ${
          isNavbarCollapsed ? "ml-0" : "ml-[15%]"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Priority 1</h1>
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
            Add Task
          </button>
        </div>
        <ul className="space-y-4">
          <li className="flex items-center space-x-4">
            <input type="checkbox" className="w-5 h-5 text-red-500" />
            <span className="text-gray-700">10K Run 5 kilometers</span>
          </li>
          <li className="flex items-center space-x-4">
            <input type="checkbox" className="w-5 h-5 text-red-500" />
            <span className="text-gray-700">
              Check in with Roxanne RE: sponsorship opportunity
            </span>
          </li>
          <li className="flex items-center space-x-4">
            <input type="checkbox" className="w-5 h-5 text-red-500" />
            <span className="text-gray-700">
              Turn on Time Off & Out of Office auto reply
            </span>
          </li>
          <li className="flex items-center space-x-4">
            <input type="checkbox" className="w-5 h-5 text-red-500" />
            <span className="text-gray-700">Update the family budget</span>
          </li>
        </ul>
      </main>
    </div>
  );
};

export default Home;