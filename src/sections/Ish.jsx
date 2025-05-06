import React from 'react'
import portfolioImg from "../assets/Images and gifs/PORTFOLIOs img.jpg";
import search from "../assets/Icons/search.png"

const Ish = () => {
  return (
    <section className="bg-[#2E382E] overflow-y-hidden h-[350px] sm:h-[570px] mt-[40px]">
      <div className="container">
        <h1 className="text-[25px] sm:text-[35px] text-center text-[#50C9CE]">
          Siz ish beruvchimisiz va sizga IT mutaxasis kerakmi???
        </h1>
        <p className="text-[16px] max-sm:mt-[10px] max-sm:px-[30px] sm:text-[25px] text-center text-[#50C9CE]  ">
          Bizning saytda portfoliolarni kuzatib borin va o’zingizga yoqqan
          portfolio egasini tanlab oling!!!
        </p>

        <div className="h-[377px] w-full relative mt-[-70px] sm:mt-[30px] max-sm:scale-45">
          <div className="absolute max-sm:-left-[350px] sm:-left-[150px] w-[760px] h-[555px] p-[43px] rounded-[20px] overflow-hidden bg-[linear-gradient(252.05deg,_rgba(127,255,127,0.54)_0.55%,_rgba(255,125,125,0.54)_49.22%,_rgba(114,255,231,0.54)_96.08%)]">
            <img src={portfolioImg} className="w-full" alt="" />
          </div>

          <img
            src={search}
            alt=""
            className="w-[200px] absolute left-[300px] sm:left-[500px] top-[150px]"
          />
        </div>
      </div>
    </section>
  );
}

export default Ish
