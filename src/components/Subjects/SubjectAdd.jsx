import React, { useState } from "react";
import { addSubject } from "../../services/subjectService";
import { FaTimes, FaBook, FaInfoCircle, FaCreditCard, FaCode } from "react-icons/fa";

const SubjectAdd = ({ onClose, onSubjectAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    credit: 3,
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newSubject = await addSubject(formData);
      setMessage("Môn học đã được thêm thành công!");
      onSubjectAdded(newSubject);
      onClose();
    } catch (error) {
      console.error("Error adding subject:", error.response?.data || error.message);
      setMessage("Có lỗi xảy ra khi thêm môn học.");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      {/* Nền trong suốt */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onClick={onClose}
      ></div>
      {/* Form thêm môn học */}
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        {/* Nút đóng */}
        <button
          className="absolute top-2 right-2 w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
          onClick={onClose}
        >
          <FaTimes className="text-gray-500 hover:text-red-500 transition" />
        </button>
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Thêm môn học mới
        </h1>
        {message && (
          <p
            className={`text-center mb-4 ${message.includes("thành công") ? "text-green-600" : "text-red-600"
              }`}
          >
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tên môn học */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Tên môn học
            </label>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-500 text-white text-xl flex-shrink-0 rounded-full p-2">
                <FaBook />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập tên môn học"
                required
              />
            </div>
          </div>

          {/* Mã môn học */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Mã môn học
            </label>
            <div className="flex items-center space-x-4">
              <div className="bg-green-500 text-white text-xl flex-shrink-0 rounded-full p-2">
                <FaCode />
              </div>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Nhập mã môn học (VD: MATH101)"
                required
              />
            </div>
          </div>

          {/* Mô tả */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Mô tả
            </label>
            <div className="flex items-center space-x-4">
              <div className="bg-yellow-500 text-white text-xl flex-shrink-0 rounded-full p-2">
                <FaInfoCircle />
              </div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Nhập mô tả môn học"
              ></textarea>
            </div>
          </div>

          {/* Số tín chỉ */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Số tín chỉ
            </label>
            <div className="flex items-center space-x-4">
              <div className="bg-purple-500 text-white text-xl flex-shrink-0 rounded-full p-2">
                <FaCreditCard />
              </div>
              <input
                type="number"
                name="credit"
                value={formData.credit}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Nhập số tín chỉ"
                required
              />
            </div>
          </div>

          {/* Nút thêm môn học */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Thêm môn học
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubjectAdd;