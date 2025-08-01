import React, { useState, useEffect } from "react";
import { FaTimes, FaUserGraduate, FaBook } from "react-icons/fa";
import { addRegisteredSubject } from "../../services/registeredSubjectService";
import { getStudents } from "../../services/studentService";
import { getSubjects } from "../../services/subjectService";

const AddRegisteredSubject = ({ onClose, onSuccess }) => {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [formData, setFormData] = useState({
    studentId: "",
    selectedSubjects: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentData = await getStudents();
        const subjectData = await getSubjects();
        setStudents(studentData);
        setSubjects(subjectData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleSubjectSelection = (subjectId) => {
    setFormData((prevData) => ({
      ...prevData,
      selectedSubjects: prevData.selectedSubjects.includes(subjectId)
        ? prevData.selectedSubjects.filter((id) => id !== subjectId) // Bỏ chọn nếu đã được chọn
        : [...prevData.selectedSubjects, subjectId], // Thêm vào danh sách nếu chưa được chọn
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      for (const subjectId of formData.selectedSubjects) {
        await addRegisteredSubject({ student: formData.studentId, subject: subjectId });
      }
      alert("Đăng ký môn học thành công!");
      onSuccess();
      onClose();
    } catch (error) {
      alert("Đăng ký môn học thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      {/* Nền trong suốt */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onClick={onClose}
      ></div>
      {/* Form thêm đăng ký môn học */}
      <div className="relative bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-lg">
        {/* Nút đóng */}
        <button
          className="absolute top-2 right-2 w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
          onClick={onClose}
        >
          <FaTimes className="text-gray-500 hover:text-red-500 transition" />
        </button>
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center space-x-3">
          <FaUserGraduate className="text-indigo-500" />
          <span>Thêm đăng ký môn học</span>
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Chọn sinh viên */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Sinh viên
            </label>
            <div className="flex items-center space-x-4">
              <div className="bg-indigo-500 text-white text-xl flex-shrink-0 rounded-full p-2">
                <FaUserGraduate />
              </div>
              <select
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="">Chọn sinh viên</option>
                {students.map((student) => (
                  <option key={student._id} value={student._id}>
                    {student.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Chọn môn học */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Môn học
            </label>
            <div className="grid grid-cols-2 gap-4">
              {subjects.map((subject) => (
                <div
                  key={subject._id}
                  className={`p-4 border rounded-lg cursor-pointer ${formData.selectedSubjects.includes(subject._id)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100"
                    }`}
                  onClick={() => toggleSubjectSelection(subject._id)}
                >
                  {subject.name}
                </div>
              ))}
            </div>
          </div>

          {/* Nút thêm */}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
            disabled={loading || !formData.studentId || formData.selectedSubjects.length === 0}
          >
            {loading ? "Đang xử lý..." : "Thêm đăng ký"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRegisteredSubject;