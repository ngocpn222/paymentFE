import React from "react";
import { FaTimes, FaUser, FaEnvelope, FaPhone, FaVenusMars, FaCalendarAlt, FaChalkboard } from "react-icons/fa";

const TeacherDetails = ({ teacher, onClose }) => {
  const translateGender = (gender) => {
    switch (gender) {
      case "Male":
        return "Nam";
      case "Female":
        return "Nữ";
      case "Other":
        return "Khác";
      default:
        return "Không rõ";
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
      {/* Popup chi tiết giáo viên */}
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {/* Nút đóng */}
        <button
          className="absolute top-2 right-2 w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
          onClick={onClose}
        >
          <FaTimes className="text-gray-500 hover:text-red-500 transition" />
        </button>
        {/* Tiêu đề có icon */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center space-x-3">
          <FaUser className="text-blue-500" />
          <span>Chi tiết giáo viên</span>
        </h2>
        <div className="text-gray-700 space-y-4">
          {/* Tên giáo viên */}
          <div className="flex justify-between items-center border-b border-gray-300 pb-2">
            <span className="font-medium text-gray-700 flex items-center">
              <div className="bg-blue-500 text-white text-xl flex-shrink-0 rounded-full p-2 mr-2">
                <FaUser />
              </div>
              Tên giáo viên:
            </span>
            <span className="text-gray-800">{teacher?.name || "Không rõ"}</span>
          </div>
          {/* Email */}
          <div className="flex justify-between items-center border-b border-gray-300 pb-2">
            <span className="font-medium text-gray-700 flex items-center">
              <div className="bg-green-500 text-white text-xl flex-shrink-0 rounded-full p-2 mr-2">
                <FaEnvelope />
              </div>
              Email:
            </span>
            <span className="text-gray-800">{teacher?.email || "Không có"}</span>
          </div>
          {/* Số điện thoại */}
          <div className="flex justify-between items-center border-b border-gray-300 pb-2">
            <span className="font-medium text-gray-700 flex items-center">
              <div className="bg-yellow-500 text-white text-xl flex-shrink-0 rounded-full p-2 mr-2">
                <FaPhone />
              </div>
              Số điện thoại:
            </span>
            <span className="text-gray-800">{teacher?.phone || "Không có"}</span>
          </div>
          {/* Giới tính */}
          <div className="flex justify-between items-center border-b border-gray-300 pb-2">
            <span className="font-medium text-gray-700 flex items-center">
              <div className="bg-pink-500 text-white text-xl flex-shrink-0 rounded-full p-2 mr-2">
                <FaVenusMars />
              </div>
              Giới tính:
            </span>
            <span className="text-gray-800">{translateGender(teacher?.gender)}</span>
          </div>
          {/* Ngày sinh */}
          <div className="flex justify-between items-center border-b border-gray-300 pb-2">
            <span className="font-medium text-gray-700 flex items-center">
              <div className="bg-purple-500 text-white text-xl flex-shrink-0 rounded-full p-2 mr-2">
                <FaCalendarAlt />
              </div>
              Ngày sinh:
            </span>
            <span className="text-gray-800">
              {teacher?.dob
                ? new Date(teacher.dob).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
                : "Không rõ"}
            </span>
          </div>
          {/* Các lớp dạy */}
          <div className="flex justify-between items-start border-b border-gray-300 pb-2">
            <span className="font-medium text-gray-700 flex items-center">
              <div className="bg-blue-500 text-white text-xl flex-shrink-0 rounded-full p-2 mr-2">
                <FaChalkboard />
              </div>
              Các lớp dạy:
            </span>
            <span className="text-gray-800">
              {teacher?.classes && teacher.classes.length > 0 ? (
                <ul className="list-disc list-inside">
                  {teacher.classes.map((cls) => (
                    <li key={cls._id}>{cls.name}</li>
                  ))}
                </ul>
              ) : (
                "Không có lớp nào"
              )}
            </span>
          </div>
        </div>
        {/* Nút đóng */}
        <div className="flex justify-center mt-6">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={onClose}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetails;