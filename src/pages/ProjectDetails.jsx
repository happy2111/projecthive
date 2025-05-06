import React, { useEffect, useState } from "react";
import arrowDown from "../assets/Icons/arrowDown.png";
import link from "../assets/Icons/link.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import miniBook from "../assets/Icons/mini-book.png";

const ProjectDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [con, setCon] = useState([]);

  console.log(id);
  const navigate = useNavigate();

  const GetProjects = async () => {
    try {
      const res = await axios.get("/api/projects/" + id + "/");
      setData(res.data);
      return res.data.contributors;
    } catch (err) {
      console.error(
        "Ошибка при получении проекта:",
        err.response?.data || err.message
      );
      throw err;
    }
  };

  const getContibuter = async () => {
    try {
      const contributors = await GetProjects();

      const result = await Promise.all(
        contributors.map(async (i) => {
          const res = await axios.get(`/api/project-contributors/${i}/`);
          return res.data;
        })
      );

      setCon(result);
    } catch (err) {
      console.error(
        "Ошибка при получении участников:",
        err.response?.data || err.message
      );
    }
  };

  useEffect(() => {
    getContibuter();
  }, [id]);

  return (
    <section>
      <nav className="bg-[#50C9CE80] h-[55px] flex items-center">
        <div className="container flex justify-between items-center max-md:px-[20px]">
          <div className="flex gap-4">
            <Link
              onClick={() => navigate(-1)}
              className="border-2  hover:opacity-75 border-[#FF8888] bg-[#FF000033] text-[20px] text-[#FF8888] px-[41px] rounded-[10px]"
            >
              Orqaga
            </Link>
            {/* <button className="border-2 hover:opacity-75 border-[#50C9CE] bg-[#50C9CE33] text-[20px] text-[#50C9CE] px-[41px] rounded-[10px]">
              Saqlash
            </button>
            <button className="border-2 hover:opacity-75 border-[#50C9CE] bg-[#50C9CE33] text-[20px] text-[#50C9CE] px-[30px] rounded-[10px]">
              <img src={link} alt="" className="h-[22px]" />
            </button> */}
          </div>
        </div>
      </nav>

      <div className="min-h-screen bg-[#2A363B] text-white p-6 md:p-12">
        {data ? (
          <div className="flex flex-col lg:flex-row gap-6 container">
            {/* Left Column */}
            <div className="flex flex-col gap-4 w-full lg:w-1/2">
              <h2 className="text-2xl font-semibold">Sizning loyiha:</h2>
              <div className="flex gap-[20px] items-center flex-wrap max-sm:justify-center">
                <div className="border-[2px] border-[#50C9CE] rounded-[10px] overflow-hidden w-[150px] h-[200px]">
                  <img
                    src={data.project_img}
                    alt="project preview"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-[#50C9CE] font-medium">Loyiha nomi:</p>
                  <p>{data.title}</p>

                  <p className="text-[#50C9CE] font-medium">Boshlanish vaqti</p>
                  <p>{data.start_time}</p>
                  <p className="text-[#50C9CE] font-medium">Tugatilgan vaqti</p>
                  <p>{data.start_time}</p>

                  <p className="text-[#50C9CE] font-medium">Loyiha havolasi:</p>
                  <a href="">{data.deploy_link}</a>

                  <p className="text-[#50C9CE] font-medium">Loyiha fayli:</p>
                  <button className="flex hover:bg-[#50C9CE] items-center gap-2 border-[2px] border-[#50C9CE] rounded-[10px] px-4 py-2 w-fit">
                    <span>
                      <img className="w-[25px]" src={arrowDown} alt="" />
                    </span>
                    <span>Faylni yuklab olish.</span>
                  </button>
                </div>
              </div>

              <div>
                <p className="mb-1">Tavsif:</p>
                <textarea
                  disabled
                  value={data.description}
                  className="w-full h-32 rounded-[10px] border-[2px] border-[#50C9CE] bg-transparent px-4 py-2 resize-none outline-none"
                ></textarea>
              </div>
            </div>

            {/* Right Column */}
            <div className="w-full lg:w-1/2 border-[2px] border-[#50C9CE] rounded-[10px] p-4 flex flex-col gap-4">
              <h2 className="text-xl font-semibold">Guruh ma’lumotlari:</h2>

              <p className="font-medium">Guruhdagilar:</p>
              <div className="space-y-2">
                {con.map((i, index) => (
                  <div
                    key={i}
                    className="flex justify-between items-center border-b border-gray-600 pb-2"
                  >
                    <div className="flex items-center justify-between w-full pr-3">
                      <span>{i.full_name}</span>
                      <span className="text-[#50C9CE]">{i.position}</span>
                    </div>
                    <button className="border-[2px] w-35 items-center flex gap-2  border-[#00FF00] text-#00FF00 rounded-full px-3 py-1 text-sm hover:bg-lime-700 hover:text-white">
                      <img src={miniBook} alt="" /> Portfelisi
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 mt-4">
                <input
                  type="checkbox"
                  defaultChecked
                  className="accent-cyan-400 w-4 h-4"
                />
                <label>
                  Loyihada boshqa ishtirokchilar hisoblari ko’rinsinmi
                </label>
              </div>

              <button className="mt-4 bg-gradient-to-r from-lime-400 to-green-500 text-black px-6 py-2 rounded-md w-fit self-end">
                Guruhni ko’rish
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-screen">
            <Loader />
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectDetails;
