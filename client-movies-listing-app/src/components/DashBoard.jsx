import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  AiFillCloseCircle,
  AiFillHome,
  AiOutlineLogin,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { MdOutlineWatchLater } from "react-icons/md";
import { IoIosArrowUp } from "react-icons/io";
import Search from "./Search";
import { useMoviesStore } from "../utils/MovieContext";
import { toast } from "react-toastify";
import { WatchLaterCount } from "../pages/WatchLater";
import { RxModulzLogo } from "react-icons/rx";
import { StarCheckBox } from "./Stars";

const DashBoard = ({ children }) => {
  const { genres, setQueryParams, queryParams, user, setUser } =
    useMoviesStore();
  const { pathname } = useLocation();
  const currentPath = pathname.split("/")[1];
  const [showDashBoard, setShowDashboard] = useState(false);
  const [sortView, setSortView] = useState(false);
  const [rating, setRating] = useState(null);
  const sortRef = useRef(null);
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", to: "/", icon: <AiFillHome /> },
    { name: "Login", to: "/login", icon: <AiOutlineLogin /> },
    { name: "Register", to: "/register", icon: <AiOutlineUserAdd /> },
  ];

  const displayNavLinks = navLinks?.map((item, id) => {
    if (user ? id <= 0 : id <= id)
      return (
        <NavLink
          key={id}
          to={item.to}
          className={({ isActive }) =>
            isActive
              ? "flex w-[70%] items-center gap-[15px] rounded-[15px] bg-white px-[10px] py-[8px] text-[16px] font-[700] text-[#002979]"
              : "flex w-[70%] items-center gap-[15px] rounded-[10px] px-[10px] py-[5px] text-slate-100"
          }
        >
          {item.icon} {item.name}
        </NavLink>
      );
  });

  const handleSelect = async (event) => {
    setQueryParams((pre) => ({ ...pre, genres: event.target.value }));
  };

  useEffect(() => {
    const handleOuterClick = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setSortView(false);
      }
    };
    document.addEventListener("mousedown", handleOuterClick);
  }, [sortRef]);

  const logoutHandler = async () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
    toast.success("Logout successfully", { position: "top-center" });
  };

  return (
    <>
      <div>
        <div className="sticky top-0 z-10 flex items-center justify-between bg-[#002979] px-[25px] py-[20px] text-white">
          <div className="flex gap-[2px]">
            <RxModulzLogo
              onClick={() => setShowDashboard((pre) => !pre)}
              color="text-blue-500"
              className="cursor-pointer"
              size={"30px"}
            />
            <h1
              onClick={() => navigate("/")}
              className="cursor-pointer font-font-2 text-[25px] font-[700]"
            >
              ovie App
            </h1>
          </div>
          <div className="flex items-center gap-[15px]">
            {user ? <h2>{user?.userName.toUpperCase()}</h2> : null}
            {pathname === "/" ? (
              <>
                <form className="text-blue-500">
                  <select
                    onChange={handleSelect}
                    name="genres"
                    id=""
                    className="rounded-[15px] p-[5px] outline-none"
                    value={queryParams?.genres ? queryParams?.genres : "all"}
                  >
                    <option value="all">All</option>
                    {genres?.map((item, id) => {
                      return (
                        <option key={id} value={item.title}>
                          {item.title}
                        </option>
                      );
                    })}
                  </select>
                </form>
                <div className="relative">
                  <button
                    onClick={() => setSortView((pre) => (pre = true))}
                    className="flex items-center gap-[10px] rounded-[4px] bg-white px-[10px] py-[5px] text-black"
                  >
                    {rating ? (
                      <span className="text-[16px]">{rating} Stars</span>
                    ) : (
                      "Sort"
                    )}
                    {sortView ? <IoIosArrowUp /> : <BsChevronDown />}
                  </button>
                  {sortView ? (
                    <div className="absolute bottom-[-30px] left-[-20px] rounded-[5px] bg-white p-[5px] text-blue-950 shadow-md">
                      <div
                        ref={sortRef}
                        className="flex items-center gap-[5px]"
                      >
                        <StarCheckBox setRating={setRating} rating={rating} />
                      </div>
                    </div>
                  ) : null}
                </div>
                <Search setQueryParams={setQueryParams} />
              </>
            ) : null}
            {user ? <WatchLaterCount /> : null}
          </div>
        </div>
        <div className="flex">
          <div
            className={`h-screen ${
              showDashBoard ? "w-[250px]" : "w-0"
            } transition-all duration-300 ease-linear`}
          >
            <div
              className={`fixed top-[70px] z-10 transition-all duration-300 ease-linear  ${
                showDashBoard ? "translate-x-0" : "translate-x-[-100%]"
              } full flex h-screen w-[250px] items-center justify-center bg-[#002979]`}
            >
              <div className="my-[100px] flex w-full flex-col items-center justify-start gap-[15px] text-center">
                {displayNavLinks}
                {user ? (
                  <>
                    <button
                      onClick={logoutHandler}
                      className="flex w-[70%] items-center gap-[15px] rounded-[10px] px-[10px] py-[5px] text-slate-100"
                    >
                      <AiOutlineLogin /> Logout
                    </button>
                    <button
                      onClick={() => navigate("/watch-later")}
                      className={`flex w-[70%] items-center gap-[15px] ${
                        currentPath === "watch-later"
                          ? "rounded-[15px] bg-white px-[10px] py-[8px] text-[16px] font-[700] text-[#002979]"
                          : "px-[10px] py-[5px] text-slate-100"
                      }`}
                    >
                      <MdOutlineWatchLater /> Watch later
                    </button>
                  </>
                ) : null}
              </div>
              <div className="absolute right-[20px] top-[20px] text-white">
                <AiFillCloseCircle
                  className="cursor-pointer"
                  size={"30px"}
                  onClick={() => setShowDashboard((pre) => !pre)}
                />
              </div>
            </div>
          </div>
          <div className="flex h-full min-h-screen w-full flex-col items-center pt-[30px]">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
