import React from "react";

const LoginChoose = () => {
  return (
    <section className="lg:flex w-full h-screen lg:justify-between lg:items-center flex-col">
      <div className="left lg:w-1/2 h-full flex flex-col items-center justify-center gap-16 lg:gap-70 relative">
        <h1 className="text-4xl lg:text-6xl text-cyan-400 font-baumans z-10">
          Salom do'stim!!!
        </h1>
        <p className="text-xl lg:text-3xl text-cyan-400 z-10">
          Admin paneliga kirishga
          <br />
          xush kelibsiz!!!
        </p>
        <img
          src="images/admin.png"
          alt=""
          className="w-2/5 lg:w-2/5 absolute bottom-0 opacity-10"
        />
      </div>

      <div className="right lg:w-1/2 h-full bg-cyan-400 rounded-tl-[200px] rounded-bl-[200px] lg:shadow-[-10px_0_20px_1px_#50C9CE] flex flex-col items-center justify-between py-20 lg:py-32 px-10 lg:px-36">
        <h1 className="text-3xl lg:text-4xl text-zinc-800 font-baumans">
          Hisobga kirish.
        </h1>
        <p className="text-lg lg:text-xl text-zinc-800 text-center">
          Saytning adminlik paneliga kirish uchun
          <br />
          foydalanuvchi nom va parolingizni kiriting!!!
        </p>
        <input
          type="text"
          name="text"
          id="text"
          placeholder="Foydalanuvchi nom"
          className="w-full h-11 lg:h-12 rounded-md border-2 border-zinc-800 bg-zinc-800/40 text-white text-lg px-3 hover:bg-zinc-800/80"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Parol"
          className="w-full h-11 lg:h-12 rounded-md border-2 border-zinc-800 bg-zinc-800/40 text-white text-lg px-3 hover:bg-zinc-800/80"
        />
        <a
          className="btn w-full h-12 lg:h-14 bg-zinc-800 rounded-md border-t-2 border-l-2 border-white border-r-zinc-600 border-b-zinc-600 text-cyan-400 text-xl lg:text-2xl no-underline flex items-center justify-center transition-all hover:border-t-zinc-800 hover:border-l-zinc-800 hover:border-r-white hover:border-b-white hover:bg-zinc-600 active:bg-zinc-800"
          href="#"
        >
          Kirish
        </a>
      </div>

      {/* Medium screens */}
      <div className="md:hidden lg:hidden flex flex-col w-full h-screen justify-between items-center">
        <div className="left w-full h-[300px] flex flex-col items-center justify-center gap-12 relative">
          <h1 className="text-5xl text-cyan-400 font-baumans z-10">
            Salom do'stim!!!
          </h1>
          <p className="text-2xl text-cyan-400 z-10 text-center">
            Admin paneliga kirishga
            <br />
            xush kelibsiz!!!
          </p>
          <img
            src="images/admin.png"
            alt=""
            className="w-[400px] absolute bottom-0 opacity-20"
          />
        </div>
        <div className="right w-full bg-cyan-400 rounded-b-none rounded-tr-[200px] rounded-tl-[200px] shadow-[-0px_-10px_20px_1px_#50C9CE] flex flex-col items-center justify-center gap-10 py-16 px-10 z-10">
          <h1 className="text-3xl text-zinc-800 font-baumans">
            Hisobga kirish.
          </h1>
          <p className="text-lg text-zinc-800 text-center">
            Saytning adminlik paneliga kirish uchun
            <br />
            foydalanuvchi nom va parolingizni kiriting!!!
          </p>
          <input
            type="text"
            name="text"
            id="text"
            placeholder="Foydalanuvchi nom"
            className="w-full h-11 rounded-md border-2 border-zinc-800 bg-zinc-800/40 text-white text-lg px-3 hover:bg-zinc-800/80"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Parol"
            className="w-full h-11 rounded-md border-2 border-zinc-800 bg-zinc-800/40 text-white text-lg px-3 hover:bg-zinc-800/80"
          />
          <a
            className="btn w-full h-12 bg-zinc-800 rounded-md border-t-2 border-l-2 border-white border-r-zinc-600 border-b-zinc-600 text-cyan-400 text-xl no-underline flex items-center justify-center transition-all hover:border-t-zinc-800 hover:border-l-zinc-800 hover:border-r-white hover:border-b-white hover:bg-zinc-600 active:bg-zinc-800"
            href="#"
          >
            Kirish
          </a>
        </div>
      </div>

      {/* Small screens */}
      <div className="md:hidden lg:hidden sm:hidden flex flex-col w-full h-screen justify-between items-center py-5">
        <div className="left w-full h-[150px] flex flex-col items-center justify-center gap-5 relative px-5">
          <h1 className="text-3xl text-cyan-400 font-baumans z-10">
            Salom do'stim!!!
          </h1>
          <p className="text-xl text-cyan-400 z-10 text-center">
            Admin paneliga kirishga
            <br />
            xush kelibsiz!!!
          </p>
          <img
            src="images/admin.png"
            alt=""
            className="h-[30%] absolute top-5 opacity-20"
          />
        </div>
        <div className="right w-full bg-cyan-400 rounded-b-none rounded-tr-[100px] rounded-tl-[100px] shadow-[-0px_-10px_20px_1px_#50C9CE] flex flex-col items-center justify-center gap-5 py-8 px-8 z-10">
          <h1 className="text-2xl text-zinc-800 font-baumans">
            Hisobga kirish.
          </h1>
          <p className="text-base text-zinc-800 text-center">
            Saytning adminlik paneliga kirish uchun
            <br />
            foydalanuvchi nom va parolingizni kiriting!!!
          </p>
          <input
            type="text"
            name="text"
            id="text"
            placeholder="Foydalanuvchi nom"
            className="w-full h-10 rounded-md border-2 border-zinc-800 bg-zinc-800/40 text-white text-lg px-3 hover:bg-zinc-800/80"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Parol"
            className="w-full h-10 rounded-md border-2 border-zinc-800 bg-zinc-800/40 text-white text-lg px-3 hover:bg-zinc-800/80"
          />
          <a
            className="btn w-full h-11 bg-zinc-800 rounded-md border-t-2 border-l-2 border-white border-r-zinc-600 border-b-zinc-600 text-cyan-400 text-xl no-underline flex items-center justify-center transition-all hover:border-t-zinc-800 hover:border-l-zinc-800 hover:border-r-white hover:border-b-white hover:bg-zinc-600 active:bg-zinc-800"
            href="#"
          >
            Kirish
          </a>
        </div>
      </div>
    </section>
  );
};

export default LoginChoose;
