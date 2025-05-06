import React, { useRef, useEffect, useState } from "react";
import acc from "../assets/Icons/account.png";
import check from "../assets/Icons/Check.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AccountSozlamalari = () => {
  const fileInputRef = useRef(null);
  const fileNameRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fileInput = fileInputRef.current;
    const fileName = fileNameRef.current;

    const handleFileChange = () => {
      if (fileInput.files.length > 0) {
        fileName.textContent = fileInput.files[0].name;
      } else {
        fileName.textContent = "";
      }
    };

    fileInput.addEventListener("change", handleFileChange);

    return () => {
      fileInput.removeEventListener("change", handleFileChange);
    };
  }, []);

  const [profileData, setProfileData] = useState({});

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth");
      return false;
    }
    return true;
  };

  const handleProject = async (id) => {
    try {
      const res = await axios.get(`/api/project_user/${id}/`);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!checkAuth()) return;
    axios
      .get("/api/profile/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setProfileData(res.data[0]);
        handleProject(res.data[0].id);
      })
      .catch((err) => {
        console.error(
          "Ошибка при загрузке профиля:",
          err.response?.data || err.message
        );
        if (err.response?.status === 401) {
          navigate("/auth");
        }
      });
  }, []);

  return (
    <div>
      <nav className="bg-[#50C9CE80] h-[55px] flex items-center">
        <div className="container flex justify-between items-center max-md:px-[20px]">
          <Link
            to="/profile"
            className="border-2 border-[#FF8888] bg-[#FF000033] text-[20px] text-[#FF8888] px-[41px] rounded-[10px]"
          >
            Orqaga
          </Link>
          <button className="border-2 border-[#00FF00] bg-[#00FF004D] text-[20px] text-[#00FF00] px-[41px] rounded-[10px]">
            Saqlash
          </button>
        </div>
      </nav>

      <section>
        <div className="!mt-[20px] container flex max-sm:flex-col max-md:px-[20px] sm:justify-between gap-[22px]">
          <div className="left sm:w-[50%] flex flex-col gap-5">
            <div className="flex justify-between rounded-[20px] text-[#50C9CE] py-[15px] px-[19px] border-2 border-[#50C9CE] w-full">
              <div className="w-[60px] h-[60px] overflow-hidden rounded-full">
                <img
                  src={profileData.profile_img}
                  alt="Account"
                  className="w-full"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="inline-block px-5 text-[#50C9CE] py-2 bg-[#50C9CE]/20 active:bg-[#50C9CE] border-2 border-[#50C9CE] hover:text-white rounded-lg cursor-pointer font-semibold hover:opacity-75 transition">
                  Rasmni taxrirlash
                  <input type="file" className="hidden" ref={fileInputRef} />
                </label>
                <span
                  ref={fileNameRef}
                  className="text-sm text-gray-600"
                ></span>
              </div>
            </div>

            <div className="rounded-[20px] text-[#50C9CE] py-[20px] px-[19px] border-2 border-[#50C9CE] w-full">
              <label htmlFor="name">Ism:</label>
              <input
                value={profileData.first_name}
                type="text"
                name="name"
                id="name"
                className="my-2 px-2 w-full h-[35px] rounded-[10px] border-2 border-[#50C9CE]"
              />
              <label htmlFor="lastname">Familiya:</label>
              <input
                value={profileData.last_name}
                type="text"
                name="lastname"
                id="lastname"
                className="my-2 px-2 w-full h-[35px] rounded-[10px] border-2 border-[#50C9CE]"
              />
              <label htmlFor="phone">Telefon raqam:</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                className="mt-2 px-2 w-full h-[35px] rounded-[10px] border-2 border-[#50C9CE]"
              />
              <label htmlFor="job">Kasb:</label>
              <input
                type="text"
                name="job"
                id="job"
                className="mt-2 px-2 w-full h-[35px] rounded-[10px] border-2 border-[#50C9CE]"
              />
            </div>
            <div className="rounded-[20px] text-[#50C9CE] py-[20px] px-[19px] border-2 border-[#50C9CE] w-full">
              <h2 className="text-[20px]">Linklar:</h2>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                className="my-2 px-2 w-full h-[35px] rounded-[10px] border-2 border-[#50C9CE]"
              />
              <label htmlFor="github">GitHub:</label>
              <input
                type="url"
                name="github"
                id="github"
                className="mt-2 px-2 w-full h-[35px] rounded-[10px] border-2 border-[#50C9CE]"
              />
              <label htmlFor="gitlab">GitLab:</label>
              <input
                type="url"
                name="gitlab"
                id="gitlab"
                className="mt-2 px-2 w-full h-[35px] rounded-[10px] border-2 border-[#50C9CE]"
              />
            </div>

            {/* <div className="rounded-[20px] text-[#50C9CE] py-[20px] px-[19px] border-2 border-[#50C9CE] w-full">
              <h2 className="text-[20px]">Joylashuv ma’lumotlari:</h2>
              <label htmlFor="country">Mamlakat:</label>
              <select
                name="country"
                id="country"
                className="my-2 px-2 w-full h-[35px] rounded-[10px] border-2 border-[#50C9CE]"
              >
                <option value="">O'zbekiston</option>
                <option value="russia">Rossiya</option>
                <option value="usa">AQSh</option>
              </select>
              <label htmlFor="city">Shahar:</label>
              <input
                type="text"
                name="city"
                id="city"
                className="my-2 px-2 w-full h-[35px] rounded-[10px] border-2 border-[#50C9CE]"
              />
              <label htmlFor="district">Tuman:</label>
              <input
                type="text"
                name="district"
                id="district"
                className="mt-2 px-2 w-full h-[35px] rounded-[10px] border-2 border-[#50C9CE]"
              />
              <label htmlFor="postal">Poschta indeksi:</label>
              <input
                type="text"
                name="postal"
                id="postal"
                className="mt-2 px-2 w-full h-[35px] rounded-[10px] border-2 border-[#50C9CE]"
              />
            </div> */}
          </div>

          <div className="right sm:w-[50%] flex flex-col gap-5">
            <div className="rounded-[20px] text-[#50C9CE] py-[20px] px-[19px] border-2 border-[#50C9CE] w-full">
              <h2 className="text-[20px]">Parolni taxrirlash:</h2>
              <label htmlFor="new-password">Yangi parol:</label>
              <input
                type="password"
                name="newPassword"
                id="new-password"
                className="my-2 px-2 w-full h-[35px] rounded-[10px] border-2 border-[#50C9CE]"
              />
              <label htmlFor="old-password">Eski parol:</label>
              <input
                type="password"
                name="oldPassword"
                id="old-password"
                className="my-2 px-2 w-full h-[35px] rounded-[10px] border-2 border-[#50C9CE]"
              />
              <label htmlFor="repeat-password">Parolni takrorlang:</label>
              <input
                type="password"
                name="repeatPassword"
                id="repeat-password"
                className="mt-2 px-2 w-full h-[35px] rounded-[10px] border-2 border-[#50C9CE]"
              />
            </div>

            <div className="rounded-[20px] text-[#50C9CE] py-[20px] px-[19px] border-2 border-[#50C9CE] w-full">
              <h2 className="text-[20px]">Hisob sozlamalari:</h2>
              <div className="flex flex-col justify-between gap-[20px] mt-[15px]">
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/", { replace: "/" });
                  }}
                  className="border-2 h-10 border-[#FF8888] bg-[#FF000033] hover:opacity-75 active:opacity-50 text-[20px] text-[#FF8888] w-full rounded-[10px]"
                >
                  Chiqish
                </button>
                <button className="border-2 border-[#00FF00] bg-[#00FF004D] hover:opacity-75 active:opacity-50 text-[20px] text-[#00FF00] w-full rounded-[10px]">
                  Hisobni o’chirish
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AccountSozlamalari;
