import api from "./api";

// Lấy danh sách học phí
export const getAllTuitions = async () => {
  try {
    const response = await api.get("/tuitions");
    return response.data;
  } catch (error) {
    console.error("Error fetching tuitions:", error.response?.data || error.message);
    throw error;
  }
};

// Lấy chi tiết học phí của sinh viên
export const getMyTuition = async () => {
  try {
    const response = await api.get("/tuitions/my");
    return response.data;
  } catch (error) {
    console.error("Error fetching my tuition:", error.response?.data || error.message);
    throw error;
  }
};

// Thanh toán học phí
export const payTuition = async (id) => {
  try {
    const response = await api.put(`/tuitions/${id}/pay`);
    return response.data;
  } catch (error) {
    console.error("Error paying tuition:", error.response?.data || error.message);
    throw error;
  }
};