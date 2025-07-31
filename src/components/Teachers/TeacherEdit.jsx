import React, { useState, useEffect } from "react";
import { updateTeacher } from "../../services/teacherService";
import { getClasses } from "../../services/classService";
import { FaTimes } from "react-icons/fa";
import Select from "react-select";

const TeacherEdit = ({ teacher, onClose, onTeacherUpdated }) => {
  const [formData, setFormData] = useState({
    name: teacher.name || "",
    phone: teacher.phone || "",
    email: teacher.email || "",
    gender: teacher.gender || "",
    dob: teacher.dob ? teacher.dob.split("T")[0] : "",
    classIds: teacher.classes ? teacher.classes.map((cls) => cls._id) : [],
  });
  const [classes, setClasses] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data = await getClasses();
        const formattedClasses = data.map((cls) => ({
          value: cls._id,
          label: cls.name,
        }));
        setClasses(formattedClasses);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClassChange = (selectedOptions) => {
    const selectedIds = selectedOptions.map((option) => option.value);
    setFormData({ ...formData, classIds: selectedIds });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedTeacher = await updateTeacher(teacher._id, formData);
      onTeacherUpdated(updatedTeacher);
      onClose();
    } catch (error) {
      console.error("Error updating teacher:", error);
      setMessage("Có lỗi xảy ra khi cập nhật giáo viên.");
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
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <button
          className="absolute top-2 right-2 w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
          onClick={onClose}
        >
          <FaTimes className="text-gray-500 hover:text-red-500 transition" />
        </button>
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Sửa giáo viên
        </h1>
        {message && (
          <p
            className={`text-center mb-4 ${message.includes("thành công") ? "text-green-600" : "text-red-600"
              }`}
          >
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {/* Cột 1 */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Tên giáo viên
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập tên giáo viên"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập email"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Số điện thoại
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập số điện thoại"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Giới tính
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Chọn giới tính</option>
              <option value="Male">Nam</option>
              <option value="Female">Nữ</option>
              <option value="Other">Khác</option>
            </select>
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Ngày sinh
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Multi-select dropdown */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Chọn lớp học
            </label>
            <Select
              isMulti
              options={classes}
              value={classes.filter((cls) =>
                formData.classIds.includes(cls.value)
              )}
              onChange={handleClassChange}
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Chọn lớp học"
            />
          </div>
          {/* Nút submit */}
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Cập nhật giáo viên
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherEdit;