import api from "./api";

// Lấy danh sách học sinh
export const getStudents = async () => {
  try {
    const response = await api.get("/students");
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

// Lấy chi tiết học sinh theo ID
export const getStudentById = async (id) => {
  try {
    const response = await api.get(`/students/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching student with ID ${id}:`, error);
    throw error;
  }
};

// Thêm học sinh mới
export const addStudent = async (studentData) => {
  try {
    const response = await api.post("/students", studentData);
    return response.data;
  } catch (error) {
    console.error("Error adding student:", error);
    throw error;
  }
};

// Cập nhật thông tin học sinh
export const updateStudent = async (id, studentData) => {
  try {
    const response = await api.put(`/students/${id}`, studentData);
    return response.data;
  } catch (error) {
    console.error(`Error updating student with ID ${id}:`, error);
    throw error;
  }
};

// Xóa học sinh
export const deleteStudent = async (id) => {
  try {
    const response = await api.delete(`/students/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting student with ID ${id}:`, error);
    throw error;
  }
};