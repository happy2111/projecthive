import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import axios from "axios";
import Loader from "../../components/Loader";

const Questions = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    axios
      .get("/api/contacts/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setData(res.data);
        console.log(res);
      });
  }, [])

  // let data = [
  //   {
  //     name: "John",
  //     email: "exaple.com",
  //     phone: "1234567890",
  //     question: "What is your name?",
  //   },
  //   {
  //     name: "John",
  //     email: "exaple.com",
  //     phone: "1234567890",
  //     question: "What is your name?",
  //   },
  //   {
  //     name: "John",
  //     email: "exaple.com",
  //     phone: "1234567890",
  //     question: "What is your name?",
  //   },
  // ];

  return (
    <div className="">
      <ul className="container max-sm:px-4">
        {data.length > 0 ? data.map((item, index) => (
          <li
            key={index}
            className=" text-[white] bg-[#50C9CE33] hover:opacity-75 duration-150 rounded-[10px] border-2 border-[#50C9CE] flex items-center justify-between px-4 py-3 mb-4"
          >
            <p>{item.name}</p>
            <p>{item.email}</p>
            <Link
              className="flex gap-3 items-center rounded-[8px] border-2 border-[#00FF00] text-[#00FF00] px-4 py-2 hover:bg-[#00FF00] hover:text-[white] duration-150"
              to={`/admin/questions/${item.id}`}
            >
              Ko'rish
              <FaArrowRight />
            </Link>
          </li>
        )) : (<span className="fixed left-[50%] top-[50%] translate-x-[50%] translate-y-[50%]"><Loader/></span>)}
      </ul>
    </div>
  );
};

export default Questions;
