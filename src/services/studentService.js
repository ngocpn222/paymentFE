import api from "./api";

// ✅ Lấy danh sách học sinh
export const getStudents = async () => {
  try {
    const response = await api.get("/students");
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching students:", error);
    throw error;
  }
};

// ✅ Lấy chi tiết học sinh theo ID
export const getStudentById = async (id) => {
  try {
    const response = await api.get(`/students/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      `❌ Error fetching student with ID ${id}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

// ✅ Thêm học sinh mới
export const addStudent = async (studentData) => {
  try {
    const response = await api.post("/students", studentData);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Error adding student:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// ✅ Cập nhật thông tin học sinh
export const updateStudent = async (id, studentData) => {
  try {
    const response = await api.put(
      `/students/${id}`,
      studentData
    );
    return response.data;
  } catch (error) {
    console.error(
      `❌ Error updating student with ID ${id}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

// ✅ Xóa học sinh
export const deleteStudent = async (id) => {
  try {
    const response = await api.delete(`/students/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      `❌ Error deleting student with ID ${id}:`,
      error.response?.data || error.message
    );
    throw error;
  }
};

// ✅ Lấy thông tin học sinh hiện tại từ studentId lưu trong localStorage
export const getCurrentStudent = async () => {
  const studentId = localStorage.getItem("studentId");
  if (!studentId)
    throw new Error("Không tìm thấy studentId trong localStorage");
  return await getStudentById(studentId);
};
// services/studentIdService.js

export const fetchAndStoreStudentId = async (userId, token) => {
  try {
    const response = await api.get(`/students/student-id/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const studentId = response.data?._id;
    if (!studentId) {
      throw new Error("Không tìm thấy studentId trong response");
    }

    localStorage.setItem("studentId", studentId);
    console.log("Student ID đã được lưu:", studentId);
    return studentId;
  } catch (error) {
    console.error(
      "Lỗi khi lấy và lưu studentId:",
      error.response?.data || error.message
    );
    throw error;
  }
};
