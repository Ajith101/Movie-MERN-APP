import React, { useEffect, useState } from "react";
import { BsImageFill } from "react-icons/bs";
import { CheckBox } from "../components/InputForm";
import { useFormik } from "formik";
import { addMovieSchema, editMovieSchema } from "../utils/schema";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import API from "../components/axios";
import { toast } from "react-toastify";
import { useMoviesStore } from "../utils/MovieContext";

const defaultFormValues = {
  movie_image_URI: "",
  movie_title: "",
  movie_description: "",
  rating: 1,
  genre: [],
};

const AddOrEdit = () => {
  const { setQueryParams } = useMoviesStore();
  const [imagePreview, setImagePreview] = useState(null);
  const [genre, setGenre] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getAllGenre();
    if (id) {
      getSingleMovie(id);
    }
    window.scrollTo(0, 0);
  }, []);

  const getAllGenre = async () => {
    const response = await axios(
      `${import.meta.env.VITE_BASE_URL}/api/movies/genre`
    );
    setGenre(response.data);
  };

  const getSingleMovie = async (id) => {
    const response = await API(`/api/movies/single`, {
      method: "POST",
      data: { id },
    });
    setValues({ ...response.data });
  };

  const addPOst = async (data, action) => {
    const allCheckBox = () => {
      document.getElementsByName("genre");
      for (let i = 0; i < allCheckBox.length; i++) {
        allCheckBox[i].checked = false;
      }
    };
    setLoading((pre) => (pre = true));
    if (id) {
      if (imagePreview) {
        let image;
        const reader = new FileReader();
        reader.readAsDataURL(imagePreview);
        reader.onload = async () => {
          if (reader.readyState === 2) {
            image = reader.result;
            console.log({ ...data, movie_image_URI: image });
            const response = await axios(
              `${import.meta.env.VITE_BASE_URL}/api/movies`,
              {
                method: "PUT",
                data: { ...data, movie_image_URI: image },
              }
            );
            if (response.status === 200) {
              setQueryParams((pre) => ({ ...pre, page: 1 }));
              navigate("/");
              action.resetForm();
              allCheckBox();
              toast.success("Edited successfully");
              setImagePreview(null);
              setLoading((pre) => (pre = false));
            }
          }
        };
      }
      const response = await axios(
        `${import.meta.env.VITE_BASE_URL}/api/movies`,
        {
          method: "PUT",
          data: { ...data, movie_image_URI: null },
        }
      );
      if (response.status === 200) {
        setQueryParams((pre) => ({ ...pre, page: pre.page }));
        action.resetForm();
        navigate("/");
        allCheckBox();
        toast.success("Edited successfully");
        setImagePreview(null);
        setLoading((pre) => (pre = false));
      }
    } else {
      let image;
      const reader = new FileReader();
      reader.readAsDataURL(imagePreview);
      reader.onload = async () => {
        if (reader.readyState === 2) {
          image = reader.result;
          const response = await axios(
            `${import.meta.env.VITE_BASE_URL}/api/movies`,
            {
              method: "POST",
              data: { ...data, movie_image_URI: image },
            }
          );
          if (response.status === 200) {
            setQueryParams((pre) => ({ ...pre, page: pre.page }));
            navigate("/");
            action.resetForm();
            allCheckBox();
            toast.success("Added successfully");
            setImagePreview(null);
            setLoading((pre) => (pre = false));
          }
        }
      };
    }
  };

  // form Validation
  const validationForm = imagePreview ? addMovieSchema : editMovieSchema;
  const {
    handleBlur,
    handleSubmit,
    touched,
    setFieldValue,
    handleChange,
    errors,
    values,
    setValues,
  } = useFormik({
    initialValues: defaultFormValues,
    validationSchema: id ? validationForm : addMovieSchema,
    onSubmit: (values, action) => {
      addPOst({ ...values }, action);
    },
  });

  const handleFile = (event) => {
    setImagePreview(event.target.files[0]);
    setFieldValue("movie_image_URI", event.target.files[0]);
  };

  const displayGeneres = genre.map((itemes, id) => {
    const isChecked = (ids) => {
      const isExist = values?.genre?.find((item) => item === ids);
      if (isExist) return true;
      else return false;
    };
    return (
      <CheckBox
        handleCheckBox={handleChange}
        onBlur={handleBlur}
        value={itemes._id}
        key={id}
        title={itemes.title}
        checked={isChecked(itemes._id)}
      />
    );
  });
  const DisplayToatalRating = Array.from({ length: 5 }, (ele, index) => {
    return <p key={index}>{index + 1}</p>;
  });

  const showImagePreviews =
    id && imagePreview ? (
      <img
        src={URL.createObjectURL(imagePreview)}
        className="h-full w-full object-contain"
        alt=""
      />
    ) : id && imagePreview === null ? (
      <img
        src={values.movie_image_URI}
        className="h-full w-full object-contain"
        alt=""
      />
    ) : (
      imagePreview &&
      !errors.movie_image_URI && (
        <img
          src={URL.createObjectURL(imagePreview)}
          className="h-full w-full object-contain"
          alt=""
        />
      )
    );
  return (
    <div className="shadows flex w-[550px] max-w-[80%] flex-col items-center justify-center rounded-[10px] bg-white p-[20px] text-slate-600 lg:w-[650px]">
      <h1 className="py-[15px] font-font-2 text-[22px] font-[700] text-[#002979]">
        {id ? "Edit Movie" : "Add Movie"}
      </h1>
      <form
        autoComplete="off"
        className="flex w-full flex-col gap-[20px]"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div>
              {errors.movie_image_URI && touched.movie_image_URI ? (
                <p className="py-[5px] text-[14px] text-red-600">
                  {errors.movie_image_URI}
                </p>
              ) : null}
              <label
                htmlFor="image"
                className="flex w-full cursor-pointer items-center"
              >
                <div
                  className="shadows relative h-[50px] w-[50px]"
                  style={{
                    background: "linear-gradient(to right, #8e2de2, #4a00e0)",
                    borderRadius: "9999px",
                  }}
                >
                  <BsImageFill
                    size={"20px"}
                    className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-white"
                  />
                </div>

                <div className="ml-[25px] w-fit overflow-hidden border-b-[2px] border-[#3fc3e0]">
                  <p className="">
                    {imagePreview ? imagePreview.name : "image file"}
                  </p>
                </div>
              </label>
            </div>

            <div className="mr-[60px] h-[90px] w-[120px]">
              {showImagePreviews}
            </div>
          </div>
          <input
            type="file"
            id="image"
            onChange={handleFile}
            name="movie_image_URI"
            className="hidden"
          />
        </div>

        <div>
          <label htmlFor="movie_title">
            <h1 className="font-font-2 text-[16px] font-[700] text-slate-900">
              Movie name
            </h1>
          </label>
          {errors.movie_title && touched.movie_title ? (
            <>
              <p className="text-[14px] text-red-600">{errors.movie_title}</p>
            </>
          ) : null}
          <input
            type="text"
            id="movie_title"
            placeholder="Movie title"
            value={values.movie_title}
            onChange={handleChange}
            onBlur={handleBlur}
            name="movie_title"
            className="w-full rounded-[4px] border-[1px] bg-blue-50 p-[10px] outline-none"
          />
        </div>
        <div>
          <label htmlFor="movie_description">
            <h1 className="font-font-2 text-[16px] font-[700] text-slate-900">
              Description
            </h1>
          </label>
          {errors.movie_description && touched.movie_description ? (
            <>
              <p className="text-[14px] text-red-600">
                {errors.movie_description}
              </p>
            </>
          ) : null}
          <textarea
            type="text"
            id="movie_description"
            name="movie_description"
            placeholder="Movie description"
            onBlur={handleBlur}
            value={values.movie_description}
            onChange={handleChange}
            className="w-full rounded-[4px] border-[1px] bg-blue-50 p-[10px] outline-none"
          />
        </div>
        <div>
          <div className="mb-[10px] w-fit overflow-hidden border-b-[2px] border-[#3fc3e0]">
            <p className="font-font-2 text-[16px] font-[700] text-slate-900">
              Rating
            </p>
          </div>
          <div className="flex w-full items-center justify-between">
            {DisplayToatalRating}
          </div>
          {errors.rating && touched.rating ? (
            <>
              <p className="text-[14px] text-red-600">{errors.rating}</p>
            </>
          ) : null}
          <input
            type="range"
            min="1"
            max="5"
            step="0.5"
            name="rating"
            value={values.rating}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full cursor-pointer transition"
          />
        </div>
        <div className="w-fit overflow-hidden border-b-[2px] border-[#3fc3e0]">
          <p className="font-font-2 text-[16px] font-[700] text-slate-900">
            Genre
          </p>
        </div>
        {errors.genre && touched.genre ? (
          <>
            <p className="text-[14px] text-red-600">{errors.genre}</p>
          </>
        ) : null}
        <div className="flex flex-wrap items-center gap-[20px]">
          {genre && displayGeneres}
        </div>
        <div>
          <button
            type="submit"
            style={{
              background: "linear-gradient(to left, #8e2de2, #4a00e0)",
            }}
            className="shadows mt-[20px] rounded-[10px] px-[35px] py-[10px] text-[18px] font-[600] text-white"
          >
            Submit
          </button>
        </div>
      </form>
      {loading ? <span className="loader"></span> : null}
    </div>
  );
};

export default AddOrEdit;
