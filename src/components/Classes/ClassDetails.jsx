import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { getClassDetails } from "../../services/classService";

const ClassDetails = ({ classData, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getClassDetails(classData._id);
        setDetails(data);
      } catch (error) {
        console.error("Error fetching class details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [classData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-bold text-gray-700">Đang tải...</div>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-bold text-red-500">Không tìm thấy lớp học</div>
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
      {/* Form chi tiết lớp học */}
      <div className="relative bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-lg">
        {/* Nút đóng */}
        <button
          className="absolute top-2 right-2 w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
          onClick={onClose}
        >
          <FaTimes className="text-gray-500 hover:text-red-500 transition" />
        </button>
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Chi tiết lớp học
        </h1>

        {/* Tên lớp */}
        <div className="flex justify-between items-center border-b border-gray-300 py-2">
          <span className="text-lg font-medium text-gray-700">Tên lớp:</span>
          <span className="text-lg text-gray-800">
            {details.name || "Không rõ"}
          </span>
        </div>

        {/* Mô tả */}
        <div className="flex justify-between items-center border-b border-gray-300 py-2">
          <span className="text-lg font-medium text-gray-700">Mô tả:</span>
          <span className="text-lg text-gray-800">
            {details.description || "Không có"}
          </span>
        </div>

        {/* Số lượng học sinh */}
        <div className="flex justify-between items-center border-b border-gray-300 py-2">
          <span className="text-lg font-medium text-gray-700">
            Số lượng học sinh:
          </span>
          <span className="text-lg text-gray-800">
            {details.students?.length || 0}
          </span>
        </div>

        {/* Danh sách học sinh */}
        <div className="mt-4">
          <h2 className="text-lg font-medium text-gray-700 mb-2">
            Danh sách học sinh:
          </h2>
          <ul className="list-disc list-inside text-gray-800">
            {details.students?.map((student) => (
              <li key={student._id}>{student.name}</li>
            )) || <li>Không có học sinh</li>}
          </ul>
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

export default ClassDetails;