import React, { useEffect, useState } from "react";
import { getSubjects, deleteSubject } from "../../services/subjectService";
import SubjectDetails from "./SubjectDetails";
import SubjectAdd from "./SubjectAdd";
import SubjectEdit from "./SubjectEdit";
import { FaBook, FaPlus, FaCode, FaCreditCard, FaTools, FaInfoCircle } from "react-icons/fa";

const SubjectList = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [deletingSubject, setDeletingSubject] = useState(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await getSubjects();
        setSubjects(data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  const handleViewDetails = (subject) => {
    setSelectedSubject(subject);
  };

  const handleCloseDetails = () => {
    setSelectedSubject(null);
  };

  const handleOpenAddPopup = () => {
    setIsAddPopupOpen(true);
  };

  const handleCloseAddPopup = () => {
    setIsAddPopupOpen(false);
  };

  const handleSubjectAdded = (newSubject) => {
    setSubjects((prevSubjects) => [...prevSubjects, newSubject]);
  };

  const handleOpenEditPopup = (subject) => {
    setEditingSubject(subject);
    setIsEditPopupOpen(true);
  };

  const handleCloseEditPopup = () => {
    setEditingSubject(null);
    setIsEditPopupOpen(false);
  };

  const handleSubjectUpdated = (updatedSubject) => {
    setSubjects((prevSubjects) =>
      prevSubjects.map((subject) =>
        subject._id === updatedSubject._id ? updatedSubject : subject
      )
    );
  };

  const handleOpenDeletePopup = (subject) => {
    setDeletingSubject(subject);
    setIsDeletePopupOpen(true);
  };

  const handleCloseDeletePopup = () => {
    setDeletingSubject(null);
    setIsDeletePopupOpen(false);
  };

  const handleSubjectDeleted = (deletedSubjectId) => {
    setSubjects((prevSubjects) =>
      prevSubjects.filter((subject) => subject._id !== deletedSubjectId)
    );
  };

  const handleDeleteSubject = async () => {
    try {
      await deleteSubject(deletingSubject._id);
      handleSubjectDeleted(deletingSubject._id);
      handleCloseDeletePopup();
    } catch (error) {
      console.error("Error deleting subject:", error);
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
          <FaBook className="text-blue-500 text-4xl" />
          <h1 className="text-3xl font-bold text-gray-800">Danh sách môn học</h1>
        </div>
      </div>

      {/* Nút thêm */}
      <div className="flex justify-end mb-6">
        <button
          className="flex items-center bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition shadow-md"
          onClick={handleOpenAddPopup}
        >
          <FaPlus className="mr-2" />
          Thêm môn học
        </button>
      </div>

      {/* Bảng danh sách môn học */}
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
                  <FaCode />
                  <span>Mã môn học</span>
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
                  <FaCreditCard />
                  <span>Số tín chỉ</span>
                </div>
              </th>
              <th className="px-6 py-3 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <FaTools />
                  <span>Hành động</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject, index) => (
              <tr
                key={subject._id}
                className={`text-gray-700 hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
              >
                <td className="px-6 py-3 text-center">{index + 1}</td>
                <td className="px-6 py-3 text-center">{subject.code}</td>
                <td className="px-6 py-3 text-center">{subject.name}</td>
                <td className="px-6 py-3 text-center">{subject.credit}</td>
                <td className="px-6 py-3 text-center">
                  <div className="flex justify-center items-center space-x-2">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleViewDetails(subject)}
                      title="Xem"
                    >
                      📖
                    </button>
                    <button
                      className="text-green-500 hover:text-green-700"
                      onClick={() => handleOpenEditPopup(subject)}
                      title="Sửa"
                    >
                      ✏️
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleOpenDeletePopup(subject)}
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
      {selectedSubject && (
        <SubjectDetails subject={selectedSubject} onClose={handleCloseDetails} />
      )}

      {/* Popup thêm môn học */}
      {isAddPopupOpen && (
        <SubjectAdd onClose={handleCloseAddPopup} onSubjectAdded={handleSubjectAdded} />
      )}

      {/* Popup chỉnh sửa môn học */}
      {isEditPopupOpen && (
        <SubjectEdit
          subject={editingSubject}
          onClose={handleCloseEditPopup}
          onSubjectUpdated={handleSubjectUpdated}
        />
      )}

      {/* Popup xác nhận xóa môn học */}
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
            {/* Tiêu đề có icon */}
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center space-x-3">
              <FaTools className="text-red-500" />
              <span>Xác nhận xóa</span>
            </h2>
            <p className="text-gray-700 mb-6 text-center">
              Bạn có chắc chắn muốn xóa môn học với thông tin sau không?
            </p>
            {/* Thông tin môn học */}
            <div className="text-gray-700 space-y-4">
              {/* Mã môn học */}
              <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                <span className="font-medium text-gray-700 flex items-center">
                  <div className="bg-green-500 text-white text-xl flex-shrink-0 rounded-full p-2 mr-2">
                    <FaCode />
                  </div>
                  Mã môn học:
                </span>
                <span className="text-gray-800">{deletingSubject?.code || "Không rõ"}</span>
              </div>
              {/* Tên môn học */}
              <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                <span className="font-medium text-gray-700 flex items-center">
                  <div className="bg-blue-500 text-white text-xl flex-shrink-0 rounded-full p-2 mr-2">
                    <FaBook />
                  </div>
                  Tên môn học:
                </span>
                <span className="text-gray-800">{deletingSubject?.name || "Không rõ"}</span>
              </div>
              {/* Mô tả */}
              <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                <span className="font-medium text-gray-700 flex items-center">
                  <div className="bg-yellow-500 text-white text-xl flex-shrink-0 rounded-full p-2 mr-2">
                    <FaInfoCircle />
                  </div>
                  Mô tả:
                </span>
                <span className="text-gray-800">{deletingSubject?.description || "Không rõ"}</span>
              </div>
              {/* Số tín chỉ */}
              <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                <span className="font-medium text-gray-700 flex items-center">
                  <div className="bg-purple-500 text-white text-xl flex-shrink-0 rounded-full p-2 mr-2">
                    <FaCreditCard />
                  </div>
                  Số tín chỉ:
                </span>
                <span className="text-gray-800">{deletingSubject?.credit || "Không rõ"}</span>
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
                onClick={handleDeleteSubject}
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

export default SubjectList;