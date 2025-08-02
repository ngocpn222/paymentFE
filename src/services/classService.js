import api from "./api";

// Hàm xóa lớp học
export const deleteClass = async (id) => {
  try {
    const response = await api.delete(`/classes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting class:", error.response?.data || error.message);
    throw error;
  }
};

// Hàm cập nhật lớp học
export const updateClass = async (id, classData) => {
  try {
    const response = await api.put(`/classes/${id}`, classData);
    return response.data;
  } catch (error) {
    console.error("Error updating class:", error.response?.data || error.message);
    throw error;
  }
};

// Hàm thêm lớp học
export const addClass = async (classData) => {
  try {
    const response = await api.post("/classes", classData);
    return response.data;
  } catch (error) {
    console.error("Error adding class:", error.response?.data || error.message);
    throw error;
  }
};

// Hàm lấy danh sách lớp học
export const getClasses = async () => {
  try {
    const response = await api.get("/classes");
    return response.data;
  } catch (error) {
    console.error("Error fetching classes:", error);
    throw error;
  }
};

// Hàm lấy chi tiết lớp học
export const getClassDetails = async (id) => {
  try {
    const response = await api.get(`/classes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching class details:", error.response?.data || error.message);
    throw error;
  }
};