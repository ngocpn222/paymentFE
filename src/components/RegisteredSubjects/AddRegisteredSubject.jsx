import React, { useState, useEffect } from "react";
import { FaTimes, FaUserGraduate, FaBook } from "react-icons/fa";
import { addRegisteredSubject } from "../../services/registeredSubjectService";
import { getSubjects } from "../../services/subjectService";

const AddRegisteredSubject = ({ onClose, onSuccess }) => {
  const [subjects, setSubjects] = useState([]);
  const [formData, setFormData] = useState({
    selectedSubjects: [],
  });
  const [loading, setLoading] = useState(false);
  const [studentId, setStudentId] = useState("");
  console.log("Thông tin sinh viên đang đăng nhập:", studentId);

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

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <button
          className="absolute top-2 right-2 w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100"
          onClick={onClose}
        >
          <FaTimes className="text-gray-500 hover:text-red-500" />
        </button>
        <h1 className="text-2xl font-bold text-center mb-4">
          <FaBook className="inline mr-2 text-indigo-500" />
          Đăng ký môn học
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-gray-700 font-semibold">
              Nhập studentId
            </label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Nhập studentId"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-700 font-semibold">
              Chọn môn học
            </label>
            <div className="grid grid-cols-2 gap-4">
              {subjects.map((subject) => (
                <div
                  key={subject._id}
                  className={`p-3 border rounded cursor-pointer ${
                    formData.selectedSubjects.includes(subject._id)
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
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
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
