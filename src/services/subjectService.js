import api from "./api";

// Lấy danh sách môn học
export const getSubjects = async () => {
  try {
    const response = await api.get("/subjects");
    return response.data;
  } catch (error) {
    console.error("Error fetching subjects:", error.response?.data || error.message);
    throw error;
  }
};

// Thêm môn học mới
export const addSubject = async (subjectData) => {
  try {
    const response = await api.post("/subjects", subjectData);
    return response.data;
  } catch (error) {
    console.error("Error adding subject:", error.response?.data || error.message);
    throw error;
  }
};

// Cập nhật môn học
export const updateSubject = async (id, subjectData) => {
  try {
    const response = await api.put(`/subjects/${id}`, subjectData);
    return response.data;
  } catch (error) {
    console.error(`Error updating subject with ID ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

// Xóa môn học
export const deleteSubject = async (id) => {
  try {
    const response = await api.delete(`/subjects/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting subject:", error.response?.data || error.message);
    throw error;
  }
};