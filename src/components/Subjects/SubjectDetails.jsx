import React from "react";
import { FaTimes } from "react-icons/fa";

const SubjectDetails = ({ subject, onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      {/* Nền trong suốt */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onClick={onClose}
      ></div>
      {/* Popup chi tiết môn học */}
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {/* Nút đóng */}
        <button
          className="absolute top-2 right-2 w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
          onClick={onClose}
        >
          <FaTimes className="text-gray-500 hover:text-red-500 transition" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Chi tiết môn học
        </h2>
        <div className="text-gray-700 space-y-4">
          <div className="flex justify-between border-b border-gray-300 pb-2">
            <span className="font-medium text-gray-700">Tên môn học:</span>
            <span className="text-gray-800">{subject?.name || "Không rõ"}</span>
          </div>
          <div className="flex justify-between border-b border-gray-300 pb-2">
            <span className="font-medium text-gray-700">Mã môn học:</span>
            <span className="text-gray-800">{subject?.code || "Không rõ"}</span>
          </div>
          <div className="flex justify-between border-b border-gray-300 pb-2">
            <span className="font-medium text-gray-700">Mô tả:</span>
            <span className="text-gray-800">{subject?.description || "Không rõ"}</span>
          </div>
          <div className="flex justify-between border-b border-gray-300 pb-2">
            <span className="font-medium text-gray-700">Số tín chỉ:</span>
            <span className="text-gray-800">{subject?.credit || "Không rõ"}</span>
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

export default SubjectDetails;