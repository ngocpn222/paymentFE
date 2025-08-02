import React, { useEffect, useState } from "react";
import { getAllTuitions, getMyTuition } from "../../services/tuitionService";
import { jwtDecode } from "jwt-decode";
import { FaInfoCircle, FaCheckCircle, FaTimesCircle, FaEye } from "react-icons/fa";
import TuitionDetails from "./TuitionDetails"; // Thêm dòng này

const TuitionList = () => {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTuition, setSelectedTuition] = useState(null);
  const [autoPay, setAutoPay] = useState(false);

  useEffect(() => {
    const fetchTuitions = async () => {
      try {
        const token = localStorage.getItem("token");
        let role = "";
        if (token) {
          const decoded = jwtDecode(token);
          role = decoded.role;
        }
        if (role === "student") {
          const data = await getMyTuition();
          setTuitions(data ? [data] : []);
        } else {
          const data = await getAllTuitions();
          setTuitions(data);
        }
      } catch (error) {
        console.error("Error fetching tuitions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTuitions();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-xl font-bold text-gray-700">Đang tải...</div>
    </div>
  );
  if (!tuitions || tuitions.length === 0) return <div>Không có dữ liệu học phí.</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Tiêu đề */}
      <div className="text-center mb-4">
        <div className="flex justify-center items-center space-x-3">
          <FaInfoCircle className="text-blue-500 text-4xl" />
          <h1 className="text-3xl font-bold text-gray-800">Danh sách học phí</h1>
        </div>
      </div>

      {/* Bảng danh sách học phí */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
          <thead>
            <tr className="bg-blue-100 text-gray-700">
              <th className="px-6 py-3 text-center">STT</th>
              <th className="px-6 py-3 text-center">
                <FaInfoCircle className="inline-block mr-2 text-blue-500" />
                Tên sinh viên
              </th>
              <th className="px-6 py-3 text-center">
                <FaCheckCircle className="inline-block mr-2 text-green-500" />
                Tổng tín chỉ
              </th>
              <th className="px-6 py-3 text-center">
                <FaEye className="inline-block mr-2 text-indigo-500" />
                Tổng tiền
              </th>
              <th className="px-6 py-3 text-center">
                <FaTimesCircle className="inline-block mr-2 text-red-500" />
                Trạng thái
              </th>
              <th className="px-6 py-3 text-center">
                <FaEye className="inline-block mr-2 text-blue-400" />
                Chi tiết
              </th>
            </tr>
          </thead>
          <tbody>
            {tuitions.map((tuition, idx) => (
              <tr
                key={tuition._id}
                className={`text-gray-700 hover:bg-gray-100 ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
              >
                <td className="px-6 py-3 text-center">{idx + 1}</td>
                <td className="px-6 py-3 text-center">{tuition.student?.name || "Không rõ"}</td>
                <td className="px-6 py-3 text-center">{tuition.totalCredit}</td>
                <td className="px-6 py-3 text-center">{tuition.totalAmount?.toLocaleString()} VND</td>
                <td className="px-6 py-3 text-center">
                  {tuition.status === "paid" ? (
                    <span className="flex items-center justify-center text-green-600 font-semibold">
                      <FaCheckCircle className="mr-1" /> Đã thanh toán
                    </span>
                  ) : (
                    <span className="flex items-center justify-center text-red-500 font-semibold">
                      <FaTimesCircle className="mr-1" /> Chưa thanh toán
                    </span>
                  )}
                </td>
                <td className="px-6 py-3 text-center">
                  <div className="flex justify-center items-center gap-2">
                    <button
                      className="text-blue-500 hover:text-blue-700 flex items-center"
                      onClick={() => {
                        setSelectedTuition(tuition);
                        setAutoPay(false);
                      }}
                      title="Xem chi tiết"
                    >
                      <FaEye className="mr-1" /> Xem
                    </button>
                    {tuition.status !== "paid" && (
                      <button
                        className="text-green-600 hover:text-green-800 font-semibold border border-green-500 rounded px-2 py-1"
                        onClick={async () => {
                          try {
                            const { payTuition } = await import("../../services/tuitionService");
                            await payTuition(tuition._id);
                            alert("Thanh toán thành công!");
                            // Reload lại danh sách học phí
                            const token = localStorage.getItem("token");
                            let role = "";
                            if (token) {
                              const decoded = jwtDecode(token);
                              role = decoded.role;
                            }
                            if (role === "student") {
                              const data = await getMyTuition();
                              setTuitions(data ? [data] : []);
                            } else {
                              const data = await getAllTuitions();
                              setTuitions(data);
                            }
                          } catch (err) {
                            alert("Thanh toán thất bại!");
                          }
                        }}
                        title="Thanh toán nhanh"
                      >
                        Thanh toán
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Popup chi tiết */}
      {selectedTuition && (
        <TuitionDetails
          tuition={selectedTuition}
          onClose={() => {
            setSelectedTuition(null);
            setAutoPay(false);
          }}
          autoPay={autoPay}
        />
      )}
    </div>
  );
};

export default TuitionList;