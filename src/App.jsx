import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/invoices")
      .then((res) => setInvoices(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Danh sách Hóa đơn học phí</h1>
      <ul className="mt-4 space-y-2">
        {invoices.map((invoice) => (
          <li key={invoice.id} className="border p-3 rounded shadow">
            <div>
              <strong>Mã:</strong> {invoice.id}
            </div>
            <div>
              <strong>Học sinh:</strong> {invoice.studentName}
            </div>
            <div>
              <strong>Số tiền:</strong> {invoice.amount.toLocaleString()}đ
            </div>
            <div>
              <strong>Trạng thái:</strong>
              <span
                className={
                  invoice.status === "paid" ? "text-green-600" : "text-red-600"
                }
              >
                {invoice.status === "paid"
                  ? "Đã thanh toán"
                  : "Chưa thanh toán"}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
