// src/pages/PaidInvoicesPage.jsx
import { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

import { useRef } from "react";

const PaidInvoicesPage = () => {
  const [invoices, setInvoices] = useState([]);
  const socketRef = useRef(null);

  // Hàm lấy danh sách hóa đơn đã thanh toán
  const fetchPaidInvoices = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3001/api/tuition?status=paid",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = Array.isArray(res.data) ? res.data : [];
      setInvoices(data);
    } catch (err) {
      console.error("❌ Error fetching invoices:", err);
    }
  };

  // Lấy danh sách ban đầu khi mount
  useEffect(() => {
    fetchPaidInvoices();
  }, []);

  // 👉 Lắng nghe sự kiện từ socket, khởi tạo socket khi mount
  useEffect(() => {
    socketRef.current = io("http://localhost:3001");

    const handleNewInvoice = (invoice) => {
      if (invoice && invoice._id) {
        console.log("📥 New paid invoice received via socket:", invoice);
        setTimeout(() => {
          fetchPaidInvoices(); // Đợi 300ms để BE cập nhật DB
        }, 300);
      }
    };

    socketRef.current.on("tuition_paid", handleNewInvoice);

    return () => {
      socketRef.current.off("tuition_paid", handleNewInvoice);
      socketRef.current.disconnect();
    };
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-8 p-4">
      <h2 className="mb-6 text-2xl font-bold text-blue-700 flex items-center gap-2">
        <span role="img" aria-label="invoice">
          🧾
        </span>{" "}
        Hóa đơn đã thanh toán
      </h2>

      {invoices.length === 0 ? (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center text-blue-600 shadow-md">
          Chưa có hóa đơn nào được thanh toán.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-blue-200 rounded-xl shadow-lg overflow-hidden">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-4 py-3 text-blue-700 font-semibold border-b border-blue-200">
                  Sinh viên
                </th>
                <th className="px-4 py-3 text-blue-700 font-semibold border-b border-blue-200">
                  MSSV
                </th>
                <th className="px-4 py-3 text-blue-700 font-semibold border-b border-blue-200">
                  Lớp
                </th>
                <th className="px-4 py-3 text-blue-700 font-semibold border-b border-blue-200">
                  Số tín chỉ
                </th>
                <th className="px-4 py-3 text-blue-700 font-semibold border-b border-blue-200">
                  Tổng tiền
                </th>
                <th className="px-4 py-3 text-blue-700 font-semibold border-b border-blue-200">
                  Thời gian
                </th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice, index) => (
                <tr
                  key={invoice._id || index}
                  className="hover:bg-blue-50 transition border-b border-blue-100 last:border-b-0"
                >
                  <td className="px-4 py-3">
                    {invoice.student?.name || "N/A"}
                  </td>
                  <td className="px-4 py-3">
                    {invoice.student?._id || "N/A"}
                  </td>
                  <td className="px-4 py-3">
                    {invoice.student?.classId?.name || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {invoice.totalCredit ?? "?"}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-green-700">
                    {invoice.totalAmount?.toLocaleString() || "?"} VND
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-sm">
                    {new Date(invoice.time || invoice.updatedAt).toLocaleString(
                      "vi-VN"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaidInvoicesPage;
