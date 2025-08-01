import React, { useState, useEffect } from "react";
import { addStudent } from "../../services/studentService";
import { getClasses } from "../../services/classService";
import {
  FaTimes,
  FaUser,
  FaChalkboardTeacher,
  FaVenusMars,
  FaPhone,
  FaCalendarAlt,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const StudentAdd = ({ onClose, onStudentAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    classId: "",
    gender: "",
    phone: "",
    dob: "",
    email: "",
  });
  const [classes, setClasses] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data = await getClasses();
        setClasses(data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Dữ liệu gửi đi:", formData);
      await addStudent(formData);
      setMessage("Học sinh đã được thêm thành công!");
      onStudentAdded();
      onClose();
    } catch (error) {
      console.error(
        "Error adding student:",
        error.response?.data || error.message
      );
      setMessage("Có lỗi xảy ra khi thêm học sinh.");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onClick={onClose}
      ></div>
      <div className="relative bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <button
          className="absolute top-2 right-2 w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
          onClick={onClose}
        >
          <FaTimes className="text-gray-500 hover:text-red-500 transition" />
        </button>
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center space-x-3">
          <FaChalkboardTeacher className="text-blue-500" />
          <span>Thêm học sinh mới</span>
        </h1>
        {message && (
          <p
            className={`text-center mb-4 ${
              message.includes("thành công") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {/* Tên học sinh */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Tên học sinh
            </label>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-500 text-white text-xl flex-shrink-0 rounded-full p-2">
                <FaUser />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập tên học sinh"
                required
              />
            </div>
          </div>

          {/* Lớp */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Lớp
            </label>
            <div className="flex items-center space-x-4">
              <div className="bg-green-500 text-white text-xl flex-shrink-0 rounded-full p-2">
                <FaChalkboardTeacher />
              </div>
              <select
                name="classId"
                value={formData.classId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Chọn lớp</option>
                {classes.map((cls) => (
                  <option key={cls._id} value={cls._id}>
                    {cls.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Giới tính */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Giới tính
            </label>
            <div className="flex items-center space-x-4">
              <div className="bg-pink-500 text-white text-xl flex-shrink-0 rounded-full p-2">
                <FaVenusMars />
              </div>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Chọn giới tính</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            </div>
          </div>

          {/* Số điện thoại */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Số điện thoại
            </label>
            <div className="flex items-center space-x-4">
              <div className="bg-yellow-500 text-white text-xl flex-shrink-0 rounded-full p-2">
                <FaPhone />
              </div>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập số điện thoại"
              />
            </div>
          </div>

          {/* Ngày sinh */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Ngày sinh
            </label>
            <div className="flex items-center space-x-4">
              <div className="bg-purple-500 text-white text-xl flex-shrink-0 rounded-full p-2">
                <FaCalendarAlt />
              </div>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Gmail */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Gmail
            </label>
            <div className="flex items-center space-x-4">
              <div className="bg-red-500 text-white text-xl flex-shrink-0 rounded-full p-2">
                <FaEnvelope />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập Gmail"
                required
              />
            </div>
          </div>

          {/* Nút thêm học sinh */}
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Thêm học sinh
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentAdd;
