import React, { useState } from "react";
import google from "../assets/Icons/google.png";
import github from "../assets/Icons/github-logo.png";
import apple from "../assets/Icons/apple cloud.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegistrationPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fistName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [inpError, setInpError] = useState("")
  let navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/api/register/", {
        email,
        password,
        password_confirm: passwordConf,
        first_name: fistName,
        last_name: lastName,
        phone_number: phone,
      })
      .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            console.log(res)
            localStorage.setItem("token", res.data.access_token);
            navigate("/auth/login", { replace: true});
          }
      })
      .catch((err) => {
        if (err.response?.data?.password) {
          setInpError("password")
          setError(err.response?.data?.password[0]); // Отображаем первую ошибку для пароля
        } else if (err.response?.data?.email) {
          setInpError("email")
          setError(err.response?.data?.email[0]); // Отображаем первую ошибку для email
        } else if (err.response?.data?.phone_number) {
          setInpError("phone")
          setError(err.response?.data?.phone_number[0]); // Отображаем первую ошибку для номера телефона
        } else if (err.response?.data?.first_name) {
          setInpError("first_name")
          setError(err.response?.data?.first_name[0]); // Отображаем первую ошибку для имени
        } else if (err.response?.data?.last_name) {
          setInpError("last_name")
          setError(err.response?.data?.last_name[0]);
        } else if (err.response?.data?.password_confirm) {
          setInpError("password_confirm")
          setError(err.response?.data?.password_confirm[0]);
        } else {
          setError(
            err.response?.data?.detail ||
              "Ro’yxatdan o’tishda xatolik yuz berdi"
          );
        }
        console.log(err.response?.data || err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className="lg:flex w-full ">
      <form
        onSubmit={handleRegister}
        className=" left lg:w-1/2 flex flex-col items-center py-10 gap-7 lg:gap-8"
      >
        <h1 className="text-3xl lg:text-5xl text-cyan-400 font-baumans">
          Ro’yxatdan o’tish.
        </h1>
        <p className="about text-lg lg:text-xl text-cyan-400 text-center">
          Saytimiz imkoniyatlaridan foydalanish uchun
          <br />
          ro’yxatdan o’ting!!!
        </p>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <input
          required
          value={fistName}
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
          name="first_name"
          id="text"
          placeholder="Ismingiz"
          className={`w-3/5 lg:w-3/5 !h-10 lg:h-12 rounded-xl border border-cyan-400 bg-cyan-400/40 text-white text-lg px-5
            ${inpError === "first_name" && "border-red-500"}`}
        />
        <input
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          type="text"
          name="last_name"
          id="text"
          placeholder="Familiyangiz"
          className={`w-3/5 lg:w-3/5 !h-10 lg:h-12 rounded-xl border border-cyan-400 bg-cyan-400/40 text-white text-lg px-5
            ${inpError === "last_name" && "border-red-500"}`}
        />
        <input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          id="text"
          placeholder="Emailingiz"
          className={`w-3/5 lg:w-3/5 !h-10 lg:h-12 rounded-xl border border-cyan-400 bg-cyan-400/40 text-white text-lg px-5
            ${inpError === "email" && "border-red-500"}`}
        />
        <input
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="text"
          id="text"
          placeholder="Parolingiz"
          className={`w-3/5 lg:w-3/5 !h-10 lg:h-12 rounded-xl border border-cyan-400 bg-cyan-400/40 text-white text-lg px-5
            ${inpError === "password" && "border-red-500"}`}
        />
        <input
          required
          value={passwordConf}
          onChange={(e) => setPasswordConf(e.target.value)}
          type="password"
          name="text"
          id="text"
          placeholder="Parolingizni takrorlang"
          className={`w-3/5 lg:w-3/5 !h-10 lg:h-12 rounded-xl border border-cyan-400 bg-cyan-400/40 text-white text-lg px-5
            ${inpError === "possword_confirm" && "border-red-500"}`}
        />
        <input
          value={phone}
          required
          onChange={(e) => setPhone(e.target.value)}
          type="number"
          name="text"
          id="text"
          placeholder="+998 | Telefon raqam"
          className={`w-3/5 lg:w-3/5 !h-10 lg:h-12 rounded-xl border border-cyan-400 bg-cyan-400/40 text-white text-lg px-5
            ${inpError === "phone" && "border-red-500"}`}
        />
        <button
          disabled={isLoading}
          type="submit"
          className="kirish-btn text-xl lg:text-2xl text-zinc-800 w-3/5 h-12 lg:h-14 rounded-xl bg-cyan-400 flex items-center justify-center no-underline"
          href="#"
        >
          {isLoading ? "Ro’yxatdan o’tish..." : "Ro’yxatdan o’tish"}
        </button>
        <div className="line w-1/2 h-0.5 bg-white rounded-full"></div>
        <p className=" text-ms lg:text-xl text-center text-white">
          Already have an account? <span></span>
          <Link to={"/auth/login"} className="text-cyan-400 ">
            tizimga kiring
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

      <div className="max-md:hidden fixed right-0 right lg:w-1/2 h-full flex flex-col items-center justify-center bg-cyan-400 rounded-tl-[200px] rounded-bl-[200px] lg:shadow-[-10px_0_20px_0_#50C9CE] gap-10 lg:gap-10">
        <h1 className="text-4xl lg:text-6xl text-zinc-800 font-baumans">
          Salom, Do’stim!!!
        </h1>
        <p className="text-xl lg:text-3xl text-zinc-800 text-center">
          Saytimizga Xush kelibsiz!!!
          <br />
          Sizning hisobingiz mavjudmi???
          <br />
          unday bo’lsa hisobingizga kiring!!!
        </p>
        <Link
          to={"/auth/login"}
          className="flex items-center justify-center w-60 h-12 border border-zinc-800 rounded-xl no-underline text-zinc-800 text-lg transition-all hover:bg-zinc-800/10 hover:shadow-inner"
        >
          Kirish
        </Link>
      </div>
    </section>
  );
};

export default RegistrationPage;
