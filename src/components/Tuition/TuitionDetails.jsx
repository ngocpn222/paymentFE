import React, { useEffect } from "react";
import {
  FaTimes,
  FaUserGraduate,
  FaUser,
  FaChalkboardTeacher,
  FaEnvelope,
  FaListOl,
  FaMoneyBillWave,
  FaCheckCircle,
  FaTimesCircle,
  FaBookOpen,
  FaBarcode,
  FaHashtag,
  FaCoins,
} from "react-icons/fa";

const TuitionDetails = ({ tuition, onClose, autoPay }) => {
  console.log("tuition.student", tuition.student);

  useEffect(() => {
    if (autoPay && tuition.status !== "paid") {
      handlePay();
    }
    // eslint-disable-next-line
  }, [autoPay, tuition]);

  const handlePay = async () => {
    try {
      await import("../../services/tuitionService").then(({ payTuition }) =>
        payTuition(tuition._id)
      );
      alert("Thanh toán thành công!");
      onClose();
      window.location.reload();
    } catch (err) {
      alert("Thanh toán thất bại!");
    }
  };

  // Hàm gọi API mock Momo
  const handleMockMomo = async () => {
    try {
      const res = await fetch("http://localhost:3001/mock-momo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tuitionId: tuition._id,
          student: tuition.student,
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Thanh toán Momo giả lập thành công!");
        onClose();
        window.location.reload();
      } else {
        alert("Thanh toán Momo giả lập thất bại!");
      }
    } catch (err) {
      alert("Thanh toán Momo giả lập thất bại!");
    }
  };

  if (!tuition) return null;
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      {/* Nền trong suốt */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onClick={onClose}
      ></div>
      {/* Popup */}
      <div className="relative bg-white bg-opacity-95 p-8 rounded-lg shadow-lg w-full max-w-2xl">
        {/* Nút đóng */}
        <button
          className="absolute top-2 right-2 w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
          onClick={onClose}
        >
          <FaTimes className="text-gray-500 hover:text-red-500 transition" />
        </button>
        {/* Tiêu đề có icon */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center space-x-3">
          <FaUserGraduate className="text-blue-500" />
          <span>Chi tiết học phí</span>
        </h1>
        {/* Thông tin sinh viên */}
        <div className="flex flex-col gap-0.5">
          <div className="flex justify-between items-center border-b border-gray-300 py-2">
            <span className="text-lg font-medium text-gray-700 flex items-center">
              <FaUser className="mr-2 text-blue-500" /> Sinh viên:
            </span>
            <span className="text-lg text-gray-800">
              {tuition.student?.name || "Không rõ"}
            </span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-300 py-2">
            <span className="text-lg font-medium text-gray-700 flex items-center">
              <FaBarcode className="mr-2 text-indigo-500" /> Mã số sinh viên:
            </span>
            <span className="text-lg text-gray-800">
              {tuition.student?.mssv ||
                tuition.student?.studentId ||
                tuition.student?.code ||
                tuition.student?._id ||
                "Không rõ"}
            </span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-300 py-2">
            <span className="text-lg font-medium text-gray-700 flex items-center">
              <FaChalkboardTeacher className="mr-2 text-green-500" /> Lớp:
            </span>
            <span className="text-lg text-gray-800">
              {tuition.student?.classId?.name || "Không rõ"}
            </span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-300 py-2">
            <span className="text-lg font-medium text-gray-700 flex items-center">
              <FaEnvelope className="mr-2 text-pink-500" /> Email:
            </span>
            <span className="text-lg text-gray-800">
              {tuition.student?.email || "Không rõ"}
            </span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-300 py-2">
            <span className="text-lg font-medium text-gray-700 flex items-center">
              <FaListOl className="mr-2 text-yellow-500" /> Tổng tín chỉ:
            </span>
            <span className="text-lg text-gray-800">{tuition.totalCredit}</span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-300 py-2">
            <span className="text-lg font-medium text-gray-700 flex items-center">
              <FaMoneyBillWave className="mr-2 text-purple-500" /> Tổng tiền:
            </span>
            <span className="text-lg text-gray-800">
              {tuition.totalAmount?.toLocaleString()} VND
            </span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-300 py-2">
            <span className="text-lg font-medium text-gray-700 flex items-center">
              <FaCheckCircle className="mr-2 text-green-500" /> Trạng thái:
            </span>
            <span className="text-lg text-gray-800">
              {tuition.status === "paid" ? (
                <span className="flex items-center text-green-600 font-semibold">
                  <FaCheckCircle className="mr-1" /> Đã thanh toán
                </span>
              ) : (
                <span className="flex items-center text-red-500 font-semibold">
                  <FaTimesCircle className="mr-1" /> Chưa thanh toán
                </span>
              )}
            </span>
          </div>
        </div>
        {/* Danh sách môn */}
        <div className="mt-6">
          <b className="flex items-center gap-2 text-base text-gray-700 mb-2">
            <FaBookOpen className="text-blue-400" /> Các môn đã đăng ký:
          </b>
          <table className="w-full mt-2 border">
            <thead>
              <tr>
                <th className="border px-2 py-1">
                  <FaHashtag className="inline mr-1" /> Mã môn
                </th>
                <th className="border px-2 py-1">
                  <FaBookOpen className="inline mr-1" /> Tên môn
                </th>
                <th className="border px-2 py-1">Tín chỉ</th>
                <th className="border px-2 py-1">
                  <FaCoins className="inline mr-1" /> Đơn giá
                </th>
                <th className="border px-2 py-1">Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {tuition.registeredSubjects?.map((subj, idx) => (
                <tr key={idx}>
                  <td className="border px-2 py-1 font-mono">{subj.code}</td>
                  <td className="border px-2 py-1">{subj.name}</td>
                  <td className="border px-2 py-1 text-center">
                    {subj.credit}
                  </td>
                  <td className="border px-2 py-1 text-right">
                    {subj.unitPrice?.toLocaleString() || "300,000"} VND
                  </td>
                  <td className="border px-2 py-1 text-right">
                    {(subj.unitPrice && subj.credit
                      ? subj.unitPrice * subj.credit
                      : 300000 * subj.credit
                    ).toLocaleString()}{" "}
                    VND
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Nút thanh toán Momo giả lập và nút đóng */}
        <div className="flex justify-center gap-4 mt-6">
          {tuition.status !== "paid" && (
            <button
              className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
              onClick={handleMockMomo}
            >
              Thanh toán Momo (giả lập)
            </button>
          )}
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={onClose}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default TuitionDetails;
