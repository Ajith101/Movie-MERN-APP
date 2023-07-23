import React from "react";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { useMoviesStore } from "../utils/MovieContext";

export const CheckBoxStar = ({ setRating, rating }) => {
  const { setQueryParams } = useMoviesStore();

  const handleCheckBox = (e) => {
    setRating((pre) => (pre === e.target.value ? null : e.target.value));
    setQueryParams((pre) => ({
      ...pre,
      rating: rating === e.target.value ? null : e.target.value,
    }));
  };
  const displayRating = Array.from({ length: 5 }, (ele, index) => {
    const currentRating = index + 1;
    return (
      <div key={index} className="">
        <input
          onChange={handleCheckBox}
          className="hidden"
          type="checkbox"
          name="rating"
          id={currentRating}
          value={currentRating}
        />
        <label htmlFor={currentRating}>
          <BsStarFill
            className="cursor-pointer"
            color={`${currentRating <= rating ? "#ed64a6" : "#fed7e2"}`}
            // color={`${currentRating <= rating ? "#ffc107" : "#e4e5e9"}`}
          />
        </label>
      </div>
    );
  });
  return displayRating;
};

const Stars = ({ rating }) => {
  const ratingStar = Array.from({ length: 5 }, (ele, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {rating >= index + 1 ? (
          <BsStarFill className="text-pink-500" />
        ) : rating >= number ? (
          <BsStarHalf className="text-pink-500" />
        ) : (
          <BsStarFill className="text-pink-200" />
        )}
      </span>
    );
  });

  return <>{ratingStar}</>;
};

export default Stars;
