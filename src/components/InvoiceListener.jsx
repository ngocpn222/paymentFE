// components/InvoiceListener.jsx
import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001"); // điều chỉnh nếu server khác port

export default function InvoiceListener() {
  useEffect(() => {
    socket.on("tuition_paid", (data) => {
      console.log("📄 Hóa đơn vừa được thanh toán:", data);
      alert(
        `Hóa đơn cho sinh viên ${
          data.student.name
        } đã được thanh toán với số tiền ${data.totalAmount.toLocaleString()} VND.`
      );
    });

    return () => socket.off("tuition_paid");
  }, []);

  return null; // không cần render gì
}
