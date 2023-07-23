import React from "react";
import Stars from "./Stars";
import { MdModeEdit, MdOutlineWatchLater } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useMoviesStore } from "../utils/MovieContext";

const MovieCard = ({ item, confirmationPopup }) => {
  const navigate = useNavigate();
  const { setQueryParams } = useMoviesStore();

  const readMore = (text) => {
    if (text.length > 105) {
      text = text.substring(0, 105) + "...";
    }
    return text;
  };
  return (
    <>
      <div className="shadows flex h-[340px] w-full gap-[5px] overflow-hidden rounded-[20px] bg-white lg:h-[320px]">
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
            <h1 className="pt-[5px] text-[20px] font-semibold text-[#002979]">
              {item.movie_title}
            </h1>
            <div className="flex items-center gap-[4px]">
              <Stars rating={item.rating} />
            </div>
            <p className="font-font-2 text-slate-700">
              {readMore(item.movie_description)}
            </p>{" "}
            <div className="flex flex-wrap items-center gap-[5px]">
              {item.genre.map((items, id) => {
                return (
                  <span
                    onClick={() =>
                      setQueryParams((pre) => ({
                        ...pre,
                        genres: items.title,
                        page: 1,
                      }))
                    }
                    key={id}
                    className="cursor-pointer rounded-[10px] border-[1px] bg-[#E8EFF6] px-[8px] py-[2px] text-center font-font-2 text-[12px] font-[700] text-[#002979]"
                  >
                    {items.title}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="flex w-full items-end justify-end gap-[15px]">
            <MdModeEdit
              className="cursor-pointer text-[#002979] hover:text-red-600"
              onClick={() => navigate(`/edit-movies/${item._id}`)}
              size={"20px"}
            />
            <AiFillDelete
              className="cursor-pointer text-[#002979] hover:text-red-600"
              onClick={() => confirmationPopup(item._id)}
              size={"20px"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
