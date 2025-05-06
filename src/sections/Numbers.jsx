import React from "react";

const Numbers = () => {
  return (
    <div className="bg-[#50C9CE40] pt-[44px] pb-[50px] sm:pb-[100px]">
      <h1 className="text-[30px] sm:text-[35px] text-center text-[#50C9CE]">
        Saytimiz foydalanuvchilar soni:
      </h1>

      <div className="container sm:h-[346px] flex max-sm:flex-col max-sm:items-center sm:justify-between max-sm:px-[25px]">
        <div className="left max-sm:mt-[40px]">
          <div>
            <p className="text-[25px] max-sm:text-[30px] text-white/60 max-sm:text-center">
              Bugungacha:
            </p>
            <h3 className="text-[35px] max-sm:text-[25px] text-white mt-[10px] max-sm:text-center">
              O’zbekiston:
            </h3>
            <h1 className="text-[50px] text-[#50C9CE] text-center max-sm:text-[40px] max-sm:text-center">
              0,0
            </h1>
          </div>
          <div>
            <h3 className="text-[35px] text-white mt-[10px] max-sm:text-[25px] max-sm:text-center">
              Jaxon:
            </h3>
            <h1 className="text-[50px] text-[#50C9CE] text-center max-sm:text-[40px]">
              0,0
            </h1>
          </div>
        </div>
        <span className="bg-white w-full h-[2px] sm:w-[2px] sm:h-full max-sm:my-[30px]"></span>
        <div className="right">
          <div>
            <p className="text-[25px] text-white/60 max-sm:text-[30px] max-sm:text-center">
              Bu yili:
            </p>
            <h3 className="text-[35px] text-white mt-[10px] max-sm:text-[25px] max-sm:text-center">
              O’zbekiston:
            </h3>
            <h1 className="text-[50px] text-[#50C9CE] text-center max-sm:text-[40px] max-sm:text-center">
              0,0
            </h1>
          </div>
          <div>
            <h3 className="text-[35px] text-white mt-[10px] max-sm:text-[25px] max-sm:text-center">
              Jaxon:
            </h3>
            <h1 className="text-[50px] text-[#50C9CE] text-center max-sm:text-[40px] ">
              0,0
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Numbers;
