import React, { useEffect, useState } from "react";
import { getMyTuition, payTuition } from "../../services/tuitionService";

const TuitionDetails = () => {
  const [tuition, setTuition] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTuition = async () => {
      try {
        const data = await getMyTuition();
        setTuition(data);
      } catch (error) {
        console.error("Error fetching tuition details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTuition();
  }, []);

  const handlePayTuition = async () => {
    try {
      const updatedTuition = await payTuition(tuition._id);
      setTuition(updatedTuition);
      alert("Thanh toán thành công!");
    } catch (error) {
      console.error("Error paying tuition:", error);
      alert("Thanh toán thất bại!");
    }
  };

  if (loading) {
    return <div>Đang tải chi tiết học phí...</div>;
  }

  if (!tuition) {
    return <div>Không tìm thấy thông tin học phí.</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Chi tiết học phí</h1>
      <p><strong>Sinh viên:</strong> {tuition.student?.name || "Không rõ"}</p>
      <p><strong>Email:</strong> {tuition.student?.email || "Không rõ"}</p>
      <p><strong>Tổng tín chỉ:</strong> {tuition.totalCredit}</p>
      <p><strong>Tổng tiền:</strong> {tuition.totalAmount.toLocaleString()} VND</p>
      <p><strong>Trạng thái:</strong> {tuition.status === "paid" ? "Đã thanh toán" : "Chưa thanh toán"}</p>
      {tuition.status === "unpaid" && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={handlePayTuition}
        >
          Thanh toán
        </button>
      )}
    </div>
  );
};

export default TuitionDetails;