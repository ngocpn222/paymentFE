import React from "react";
import { FaTimes, FaUserGraduate, FaBook, FaInfoCircle, FaCalendarAlt } from "react-icons/fa";

const RegisteredSubjectDetails = ({ subject, onClose }) => {
  if (!subject) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-bold text-red-500">Không tìm thấy thông tin đăng ký</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      {/* Nền trong suốt */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onClick={onClose}
      ></div>
      {/* Form chi tiết đăng ký môn học */}
      <div className="relative bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-lg">
        {/* Nút đóng */}
        <button
          className="absolute top-2 right-2 w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
          onClick={onClose}
        >
          <FaTimes className="text-gray-500 hover:text-red-500 transition" />
        </button>
        {/* Tiêu đề */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center space-x-3">
          <FaInfoCircle className="text-indigo-500" />
          <span>Chi tiết đăng ký môn học</span>
        </h1>

        {/* Thông tin sinh viên */}
        <div className="flex justify-between items-center border-b border-gray-300 py-2">
          <span className="text-lg font-medium text-gray-700 flex items-center">
            <FaUserGraduate className="mr-2 text-indigo-500" /> Sinh viên:
          </span>
          <span className="text-lg text-gray-800">{subject.student?.name || "Không rõ"}</span>
        </div>

        {/* Thông tin môn học */}
        <div className="flex justify-between items-center border-b border-gray-300 py-2">
          <span className="text-lg font-medium text-gray-700 flex items-center">
            <FaBook className="mr-2 text-green-500" /> Môn học:
          </span>
          <span className="text-lg text-gray-800">{subject.subject?.name || "Không rõ"}</span>
        </div>

        {/* Mã môn học */}
        <div className="flex justify-between items-center border-b border-gray-300 py-2">
          <span className="text-lg font-medium text-gray-700 flex items-center">
            <FaBook className="mr-2 text-indigo-400" /> Mã môn học:
          </span>
          <span className="text-lg text-gray-800 font-mono">{subject.subject?.code || "Không rõ"}</span>
        </div>

        {/* Trạng thái */}
        <div className="flex justify-between items-center border-b border-gray-300 py-2">
          <span className="text-lg font-medium text-gray-700 flex items-center">
            <FaInfoCircle className="mr-2 text-blue-500" /> Trạng thái:
          </span>
          <span className="text-lg text-gray-800">
            {subject.status === "registered" ? "Đã đăng ký" : "Đã hủy"}
          </span>
        </div>

        {/* Ngày đăng ký */}
        <div className="flex justify-between items-center border-b border-gray-300 py-2">
          <span className="text-lg font-medium text-gray-700 flex items-center">
            <FaCalendarAlt className="mr-2 text-orange-500" /> Ngày đăng ký:
          </span>
          <span className="text-lg text-gray-800">
            {new Date(subject.registerDate).toLocaleDateString("vi-VN")}
          </span>
        </div>

        {/* Nút đóng */}
        <div className="flex justify-center mt-6">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
            onClick={onClose}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisteredSubjectDetails;