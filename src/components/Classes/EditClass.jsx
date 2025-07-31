import React, { useState } from "react";
import { updateClass } from "../../services/classService";
import { FaTimes, FaChalkboardTeacher, FaInfoCircle } from "react-icons/fa";

const EditClass = ({ classData, onClose, onClassUpdated }) => {
  const [formData, setFormData] = useState({
    name: classData.name || "",
    description: classData.description || "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedClass = await updateClass(classData._id, formData);
      setMessage("Thông tin lớp học đã được cập nhật thành công!");
      onClassUpdated(updatedClass);
      onClose();
    } catch (error) {
      console.error("Error updating class:", error);
      setMessage("Có lỗi xảy ra khi cập nhật thông tin lớp học.");
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
      {/* Form sửa lớp */}
      <div className="relative bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-lg">
        {/* Nút đóng */}
        <button
          className="absolute top-2 right-2 w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
          onClick={onClose}
        >
          <FaTimes className="text-gray-500 hover:text-red-500 transition" />
        </button>
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center space-x-3">
          <FaChalkboardTeacher className="text-indigo-500" />
          <span>Sửa thông tin lớp học</span>
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
          {/* Tên lớp */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Tên lớp
            </label>
            <div className="flex items-center space-x-4">
              <div className="bg-indigo-500 text-white text-xl flex-shrink-0 rounded-full p-2">
                <FaChalkboardTeacher />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              <div className="bg-green-500 text-white text-xl flex-shrink-0 rounded-full p-2">
                <FaInfoCircle />
              </div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Nhập mô tả lớp học"
              />
            </div>
          </div>

          {/* Nút sửa thông tin */}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
          >
            Cập nhật thông tin
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditClass;