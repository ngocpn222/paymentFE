import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001"); // ⚠️ đúng với server port

const useTuitionSocket = (onPaid) => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("🟢 Socket connected:", socket.id);
    });

    socket.on("tuition_paid", (data) => {
      console.log("📥 Đã nhận tuition_paid:", data);
      onPaid(data); // gọi callback truyền vào
    });

    return () => {
      socket.off("tuition_paid");
    };
  }, [onPaid]);
};

export default useTuitionSocket;
