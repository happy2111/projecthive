import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import acc from "../assets/Icons/account.png";
import Checkbox from "../components/LikeBtn";
import SearchPanel from "../components/SearchPanel";
import axios from "axios";
import Loader from "../components/Loader";

const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `/api/projects/?search=${searchText}&page=${currentPage}&page_size=${pageSize}`
      )
      .then((res) => {
        setProjects(res.data.results);
        setTotalCount(res.data.count);
        console.log(res.data.results);
      })
      .catch((err) => {
        console.log(err.message);
        console.log(err.response || err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchText, currentPage]);

  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <nav className="bg-[#50C9CE80] mb-[30px] h-[55px]  flex items-center max-md:px-[10px]">
        <div className="container flex justify-between  items-center max-md:px-[20px]">
          <Link
            onClick={() => navigate(-1)}
            className="border-2  hover:opacity-75 border-[#FF8888] bg-[#FF000033] text-[20px] text-[#FF8888] sm:px-[41px] px-4 rounded-[10px]"
          >
            {window.innerWidth > 660 ? "Orqaga" : "<"}
          </Link>
          <div className="flex gap-[37px]">
            <SearchPanel onSearch={setSearchText} />

            <Link to={"/profile"}>
              <img
                src={acc}
                alt=""
                className="w-[45px] max-sm:w-[40px] max-sm:h-[40px]"
              />
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex container justify-center">
        <ul className="flex flex-wrap gap-6 w-auto justify-center">
          {isLoading ? (
            <div className="flex w-full h-screen items-center justify-center">
              <Loader />
            </div>
          ) : projects.length > 0 ? (
            projects.map((i, index) => {
              return (
                <li
                  key={index}
                  className="max-sm: w-[150px] h-[220px] bg-[#50C9CE] rounded-[15px] p-3"
                >
                  <Link to={`/projects/${i.id}`} className="">
                    <div
                      style={{
                        backgroundImage: `url(${i.project_img})`,
                      }}
                      className="h-[140px] bg-cover w-[125px] overflow-hidden rounded-[10px]"
                    ></div>
                    <div className="">
                      <p className="!text-[18px] mt-1 font-medium">{i.title}</p>

                      <span className="flex items-center h-[30px] ">
                        <p className="text-[12px]">{i.end_time}</p>
                        {/* <button className="scale-40 ml-auto flex">
                      <Checkbox />
                      <p className="text-[30px]">12</p>
                    </button> */}
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })
          ) : (
            <p>Not Found</p>
          )}
        </ul>
      </div>
      <div className="container flex justify-center !mt-5">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-[#50C9CE80] hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
        >
          Orqaga
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`bg-[#50C9CE80]  hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 ${
              currentPage === page ? "bg-blue-500 text-white" : ""
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className="bg-[#50C9CE80] hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
        >
          Keyingi
        </button>
      </div>
    </div>
  );
};

export default Projects;
