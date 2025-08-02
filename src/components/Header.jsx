import React, { useState, useEffect } from "react";
import { FaRegBell } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      setEmail(localStorage.getItem("email") || "Người dùng");
      // Khi đăng nhập, giả lập có 3 thông báo mới
      const noti = [
        "Thông báo 1: Hạn nộp học phí sắp đến.",
        "Thông báo 2: Đăng ký môn học mới đã mở.",
        "Thông báo 3: Cập nhật thông tin cá nhân.",
      ];
      setNotifications(noti);
      setUnreadCount(noti.length);
    } else {
      setIsLoggedIn(false);
      setNotifications([]);
      setUnreadCount(0);
    }
  }, []);

  const toggleNotification = () => {
    setIsNotificationOpen((prev) => !prev);
    setUnreadCount(0); // Đánh dấu đã đọc khi mở popup
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setIsLoggedIn(false);
    setNotifications([]);
    setUnreadCount(0);
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full h-14 bg-blue-50 shadow-md z-50">
      <div className="max-w-full h-full flex items-center px-4">
        {/* Logo sát trái */}
        <div className="flex items-center" style={{ minWidth: 56 }}>
          <img
            src="/logo_payment.png"
            alt="Logo"
            className="w-20 h-20 rounded-full"
          />
        </div>
        {/* Navigation Links căn giữa, cuộn ngang nếu thiếu chỗ */}
        <nav className="flex-1 flex items-center justify-center overflow-x-auto whitespace-nowrap space-x-4 scrollbar-hide px-2">
          <Link
            to="/home"
            className="text-gray-700 hover:text-blue-500 transition font-semibold"
          >
            Trang chủ
          </Link>
          <Link
            to="/students"
            className="text-gray-700 hover:text-blue-500 transition font-semibold"
          >
            Sinh viên
          </Link>
          <Link
            to="/classes"
            className="text-gray-700 hover:text-blue-500 transition font-semibold"
          >
            Lớp học
          </Link>
          <Link
            to="/teachers"
            className="text-gray-700 hover:text-blue-500 transition font-semibold"
          >
            Giáo viên
          </Link>
          <Link
            to="/subjects"
            className="text-gray-700 hover:text-blue-500 transition font-semibold"
          >
            Môn học
          </Link>
          <Link
            to="/registered-subjects"
            className="text-gray-700 hover:text-blue-500 transition font-semibold"
          >
            Đăng ký môn học
          </Link>
          <Link
            to="/tuitions"
            className="text-gray-700 hover:text-blue-500 transition font-semibold"
          >
            Học phí
          </Link>
        </nav>
        {/* Notification và Xin chào sát phải */}
        <div className="flex items-center justify-end" style={{ minWidth: 140 }}>
          {/* Notification Icon */}
          <div className="relative">
            <button onClick={toggleNotification} className="relative">
              <FaRegBell className="text-gray-500 text-xl hover:text-blue-500 transition" />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow">
                  {unreadCount}
                </span>
              )}
            </button>
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-2xl rounded-xl w-80 z-50 border border-blue-200 animate-fade-in">
                <div className="flex items-center justify-between p-4 border-b">
                  <h3 className="text-lg font-semibold text-blue-600 flex items-center gap-2">
                    <FaRegBell className="text-blue-500" /> Thông báo
                  </h3>
                  <button
                    className="text-xs text-blue-500 hover:underline"
                    onClick={() => setNotifications([])}
                  >
                    Xóa tất cả
                  </button>
                </div>
                <ul className="max-h-60 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <li className="px-4 py-6 text-center text-gray-400">
                      Không có thông báo mới
                    </li>
                  ) : (
                    notifications.map((notification, idx) => (
                      <li
                        key={idx}
                        className="px-4 py-3 border-b last:border-b-0 hover:bg-blue-50 cursor-pointer text-sm text-gray-700 transition"
                      >
                        {notification}
                      </li>
                    ))
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* Greeting with Dropdown */}
          {isLoggedIn && (
            <div className="relative ml-4">
              <div
                className="text-gray-700 font-semibold cursor-pointer hover:text-blue-500 transition"
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