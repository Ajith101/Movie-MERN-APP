import React, { useEffect, useState } from "react";
import { MdOutlineWatchLater } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMoviesStore } from "../utils/MovieContext";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import DeletePopup from "../components/DeletePopup";

export const WatchLaterCount = () => {
  const navigate = useNavigate();
  const { user } = useMoviesStore();
  const watchLaterCount = user?.watch_later ? user?.watch_later?.length : 0;

  return (
    <div
      onClick={() => navigate("/watch-later")}
      className="cursor-pointer overflow-hidden rounded-[36px] bg-[#FAFAFA] px-[4px] py-[4px] pr-[8px] text-[#002979]"
    >
      <div className="flex w-fit items-center gap-[10px]">
        <button className="relative h-[25px] w-[25px] rounded-full bg-[#274C5B]">
          <span className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-white">
            <MdOutlineWatchLater size={"18px"} />
          </span>
        </button>
        <p className="font-font-2 font-[600]">
          Watch later {`(${watchLaterCount})`}
        </p>
      </div>
    </div>
  );
};

const WatchLater = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [allMovies, setAllMovies] = useState([]);
  const { loading, setLoading } = useMoviesStore();

  const confirmationPopup = (id) => {
    setShowPopup(true);
    setDeleteId(id);
  };

  const getMovies = async (page) => {
    const response = await axios(`http://localhost:2060/api/user/watch-later`, {
      method: "POST",
      params: { page: page ? page : 1 },
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    setAllMovies(response.data);
  };

  const deleteMovie = async (id) => {
    setLoading((pre) => (pre = true));
    const response = await axios(
      `${import.meta.env.VITE_BASE_URL}/api/movies`,
      { method: "DELETE", data: { id } }
    );
    setAllMovies(response.data);
    setShowPopup(false);
    setLoading((pre) => (pre = false));
  };

  const displayMoviesList = allMovies?.data?.map((item) => {
    return (
      <MovieCard
        key={item._id}
        item={item}
        setAllMovies={setAllMovies}
        confirmationPopup={confirmationPopup}
      />
    );
  });

  useEffect(() => {
    getMovies();
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <h1 className="font-font-2 text-[22px] font-[700] text-[#002979]">
        Watch Later
      </h1>
      {allMovies?.data?.length ? (
        <>
          <div className="grid h-full w-[90%] grid-cols-3 gap-[25px] py-[20px]">
            {displayMoviesList}
          </div>
          <div className="flex flex-col items-center justify-center">
            <Pagination
              totalPage={allMovies?.totalPage}
              setCurrentPage={getMovies}
              movies={allMovies}
            />
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

export default WatchLater;
