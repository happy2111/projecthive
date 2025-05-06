import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import {
  Link,
  Routes,
  Navigate,
  useLocation,
  useNavigate,
  replace,
} from "react-router-dom";
import { Route } from "react-router-dom";
import AdminRequests from "../sections/admin/Requests";
import AdminStatistika from "../sections/admin/Statistika.jsx";
import AdminQuestions from "../sections/admin/Questions.jsx";
import QuestionDetail from "./QuestionDetail.jsx";

const Admin = () => {
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    if(!localStorage.getItem("token")) {
      navigate("/auth")
    }
  }, [])
  let links = [
    { name: "So’rovlar", href: "/admin/requests", current: true },
    { name: "Statistika", href: "/admin/statistics", current: false },
    { name: "Savollar", href: "/admin/questions", current: false },
  ];

  const [activeLink, setActiveLink] = useState("/admin/requests");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleLinkClick = (href) => {
    setActiveLink(href);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  const handleQuit = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  return (
    <div className="font-[Baumans]">
      <nav className="bg-[#50C9CE80] mb-5 h-[55px] flex items-center">
        <div className="container flex justify-between items-center max-md:px-[20px]">
          <button
            className="md:hidden text-[#2E382E] text-[24px]"
            onClick={toggleMenu}
          >
            ☰
          </button>
          <ul
            className={`flex gap-4 ${
              isMenuOpen ? "flex py-4" : "hidden"
            } flex-col items-center md:flex-row md:flex absolute md:static bg-[#50C9CE80] md:bg-transparent w-full md:w-auto top-[55px] left-0 md:top-0`}
          >
            {links.map((i, index) => {
              return (
                <li key={index} className="max-sm:w-full px-4">
                  <Link
                    onClick={(e) => handleLinkClick(i.href)}
                    to={i.href}
                    className={`sm:w-[160px] w-full grid place-content-center h-[40px] bg-[#2E382E] hover:bg-[#50C9CE] text-[#50C9CE] border-2 border-[#50C9CE] duration-150 hover:text-[#2E382E] text-[18px] rounded-[10px] ${
                      location.pathname.includes(i.href)
                        ? "bg-[#50C9CE] !text-[#2E382E]"
                        : ""
                    }`}
                  >
                    {i.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          <button
            onClick={() => handleQuit()}
            className="flex items-center justify-center gap-2 w-[160px] h-[40px] bg-[#FF0C0C] hover:bg-transparent text-white border-2 border-[#FF0C0C] duration-150 hover:text-[#FF0C0C] text-[18px] rounded-[10px]"
          >
            <FaArrowLeftLong />
            Chiqish
          </button>
        </div>
      </nav>
      <Routes>
        <Route path="" element={<Navigate to="requests" replace />} />
        <Route path="requests" element={<AdminRequests />} />
        <Route path="statistics" element={<AdminStatistika />} />
        <Route path="questions" element={<AdminQuestions />} />
        <Route path="question/:id" element={<QuestionDetail />}></Route>
      </Routes>
    </div>
  );
};

export default Admin;
