import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Footer from "./Footer";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Đăng ký thất bại");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-400 via-purple-200 to-indigo-200">
        <div className="flex bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden">
          {/* Logo & Slogan */}
          <div className="hidden md:flex flex-col justify-center items-center bg-white p-10 w-1/2 border-r-2 border-gray-200">
            <div className="flex flex-col items-center">
              {/* Khung tròn bao quanh logo */}
              <div className="w-32 h-32 mb-4 rounded-full border-4 border-blue-300 flex items-center justify-center bg-white shadow-md">
                <img
                  src="/logo_payment.png"
                  alt="Logo"
                  className="w-24 h-24 rounded-full"
                />
              </div>
              <h3 className="text-gray-800 text-2xl font-bold mb-2">
                Quản Lý Học Phí
              </h3>
              <p className="text-gray-800 text-center text-sm">
                Nền tảng học phí hiện đại – An toàn – Tiện lợi cho sinh viên Việt
                Nam.
              </p>
            </div>
          </div>

          {/* Form đăng ký */}
          <form onSubmit={handleSubmit} className="p-10 w-full md:w-1/2">
            <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-800 tracking-tight">
              Đăng Ký
            </h2>
            {error && (
              <p className="text-red-500 text-sm mb-4 text-center font-medium">
                {error}
              </p>
            )}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Tên người dùng
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Nhập tên người dùng"
                required
              />
            </div>
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Nhập email"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Mật khẩu
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Nhập mật khẩu"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold shadow-md transition duration-300"
            >
              Đăng Ký
            </button>
            <p className="text-sm text-center text-gray-600 mt-6">
              Đã có tài khoản?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-blue-600 cursor-pointer hover:underline font-medium"
              >
                Đăng nhập
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;