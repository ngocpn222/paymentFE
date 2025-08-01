import React, { useEffect, useState } from "react";
import { getRegisteredSubjects, deleteRegisteredSubject } from "../../services/registeredSubjectService";
import { FaUserGraduate, FaBook, FaTrash, FaEye, FaPlus } from "react-icons/fa";

const RegisteredSubjectList = ({ onViewDetails, onAdd }) => {
  const [registeredSubjects, setRegisteredSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRegisteredSubjects();
        setRegisteredSubjects(data);
      } catch (error) {
        console.error("Error fetching registered subjects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-bold text-gray-700">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Tiêu đề */}
      <div className="text-center mb-4">
        <div className="flex justify-center items-center space-x-3">
          <FaUserGraduate className="text-blue-500 text-4xl" />
          <h1 className="text-3xl font-bold text-gray-800">Danh sách môn học đã đăng ký</h1>
        </div>
      </div>

      {/* Nút thêm */}
      <div className="flex justify-end mb-6">
        <button
          className="flex items-center bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition shadow-md"
          onClick={onAdd}
        >
          <FaPlus className="mr-2" />
          Thêm đăng ký
        </button>
      </div>

      {/* Bảng danh sách đăng ký */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
          <thead>
            <tr className="bg-blue-100 text-gray-700">
              <th className="px-6 py-3 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <span>STT</span>
                </div>
              </th>
              <th className="px-6 py-3 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <FaUserGraduate />
                  <span>Tên sinh viên</span>
                </div>
              </th>
              <th className="px-6 py-3 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <FaBook />
                  <span>Tên môn học</span>
                </div>
              </th>
              <th className="px-6 py-3 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <FaTrash />
                  <span>Hành động</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {registeredSubjects.map((subject, index) => (
              <tr
                key={subject._id}
                className={`text-gray-700 hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
              >
                <td className="px-6 py-3 text-center">{index + 1}</td>
                <td className="px-6 py-3 text-center">{subject.student?.name || "Không rõ"}</td>
                <td className="px-6 py-3 text-center">{subject.subject?.name || "Không rõ"}</td>
                <td className="px-6 py-3 text-center">
                  <div className="flex justify-center items-center space-x-2">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => onViewDetails(subject)}
                      title="Xem"
                    >
                      <FaEye />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => deleteRegisteredSubject(subject._id)}
                      title="Xóa"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegisteredSubjectList;