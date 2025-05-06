import React from "react";
import { Link } from "react-router-dom";
import telegram from "../assets/Icons/telegram.png";
import instagram from "../assets/Icons/instagram.png";
import logo from "../assets/Logos/Blue text.png"

const Footer = () => {
  const links = [
    [
      { title: "Tez-tez so’raladigan savollar.", link: "/#faq" },
      { title: "Portfelilar.", link: "/projects" },
      { title: "Yangiliklar", link: "/#news" },
    ],
    [
      { title: "Tez-tez so’raladigan savollar.", link: "/#faq" },
      { title: "Yangiliklar", link: "/#news" },
      { title: "Portfelilar.", link: "/projects" },
    ],
  ];
  return (
    <footer className="w-full py-10 bg-[#252E25] text-white ">
      <div className="container max-sm:px-[20px]">
        <ul className="main flex max-sm:flex-col gap-6">
          <ul className="flex flex-col gap-3">
            <li>
              <Link>Tez-tez so’raladigan savollar.</Link>
            </li>
            <li>
              <Link>Portfelilar.</Link>
            </li>
            <li>
              <Link>Yangiliklar.</Link>
            </li>
          </ul>
          <ul>
            <li>
              <h2>Ijtimoyit tarmoqlar</h2>
            </li>
            <li className="flex gap-4 mt-3">
              <Link>
                <img className="w-[45px]" src={telegram} alt="" />
              </Link>
              <Link>
                <img className="w-[45px]" src={instagram} alt="" />
              </Link>
            </li>
          </ul>
        </ul>

        <h1 className="flex justify-between flex-wrap gap-4 items-center mt-20">Copyright © 2025 Portfolio group. All rights reserved. <img className="h-[45px]" src={logo} alt="" /></h1>
      </div>
    </footer>
  );
};

export default Footer;
