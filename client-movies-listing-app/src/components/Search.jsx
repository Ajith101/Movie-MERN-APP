import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

const Search = ({ setQueryParams }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setQueryParams((pre) => ({ ...pre, [name]: value }));
  };
  return (
    <div className="w-[246px] overflow-hidden rounded-[36px] bg-[#FAFAFA] px-[2px] py-[2px] text-blue-600">
      <form
        autoComplete="off"
        className="flex items-center justify-between pr-[5px]"
      >
        <input
          placeholder="Search movie"
          onChange={handleChange}
          type="text"
          name="search"
          className="w-[90%] bg-[#FAFAFA] px-[10px] py-[5px] outline-none"
        />
        <div className="w-fit">
          <button className="relative h-[30px] w-[30px] rounded-full bg-[#002979] p-[2px]">
            <span className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-white">
              <AiOutlineSearch />
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
