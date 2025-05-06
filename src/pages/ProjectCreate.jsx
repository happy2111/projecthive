import React, { use, useEffect, useState } from "react";
import profile from "../assets/Icons/account.png";
import rm from "../assets/Icons/x.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import check from "../assets/Icons/Check.png";
import del from "../assets/Icons/del-red.png";
import edit from "../assets/Icons/edit-green.png";
import empty from "../assets/Images and gifs/empty.png";
import ok from "../assets/Icons/ok.png";
import infoImg from "../assets/Icons/info.png";

const ProjectCreate = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1); // Step 1: Project form, Step 2: Member form
  const [project_img, setProject_img] = useState("");
  const [project_title, setProject_title] = useState("");
  const [project_description, setProject_description] = useState("");
  const [start_time, setStart_time] = useState("");
  const [end_time, setEnd_time] = useState("");
  const [git_hub, setGit_hub] = useState("");
  const [deploy_link, setDeploy_link] = useState("");
  const [contributors, setContributors] = useState([]);
  const [isURL, setURL] = useState(true);
  const [isAddMenuOpen, setAddMenuOpen] = useState(false); // Modal state
  const [prCreteLoader, setPrCreteLoade] = useState(false);

  // State for "A'zo qo'shish" form inputs
  const [fullName, setFullName] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [members, seMembers] = useState([]);
  const [errors, setErrors] = useState("");
  const [contriLoader, setContriLoader] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);
  const [projectId, setProjectId] = useState("");
  const [correct, setCorrect] = useState(false);
  const [info, setInfo] = useState(false);

  const handlerClick = () => {
    setURL(!isURL);
  };

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth");
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (!checkAuth()) return;
  }, []);

  const createPreject = async (e) => {
    try {
      setPrCreteLoade(true);
      e.preventDefault();
      const projectData = {
        project_img:
          project_img === ""
            ? "https://st2.depositphotos.com/1032577/6582/i/950/depositphotos_65828845-stock-photo-portfolio-written-on-notebook.jpg"
            : project_img,
        title: project_title,
        description: project_description,
        start_time: start_time,
        end_time: end_time,
        git_hub: git_hub,
        deploy_link: deploy_link,
      };
      const res = await axios.post("/api/projects/", projectData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res);
      if (res.status === 201) {
        setCorrect(true);
        setTimeout(() => {
          setCorrect(false);
          setCurrentStep(2);
        }, 2000);
      }
      setProjectId(res.data.id);
      return res.data.id;
    } catch (err) {
      console.error(
        "Ошибка при создании проекта:",
        err.response?.data || err.message
      );
      setErrors(err.response?.data || "Произошла ошибка.");
      if (err.response?.status === 401) {
        navigate("/auth", { replace: "/" });
      }
    } finally {
      setPrCreteLoade(false);
    }
  };

  const createProjectContributor = async () => {
    try {
      setContriLoader(true);
      const contrData = {
        full_name: fullName,
        email: email,
        github_link: githubLink,
        linkedin_link: linkedinLink,
        position: position,
      };
      const res = await axios.post("/api/project-contributors/", contrData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      seMembers((prev) => [...prev, res.data]);
      setAddMenuOpen(false);
      setFullName("");
      setPosition("");
      setEmail("");
      setGithubLink("");
      setLinkedinLink("");
      return res.data.id;
    } catch (err) {
      console.error(
        "Ошибка при создании участника:",
        err.response?.data || err.message
      );
      setErrors(err.response?.data || "Произошла ошибка.");
    } finally {
      setContriLoader(false);
    }
  };

  const deleteProjectContributor = async (id) => {
    try {
      await axios.delete(`/api/project-contributors/${id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      seMembers((prevMembers) =>
        prevMembers.filter((member) => member.id !== id)
      );
    } catch (err) {
      console.error(
        "Error deleting contributor:",
        err.response?.data || err.message
      );
    }
  };

  const handleEditMember = (member) => {
    setSelectedMember(member);
    setFullName(member.full_name);
    setPosition(member.position);
    setEmail(member.email);
    setGithubLink(member.github_link);
    setLinkedinLink(member.linkedin_link);
    setIsEditMenuOpen(true);
  };

  const updateProjectContributor = async () => {
    try {
      setContriLoader(true);
      const contrData = {
        full_name: fullName,
        email: email,
        github_link: githubLink,
        linkedin_link: linkedinLink,
        position: position,
      };
      const res = await axios.patch(
        `/api/project-contributors/${selectedMember.id}/`,
        contrData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      seMembers((prevMembers) =>
        prevMembers.map((member) =>
          member.id === selectedMember.id ? res.data : member
        )
      );
      setIsEditMenuOpen(false);
      setFullName("");
      setPosition("");
      setEmail("");
      setGithubLink("");
      setLinkedinLink("");
      setSelectedMember(null);
    } catch (err) {
      console.error(
        "Error updating contributor:",
        err.response?.data || err.message
      );
      if (err.response && err.response.data) {
        let errorString = "";
        for (const key in err.response.data) {
          if (err.response.data.hasOwnProperty(key)) {
            const errors = err.response.data[key];
            errorString += `${key}: ${
              Array.isArray(errors) ? errors.join(", ") : errors
            }\n`;
          }
        }
        setErrors(errorString.trim());
      } else {
        setErrors("An unexpected error occurred.");
      }
    } finally {
      setContriLoader(false);
    }
  };

  const ProjectUserConnect = async (projectId, contributorIds) => {
    try {
      console.log(projectId, contributorIds);

      // Make separate requests for each contributor
      const requests = contributorIds.map((contributorId) =>
        axios.post(
          "/api/project_user/",
          {
            project: projectId,
            contributor: contributorId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
      );

      const responses = await Promise.all(requests);
      console.log(responses);
      return responses;
    } catch (err) {
      console.log(err);
    } finally {
      navigate("/profile", { replace: true });
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const projectId = await createPreject(e);
  };

  const handleInfo = (member) => {
    setSelectedMember(member);
    setInfo(true);
  };

  return (
    <div>
      <nav className="bg-[#50C9CE80] h-[55px] flex items-center max-md:px-[20px]">
        <div className="container flex justify-between items-center max-md:px-[20px]">
          <but
            onClick={() => navigate("/projects")}
            className="border-2 cursor-pointer border-[#FF8888] bg-[#FF000033] text-[20px] text-[#FF8888] px-[41px] rounded-[10px]"
          >
            Orqaga
          </but>
          <img src={profile} alt="" className="w-[37px] h-[37px]" />
        </div>
      </nav>

      <div className="container">
        <div className="min-h-screen text-white p-6">
          {currentStep === 1 && (
            <form
              onSubmit={handleProjectSubmit}
              className="flex flex-col gap-4 w-full"
            >
              <h1 className="text-2xl md:text-3xl font-bold mb-6">
                Loyiha yaratish
              </h1>
              {errors && <div className="text-red-500 mb-4">{errors}</div>}

              <div className="top flex max-sm:flex-col gap-[17px] items-start max-sm:items-center ">
                <button
                  type="button"
                  onClick={handlerClick}
                  style={{
                    backgroundImage: `url(${project_img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className={`overflow-hidden bg-cover border-[2px] max-w-[198px] sm:min-w-[200px] text-wrap px-4 mt-[25px] bg-[#FFFFFF1A] border-[#50C9CE] rounded-[10px] flex items-center justify-center h-[264px] text-center  ${
                    errors.includes("project_img") ? "!border-red-500" : ""
                  }`}
                >
                  {!projectId && "Rasm qo’yishuchun bu yergateging!"}
                </button>

                <div
                  className={`fixed z-90 items-center justify-center w-full h-screen bg-black/40 top-0 left-0 ${
                    isURL ? "hidden" : "flex"
                  } flex-col gap-2`}
                >
                  <div className="bg-[#1e7578] z-50 rounded-[15px] p-4 flex mt-2 gap-2 w-[300px] justify-center items-center">
                    <input
                      value={project_img}
                      onChange={(e) => setProject_img(e.target.value)}
                      type="url"
                      name="project_img"
                      placeholder="Rasm URL-ni kiriting"
                      className={`w-full pl-2 h-[35px] rounded-[10px] border-2 border-[#50C9CE] z-20 `}
                    />
                    <button
                      type="button"
                      onClick={handlerClick}
                      className="w-[95px] h-[35px] bg-[#0004E74D] border-2 border-[#50C9CE] rounded-[10px] flex justify-center hover:opacity-75 active:opacity-50"
                    >
                      <img src={check} alt="Check icon" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col w-full">
                  <div>
                    <label className="block mb-1">Loyiha nomi:</label>
                    <input
                      value={project_title}
                      onChange={(e) => setProject_title(e.target.value)}
                      required
                      type="text"
                      placeholder="Loyihangiz nomini kiriting..."
                      className={`w-full rounded-[10px] border-[2px] border-[#50C9CE] bg-transparent px-4 py-2 outline-none ${
                        errors.includes("title") ? "border-red-500" : ""
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block mb-1">Tavsif:</label>
                    <textarea
                      value={project_description}
                      onChange={(e) => setProject_description(e.target.value)}
                      required
                      placeholder="Loyihangiz haqida qisqacha tavsiflab bering..."
                      className={`w-full h-32 rounded-[10px] border-[2px] border-[#50C9CE] bg-transparent px-4 py-2 outline-none ${
                        errors.includes("description") ? "border-red-500" : ""
                      }`}
                    ></textarea>
                  </div>

                  <div className="block-times flex gap-4 ">
                    {" "}
                    <div className="max-sm:w-[50%]">
                      <label className="block mb-1">Boshlanish vaqti:</label>
                      <input
                        value={start_time}
                        onChange={(e) => setStart_time(e.target.value)}
                        required
                        type="date"
                        className={`w-full rounded-[10px] border-[2px] border-[#50C9CE] bg-transparent px-4 py-2 outline-none ${
                          errors.includes("start_time") ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    <div className="max-sm:w-[50%]">
                      <label className="block mb-1">Tugash vaqti:</label>
                      <input
                        value={end_time}
                        onChange={(e) => setEnd_time(e.target.value)}
                        required
                        type="date"
                        className={`w-full  rounded-[10px] border-[2px] border-[#50C9CE] bg-transparent px-4 py-2 outline-none ${
                          errors.includes("end_time") ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                  </div>

                  <div className="link">
                    <label className="block mb-1">GitHub havolasi:</label>
                    <input
                      value={git_hub}
                      onChange={(e) => setGit_hub(e.target.value)}
                      required
                      type="url"
                      placeholder="GitHub havolasini kiriting..."
                      className={`w-full rounded-[10px] border-[2px] border-[#50C9CE] bg-transparent px-4 py-2 outline-none ${
                        errors.includes("git_hub") ? "border-red-500" : ""
                      }`}
                    />
                  </div>

                  <div className="link">
                    <label className="block mb-1">Deploy havolasi:</label>
                    <input
                      value={deploy_link}
                      onChange={(e) => setDeploy_link(e.target.value)}
                      required
                      type="url"
                      placeholder="Deploy havolasini kiriting..."
                      className={`w-full rounded-[10px] border-[2px] border-[#50C9CE] bg-transparent px-4 py-2 outline-none ${
                        errors.includes("deploy_link") ? "border-red-500" : ""
                      }`}
                    />
                  </div>
                </div>
              </div>

              <button
                disabled={prCreteLoader}
                type="submit"
                className="mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-md w-fit self-end"
              >
                {prCreteLoader ? "Keyingi..." : "Keyingi"}
              </button>
            </form>
          )}

          {correct && (
            <div className="flex flex-col items-center justify-center border-2 border-[#00FF00] shadow-[0px_0px_10px_2px_#00FF00] z-90 h-[200px] w-[300px] rounded-[30px]  bg-[#008B00] text-[#00FF00] fixed top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]">
              <img src={ok} alt="" className="w-[75px] " />
              <p className="text-wrap w-[186px] text-center">
                Loiha muvaffaqqiyatli yaratildi!!!
              </p>
            </div>
          )}

          {currentStep === 2 && (
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-4 w-full"
            >
              <div className="flex justify-between gap-2 items-center ">
                <h1 className="text-2xl md:text-3xl font-bold mb-6">
                  A'zolarni qo'shish
                </h1>
                <button
                  type="button"
                  onClick={() => setAddMenuOpen(true)} // Open modal
                  className="border h-10 border-lime-400 text-lime-400 rounded-full px-4 py-1 w-fit mt-2 hover:bg-lime-700 hover:text-white"
                >
                  + Qo’shish
                </button>
              </div>
              <ul className="h-full w-full border-2 rounded-[20px] border-[#50C9CE] p-[20px]">
                {members.length > 0 ? (
                  members.map((member, index) => (
                    <li
                      key={member.id}
                      className="w-full bg-[#50C9CE] mb-3 h-[40px] text-black rounded-[10px] flex items-center justify-between px-4"
                    >
                      <p>{member.full_name}</p>
                      <p>{member.position}</p>
                      <p className="max-sm:hidden">{member.email}</p>
                      <p className="max-sm:hidden">{member.github_link}</p>
                      <p className="max-sm:hidden">{member.linkedin_link}</p>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleInfo(member)}
                          className="info hover:opacity-55 active:opacity-30"
                        >
                          <img src={infoImg} className="w-[23px]" alt="" />
                        </button>
                        <button
                          className="hover:opacity-55 active:opacity-30 max-sm:hidden"
                          onClick={() => handleEditMember(member)}
                        >
                          <img src={edit} alt="" />
                        </button>
                        <button
                          className="hover:opacity-55 active:opacity-30 max-sm:hidden"
                          onClick={() => deleteProjectContributor(member.id)}
                        >
                          <img src={del} alt="" />
                        </button>
                      </div>
                    </li>
                  ))
                ) : (
                  <div className="flex flex-col justify-center items-center">
                    <img className="w-[255px]" src={empty} alt="" />
                    <h1 className="text-[#50C9CE] text-[35px] text-center">
                      Hozircha a’zolar yo’q
                    </h1>
                  </div>
                )}
              </ul>

              <button
                onClick={async () => {
                  const contributorIds = members.map((member) => member.id);
                  ProjectUserConnect(projectId, contributorIds);
                }}
                type="submit"
                className="mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-md w-fit self-end"
              >
                Yaratish
              </button>
            </form>
          )}

          {isAddMenuOpen && (
            <div
              onClick={(e) => {
                if (e.target === e.currentTarget) setAddMenuOpen(false); // Close modal on background click
              }}
              className="fixed z-50 top-0 left-0 w-full h-full text-[#2E382E] bg-black/50 flex items-center justify-center"
            >
              <div className="bg-[#50C9CE] w-full sm:w-[330px] z-90 p-8 rounded-md shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-center">
                  A'zo qo'shish
                </h2>
                {errors && <div className="text-red-500 mb-4">{errors}</div>}
                <div className="mb-4">
                  <label
                    htmlFor="full_name"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    To'liq ism:
                  </label>
                  <input
                    type="text"
                    id="full_name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.includes("full_name") ? "border-red-500" : ""
                    }`}
                    placeholder="<full_name>"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="position"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Loihaadagi roli:
                  </label>
                  <input
                    type="text"
                    id="position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.includes("position") ? "border-red-500" : ""
                    }`}
                    placeholder="<position>"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.includes("email") ? "border-red-500" : ""
                    }`}
                    placeholder="<email>"
                  />
                </div>
                <div className="flex space-x-4 mb-4">
                  <div className="w-1/2">
                    <label
                      htmlFor="github_link"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      GitHub:
                    </label>
                    <input
                      type="text"
                      id="github_link"
                      value={githubLink}
                      onChange={(e) => setGithubLink(e.target.value)}
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        errors.includes("github_link") ? "border-red-500" : ""
                      }`}
                      placeholder="<github_link>"
                    />
                  </div>
                  <div className="w-1/2">
                    <label
                      htmlFor="linkedin_link"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      LinkedIn:
                    </label>
                    <input
                      type="text"
                      id="linkedin_link"
                      value={linkedinLink}
                      onChange={(e) => setLinkedinLink(e.target.value)}
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        errors.includes("linkedin_link") ? "border-red-500" : ""
                      }`}
                      placeholder="<linkedin_link>"
                    />
                  </div>
                </div>
                <div className="flex justify-between gap-4">
                  <button
                    onClick={() => setAddMenuOpen(false)} // Close modal
                    className="bg-red-500 w-[50%] hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Bekor qilish
                  </button>
                  <button
                    onClick={createProjectContributor} // Submit contributor
                    className="bg-green-500 w-[50%] flex-grow-1 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    {contriLoader ? "Qo'shish..." : "Qo'shish"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {isEditMenuOpen && (
            <div
              onClick={(e) => {
                if (e.target === e.currentTarget) setIsEditMenuOpen(false);
              }}
              className="fixed z-50 top-0 left-0 w-full h-full text-[#2E382E] bg-black/50 flex items-center justify-center"
            >
              <div className="bg-[#50C9CE] w-full sm:w-[330px] z-90 p-8 rounded-md shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-center">
                  A'zoni tahrirlash
                </h2>
                {errors && <div className="text-red-500 mb-4">{errors}</div>}
                <div className="mb-4">
                  <label
                    htmlFor="full_name"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    To'liq ism:
                  </label>
                  <input
                    type="text"
                    id="full_name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.includes("full_name") ? "border-red-500" : ""
                    }`}
                    placeholder="<full_name>"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="position"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Loihaadagi roli:
                  </label>
                  <input
                    type="text"
                    id="position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.includes("position") ? "border-red-500" : ""
                    }`}
                    placeholder="<position>"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.includes("email") ? "border-red-500" : ""
                    }`}
                    placeholder="<email>"
                  />
                </div>
                <div className="flex space-x-4 mb-4">
                  <div className="w-1/2">
                    <label
                      htmlFor="github_link"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      GitHub:
                    </label>
                    <input
                      type="text"
                      id="github_link"
                      value={githubLink}
                      onChange={(e) => setGithubLink(e.target.value)}
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        errors.includes("github_link") ? "border-red-500" : ""
                      }`}
                      placeholder="<github_link>"
                    />
                  </div>
                  <div className="w-1/2">
                    <label
                      htmlFor="linkedin_link"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      LinkedIn:
                    </label>
                    <input
                      type="text"
                      id="linkedin_link"
                      value={linkedinLink}
                      onChange={(e) => setLinkedinLink(e.target.value)}
                      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        errors.includes("linkedin_link") ? "border-red-500" : ""
                      }`}
                      placeholder="<linkedin_link>"
                    />
                  </div>
                </div>
                <div className="flex justify-between gap-4">
                  <button
                    onClick={() => setIsEditMenuOpen(false)}
                    className="bg-red-500 w-[50%] hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Bekor qilish
                  </button>
                  <button
                    onClick={updateProjectContributor}
                    className="bg-green-500 w-[50%] flex-grow-1 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    {contriLoader ? "Yangilash..." : "Yangilash"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {info && (
            <div className="fixed z-50 top-0 left-0 w-full h-full text-[#2E382E] bg-black/50 flex items-center justify-center">
              <div className="bg-[#50C9CE] w-full sm:w-[330px] z-90 p-8 rounded-md shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-center">
                  To’liq ma’lumot
                </h2>
                <div className="mb-4">
                  <label
                    htmlFor="full_name"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    To'liq ism:
                  </label>
                  <p className="text-[19px] font-[500] text-[#2E382E] ml-[16px]">
                    {selectedMember?.full_name}
                  </p>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="position"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Loihaadagi roli:
                  </label>
                  <p className="text-[19px] font-[500] text-[#2E382E] ml-[16px]">
                    {selectedMember?.position}
                  </p>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Email:
                  </label>
                  <p className="text-[19px] font-[500] text-[#2E382E] ml-[16px]">
                    {selectedMember?.email}
                  </p>
                </div>
                <div className="flex flex-col space-x-4 mb-4">
                  <div className="w-full">
                    <label
                      htmlFor="github_link"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      GitHub:
                    </label>
                    <a
                      href={selectedMember?.github_link}
                      className="text-[19px] font-[500] text-[#2E382E] ml-[16px]"
                    >
                      {selectedMember?.github_link}
                    </a>
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="linkedin_link"
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      LinkedIn:
                    </label>
                    <a
                      href={selectedMember?.linkedin_link}
                      className="text-[19px] font-[500] text-[#2E382E] ml-[16px]"
                    >
                      {selectedMember?.linkedin_link}
                    </a>
                  </div>
                </div>
                <div className="flex justify-between gap-4">
                  <button
                    onClick={() => {
                      setInfo(false);
                      setIsEditMenuOpen(true);
                      setFullName(selectedMember.full_name);
                      setPosition(selectedMember.position);
                      setEmail(selectedMember.email);
                      setGithubLink(selectedMember.github_link);
                      setLinkedinLink(selectedMember.linkedin_link);
                    }}
                    className="bg-yellow-500 w-[50%] hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Taxrirlash
                  </button>
                  <button
                    onClick={() => setInfo(false)}
                    className="bg-red-500 w-[50%] flex-grow-1 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Ortga
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCreate;
