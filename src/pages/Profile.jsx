import React, { useEffect, useState } from "react";
import setting from "../assets/Icons/settings.png";
import share from "../assets/Icons/share.png";
import profile from "../assets/Icons/account-dark.png";
import empty from "../assets/Images and gifs/empty.png";
import { Link, useNavigate } from "react-router-dom";
import github from "../assets/Icons/github-logo-dark.png";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";

const Profile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileData, setProfileData] = useState({});
  const naigate = useNavigate();
  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      naigate("/auth");
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
        console.log(res.data);
        setProfileData(res.data[0]);
        handleProject(profileData.id);
      })
      .catch((err) => {
        console.log(err);
        if (err.status === 401) {
          naigate("/auth");
        }
      });
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navigate = useNavigate()
  return (
    <div className="flex font-[Baumans]">
      <section
        className={`sidebar gap-[28px] w-[328px] bg-[#50C9CE] h-screen fixed p-[22px] duration-150 flex flex-col items-center ${
          isMenuOpen ? "-left-[328px]" : "left-0"
        }`}
      >
        <button
          onClick={() => toggleMenu()}
          className="text-2xl absolute right-[-30px] bg-[#50C9CE] w-35 h-[55px] top-2 flex justify-end items-center pr-1 rounded-r-full"
        >
          {isMenuOpen ? (
            <span className="rotate-180">
              <IoIosArrowBack />
            </span>
          ) : (
            <IoIosArrowBack />
          )}
        </button>
        <nav className="flex z-50 justify-between items-center w-full">
          <button
            onClick={() => {
              navigate("/account-settings/");
            }}
          to={"/account-settings/"} className="w-[30px]">
            <img src={setting} alt="" />
          </button>
          <h1 className="text-[#2E382E] text-[20px]">
            {profileData.first_name}
          </h1>
          <Link className="w-[30px]">
            <img src={share} alt="" />
          </Link>
        </nav>

        <div className="avatar w-[90px] h-[90px] flex items-center justify-center  rounded-full overflow-hidden">
          <img
            src={profileData.profile_img || profile}
            className="object-fit-cover w-full "
            alt=""
          />
        </div>

        <ul className="w-full flex flex-col gap-3 pl-[45px]">
          <li>
            <p className="text-[#2E382E] text-[14px]">Ism: </p>
            <h3 className="text-[16px] text-black ml-3">
              {profileData.first_name}
            </h3>
          </li>
          <li>
            <p className="text-[#2E382E] text-[14px]">Familiya: </p>
            <h3 className="text-[16px] text-black ml-3">
              {profileData.last_name}
            </h3>
          </li>
          <li>
            <p className="text-[#2E382E] text-[14px]">Emile: </p>
            <h3 className="text-[16px] text-black ml-3">{profileData.email}</h3>
          </li>
          <li>
            <p className="text-[#2E382E] text-[14px]">Kasb: </p>
            <h3 className="text-[16px] text-black ml-3">
              {profileData.job || "  <profession>"}
            </h3>
          </li>
          <li>
            <p className="text-[#2E382E] text-[14px]">Telefon raqam: </p>
            <h3 className="text-[16px] text-black ml-3">
              {profileData.phone || "  <phone_number>"}
            </h3>
          </li>
          <li>
            <p className="text-[#2E382E] text-[14px]">Boshqa hisoblar: </p>
            <div className="flex justify-evenly pr-[50px] mt-3.5 max-w-[200px]">
              <Link className="w-[25px]">
                <img src={github} alt="" />
              </Link>
              <Link className="w-[25px]">
                <img src={github} alt="" />
              </Link>
            </div>
          </li>
        </ul>
      </section>

      <section className="main-content w-full">
        <nav className="sm:h-[72px] h-15 justify-end px-[30px] flex items-center gap-4 bg-[#50C9CE80]">
          <Link
            to="/projects"
            className="border-2 hover:opacity-75 border-[#0004E7] bg-[#00BFFF4D] sm:text-[20px] text-[#0004E7] sm:px-[31px] px-[15px] rounded-[10px]"
          >
            Boshqa loyihalar
          </Link>
          {/* <button className="border-2 hover:opacity-75 border-[#0004E7] bg-[#00BFFF4D] text-[20px] text-[#0004E7] px-[31px] rounded-[10px]">
            Jamoani ko’rish
          </button> */}
          <Link
            to={"/projects/create"}
            className="border-2 hover:opacity-75 border-[#00FF00] bg-[#00FF004D] sm:text-[20px] text-[#00FF00] sm:px-[31px] px-[15px] rounded-[10px]"
          >
            Loyiha qo’shish
          </Link>
        </nav>

        <div className="content">
          <div className="container">
            <div className="empty flex flex-col items-center gap-5 pt-5 -z-10 ">
              <img src={empty} className="w-[250px] max-sm:w-[150px]" alt="" />
              <h1 className="text-center sm:text-[30px] text-[20px] text-[#50C9CE]">
                Kechirasiz... <br />
                Sizning portfelingiz bo’sh!!!
              </h1>
              <Link
                to={"/projects/create"}
                className="border-2 hover:opacity-75 border-[#00FF00] bg-[#00FF004D] text-[20px] text-[#00FF00] px-[31px] rounded-[10px]"
              >
                Loyiha qo’shish
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
