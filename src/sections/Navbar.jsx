import React, { useState, useEffect } from "react";
import logo from "../assets/Logos/Blue text.png";
import profile from "../assets/Icons/account.png";
import miniLogo from "../assets/Logos/Blue logo.png";
import {
  IoCart,
  IoCartOutline,
  IoHeartOutline,
  IoHeart,
  IoMenuOutline,
  IoCloseOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Блокировка прокрутки при открытом меню
    if (menu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // Сбрасываем стиль при размонтировании
    };
  }, [menu]);

  const menuHandler = () => {
    setMenu(!menu);
  };

  let links = [
    { name: "Portfoliolar", href: "/projects", current: true },
    { name: "Loyihalar", href: "", current: true },
    { name: "Jamoalar", href: "", current: true },
    { name: "Kontaktlar", href: "/#contact", current: true },
  ];

  return (
    <nav className="h-[80px] max-sm:h-[55px]  flex items-center relative ">
      <div
        className={`container flex justify-between text-white max-sm:px-[5px]`}
      >
        <div className="flex gap-2 items-center justify-between">
          <span className="sm:hidden  text-3xl">
            <button>
              <IoMenuOutline
                onClick={menuHandler}
                className={menu ? "hidden" : "block"}
              />
            </button>
            <button>
              <IoCloseOutline
                className={menu ? "block" : "hidden"}
                onClick={menuHandler}
              />
            </button>
          </span>

          <a
            href="/"
            className="max-sm:absolute left-[50%] max-sm:translate-x-[-50%]  inline-block text-3xl gap-[20px] "
          >
            <img
              className="h-[50px] min-sm:h-[40px]"
              src={windowWidth < 650 ? miniLogo : logo}
              alt=""
            />
          </a>
        </div>

        <ul className="hidden  sm:flex items-center gap-[35px] text-[17px] font-[500] ">
          {links.map((i, index) => (
            <li key={index} className="hover:text-[#50C9CE] duration-150">
              <Link to={i.href} className="">
                {i.name}
              </Link>
            </li>
          ))}
        </ul>

        <Link to={"/profile/"} className={`flex items-center text-3xl gap-[20px] `}>
          <img className="h-[50px] max-sm:h-[40px] " src={profile} alt="" />
        </Link>

        <div
          className={
            menu
              ? "mt-[55px] fixed bg-[#2E382E]  left-0  w-full z-90 sm:invisible"
              : "invisible h-0!  top-[55px] opacity-0 bg-[#2E382E] absolute  left-0  w-full "
          }
          style={{
            height: "calc(100vh - 55px)",
            transition: "0.3s",
            padding: "30px 15px 0 15px",
          }}
        >
          <ul className="flex  flex-col items-start gap-[30px] text-[18px] ">
            {links.map((i, index) => (
              <li key={index}>
                <Link
                  onClick={menuHandler}
                  to={i.href}
                  className="hover:text-[#50C9CE]"
                >
                  {i.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
