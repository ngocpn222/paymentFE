import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudentById } from "../../services/studentService";

const StudentDetails = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const data = await getStudentById(id);
        setStudent(data);
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    fetchStudentDetails();
  }, [id]);

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Chi tiết học sinh</h1>
      <div className="border p-4 rounded shadow">
        <div>
          <strong>Tên:</strong> {student.name}
        </div>
        <div>
          <strong>Lớp:</strong> {student.classId?.name || "Chưa phân lớp"}
        </div>
        <div>
          <strong>Giới tính:</strong> {student.gender || "Không rõ"}
        </div>
        <div>
          <strong>Số điện thoại:</strong> {student.phone || "Không có"}
        </div>
        <div>
          <strong>Ngày sinh:</strong> {student.dob || "Không rõ"}
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;