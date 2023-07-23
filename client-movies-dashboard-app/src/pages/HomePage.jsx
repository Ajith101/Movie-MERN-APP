import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import axios from "axios";
import DeletePopup from "../components/DeletePopup";
import { useMoviesStore } from "../utils/MovieContext";
import Pagination from "../components/Pagination";

const HomePage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const { allMovies, setAllMovies, loading, setLoading } = useMoviesStore();

  const confirmationPopup = (id) => {
    setShowPopup(true);
    setDeleteId(id);
  };

  const deleteMovie = async (id) => {
    setLoading((pre) => (pre = true));
    const response = await axios(
      `${import.meta.env.VITE_BASE_URL}/api/movies`,
      {
        method: "DELETE",
        data: { id },
      }
    );
    if (response.status === 200) {
      setAllMovies((pre) => ({
        ...pre,
        data: [
          ...pre.data.filter((item) => {
            return item._id !== id;
          }),
        ],
      }));
      setShowPopup(false);
      setLoading((pre) => (pre = false));
    }
  };
  console.log();
  const displayMoviesList = allMovies?.data?.map((item) => {
    return (
      <MovieCard
        key={item._id}
        item={item}
        confirmationPopup={confirmationPopup}
      />
    );
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <h1 className="font-font-2 text-[22px] font-[700] text-[#002979]">
        Movie Dashboard
      </h1>
      {allMovies?.data?.length ? (
        <>
          <div className="grid h-full w-[90%] grid-cols-2 gap-[25px] py-[20px] lg:grid-cols-3">
            {displayMoviesList}
          </div>
          <div className="flex flex-col items-center justify-center">
            <Pagination totalPage={allMovies?.totalPage} />
          </div>
        </>
      ) : (
        <div className="mt-[50px] flex h-[450px] w-[50%] items-center justify-center rounded-[20px] bg-blue-200 bg-opacity-50 p-[20px] text-center font-signature text-[30px] font-semibold">
          No Movies found !
        </div>
      )}

      {showPopup ? (
        <DeletePopup
          setShowPopup={setShowPopup}
          deleteId={deleteId}
          deleteItem={deleteMovie}
        />
      ) : null}
      {loading ? <span className="loader"></span> : null}
    </>
  );
};

export default HomePage;
