import React, { useState } from "react";
import { updateTeacher } from "../../services/teacherService";
import { FaTimes, FaUser, FaEnvelope, FaPhone } from "react-icons/fa";

const TeacherEdit = ({ teacher, onClose, onTeacherUpdated }) => {
  const [formData, setFormData] = useState({
    name: teacher.name || "",
    email: teacher.email || "",
    phone: teacher.phone || "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedTeacher = await updateTeacher(teacher._id, formData);
      setMessage("Thông tin giáo viên đã được cập nhật thành công!");
      onTeacherUpdated(updatedTeacher);
      onClose();
    } catch (error) {
      console.error("Error updating teacher:", error);
      setMessage("Có lỗi xảy ra khi cập nhật thông tin giáo viên.");
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
      {/* Form chỉnh sửa giáo viên */}
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        {/* Nút đóng */}
        <button
          className="absolute top-2 right-2 w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
          onClick={onClose}
        >
          <FaTimes className="text-gray-500 hover:text-red-500 transition" />
        </button>
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Chỉnh sửa thông tin giáo viên
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
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tên giáo viên */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Tên giáo viên
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
                placeholder="Nhập tên giáo viên"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-500 text-white text-xl flex-shrink-0 rounded-full p-2">
                <FaEnvelope />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập email"
                required
              />
            </div>
          </div>

          {/* Số điện thoại */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Số điện thoại
            </label>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-500 text-white text-xl flex-shrink-0 rounded-full p-2">
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

          {/* Nút cập nhật thông tin */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Cập nhật thông tin
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeacherEdit;