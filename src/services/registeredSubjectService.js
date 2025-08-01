import api from "./api";

// Thêm đăng ký môn học
export const addRegisteredSubject = async (data) => {
  try {
    const response = await api.post("/registered-subjects", data);
    return response.data;
  } catch (error) {
    console.error("Error adding registered subject:", error.response?.data || error.message);
    throw error;
  }
};

// Lấy danh sách đăng ký môn học
export const getRegisteredSubjects = async () => {
  try {
    const response = await api.get("/registered-subjects");
    return response.data;
  } catch (error) {
    console.error("Error fetching registered subjects:", error.response?.data || error.message);
    throw error;
  }
};

// Xóa đăng ký môn học
export const deleteRegisteredSubject = async (id) => {
  try {
    const response = await api.delete(`/registered-subjects/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting registered subject:", error.response?.data || error.message);
    throw error;
  }
};