import React, { useState, useEffect } from "react";
import { getTeachers, deleteTeacher } from "../../services/teacherService";
import TeacherAdd from "./TeacherAdd";
import TeacherEdit from "./TeacherEdit";
import TeacherDetails from "./TeacherDetails";
import {
  FaChalkboardTeacher,
  FaPlus,
  FaUser,
  FaPhone,
  FaVenusMars,
  FaTrash,
  FaCalendarAlt,
  FaEnvelope,
} from "react-icons/fa";
import { format } from "date-fns";

const TeacherList = () => {
  // State quản lý
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isDetailsPopupOpen, setIsDetailsPopupOpen] = useState(false);
  const [deletingTeacher, setDeletingTeacher] = useState(null);

  // Lấy danh sách giáo viên
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

  // Hàm xử lý popup
  const handleOpenAddPopup = () => setIsAddPopupOpen(true);
  const handleCloseAddPopup = () => setIsAddPopupOpen(false);

  const handleOpenEditPopup = (teacher) => {
    setSelectedTeacher(teacher);
    setIsEditPopupOpen(true);
  };
  const handleCloseEditPopup = () => setIsEditPopupOpen(false);

  const handleOpenDeletePopup = (teacher) => {
    setDeletingTeacher(teacher);
    setIsDeletePopupOpen(true);
  };
  const handleCloseDeletePopup = () => setIsDeletePopupOpen(false);

  const handleDeleteTeacher = async () => {
    try {
      await deleteTeacher(deletingTeacher._id);
      setTeachers((prev) => prev.filter((t) => t._id !== deletingTeacher._id));
      handleCloseDeletePopup();
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  const translateGender = (gender) => {
    switch (gender) {
      case "Male":
        return "Nam";
      case "Female":
        return "Nữ";
      case "Other":
        return "Khác";
      default:
        return "Không rõ";
    }
  };

  const formatTeacherId = (index) => {
    return `GV${(index + 1).toString().padStart(3, "0")}`; // Định dạng mã thành GV001, GV002...
  };

  // Hiển thị trạng thái tải
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
          className="flex items-center bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition shadow-md"
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
              <th className="px-6 py-3 text-center">Mã</th> {/* Thêm cột Mã */}
              <th className="px-6 py-3 text-center">
                <FaUser className="inline-block mr-2" />
                Tên
              </th>
              <th className="px-6 py-3 text-center">
                <FaVenusMars className="inline-block mr-2" />
                Giới tính
              </th>
              <th className="px-6 py-3 text-center">
                <FaPhone className="inline-block mr-2" />
                Số điện thoại
              </th>
              <th className="px-6 py-3 text-center">
                <FaCalendarAlt className="inline-block mr-2" />
                Ngày sinh
              </th>
              <th className="px-6 py-3 text-center">
                <FaTrash className="inline-block mr-2" />
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher, index) => (
              <tr
                key={teacher._id}
                className={`text-gray-700 hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
              >
                <td className="px-6 py-3 text-center">{formatTeacherId(index)}</td> {/* Hiển thị mã giáo viên */}
                <td className="px-6 py-3 text-center">{teacher.name}</td>
                <td className="px-6 py-3 text-center">{translateGender(teacher.gender)}</td>
                <td className="px-6 py-3 text-center">{teacher.phone || "Không có"}</td>
                <td className="px-6 py-3 text-center">
                  {teacher.dob
                    ? format(new Date(teacher.dob), "dd/MM/yyyy")
                    : "Không rõ"}
                </td>
                <td className="px-6 py-3 text-center">
                  <div className="flex justify-center items-center space-x-2">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => {
                        setSelectedTeacher(teacher);
                        setIsDetailsPopupOpen(true);
                      }}
                      title="Xem"
                    >
                      <FaUser />
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
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup thêm giáo viên */}
      {isAddPopupOpen && (
        <TeacherAdd
          onClose={handleCloseAddPopup}
          onTeacherAdded={(newTeacher) =>
            setTeachers((prev) => [...prev, newTeacher])
          }
        />
      )}

      {/* Popup chỉnh sửa giáo viên */}
      {isEditPopupOpen && (
        <TeacherEdit
          teacher={selectedTeacher}
          onClose={handleCloseEditPopup}
          onTeacherUpdated={(updatedTeacher) =>
            setTeachers((prev) =>
              prev.map((t) =>
                t._id === updatedTeacher._id ? updatedTeacher : t
              )
            )
          }
        />
      )}

      {/* Popup xác nhận xóa giáo viên */}
      {isDeletePopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            onClick={handleCloseDeletePopup}
          ></div>
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center space-x-3">
              <FaTrash className="text-red-500" />
              <span>Xác nhận xóa</span>
            </h2>
            <p className="text-gray-700 mb-6 text-center">
              Bạn có chắc chắn muốn xóa giáo viên với thông tin sau không?
            </p>
            <div className="text-gray-700 space-y-4">
              <div className="flex justify-between border-b border-gray-300 pb-2">
                <span className="font-medium text-gray-700 flex items-center">
                  <div className="bg-blue-500 text-white text-xl flex-shrink-0 rounded-full p-2 mr-2">
                    <FaUser />
                  </div>
                  Tên giáo viên:
                </span>
                <span className="text-gray-800">{deletingTeacher?.name || "Không rõ"}</span>
              </div>
              <div className="flex justify-between border-b border-gray-300 pb-2">
                <span className="font-medium text-gray-700 flex items-center">
                  <div className="bg-green-500 text-white text-xl flex-shrink-0 rounded-full p-2 mr-2">
                    <FaEnvelope />
                  </div>
                  Email:
                </span>
                <span className="text-gray-800">{deletingTeacher?.email || "Không có"}</span>
              </div>
              <div className="flex justify-between border-b border-gray-300 pb-2">
                <span className="font-medium text-gray-700 flex items-center">
                  <div className="bg-yellow-500 text-white text-xl flex-shrink-0 rounded-full p-2 mr-2">
                    <FaPhone />
                  </div>
                  Số điện thoại:
                </span>
                <span className="text-gray-800">{deletingTeacher?.phone || "Không có"}</span>
              </div>
              <div className="flex justify-between border-b border-gray-300 pb-2">
                <span className="font-medium text-gray-700 flex items-center">
                  <div className="bg-pink-500 text-white text-xl flex-shrink-0 rounded-full p-2 mr-2">
                    <FaVenusMars />
                  </div>
                  Giới tính:
                </span>
                <span className="text-gray-800">{translateGender(deletingTeacher?.gender)}</span>
              </div>
              <div className="flex justify-between border-b border-gray-300 pb-2">
                <span className="font-medium text-gray-700 flex items-center">
                  <div className="bg-purple-500 text-white text-xl flex-shrink-0 rounded-full p-2 mr-2">
                    <FaCalendarAlt />
                  </div>
                  Ngày sinh:
                </span>
                <span className="text-gray-800">
                  {deletingTeacher?.dob
                    ? format(new Date(deletingTeacher.dob), "dd/MM/yyyy")
                    : "Không rõ"}
                </span>
              </div>
            </div>
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

      {/* Popup chi tiết giáo viên */}
      {isDetailsPopupOpen && selectedTeacher && (
        <TeacherDetails
          teacher={selectedTeacher}
          onClose={() => setIsDetailsPopupOpen(false)}
        />
      )}
    </div>
  );
};

export default TeacherList;