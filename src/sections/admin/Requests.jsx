import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import acc from "../../assets/Icons/account.png";
import Checkbox from "../../components/LikeBtn";
import SearchPanel from "../../components/SearchPanel";
import axios from "axios";

const Requests = () => {
  useEffect(() => {
    axios
      .get("https://shoxakong.pythonanywhere.com/projects/")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(
          "Ошибка при загрузке проектов:",
          err.response?.data || err.message
        );
      });
  }, []);

  const data = [
    {
      img: "https://picsum.photos/150/200",
      project_type: "Web Site",
      upload_time: "15.04.25",
      like: 25,
    },
    {
      img: "https://picsum.photos/200/300",
      project_type: "Web Site",
      upload_time: "15.04.25",
      like: 25,
    },
    {
      img: "https://picsum.photos/200/300",
      project_type: "Web Site",
      upload_time: "15.04.25",
      like: 25,
    },
    {
      img: "https://picsum.photos/200/300",
      project_type: "Web Site",
      upload_time: "15.04.25",
      like: 25,
    },
    {
      img: "https://picsum.photos/200/300",
      project_type: "Web Site",
      upload_time: "15.04.25",
      like: 25,
    },
    {
      img: "https://picsum.photos/200/300",
      project_type: "Web Site",
      upload_time: "15.04.25",
      like: 25,
    },
    {
      img: "https://picsum.photos/200/300",
      project_type: "Web Site",
      upload_time: "15.04.25",
      like: 25,
    },
    {
      img: "https://picsum.photos/200/300",
      project_type: "Web Site",
      upload_time: "15.04.25",
      like: 25,
    },
    {
      img: "https://picsum.photos/200/300",
      project_type: "Web Site",
      upload_time: "15.04.25",
      like: 25,
    },
    {
      img: "https://picsum.photos/200/300",
      project_type: "Web Site",
      upload_time: "15.04.25",
      like: 25,
    },
  ];

  return (
    <div>
      <div>
        <ul className="container sm:px-[40px] max-sm:gap-[15px] sm:gap-[20px] flex flex-wrap justify-evenly">
          {data.map((i, index) => {
            return (
              <li
                key={index}
                className="max-sm: w-[150px] h-[220px] bg-[#50C9CE] rounded-[15px] p-3"
              >
                <div className="h-[140px] overflow-hidden rounded-[10px]">
                  <img src={i.img} alt="" className="w-[125px] mx-auto" />
                </div>
                <div className="">
                  <p className="!text-[18px] mt-1 font-medium">
                    {i.project_type}
                  </p>
                  <span className="flex justify-between items-center h-[30px] ">
                    <p className="text-[12px]">{i.upload_time}</p>
                    <button className=" ml-[13px] scale-40 flex gap-[10px]">
                      <Checkbox />
                      <p className="text-[30px]">{i.like}</p>
                    </button>
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Requests;
