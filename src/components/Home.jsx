import React from "react";
import Header from "./Header";
import TuitionList from "./Tuition/TuitionList";

const Home = () => {
  return (
    <div className="flex h-screen">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <div className="flex flex-col space-y-6 p-4 mt-16">
          {/* Thẻ dưới */}
          <div className="ring-6 ring-green-500 p-4 rounded-lg bg-white shadow">
            <h2 className="text-xl font-bold mb-4">Học phí</h2>
            <TuitionList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;