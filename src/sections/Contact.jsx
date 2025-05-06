import React, { useState } from "react";
import telegram from "../assets/Icons/telegram.png";
import instagram from "../assets/Icons/instagram.png";
import phoneCall from "../assets/Icons/phone-call.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMesage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState("")
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    if (!localStorage.getItem('token')) 
      navigate("/auth");
    setLoading(true);
    e.preventDefault();
    const formData = {
      name: name,
      email: email,
      message: message,
    };
    axios.post("/api/contacts/", formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}` 
      }
    })
    .then((res) => {
      if(res.status >= 200 && res.status < 300) {
        alert("Xabaringiz muvaffaqiyatli yuborildi!");
        setName("");
        setEmail("");
        setMesage("");
        setErrors("");
      }

      console.log(res.data);
    })
    .catch((err) => {
      let error = err.response.data; 
      if(error.email) {
        setErrors("email")
      }else if (error.name){
        setErrors("name")
      }else if (error.message) {
        setErrors("message")
      }
    })
    .finally(() => {
      setLoading(false)
    })
  };
  return (
    <section id="contact" className="font-[Baumans]">
      <div className="container pt-[30px] px-[30px] pb-[30px] sm:pb-[50px]">
        <h1 className="text-[25px] sm:text-[35px] text-center text-[#50C9CE]">
          Biz bilan bog’lanish...
        </h1>

        <div className="flex max-sm:flex-col gap-5 mt-10">
          <div className="flex-grow-1 gap-[30px] sm:gap-[60px]  flex flex-col items-center justify-center max-sm:py-[30px] sm:min-h-[402px] bg-[#50C9CE]/10 border-1 border-[#50C9CE] rounded-[20px]">
            <span className="flex items-center gap-2.5 w-[205px]">
              <img className="max-sm:w-[40px] w-[50px]" src={telegram} alt="" />
              <a
                href=""
                className="max-sm:text-[25px] text-[35px] text-[#50C9CE]"
              >
                Telegram
              </a>
            </span>
            <span className="flex items-start gap-2.5 w-[205px]">
              <img
                className="w-[50px] max-sm:w-[40px]"
                src={instagram}
                alt=""
              />
              <a
                href=""
                className="text-[35px] max-sm:text-[25px]  text-[#50C9CE]"
              >
                Instagram
              </a>
            </span>
            <span className="flex items-center gap-2.5 w-[205px]">
              <img
                className="w-[50px] max-sm:w-[40px]"
                src={phoneCall}
                alt=""
              />
              <a className="text-[20px] text-[#50C9CE] text-wrap" href="">
                Telefon: +998200066706
              </a>
            </span>
          </div>

          <form
            onSubmit={(e) => handleSubmit(e)}
            className="p-[30px] sm:p-[50px] flex-grow-2 min-h-[402px] bg-[#50C9CE]/10 border-1 border-[#50C9CE] rounded-[20px]"
          >
            <h1 className="text-[24px] max-sm:mb-[20px] sm:text-[30px]  text-center text-[#50C9CE]">
              Xabar yuborish:
            </h1>
            <div className="flex flex-col gap-2.5">
              <label
                htmlFor="name"
                className="ml-[21px] text-[20px] text-white"
              >
                Ism:
              </label>
              <input
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Ismingizni kiriting"
                className={`text-white rounded-[10px] sm:text-[20px] border-[2px] border-[#50C9CE] pl-[20px] h-[34px] bg-[#D9D9D94F]
                  ${errors === "name" ? "!border-red-600" : ""}`}
                id="name"
              />
              <label
                htmlFor="name"
                className=" ml-[21px] text-[20px] text-white"
              >
                Emile:
              </label>
              <input
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Emaylingizni kiriting"
                className={`text-white rounded-[10px] sm:text-[20px] border-[2px] border-[#50C9CE] pl-[20px] h-[34px] bg-[#D9D9D94F]
                  ${errors === "email" ? "!border-red-600" : ""}`}
                id="name"
              />
              <label
                htmlFor="name"
                className="ml-[21px] text-[20px] text-white"
              >
                Xabar:
              </label>
              <textarea
                required
                value={message}
                onChange={(e) => setMesage(e.target.value)}
                type="text"
                placeholder="Xabaringizni kiriting"
                className={`text-white rounded-[10px] sm:text-[20px] border-[2px] border-[#50C9CE] pl-[20px] h-[112px] bg-[#D9D9D94F]
                  ${errors === "message" ? "!border-red-600" : ""}`}
                id="name"
              />
              <input
                type="submit"
                value={isLoading ? "Yuborilmoqda..." : "Yuborish"}
                disabled={isLoading}
                className="w-[170px] h-[30px] border-2 border-[#00FF00] text-[#00FF00] text-[18px] rounded-[10px] ml-auto"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
