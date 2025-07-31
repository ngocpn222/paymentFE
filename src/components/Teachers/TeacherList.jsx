import React, { useEffect, useState } from "react";
import { getTeachers, deleteTeacher } from "../../services/teacherService";
import TeacherDetails from "./TeacherDetails";
import TeacherAdd from "./TeacherAdd";
import TeacherEdit from "./TeacherEdit";
import { FaChalkboardTeacher, FaPlus } from "react-icons/fa";

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [deletingTeacher, setDeletingTeacher] = useState(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const data = await getTeachers();
        setTeachers(data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const handleViewDetails = (teacher) => {
    setSelectedTeacher(teacher);
  };

  const handleCloseDetails = () => {
    setSelectedTeacher(null);
  };

  const handleOpenAddPopup = () => {
    setIsAddPopupOpen(true);
  };

  const handleCloseAddPopup = () => {
    setIsAddPopupOpen(false);
  };

  const handleTeacherAdded = (newTeacher) => {
    setTeachers((prevTeachers) => [...prevTeachers, newTeacher]);
  };

  const handleOpenEditPopup = (teacher) => {
    setEditingTeacher(teacher);
    setIsEditPopupOpen(true);
  };

  const handleCloseEditPopup = () => {
    setEditingTeacher(null);
    setIsEditPopupOpen(false);
  };

  const handleTeacherUpdated = (updatedTeacher) => {
    setTeachers((prevTeachers) =>
      prevTeachers.map((teacher) =>
        teacher._id === updatedTeacher._id ? updatedTeacher : teacher
      )
    );
  };

  const handleOpenDeletePopup = (teacher) => {
    setDeletingTeacher(teacher);
    setIsDeletePopupOpen(true);
  };

  const handleCloseDeletePopup = () => {
    setDeletingTeacher(null);
    setIsDeletePopupOpen(false);
  };

  const handleTeacherDeleted = (deletedTeacherId) => {
    setTeachers((prevTeachers) =>
      prevTeachers.filter((teacher) => teacher._id !== deletedTeacherId)
    );
  };

  const handleDeleteTeacher = async () => {
    try {
      await deleteTeacher(deletingTeacher._id);
      handleTeacherDeleted(deletingTeacher._id);
      handleCloseDeletePopup();
    } catch (error) {
      console.error("Error deleting teacher:", error);
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
          <FaChalkboardTeacher className="text-blue-500 text-4xl" />
          <h1 className="text-3xl font-bold text-gray-800">Danh sách giáo viên</h1>
        </div>
      </div>

      {/* Nút thêm */}
      <div className="flex justify-end mb-6">
        <button
          className="flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition shadow-md"
          onClick={handleOpenAddPopup}
        >
          <FaPlus className="mr-2" />
          Thêm giáo viên
        </button>
      </div>

      {/* Bảng danh sách giáo viên */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
          <thead>
            <tr className="bg-blue-100 text-gray-700">
              <th className="px-6 py-3 text-center">
                <FaChalkboardTeacher className="inline-block mr-2" />
                Tên
              </th>
              <th className="px-6 py-3 text-center">Email</th>
              <th className="px-6 py-3 text-center">Số điện thoại</th>
              <th className="px-6 py-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher, index) => (
              <tr
                key={teacher._id}
                className={`text-gray-700 hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
              >
                <td className="px-6 py-3 text-center">{teacher.name}</td>
                <td className="px-6 py-3 text-center">{teacher.email}</td>
                <td className="px-6 py-3 text-center">{teacher.phone || "Không có"}</td>
                <td className="px-6 py-3 text-center">
                  <div className="flex justify-center items-center space-x-2">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleViewDetails(teacher)}
                      title="Xem"
                    >
                      <FaChalkboardTeacher />
                    </button>
                    <button
                      className="text-green-500 hover:text-green-700"
                      onClick={() => handleOpenEditPopup(teacher)}
                      title="Sửa"
                    >
                      <FaPlus />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleOpenDeletePopup(teacher)}
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
      {selectedTeacher && (
        <TeacherDetails teacher={selectedTeacher} onClose={handleCloseDetails} />
      )}

      {/* Popup thêm giáo viên */}
      {isAddPopupOpen && (
        <TeacherAdd onClose={handleCloseAddPopup} onTeacherAdded={handleTeacherAdded} />
      )}

      {/* Popup chỉnh sửa giáo viên */}
      {isEditPopupOpen && (
        <TeacherEdit
          teacher={editingTeacher}
          onClose={handleCloseEditPopup}
          onTeacherUpdated={handleTeacherUpdated}
        />
      )}

      {/* Popup xác nhận xóa giáo viên */}
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
              Bạn có chắc chắn muốn xóa giáo viên với thông tin sau không?
            </p>
            {/* Thông tin giáo viên */}
            <div className="text-gray-700 space-y-4">
              <div className="flex justify-between border-b border-gray-300 pb-2">
                <span className="font-medium text-gray-700">Tên:</span>
                <span className="text-gray-800">{deletingTeacher?.name || "Không rõ"}</span>
              </div>
              <div className="flex justify-between border-b border-gray-300 pb-2">
                <span className="font-medium text-gray-700">Email:</span>
                <span className="text-gray-800">{deletingTeacher?.email || "Không có"}</span>
              </div>
              <div className="flex justify-between border-b border-gray-300 pb-2">
                <span className="font-medium text-gray-700">Số điện thoại:</span>
                <span className="text-gray-800">{deletingTeacher?.phone || "Không có"}</span>
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
                onClick={handleDeleteTeacher}
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

export default TeacherList;