import React, { useState, useEffect } from "react";
import { FaRegBell, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // Trạng thái mở/đóng dropdown
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [notifications, setNotifications] = useState([
    "Thông báo 1: Hạn nộp học phí sắp đến.",
    "Thông báo 2: Đăng ký môn học mới đã mở.",
    "Thông báo 3: Cập nhật thông tin cá nhân.",
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const storedEmail = localStorage.getItem("email") || "Người dùng";
      setEmail(storedEmail);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const toggleNotification = () => {
    setIsNotificationOpen((prevState) => !prevState);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full h-14 bg-white shadow-md z-50">
      <div className="max-w-full h-full flex items-center justify-between px-6">
        {/* Search Bar */}
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-1/4">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none w-full"
          />
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-6">
          <Link
            to="/home"
            className="text-gray-700 hover:text-blue-500 transition"
          >
            Trang chủ
          </Link>
          <Link
            to="/students"
            className="text-gray-700 hover:text-blue-500 transition"
          >
            Sinh viên
          </Link>
          <Link
            to="/classes"
            className="text-gray-700 hover:text-blue-500 transition"
          >
            Lớp học
          </Link>
          <Link
            to="/teachers"
            className="text-gray-700 hover:text-blue-500 transition"
          >
            Giáo viên
          </Link>
          <Link
            to="/subjects"
            className="text-gray-700 hover:text-blue-500 transition"
          >
            Môn học
          </Link>
          <Link
            to="/registered-subjects"
            className="text-gray-700 hover:text-blue-500 transition"
          >
            Đăng ký môn học
          </Link>
          <Link
            to="/tuitions"
            className="text-gray-700 hover:text-blue-500 transition"
          >
            Học phí
          </Link>
        </nav>

        {/* Notification and User */}
        <div className="flex items-center space-x-4">
          {/* Notification Icon */}
          <div className="relative">
            <button onClick={toggleNotification} className="relative">
              <FaRegBell className="text-gray-500 text-xl hover:text-blue-500 transition" />
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notifications.length}
              </span>
            </button>

            {/* Notification Popup */}
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-64 z-50">
                <div className="p-4 border-b">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Thông báo
                  </h3>
                </div>
                <ul className="max-h-48 overflow-y-auto">
                  {notifications.map((notification, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-600"
                    >
                      {notification}
                    </li>
                  ))}
                </ul>
                <div className="p-4 text-center">
                  <button
                    className="text-blue-500 hover:underline text-sm"
                    onClick={() => setNotifications([])}
                  >
                    Xóa tất cả thông báo
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Greeting with Dropdown */}
          {isLoggedIn && (
            <div className="relative">
              <div
                className="text-gray-700 text-lg font-semibold cursor-pointer hover:text-blue-500 transition"
                onClick={toggleUserMenu}
              >
                Xin chào, {email}!
              </div>
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-40 z-50">
                  <ul className="flex flex-col">
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={handleLogout}
                    >
                      Đăng xuất
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;