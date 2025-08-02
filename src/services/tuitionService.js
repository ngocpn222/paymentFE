import api from "./api";

// Lấy tất cả học phí (admin, staff)
export const getAllTuitions = async () => {
  try {
    const res = await api.get("/tuition");
    return res.data;
  } catch (error) {
    console.error("Error fetching tuitions:", error);
    throw error;
  }
};

// Lấy học phí của sinh viên hiện tại (student)
export const getMyTuition = async () => {
  try {
    const res = await api.get("/tuition/my");
    return res.data;
  } catch (error) {
    console.error("Error fetching my tuition:", error);
    throw error;
  }
};

// Thanh toán học phí (student)
export const payTuition = async (tuitionId, paymentData) => {
  try {
    const res = await api.put(`/tuition/${tuitionId}/pay`, paymentData);
    return res.data;
  } catch (error) {
    console.error("Error paying tuition:", error);
    throw error;
  }
};

export const createTuition = async (studentId) => {
  return api.post("/tuition", { studentId }).then((res) => res.data);
};