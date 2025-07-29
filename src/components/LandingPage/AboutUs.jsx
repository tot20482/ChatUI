import React from "react";
import woman from "../../assets/woman.png";
import man from "../../assets/man.png";

const AboutUs = () => {
  return (
    <section
      id="aboutUs"
      class="relative h-[90vh] flex flex-col justify-start items-center space-y-10 pb-8"
    >
      <div
        className="h-[40%] w-full flex flex-col justify-start items-center space-y-2 relative "
        style={{
          background: "linear-gradient(to right, #094993, #38a44a)",
        }}
      >
        <p className="text-white text-3xl mt-10">
          About Team <span className="font-bold">253 CSUiter</span>
        </p>
        <p className="text-lg text-white">
          Challenging ourselves at VPBank Hackathon 2025
        </p>
      </div>
      <div className="absolute top-[25%] h-full w-full flex justify-center items-start space-x-10 px-10">
        <div className="w-[25%] h-[55%] bg-white shadow-lg rounded-xl flex flex-col justify-start items-center space-y-2 py-6 px-2">
          <p className="text-2xl font-bold text-[#00b550] uppercase">Member</p>
          <img src={man} alt="Phạm Hoàng Lê Nguyên" className="h-32" />
          <p className="text-2xl text-center font-bold">
            Phạm Hoàng <br /> Lê Nguyên
          </p>
          <p className="text-lg font-semibold">Role: AI</p>
        </div>
        <div className="w-[25%] h-[55%] bg-white shadow-lg rounded-xl flex flex-col justify-start items-center space-y-2 py-6 px-2">
          <p className="text-2xl font-bold text-[#00b550] uppercase">Member</p>
          <img src={man} alt="Đinh Thiên Ân" className="h-32" />
          <div className="flex flex-col justify-center items-center space-y-5 py-5">
            <p className="text-2xl text-center font-bold ">Đinh Thiên Ân</p>
            <p className="text-lg font-semibold">Role: AI</p>
          </div>
        </div>
        <div className="w-[25%] h-[55%] bg-white shadow-lg rounded-xl flex flex-col justify-start items-center space-y-2 py-6 px-2">
          <p className="text-2xl font-bold text-[#00b550] uppercase">Leader</p>
          <img src={man} alt="Đặng Vĩnh Hội" className="h-32" />
          <div className="flex flex-col justify-center items-center space-y-5 py-5">
            <p className="text-2xl text-center font-bold ">Đặng Vĩnh Hội</p>
            <p className="text-lg font-semibold">Role: AI</p>
          </div>
        </div>
        <div className="w-[25%] h-[55%] bg-white shadow-lg rounded-xl flex flex-col justify-start items-center space-y-2 py-6 px-2">
          <p className="text-2xl font-bold text-[#00b550] uppercase">Member</p>
          <img src={man} alt="Phạm Đức Huy Hoàng" className="h-32" />
          <p className="text-2xl text-center font-bold">
            Phạm Đức <br /> Huy Hoàng
          </p>
          <p className="text-lg font-semibold">Role: AI</p>
        </div>
        <div className="w-[25%] h-[55%] bg-white shadow-lg rounded-xl flex flex-col justify-start items-center space-y-2 py-6 px-2">
          <p className="text-2xl font-bold text-[#00b550] uppercase">Member</p>
          <img src={woman} alt="Nguyễn Thị Thanh Tuyền" className="h-32" />
          <p className="text-2xl text-center font-bold">
            Nguyễn Thị <br /> Thanh Tuyền
          </p>
          <p className="text-lg font-semibold">Role: Frontend</p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
