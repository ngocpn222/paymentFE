import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudentById } from "../../services/studentService";
import { FaTimes } from "react-icons/fa"; // Import icon FaTimes
import { format } from "date-fns";

const StudentDetails = ({ student, onClose }) => {
  const { id } = useParams();
  const [studentData, setStudentData] = useState(student);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const data = await getStudentById(id);
        setStudentData(data);
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    if (!student) {
      fetchStudentDetails();
    }
  }, [id, student]);

  if (!studentData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      {/* Nền trong suốt */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onClick={onClose}
      ></div>
      {/* Form chi tiết học sinh */}
      <div className="relative bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-lg">
        {/* Nút đóng */}
        <button
          className="absolute top-2 right-2 w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
          onClick={onClose}
        >
          <FaTimes className="text-gray-500 hover:text-red-500 transition" />
        </button>
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Chi tiết học sinh
        </h1>

        {/* Tên học sinh */}
        <div className="flex justify-between items-center border-b border-gray-300 py-2">
          <span className="text-lg font-medium text-gray-700">Tên học sinh:</span>
          <span className="text-lg text-gray-800">
            {studentData.name || "Không rõ"}
          </span>
        </div>

        {/* Lớp */}
        <div className="flex justify-between items-center border-b border-gray-300 py-2">
          <span className="text-lg font-medium text-gray-700">Lớp:</span>
          <span className="text-lg text-gray-800">
            {studentData.classId?.name || "Chưa phân lớp"}
          </span>
        </div>

        {/* Giới tính */}
        <div className="flex justify-between items-center border-b border-gray-300 py-2">
          <span className="text-lg font-medium text-gray-700">Giới tính:</span>
          <span className="text-lg text-gray-800">
            {studentData.gender || "Không rõ"}
          </span>
        </div>

        {/* Số điện thoại */}
        <div className="flex justify-between items-center border-b border-gray-300 py-2">
          <span className="text-lg font-medium text-gray-700">Số điện thoại:</span>
          <span className="text-lg text-gray-800">
            {studentData.phone || "Không có"}
          </span>
        </div>

        {/* Ngày sinh */}
        <div className="flex justify-between items-center border-b border-gray-300 py-2">
          <span className="text-lg font-medium text-gray-700">Ngày sinh:</span>
          <span className="text-lg text-gray-800">
            {studentData.dob ? format(new Date(studentData.dob), "dd/MM/yyyy") : "Không rõ"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;