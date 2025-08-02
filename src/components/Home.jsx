import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  FaMoneyCheckAlt,
  FaLock,
  FaCreditCard,
  FaChartBar,
  FaCheckCircle,
  FaTimesCircle,
  FaUserGraduate,
  FaCoins,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { getAllTuitions } from "../services/tuitionService";

const carouselItems = [
  { img: "/anh1.jpg" },
  { img: "/anh2.webp" },
  { img: "/anh3.jpg" },
];

const criteria = [
  {
    icon: <FaMoneyCheckAlt className="text-3xl text-blue-500" />,
    text: "Thanh toán học phí nhanh chóng, tiện lợi",
  },
  {
    icon: <FaLock className="text-3xl text-green-500" />,
    text: "Bảo mật thông tin sinh viên",
  },
  {
    icon: <FaCreditCard className="text-3xl text-purple-500" />,
    text: "Hỗ trợ nhiều phương thức thanh toán",
  },
  {
    icon: <FaChartBar className="text-3xl text-orange-500" />,
    text: "Quản lý học phí minh bạch, rõ ràng",
  },
];

const Home = () => {
  const [stats, setStats] = useState({
    paid: 0,
    unpaid: 0,
    totalAmount: 0,
    totalUnpaidAmount: 0,
    listPaid: [],
    listUnpaid: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const tuitions = await getAllTuitions();
        const paidList = tuitions.filter((t) => t.status === "paid");
        const unpaidList = tuitions.filter((t) => t.status !== "paid");
        const totalAmount = paidList.reduce(
          (sum, t) => sum + (t.totalAmount || 0),
          0
        );
        const totalUnpaidAmount = unpaidList.reduce(
          (sum, t) => sum + (t.totalAmount || 0),
          0
        );
        setStats({
          paid: paidList.length,
          unpaid: unpaidList.length,
          totalAmount,
          totalUnpaidAmount,
          listPaid: paidList,
          listUnpaid: unpaidList,
        });
      } catch (err) {
        // Có thể xử lý lỗi ở đây nếu muốn
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="flex flex-col bg-gray-50 px-4 md:px-12">
      {/* Carousel + Criteria */}
      <div className="w-full mx-auto">
        {/* Carousel */}
        <div>
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            interval={3000}
            className="rounded-lg shadow"
          >
            {carouselItems.map((item, idx) => (
              <div key={idx}>
                <img
                  src={item.img}
                  alt={item.caption}
                  className="w-full h-[66vh] object-contain bg-white rounded-lg"
                />
              </div>
            ))}
          </Carousel>
        </div>

        {/* Tiêu chí dưới carousel */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-none">
          {criteria.map((c, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-xl border-2 border-blue-400 p-8 flex flex-col items-center justify-center space-y-5 hover:scale-105 transition"
            >
              {React.cloneElement(c.icon, {
                className: "text-5xl " + c.icon.props.className,
              })}
              <span className="text-gray-800 text-lg font-bold text-center">
                {c.text}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Thống kê học phí */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-blue-700 flex items-center gap-2">
          <FaChartBar className="text-blue-500" /> Thống kê học phí
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-gradient-to-br from-green-100 to-green-300 rounded-xl shadow p-6 flex flex-col items-center border-2 border-green-400">
            <FaCheckCircle className="text-4xl text-green-600 mb-2" />
            <span className="text-3xl font-bold text-green-700">
              {stats.paid}
            </span>
            <span className="text-gray-700 mt-2 font-semibold">
              Đã thanh toán
            </span>
          </div>
          <div className="bg-gradient-to-br from-red-100 to-red-300 rounded-xl shadow p-6 flex flex-col items-center border-2 border-red-400">
            <FaTimesCircle className="text-4xl text-red-500 mb-2" />
            <span className="text-3xl font-bold text-red-600">
              {stats.unpaid}
            </span>
            <span className="text-gray-700 mt-2 font-semibold">
              Chưa thanh toán
            </span>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-blue-300 rounded-xl shadow p-6 flex flex-col items-center border-2 border-blue-400">
            <FaCoins className="text-4xl text-blue-700 mb-2" />
            <span className="text-3xl font-bold text-blue-800">
              {stats.totalAmount.toLocaleString()} VND
            </span>
            <span className="text-gray-700 mt-2 font-semibold">
              Tổng tiền đã thu
            </span>
          </div>
          <div className="bg-gradient-to-br from-yellow-100 to-yellow-300 rounded-xl shadow p-6 flex flex-col items-center border-2 border-yellow-400">
            <FaCoins className="text-4xl text-yellow-700 mb-2" />
            <span className="text-3xl font-bold text-yellow-800">
              {stats.totalUnpaidAmount.toLocaleString()} VND
            </span>
            <span className="text-gray-700 mt-2 font-semibold">
              Tổng tiền chưa thu
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-3 text-green-700 flex items-center gap-2">
              <FaCheckCircle className="text-green-500" /> Danh sách đã thanh toán
            </h3>
            <div className="overflow-x-auto rounded-lg shadow">
              <table className="w-full border border-green-200 bg-white rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-green-100 text-green-800">
                    <th className="border px-3 py-2 rounded-tl-lg">#</th>
                    <th className="border px-3 py-2">
                      <FaUserGraduate className="inline mr-1" />
                      Tên sinh viên
                    </th>
                    <th className="border px-3 py-2">Mã SV</th>
                    <th className="border px-3 py-2">
                      <FaChalkboardTeacher className="inline mr-1" />
                      Lớp
                    </th>
                    <th className="border px-3 py-2 rounded-tr-lg">
                      <FaCoins className="inline mr-1" />
                      Tổng tiền
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stats.listPaid.map((t, idx) => (
                    <tr
                      key={t._id || idx}
                      className="hover:bg-green-50 transition"
                    >
                      <td className="border px-3 py-2 text-center">{idx + 1}</td>
                      <td className="border px-3 py-2">
                        {t.student?.name || "Không rõ"}
                      </td>
                      <td className="border px-3 py-2 text-center">
                        {t.student?.mssv || t.student?._id || "Không rõ"}
                      </td>
                      <td className="border px-3 py-2 text-center">
                        {t.student?.classId?.name || "Không rõ"}
                      </td>
                      <td className="border px-3 py-2 text-right font-semibold">
                        {t.totalAmount?.toLocaleString()} VND
                      </td>
                    </tr>
                  ))}
                  {stats.listPaid.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center text-gray-400 py-2">
                        Không có dữ liệu
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-3 text-red-700 flex items-center gap-2">
              <FaTimesCircle className="text-red-500" /> Danh sách chưa thanh toán
            </h3>
            <div className="overflow-x-auto rounded-lg shadow">
              <table className="w-full border border-red-200 bg-white rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-red-100 text-red-800">
                    <th className="border px-3 py-2 rounded-tl-lg">#</th>
                    <th className="border px-3 py-2">
                      <FaUserGraduate className="inline mr-1" />
                      Tên sinh viên
                    </th>
                    <th className="border px-3 py-2">Mã SV</th>
                    <th className="border px-3 py-2">
                      <FaChalkboardTeacher className="inline mr-1" />
                      Lớp
                    </th>
                    <th className="border px-3 py-2 rounded-tr-lg">
                      <FaCoins className="inline mr-1" />
                      Tổng tiền
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stats.listUnpaid.map((t, idx) => (
                    <tr
                      key={t._id || idx}
                      className="hover:bg-red-50 transition"
                    >
                      <td className="border px-3 py-2 text-center">{idx + 1}</td>
                      <td className="border px-3 py-2">
                        {t.student?.name || "Không rõ"}
                      </td>
                      <td className="border px-3 py-2 text-center">
                        {t.student?.mssv || t.student?._id || "Không rõ"}
                      </td>
                      <td className="border px-3 py-2 text-center">
                        {t.student?.classId?.name || "Không rõ"}
                      </td>
                      <td className="border px-3 py-2 text-right font-semibold">
                        {t.totalAmount?.toLocaleString()} VND
                      </td>
                    </tr>
                  ))}
                  {stats.listUnpaid.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center text-gray-400 py-2">
                        Không có dữ liệu
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Khoảng trắng phía dưới để cách footer */}
      <div className="mt-8"></div>
    </div>
  );
};

export default Home;