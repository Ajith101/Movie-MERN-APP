import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const MovieContext = createContext();
const userExist = localStorage.getItem("user");
const isExist = userExist ? JSON.parse(userExist) : null;

const MovieProvider = ({ children }) => {
  const [genres, setGenres] = useState(null);
  const [queryParams, setQueryParams] = useState({});
  const [allMovies, setAllMovies] = useState([]);
  const [mail, setMail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(isExist);

  const getGenres = async () => {
    const response = await axios(`${import.meta.env.VITE_All_GENERS}`);
    setGenres(response.data);
  };
  useEffect(() => {
    getGenres();
  }, []);
  useEffect(() => {
    if (queryParams) {
      filteredList();
    }
  }, [queryParams]);

  const filteredList = async () => {
    const response = await axios(`${import.meta.env.VITE_FILTERED_LIST}`, {
      method: "POST",
      params: {
        ...queryParams,
      },
    });
    setAllMovies(response.data);
  };

  return (
    <>
      <MovieContext.Provider
        value={{
          genres,
          setQueryParams,
          queryParams,
          allMovies,
          setAllMovies,
          mail,
          setMail,
          loading,
          setLoading,
          setUser,
          user,
        }}
      >
        {children}
      </MovieContext.Provider>
    </>
  );
};

export const useMoviesStore = () => {
  const [error, setError] = useState(null);
  const allMovieList = useContext(MovieContext);
  const {
    genres,
    queryParams,
    setQueryParams,
    allMovies,
    setAllMovies,
    setMail,
    mail,
    loading,
    setLoading,
    user,
    setUser,
  } = allMovieList;
  return {
    genres,
    queryParams,
    setQueryParams,
    allMovies,
    setAllMovies,
    setMail,
    mail,
    loading,
    setLoading,
    setError,
    error,
    user,
    setUser,
  };
};

export default MovieProvider;
