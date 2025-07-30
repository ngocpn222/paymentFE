import React, { useEffect, useState } from "react";
import { getStudents } from "../../services/studentService";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getStudents();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-bold text-gray-700">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Danh sách học sinh</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <div
            key={student._id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {student.name}
            </h2>
            <p className="text-gray-600">
              <strong>Lớp:</strong> {student.classId?.name || "Chưa phân lớp"}
            </p>
            <p className="text-gray-600">
              <strong>Giới tính:</strong> {student.gender || "Không rõ"}
            </p>
            <p className="text-gray-600">
              <strong>Số điện thoại:</strong> {student.phone || "Không có"}
            </p>
            <p className="text-gray-600">
              <strong>Ngày sinh:</strong> {student.dob || "Không rõ"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentList;