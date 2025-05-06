import React from 'react'
import admin from "../assets/Images and gifs/admin.png"
import { Link } from "react-router-dom";

const AdminLogin = () => {
  return (
    <section className="lg:flex w-full h-screen font-[Baumans]">
      <div className="left lg:w-1/2 h-full flex flex-col items-center justify-center gap-7 lg:gap-8">
        <h1 className="text-4xl lg:text-6xl text-[#50C9CE] ">
          Salom do'stim!!!
        </h1>
        <p className="text-xl lg:text-3xl text-[#50C9CE] text-center">
          Admin paneliga kirishga
          <br />
          xush kelibsiz!!!
        </p>
        <img src={admin} alt="" className="w-[205px]" />
      </div>

      <div className="max-md:hidden right lg:w-1/2 h-full flex flex-col items-center justify-center bg-cyan-400 rounded-tl-[200px] rounded-bl-[200px] lg:shadow-[-10px_0_20px_0_#50C9CE] gap-10 lg:gap-10">
        <form className="left lg:w-1/2 h-full flex flex-col items-center justify-center gap-7 lg:gap-8">
          <h1 className="text-3xl lg:text-5xl text-#2E382E font-baumans">
            Hisobga kirish.
          </h1>
          <p className="about text-lg lg:text-xl text-#2E382E text-center">
            Saytning adminlik paneliga kirish uchun
            <br />
            foydalanuvchi nom va parolingizni kiriting!!!
          </p>
          <input
            type="text"
            name="text"
            id="text"
            placeholder="Foydalanuvchi nom"
            className="!w-[100%] lg:w-3/5 h-10 lg:h-12 rounded-xl border-2 border-[#2E382E] bg-[#2E382E80] text-white text-lg px-5"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Parol"
            className="!w-[100%] lg:w-3/5 h-10 lg:h-12 rounded-xl border-2 border-[#2E382E] bg-[#2E382E80] text-white text-lg px-5"
          />
          <button
            type="submit"
            className="kirish-btn text-xl lg:text-2xl !w-full h-12 lg:h-14 rounded-xl border-2 border-[] hover:bg-[#50C9CE] hover:text-[#2E382E] duration-150 text-[#50C9CE] bg-[#2E382E] flex items-center justify-center no-underline"
            href="#"
          >
            Kirish
          </button>
        </form>
      </div>
    </section>
  );
}

export default AdminLogin
