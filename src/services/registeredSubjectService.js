import api from "./api";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

// ==== TIỆN ÍCH AUTH ==== //
const getToken = () => localStorage.getItem("token");

const getAuthHeader = () => {
  const token = getToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const getStudentIdFromToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    console.log("Thông tin sinh viên đang đăng nhập:", decoded);
    return decoded.userId || decoded.id || decoded.studentId || null;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};

// ==== API GỌI TỚI BACKEND ==== //

// 🟢 Thêm đăng ký nhiều môn học
export const addRegisteredSubject = async ({ studentId, subjectIds }) => {
  if (!Array.isArray(subjectIds) || subjectIds.length === 0) {
    throw new Error("subjectIds must be a non-empty array");
  }
  const data = { student: studentId, subjectIds };

  try {
    const response = await api.post(
      "/registered-subjects/many",
      data,
      getAuthHeader()
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error adding registered subjects:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// 🔵 Lấy tất cả đăng ký môn học (toàn bộ - thường dùng cho admin)
export const getRegisteredSubjects = async () => {
  try {
    const response = await api.get("/registered-subjects");
    return response.data;
  } catch (error) {
    console.error("Error fetching registered subjects:", error);
    throw error;
  }
};

// 🟡 Lấy môn học đã đăng ký của 1 student (theo token)
export const getSubjectsByStudent = async () => {
  const student = getStudentIdFromToken();
  if (!student) throw new Error("Unauthorized: missing student id");

  try {
    const response = await api.get(
      `/registered-subjects?student=${student}`,
      getAuthHeader()
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching student registered subjects:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// 🔴 Xóa đăng ký môn học
export const deleteRegisteredSubject = async (id) => {
  const token = localStorage.getItem("token"); // hoặc nơi bạn lưu token
  return axios.delete(
    `http://localhost:3001/api/registered-subjects/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
