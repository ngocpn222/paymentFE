import React, { useState, useEffect } from "react";
import { FaTimes, FaUserGraduate, FaBook, FaSearch } from "react-icons/fa";
import { addRegisteredSubject } from "../../services/registeredSubjectService";
import { getSubjects } from "../../services/subjectService";
import { jwtDecode } from "jwt-decode";

const AddRegisteredSubject = ({ onClose, onSuccess }) => {
  const [subjects, setSubjects] = useState([]);
  const [formData, setFormData] = useState({
    selectedSubjects: [],
  });
  const [loading, setLoading] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subjectData = await getSubjects();
        setSubjects(subjectData);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.role === "student") {
        setStudentId(decoded.studentId);
      }
    }
  }, []);

  const toggleSubjectSelection = (subjectId) => {
    setFormData((prevData) => ({
      ...prevData,
      selectedSubjects: prevData.selectedSubjects.includes(subjectId)
        ? prevData.selectedSubjects.filter((id) => id !== subjectId)
        : [...prevData.selectedSubjects, subjectId],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentId) {
      alert("Vui lòng nhập studentId.");
      return;
    }
    setLoading(true);
    try {
      await addRegisteredSubject({
        studentId: studentId,
        subjectIds: formData.selectedSubjects,
      });
      alert("Đăng ký môn học thành công!");
      onSuccess();
      onClose();
    } catch (error) {
      alert("Đăng ký môn học thất bại!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSubjects = subjects.filter(
    (subject) =>
      subject.name.toLowerCase().includes(search.toLowerCase()) ||
      (subject.code && subject.code.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      {/* Nền mờ */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onClick={onClose}
      ></div>
      {/* Form nổi */}
      <div className="relative bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-lg">
        {/* Nút đóng */}
        <button
          className="absolute top-2 right-2 w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
          onClick={onClose}
        >
          <FaTimes className="text-gray-500 hover:text-red-500 transition" />
        </button>
        {/* Tiêu đề */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center space-x-3">
          <FaBook className="text-indigo-500" />
          <span>Đăng ký môn học</span>
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Thanh tìm kiếm */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2 flex items-center">
              <FaSearch className="mr-2 text-gray-400" />
              Tìm kiếm tên hoặc mã môn học
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Nhập tên hoặc mã môn học..."
            />
          </div>
          {/* Nhập studentId */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2 flex items-center">
              <FaUserGraduate className="mr-2 text-green-500" />
              Mã học sinh
            </label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Nhập mã học sinh"
              required
              disabled={!!studentId} // khóa input nếu đã có studentId từ token
            />
          </div>
          {/* Chọn môn học */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2 flex items-center">
              <FaBook className="mr-2 text-indigo-500" />
              Chọn môn học
            </label>
            <div className="grid grid-cols-2 gap-3">
              {filteredSubjects.map((subject) => {
                const selected = formData.selectedSubjects.includes(subject._id);
                return (
                  <button
                    type="button"
                    key={subject._id}
                    className={`
                      flex items-center justify-between px-3 py-2 border rounded-lg shadow-sm transition
                      ${selected
                        ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200"
                        : "border-gray-200 bg-white hover:bg-gray-50"}
                      focus:outline-none
                    `}
                    style={{ fontSize: "15px" }}
                    onClick={() => toggleSubjectSelection(subject._id)}
                  >
                    <span className="flex items-center">
                      <FaBook className="mr-2 text-indigo-400" />
                      <span className="font-medium">{subject.name}</span>
                    </span>
                    <span className={`ml-2 px-2 py-0.5 rounded text-xs font-mono
                      ${selected ? "bg-indigo-100 text-indigo-700" : "bg-gray-200 text-gray-700"}
                    `}>
                      {subject.code}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          {/* Nút đăng ký */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
            disabled={
              loading || formData.selectedSubjects.length === 0 || !studentId
            }
          >
            {loading ? "Đang xử lý..." : "Đăng ký"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRegisteredSubject;
