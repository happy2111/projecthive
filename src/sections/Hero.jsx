import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Hero = () => {
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
  
  return (
    <div className="h-[90vh]  pt-[15vh]  min-sm:mb-15">
      <div className="container max-sm:px-[10px]">
        <h1 className="text-[#50C9CE] text-[60px] font-bold max-sm:text-[30px] text-center ">
          O’z ishlaringizni boshqalar bilan bo’lishing va ish toping!!!
        </h1>
        <form
          action=""
          className=" flex justify-center max-sm:flex-col items-center gap-[20px] mt-[60px] "
        >
          <div className="w-[516px] h-[50px] max-sm:w-[300px] rounded-[10px] bg-[#50C9CE]/25 border-[#50C9CE] border-2 px-[10px] flex items-center justify-between">
            <input
              type="text"
              name=""
              id=""
              className="flex-grow-2 text-white outline-0 text-[22px] max-sm:text-[16px]"
              placeholder="Foydalanuvchi nomingiz..."
            />
            <Link
              to={"/auth"}
              className="flex-grow-1 h-[33px] items-center justify-center bg-[#50C9CE] max-sm:text-[16px] max-sm:w-[60px] border-2 border-transparent rounded-[5px] text-white hover:bg-transparent hover:border-[#50C9CE] hover:text-[#50C9CE] duration-150"
            >{windowWidth <= 670 ? "kirish" : "PORTFOLIO.uz ga kirish"}</Link>
          </div>
          <button className="w-[120px] h-[50px] max-sm:h-[40px] max-sm:text-[19px] text-[25px]  bg- border-2 border-[#50C9CE] rounded-[10px] hover:bg-[#50C9CE] text-[#50C9CE] hover:text-white duration-150">
            Google
          </button>
        </form>
      </div>
    </div>
  );
}

export default Hero
