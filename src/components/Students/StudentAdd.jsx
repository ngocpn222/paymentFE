import React, { useState } from "react";
import { addStudent } from "../../services/studentService";

const StudentAdd = () => {
  const [formData, setFormData] = useState({
    name: "",
    classId: "",
    gender: "",
    phone: "",
    dob: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addStudent(formData);
      setMessage("Học sinh đã được thêm thành công!");
    } catch (error) {
      console.error("Error adding student:", error);
      setMessage("Có lỗi xảy ra khi thêm học sinh.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Thêm học sinh mới</h1>
      {message && <p className="text-green-600 mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Tên học sinh</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Lớp</label>
          <input
            type="text"
            name="classId"
            value={formData.classId}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Giới tính</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Chọn giới tính</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Số điện thoại</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Ngày sinh</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Thêm học sinh
        </button>
      </form>
    </div>
  );
};

export default StudentAdd;