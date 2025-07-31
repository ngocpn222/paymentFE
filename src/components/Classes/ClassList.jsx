import React, { useEffect, useState } from "react";
import { getClasses, deleteClass } from "../../services/classService";
import ClassDetails from "./ClassDetails";
import AddClass from "./AddClass";
import EditClass from "./EditClass";
import { FaChalkboardTeacher, FaPlus } from "react-icons/fa";

const ClassList = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState(null);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [deletingClass, setDeletingClass] = useState(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data = await getClasses();
        setClasses(data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const handleViewDetails = (classData) => {
    setSelectedClass(classData);
  };

  const handleCloseDetails = () => {
    setSelectedClass(null);
  };

  const handleOpenAddPopup = () => {
    setIsAddPopupOpen(true);
  };

  const handleCloseAddPopup = () => {
    setIsAddPopupOpen(false);
  };

  const handleClassAdded = (newClass) => {
    setClasses((prevClasses) => [...prevClasses, newClass]);
  };

  const handleOpenEditPopup = (classData) => {
    setEditingClass(classData);
    setIsEditPopupOpen(true);
  };

  const handleCloseEditPopup = () => {
    setEditingClass(null);
    setIsEditPopupOpen(false);
  };

  const handleClassUpdated = (updatedClass) => {
    setClasses((prevClasses) =>
      prevClasses.map((cls) => (cls._id === updatedClass._id ? updatedClass : cls))
    );
  };

  const handleOpenDeletePopup = (classData) => {
    setDeletingClass(classData);
    setIsDeletePopupOpen(true);
  };

  const handleCloseDeletePopup = () => {
    setDeletingClass(null);
    setIsDeletePopupOpen(false);
  };

  const handleClassDeleted = (deletedClassId) => {
    setClasses((prevClasses) =>
      prevClasses.filter((cls) => cls._id !== deletedClassId)
    );
  };

  const handleDeleteClass = async () => {
    try {
      await deleteClass(deletingClass._id);
      handleClassDeleted(deletingClass._id);
      handleCloseDeletePopup();
    } catch (error) {
      console.error("Error deleting class:", error);
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
          <h1 className="text-3xl font-bold text-gray-800">Danh sách lớp học</h1>
        </div>
      </div>

      {/* Nút thêm */}
      <div className="flex justify-end mb-6">
        <button
          className="flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition shadow-md"
          onClick={handleOpenAddPopup}
        >
          <FaPlus className="mr-2" />
          Thêm lớp học
        </button>
      </div>

      {/* Bảng danh sách lớp */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
          <thead>
            <tr className="bg-blue-100 text-gray-700">
              <th className="px-6 py-3 text-center">Tên lớp</th>
              <th className="px-6 py-3 text-center">Mô tả</th>
              <th className="px-6 py-3 text-center">Số học sinh</th>
              <th className="px-6 py-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((cls, index) => (
              <tr
                key={cls._id}
                className={`text-gray-700 hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
              >
                <td className="px-6 py-3 text-center">{cls.name}</td>
                <td className="px-6 py-3 text-center">{cls.description || "Không có"}</td>
                <td className="px-6 py-3 text-center">
                  {cls.studentCount || 0}
                </td>
                <td className="px-6 py-3 text-center">
                  <div className="flex justify-center items-center space-x-2">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleViewDetails(cls)}
                      title="Xem"
                    >
                      <FaChalkboardTeacher />
                    </button>
                    <button
                      className="text-green-500 hover:text-green-700"
                      onClick={() => handleOpenEditPopup(cls)}
                      title="Sửa"
                    >
                      <FaPlus />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleOpenDeletePopup(cls)}
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
      {selectedClass && (
        <ClassDetails classData={selectedClass} onClose={handleCloseDetails} />
      )}

      {/* Popup thêm lớp */}
      {isAddPopupOpen && (
        <AddClass onClose={handleCloseAddPopup} onClassAdded={handleClassAdded} />
      )}

      {/* Popup chỉnh sửa lớp */}
      {isEditPopupOpen && (
        <EditClass
          classData={editingClass}
          onClose={handleCloseEditPopup}
          onClassUpdated={handleClassUpdated}
        />
      )}

      {/* Popup xác nhận xóa lớp */}
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
              Bạn có chắc chắn muốn xóa lớp học với thông tin sau không?
            </p>
            {/* Thông tin lớp */}
            <div className="text-gray-700 space-y-4">
              <div className="flex justify-between border-b border-gray-300 pb-2">
                <span className="font-medium text-gray-700">Tên lớp:</span>
                <span className="text-gray-800">{deletingClass?.name || "Không rõ"}</span>
              </div>
              <div className="flex justify-between border-b border-gray-300 pb-2">
                <span className="font-medium text-gray-700">Mô tả:</span>
                <span className="text-gray-800">{deletingClass?.description || "Không có"}</span>
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
                onClick={handleDeleteClass}
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

export default ClassList;