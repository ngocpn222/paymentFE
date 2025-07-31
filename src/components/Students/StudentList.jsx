import React, { useEffect, useState } from "react";
import { getStudents, deleteStudent } from "../../services/studentService";
import StudentDetails from "./StudentDetails";
import StudentAdd from "./StudentAdd";
import { FaUserGraduate, FaPlus } from "react-icons/fa"; // Import các icon từ react-icons
import StudentEdit from "./StudentEdit"; // Import component chỉnh sửa học sinh
import { format } from "date-fns"; // Import thư viện date-fns

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [deletingStudent, setDeletingStudent] = useState(null);

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

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
  };

  const handleCloseDetails = () => {
    setSelectedStudent(null);
  };

  const handleOpenAddPopup = () => {
    setIsAddPopupOpen(true);
  };

  const handleCloseAddPopup = () => {
    setIsAddPopupOpen(false);
  };

  const handleStudentAdded = (newStudent) => {
    setStudents((prevStudents) => [...prevStudents, newStudent]); // Cập nhật danh sách
  };

  const handleOpenEditPopup = (student) => {
    setEditingStudent(student);
    setIsEditPopupOpen(true);
  };

  const handleCloseEditPopup = () => {
    setEditingStudent(null);
    setIsEditPopupOpen(false);
  };

  const handleStudentUpdated = (updatedStudent) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student._id === updatedStudent._id ? updatedStudent : student
      )
    );
  };

  const handleOpenDeletePopup = (student) => {
    setDeletingStudent(student);
    setIsDeletePopupOpen(true);
  };

  const handleCloseDeletePopup = () => {
    setDeletingStudent(null);
    setIsDeletePopupOpen(false);
  };

  const handleStudentDeleted = (deletedStudentId) => {
    setStudents((prevStudents) =>
      prevStudents.filter((student) => student._id !== deletedStudentId)
    );
  };

  const handleDeleteStudent = async () => {
    try {
      await deleteStudent(deletingStudent._id); // Gọi API xóa
      handleStudentDeleted(deletingStudent._id); // Cập nhật danh sách
      handleCloseDeletePopup();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

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
          <h1 className="text-3xl font-bold text-gray-800">Danh sách học sinh</h1>
        </div>
      </div>

      {/* Nút thêm */}
      <div className="flex justify-end mb-6">
        <button
          className="flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition shadow-md"
          onClick={handleOpenAddPopup}
        >
          <FaPlus className="mr-2" />
          Thêm học sinh
        </button>
      </div>

      {/* Bảng danh sách học sinh */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
          <thead>
            <tr className="bg-blue-100 text-gray-700">
              <th className="px-6 py-3 text-center">
                <FaUserGraduate className="inline-block mr-2" />
                Tên
              </th>
              <th className="px-6 py-3 text-center">
                <FaPlus className="inline-block mr-2" />
                Lớp
              </th>
              <th className="px-6 py-3 text-center">
                <span className="inline-block mr-2">⚥</span>
                Giới tính
              </th>
              <th className="px-6 py-3 text-center">
                <span className="inline-block mr-2">📞</span>
                Số điện thoại
              </th>
              <th className="px-6 py-3 text-center">
                <span className="inline-block mr-2">📅</span>
                Ngày sinh
              </th>
              <th className="px-6 py-3 text-center">
                <span className="inline-block mr-2">⚙️</span>
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr
                key={student._id}
                className={`text-gray-700 hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
              >
                <td className="px-6 py-3 text-center">{student.name}</td>
                <td className="px-6 py-3 text-center">
                  {student.classId?.name || "Chưa phân lớp"}
                </td>
                <td className="px-6 py-3 text-center">{student.gender || "Không rõ"}</td>
                <td className="px-6 py-3 text-center">{student.phone || "Không có"}</td>
                <td className="px-6 py-3 text-center">
                  {student.dob
                    ? format(new Date(student.dob), "dd/MM/yyyy")
                    : "Không rõ"}
                </td>
                <td className="px-6 py-3 text-center">
                  <div className="flex justify-center items-center space-x-2">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleViewDetails(student)}
                      title="Xem"
                    >
                      <FaUserGraduate />
                    </button>
                    <button
                      className="text-green-500 hover:text-green-700"
                      onClick={() => handleOpenEditPopup(student)}
                      title="Sửa"
                    >
                      <FaPlus />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleOpenDeletePopup(student)}
                      title="Xóa"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup xem chi tiết */}
      {selectedStudent && (
        <StudentDetails student={selectedStudent} onClose={handleCloseDetails} />
      )}

      {/* Popup thêm học sinh */}
      {isAddPopupOpen && (
        <StudentAdd onClose={handleCloseAddPopup} onStudentAdded={handleStudentAdded} />
      )}

      {/* Popup chỉnh sửa học sinh */}
      {isEditPopupOpen && (
        <StudentEdit
          student={editingStudent}
          onClose={handleCloseEditPopup}
          onStudentUpdated={handleStudentUpdated}
        />
      )}

      {/* Popup xác nhận xóa học sinh */}
      {isDeletePopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Nền trong suốt */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            onClick={handleCloseDeletePopup}
          ></div>
          {/* Popup */}
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            {/* Tiêu đề */}
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Xác nhận xóa
            </h2>
            <p className="text-gray-700 mb-6 text-center">
              Bạn có chắc chắn muốn xóa học sinh với thông tin sau không?
            </p>
            {/* Thông tin học sinh */}
            <div className="text-gray-700 space-y-4">
              <div className="flex justify-between border-b border-gray-300 pb-2">
                <span className="font-medium text-gray-700">Tên:</span>
                <span className="text-gray-800">{deletingStudent?.name || "Không rõ"}</span>
              </div>
              <div className="flex justify-between border-b border-gray-300 pb-2">
                <span className="font-medium text-gray-700">Lớp:</span>
                <span className="text-gray-800">{deletingStudent?.classId?.name || "Chưa phân lớp"}</span>
              </div>
              <div className="flex justify-between border-b border-gray-300 pb-2">
                <span className="font-medium text-gray-700">Giới tính:</span>
                <span className="text-gray-800">{deletingStudent?.gender || "Không rõ"}</span>
              </div>
              <div className="flex justify-between border-b border-gray-300 pb-2">
                <span className="font-medium text-gray-700">Số điện thoại:</span>
                <span className="text-gray-800">{deletingStudent?.phone || "Không có"}</span>
              </div>
              <div className="flex justify-between border-b border-gray-300 pb-2">
                <span className="font-medium text-gray-700">Ngày sinh:</span>
                <span className="text-gray-800">
                  {deletingStudent?.dob
                    ? new Date(deletingStudent.dob).toLocaleDateString("vi-VN")
                    : "Không rõ"}
                </span>
              </div>
            </div>
            {/* Nút hành động */}
            <div className="flex justify-center space-x-4 mt-6">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                onClick={handleCloseDeletePopup}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                onClick={handleDeleteStudent}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;