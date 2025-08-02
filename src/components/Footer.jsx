import React from "react";

const Footer = ({ className = "" }) => {
  const year = new Date().getFullYear();

  return (
    <footer className={`bg-blue-50 text-gray-800 border-t border-gray-200 py-10 px-4 ${className}`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        {/* Logo & Slogan - sát trái */}
        <div className="flex flex-col items-start space-y-3 md:justify-start">
          <div className="flex items-center space-x-3">
            <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center shadow-md">
              <img src="/logo_payment.png" alt="Logo" className="w-12 h-12 rounded-full" />
            </div>
            <span className="font-bold text-2xl tracking-tight">Quản Lý Học Phí</span>
          </div>
          <p className="text-base text-gray-600 leading-relaxed font-medium">
            Nền tảng quản lý học phí thông minh, tiện lợi và bảo mật cho sinh viên hiện đại.
          </p>
        </div>

        {/* Navigation Links - căn giữa */}
        <div className="flex flex-col space-y-3 text-base items-center md:items-center">
          <h4 className="text-lg font-semibold mb-1 text-gray-700">Liên kết nhanh</h4>
          <a href="/home" className="hover:text-indigo-500 transition font-medium">Trang chủ</a>
          <a href="/about" className="hover:text-indigo-500 transition font-medium">Giới thiệu</a>
          <a href="/contact" className="hover:text-indigo-500 transition font-medium">Liên hệ</a>
          <a href="/support" className="hover:text-indigo-500 transition font-medium">Hỗ trợ</a>
        </div>

        {/* Contact + Social - căn giữa bên phải */}
        <div className="space-y-3 flex flex-col items-center md:justify-end">
          <h4 className="text-xl font-semibold mb-1 text-gray-700">Liên hệ</h4>
          <p className="text-lg">
            Email: <a href="mailto:support@qlhp.edu.vn" className="text-indigo-600 hover:underline font-medium">support@qlhp.edu.vn</a>
          </p>
          <div className="flex space-x-4 mt-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg className="w-7 h-7 text-gray-500 hover:text-indigo-500 transition" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8v-6.93h-2.4v-2.87H10V9.76c0-2.38 1.42-3.68 3.6-3.68 1.04 0 2.13.18 2.13.18v2.34h-1.2c-1.18 0-1.55.73-1.55 1.48v1.77h2.63l-.42 2.87h-2.21V21.8c4.56-.93 8-4.96 8-9.8z" />
              </svg>
            </a>
            <a href="https://zalo.me" target="_blank" rel="noopener noreferrer" aria-label="Zalo">
              <div className="w-7 h-7 rounded-full bg-blue-100 text-base flex items-center justify-center font-bold text-blue-600 hover:bg-blue-200 transition">ZL</div>
            </a>
            <a href="mailto:support@qlhp.edu.vn" aria-label="Email">
              <svg className="w-7 h-7 text-gray-500 hover:text-indigo-500 transition" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 2l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center text-base text-gray-500 mt-8 border-t pt-4 font-medium">
        © {year} Quản Lý Học Phí. Được phát triển bởi Nhóm Đồ Án. Mọi quyền được bảo lưu.
      </div>
    </footer>
  );
};

export default Footer;
