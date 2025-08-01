import React, { useEffect, useState } from "react";
import { getAllTuitions } from "../../services/tuitionService";

const TuitionList = () => {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTuitions = async () => {
      try {
        const data = await getAllTuitions();
        setTuitions(data);
      } catch (error) {
        console.error("Error fetching tuitions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTuitions();
  }, []);

  if (loading) {
    return <div>Đang tải danh sách học phí...</div>;
  }

  if (tuitions.length === 0) {
    return <div>Không có dữ liệu học phí.</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Danh sách học phí</h1>
      <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
        <thead>
          <tr className="bg-blue-100 text-gray-700">
            <th className="px-6 py-3 text-center">STT</th>
            <th className="px-6 py-3 text-center">Tên sinh viên</th>
            <th className="px-6 py-3 text-center">Tổng tín chỉ</th>
            <th className="px-6 py-3 text-center">Tổng tiền</th>
            <th className="px-6 py-3 text-center">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {tuitions.map((tuition, index) => (
            <tr key={tuition._id} className="text-gray-700 hover:bg-gray-100">
              <td className="px-6 py-3 text-center">{index + 1}</td>
              <td className="px-6 py-3 text-center">{tuition.student?.name || "Không rõ"}</td>
              <td className="px-6 py-3 text-center">{tuition.totalCredit}</td>
              <td className="px-6 py-3 text-center">{tuition.totalAmount.toLocaleString()} VND</td>
              <td className="px-6 py-3 text-center">
                {tuition.status === "paid" ? "Đã thanh toán" : "Chưa thanh toán"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TuitionList;