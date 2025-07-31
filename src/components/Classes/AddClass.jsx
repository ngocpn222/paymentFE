import React, { useState } from "react";
import { FaTimes, FaChalkboardTeacher, FaInfoCircle } from "react-icons/fa";
import { addClass } from "../../services/classService";

const AddClass = ({ onClose, onClassAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addClass(formData);
      onClassAdded();
      onClose();
    } catch (error) {
      console.error("Error adding class:", error.response?.data || error.message);
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
      {/* Form thêm lớp */}
      <div className="relative bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-lg">
        {/* Nút đóng */}
        <button
          className="absolute top-2 right-2 w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
          onClick={onClose}
        >
          <FaTimes className="text-gray-500 hover:text-red-500 transition" />
        </button>
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center space-x-3">
          <FaChalkboardTeacher className="text-blue-500" />
          <span>Thêm lớp học mới</span>
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tên lớp */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Tên lớp
            </label>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-500 text-white text-xl flex-shrink-0 rounded-full p-2">
                <FaChalkboardTeacher />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập tên lớp"
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
              <div className="bg-blue-500 text-white text-xl flex-shrink-0 rounded-full p-2">
                <FaInfoCircle />
              </div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập mô tả lớp học"
              />
            </div>
          </div>

          {/* Nút thêm lớp */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Thêm lớp học
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddClass;