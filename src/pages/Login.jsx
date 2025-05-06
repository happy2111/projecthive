import React, { useState } from "react";
import google from "../assets/Icons/google.png";
import github from "../assets/Icons/github-logo.png";
import apple from "../assets/Icons/apple cloud.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/api/login/", { email, password })
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          localStorage.setItem("token", res.data.access_token);
          navigate("/profile", { replace: true });
        }
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          setError("Noto'g'ri parol yoki elektron pochta");
        } else if (err.response?.status === 500) {
          setError(
            "Serverda xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring."
          );
        } else {
          setError(
            err.response?.data?.detail || "Tizimga kirishda xatolik yuz berdi"
          );
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <section className="lg:flex w-full h-screen">
      <form
        onSubmit={handleLogin}
        className="left px-4 lg:w-1/2 h-full flex flex-col items-center justify-center gap-7 lg:gap-8"
      >
        <h1 className="text-3xl lg:text-5xl text-cyan-400 font-baumans">
          Hisobga kirish.
        </h1>
        <p className="about text-lg lg:text-xl text-cyan-400 text-center">
          Saytimiz imkoniyatlaridan foydalanish
          <br />
          uchun hisobingizga kiring!!!
        </p>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          id="text"
          placeholder="Foydalanuvchi pochtasi"
          className={`w-3/5 max-sm:w-full lg:w-3/5 h-10 lg:h-12 rounded-xl border border-cyan-400 bg-cyan-400/40 text-white text-lg px-5 
            ${error && "border-red-500"}`}
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          placeholder="Parol"
          className={`w-3/5 max-sm:w-full lg:w-3/5 h-10 lg:h-12 rounded-xl border border-cyan-400 bg-cyan-400/40 text-white text-lg px-5 
            ${error && "border-red-500"}`}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="kirish-btn text-xl lg:text-2xl active:opacity-75 hover:bg-zinc-800 hover:text-cyan-400 border-2 border-cyan-400 duration-150 text-zinc-800 w-3/5 h-12 lg:h-14 rounded-xl bg-cyan-400 flex items-center justify-center no-underline"
          href="#"
        >
          {isLoading ? "Kirish..." : "Kirish"}
        </button>
        <div className="line w-1/2 h-0.5 bg-white rounded-full"></div>
        <p className=" text-ms lg:text-xl text-center text-white px-4 text-wrap">
          Hali hisobingiz yo'qmi? Bu yerda <span></span>
          <Link to={"/auth/registration"} className="text-cyan-400 ">
            roʻyxatdan oʻting
          </Link>
        </p>
        <p className="yoki text-lg text-white">Yoki</p>
        <div className="socials w-3/5 h-12 lg:h-12 flex items-center justify-around gap-3 px-2 lg:px-10">
          <Link to="#" className="w-12 h-12">
            <img src={google} alt="" className="w-full h-full" />
          </Link>
          <Link to="#" className="w-12 h-12">
            <img src={github} alt="" className="w-full h-full" />
          </Link>
          <Link className="apple-cloud w-13 h-13" to="#">
            <img src={apple} alt="" className="w-full h-full" />
          </Link>
        </div>
      </form>

      <div className="max-md:hidden right lg:w-1/2 h-full flex flex-col items-center justify-center bg-cyan-400 rounded-tl-[200px] rounded-bl-[200px] lg:shadow-[-10px_0_20px_0_#50C9CE] gap-10 lg:gap-10">
        <h1 className="text-4xl lg:text-6xl text-zinc-800 font-baumans">
          Salom do'stim!!!
        </h1>
        <p className="text-xl lg:text-3xl text-zinc-800 text-center">
          Siz bizning saytda yangimisiz
          <br />
          va hali hisobga ega emasmisiz, unday
          <br />
          bo'lsa ro'yxatdan o'ting!!!
        </p>
        <Link
          to={"/auth/registration"}
          className="flex items-center justify-center w-60 h-12 border border-zinc-800 rounded-xl no-underline text-zinc-800 text-lg transition-all hover:bg-zinc-800/10 hover:shadow-inner"
        >
          Ro'yxatdan o'tish
        </Link>
      </div>
    </section>
  );
};
