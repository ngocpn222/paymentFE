import api from "./api";

// Lấy danh sách giáo viên
export const getTeachers = async () => {
  try {
    const response = await api.get("/teachers");
    return response.data;
  } catch (error) {
    console.error("Error fetching teachers:", error.response?.data || error.message);
    throw error;
  }
};

// Lấy chi tiết giáo viên theo ID
export const getTeacherById = async (id) => {
  try {
    const response = await api.get(`/teachers/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching teacher with ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

// Thêm giáo viên mới
export const addTeacher = async (teacherData) => {
  try {
    console.log("Adding teacher with data:", teacherData);
    const response = await api.post("/teachers", teacherData);
    return response.data;
  } catch (error) {
    console.error("Error adding teacher:", error.response?.data || error.message);
    throw error;
  }
};

// Cập nhật thông tin giáo viên
export const updateTeacher = async (id, teacherData) => {
  try {
    const response = await api.put(`/teachers/${id}`, teacherData);
    return response.data;
  } catch (error) {
    console.error(`Error updating teacher with ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

// Xóa giáo viên
export const deleteTeacher = async (id) => {
  try {
    const response = await api.delete(`/teachers/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting teacher:", error.response?.data || error.message);
    throw error;
  }
};