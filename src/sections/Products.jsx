import React from "react";
import p1 from "../assets/Images and gifs/asosiy page codes.gif";
import p2 from "../assets/Images and gifs/Figma img.jpg";
const Products = () => {
  return (
    <section className="bg-[#50C9CE]  max-sm:h-[65vh] h-[600px] relative shadow-[1px_-46px_100px_50px_#50C9CE] overflow-hidden">
      <div className="container pt-[40px] ">
        <h1 className="text-[25px] sm:text-[35px] text-center text-[#2E382E]">
          IT mutaxasismisiz???
        </h1>
        <p className="text-[16px] sm:text-[23px] text-center text-[#2E382E]  ">
          Biz bilan loihalaringizni yig’ib boring va o’zingizga jamoa
          shakillantiring!!!
        </p>

        <div className="relative sm:h-[450px]">
          <div className="absolute right-5 sm:right-0 top-[90px] sm:top-[180px] rounded-[20px] w-[830px] sm:h-[494px] max-sm:w-[330px] sm:p-[44px] p-[20px] shadow-[0px_0px_50px_0px_#2E382E] bg-[linear-gradient(246.92deg,_rgba(255,_242,_0,_0.171)_23.61%,_rgba(0,_191,_255,_0.3)_59.18%,_rgba(0,_255,_0,_0.3)_97.12%)]">
            <img className="w-full h-full" src={p2} alt="" />
          </div>
          <div className="absolute top-[40px] sm:top-[80px] -right-20 sm:-right-40 w-[830px] sm:h-[494px] max-sm:w-[330px] rounded-[20px] sm:p-[44px] p-[20px] shadow-[0px_0px_50px_0px_#2E382E] bg-[linear-gradient(246.92deg,_rgba(255,_242,_0,_0.171)_23.61%,_rgba(0,_191,_255,_0.3)_59.18%,_rgba(0,_255,_0,_0.3)_97.12%)]">
            <img className="w-full" src={p1} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
