import React, { useState, useEffect } from "react";
import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra token trong localStorage để xác định trạng thái đăng nhập
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      // Lấy email từ localStorage
      const storedEmail = localStorage.getItem("email") || "Người dùng";
      setEmail(storedEmail);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const toggleUserMenu = () => {
    setIsUserMenuOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    // Xóa token và email khỏi localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setIsLoggedIn(false);
    navigate("/login"); // Điều hướng về trang đăng nhập
  };

  const handleLogin = () => {
    navigate("/login"); // Điều hướng đến trang đăng nhập
  };

  return (
    <header className="fixed top-0 left-[15%] w-[85%] h-14 bg-white shadow-md z-40">
      <div className="max-w-full h-full flex items-center justify-between px-6">
        {/* Search Bar */}
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-1/3">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none w-full"
          />
        </div>

        {/* Notification and User */}
        <div className="flex items-center space-x-4">
          {/* Notification Icon */}
          <button className="relative">
            <FaBell className="text-gray-500 text-xl hover:text-red-500 transition" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>

          {/* Greeting */}
          {isLoggedIn && (
            <div className="text-gray-700 text-lg font-semibold">
              Xin chào, {email}!
            </div>
          )}

          {/* User Icon */}
          <div className="relative">
            <button onClick={toggleUserMenu}>
              <FaUserCircle className="text-gray-500 text-2xl hover:text-red-500 transition" />
            </button>

            {/* User Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-40">
                <ul className="flex flex-col">
                  {isLoggedIn ? (
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={handleLogout}
                    >
                      Đăng xuất
                    </li>
                  ) : (
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={handleLogin}
                    >
                      Đăng nhập
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;