import React, { useEffect, useState } from "react";
import { getStudents } from "../../services/studentService";

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getStudents();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Danh sách học sinh</h1>
      <ul className="space-y-4">
        {students.map((student) => (
          <li key={student._id} className="border p-4 rounded shadow">
            <div>
              <strong>Tên:</strong> {student.name}
            </div>
            <div>
              <strong>Lớp:</strong> {student.classId?.name || "Chưa phân lớp"}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;