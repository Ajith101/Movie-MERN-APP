import React from "react";
import { useMoviesStore } from "../utils/MovieContext";

const Pagination = ({ totalPage }) => {
  const { setQueryParams, allMovies } = useMoviesStore();
  const setCurrentPage = (page) => {
    setQueryParams((pre) => ({ ...pre, page }));
  };
  const displayPages = Array.from({ length: totalPage }, (ele, id) => {
    const currentPage = id + 1;
    return (
      <button
        onClick={() => setCurrentPage(currentPage)}
        key={id}
        className={`rounded-[4px] ${
          allMovies?.currentPage === currentPage
            ? "cursor-auto bg-blue-50 font-semibold text-blue-950"
            : "cursor-pointer"
        } border-[2px] px-[8px] py-[5px] text-center`}
      >
        {currentPage}
      </button>
    );
  });

  return <div className="flex items-center gap-[15px]">{displayPages}</div>;
};

export default Pagination;
