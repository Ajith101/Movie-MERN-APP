import React from "react";
import Stars from "./Stars";
import { MdOutlineWatchLater } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { useMoviesStore } from "../utils/MovieContext";
import axios from "axios";
import { toast } from "react-toastify";

const MovieCard = ({ item, confirmationPopup, setAllMovies }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const currentPath = pathname.split("/")[1] === "watch-later" ? true : false;

  const { setQueryParams, user, setUser } = useMoviesStore();

  const readMore = (text) => {
    if (text?.length > 105) {
      text = text.substring(0, 105) + "...";
    }
    return text;
  };

  const addWatchLater = async (movieId) => {
    try {
      const response = await axios(
        `http://localhost:2060/api/user/add-watch-later`,
        {
          method: "POST",
          data: {
            movieId: movieId,
          },
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Addded to watch later");
        const updatedUser = { ...user };
        updatedUser.watch_later.push(movieId);
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    } catch (error) {
      toast.error(error.response.data.message, { position: "top-center" });
    }
  };

  const removeWatchItems = async (movieId) => {
    try {
      const response = await axios(
        `http://localhost:2060/api/user/remove-watch-later`,
        {
          method: "POST",
          data: {
            movieId: movieId,
          },
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("removed from watch later", { position: "top-center" });
        const updatedUser = { ...user };
        const filteredList = updatedUser.watch_later.filter((item) => {
          return item !== movieId;
        });
        updatedUser.watch_later = filteredList;
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setAllMovies((pre) => ({
          ...pre,
          data: [
            ...pre.data.filter((item) => {
              return item._id != movieId;
            }),
          ],
        }));
      }
    } catch (error) {
      toast.error(error.response.data.message, { position: "top-center" });
    }
  };

  return (
    <>
      {/* <div className="shadows relative flex w-full gap-[5px] overflow-hidden rounded-[20px] bg-white"> */}
      <div className="shadows relative flex h-[280px] w-full gap-[5px] overflow-hidden rounded-[20px] bg-white">
        <div className="flex flex-col">
          <div className="h-full w-[170px]">
            <img
              src={item.movie_image_URI}
              className="h-full w-full overflow-hidden object-cover"
              alt=""
            />
          </div>
        </div>
        <div className="flex w-full flex-col items-start justify-between rounded-[4px] p-[10px]">
          <div className="flex flex-col gap-[10px]">
            {" "}
            <h1 className="break-words pt-[5px] text-[20px] font-semibold text-[#002979]">
              {item.movie_title}
            </h1>
            <div className="flex items-center gap-[4px]">
              <Stars rating={item.rating} />
            </div>
            <div className="">
              <p className="break-words font-font-2 text-slate-700">
                {readMore(item.movie_description)}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-[5px]">
              {item.genre.map((items, id) => {
                return (
                  <span
                    onClick={() =>
                      currentPath
                        ? null
                        : setQueryParams((pre) => ({
                            ...pre,
                            genres: items.title,
                            page: 1,
                          }))
                    }
                    key={id}
                    className={`break-words ${
                      currentPath ? null : "cursor-pointer"
                    } rounded-[10px] border-[1px] bg-[#E8EFF6] px-[8px] py-[2px] text-center font-font-2 text-[12px] font-[700] text-[#002979]`}
                  >
                    {items.title}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
        <div className="absolute bottom-[10px] right-[10px] flex w-full items-end justify-end gap-[15px]">
          {currentPath ? (
            <AiFillDelete
              className="cursor-pointer text-red-500 hover:text-red-600"
              onClick={() => removeWatchItems(item._id)}
              size={"20px"}
            />
          ) : (
            <MdOutlineWatchLater
              className="cursor-pointer text-slate-700 hover:text-red-600"
              onClick={() =>
                user ? addWatchLater(item._id) : navigate("/login")
              }
              size={"20px"}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default MovieCard;
