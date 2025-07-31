import React, { useEffect, useState } from "react";
import { FaTimes, FaChalkboardTeacher, FaInfoCircle, FaUsers, FaSearch } from "react-icons/fa"; // Import thêm icon tìm kiếm
import { getClassDetails } from "../../services/classService";

const ClassDetails = ({ classData, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // State để lưu từ khóa tìm kiếm
  const [filteredStudents, setFilteredStudents] = useState([]); // State để lưu danh sách học sinh sau khi lọc

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getClassDetails(classData._id);
        setDetails(data);
        setFilteredStudents(data.students || []); // Khởi tạo danh sách học sinh
      } catch (error) {
        console.error("Error fetching class details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [classData]);

  // Xử lý tìm kiếm
  useEffect(() => {
    if (details?.students) {
      const filtered = details.students.filter((student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
  }, [searchTerm, details]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-bold text-gray-700">Đang tải...</div>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-bold text-red-500">Không tìm thấy lớp học</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      {/* Nền trong suốt */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onClick={onClose}
      ></div>
      {/* Form chi tiết lớp học */}
      <div className="relative bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-4xl">
        {/* Nút đóng */}
        <button
          className="absolute top-2 right-2 w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
          onClick={onClose}
        >
          <FaTimes className="text-gray-500 hover:text-red-500 transition" />
        </button>
        {/* Tiêu đề có icon */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center space-x-3">
          <FaChalkboardTeacher className="text-indigo-500" />
          <span>Chi tiết lớp học</span>
        </h1>

        {/* Tên lớp */}
        <div className="flex justify-between items-center border-b border-gray-300 py-2">
          <span className="text-lg font-medium text-gray-700 flex items-center">
            <FaChalkboardTeacher className="mr-2 text-indigo-500" /> Tên lớp:
          </span>
          <span className="text-lg text-gray-800">
            {details.name || "Không rõ"}
          </span>
        </div>

        {/* Mô tả */}
        <div className="flex justify-between items-center border-b border-gray-300 py-2">
          <span className="text-lg font-medium text-gray-700 flex items-center">
            <FaInfoCircle className="mr-2 text-green-500" /> Mô tả:
          </span>
          <span className="text-lg text-gray-800">
            {details.description || "Không có"}
          </span>
        </div>

        {/* Số lượng học sinh */}
        <div className="flex justify-between items-center border-b border-gray-300 py-2">
          <span className="text-lg font-medium text-gray-700 flex items-center">
            <FaUsers className="mr-2 text-blue-500" /> Số lượng học sinh:
          </span>
          <span className="text-lg text-gray-800">
            {details.students?.length || 0}
          </span>
        </div>

        {/* Tìm kiếm */}
        <div className="mt-4 flex items-center space-x-3">
          <FaSearch className="text-gray-500 text-xl" />
          <input
            type="text"
            placeholder="Tìm kiếm học sinh..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Danh sách học sinh dưới dạng bảng */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
            <thead>
              <tr className="bg-blue-100 text-gray-700">
                <th className="px-6 py-3 text-center">STT</th>
                <th className="px-6 py-3 text-center">Tên học sinh</th>
                <th className="px-6 py-3 text-center">Số điện thoại</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student, index) => (
                  <tr
                    key={student._id}
                    className={`text-gray-700 hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                  >
                    <td className="px-6 py-3 text-center">{index + 1}</td>
                    <td className="px-6 py-3 text-center">{student.name}</td>
                    <td className="px-6 py-3 text-center">{student.phone || "Không có"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-3 text-center text-gray-500">
                    Không tìm thấy học sinh nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Nút đóng */}
        <div className="flex justify-center mt-6">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
            onClick={onClose}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassDetails;