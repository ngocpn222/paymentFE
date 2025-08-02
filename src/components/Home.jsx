import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaMoneyCheckAlt, FaLock, FaCreditCard, FaChartBar } from "react-icons/fa";

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
        <div className="mt-8 grid grid-cols-4 gap-8 w-full max-w-none">
          {criteria.map((c, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-xl border-2 border-blue-400 p-12 flex flex-col items-center justify-center space-y-7 hover:scale-105 transition"
            >
              {React.cloneElement(c.icon, { className: "text-6xl " + c.icon.props.className })}
              <span className="text-gray-800 text-xl font-bold text-center">{c.text}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Khoảng trắng phía dưới để cách footer */}
      <div className="mt-8"></div>
    </div>
  );
};

export default Home;