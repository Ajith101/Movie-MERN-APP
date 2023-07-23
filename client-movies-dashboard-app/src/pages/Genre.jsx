import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { RiEditBoxFill } from "react-icons/ri";
import { addGenreSchema } from "../utils/schema";
import axios from "axios";
import { toast } from "react-toastify";
import DeletePopup from "../components/DeletePopup";

const Genre = () => {
  const initialValues = { title: "" };
  const [edit, setEdit] = useState(false);
  const [allGenre, setAllGenre] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAllGenre = async () => {
    setLoading((pre) => (pre = true));
    const response = await axios(
      `${import.meta.env.VITE_BASE_URL}/api/movies/genre`
    );
    setAllGenre(response.data);
    setLoading((pre) => (pre = false));
  };

  const addNewGenre = async (value, action) => {
    setLoading((pre) => (pre = true));
    const response = await axios(
      `${import.meta.env.VITE_BASE_URL}/api/movies/genre`,
      {
        method: "POST",
        data: value,
      }
    );
    setAllGenre(response.data);
    setLoading((pre) => (pre = false));
    action.resetForm();
    toast.success("Added successfully");
  };

  useEffect(() => {
    getAllGenre();
    window.scrollTo(0, 0);
  }, []);

  const {
    errors,
    values,
    setFieldValue,
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
  } = useFormik({
    initialValues,
    validationSchema: addGenreSchema,
    onSubmit: (values, action) => {
      edit ? editeGenre(edit._id, values, action) : addNewGenre(values, action);
    },
  });

  const confirmationPopup = (id) => {
    setShowPopup(true);
    setDeleteId(id);
  };

  const deleteGenre = async (id) => {
    setLoading((pre) => (pre = true));
    const response = await axios(
      `${import.meta.env.VITE_BASE_URL}/api/movies/genre`,
      { method: "DELETE", data: { id: id } }
    );
    setAllGenre(response.data);
    setEdit(false);
    toast.success("Deleted");
    setShowPopup(false);
    setLoading((pre) => (pre = false));
  };

  const editeGenre = async (id, values, action) => {
    setLoading((pre) => (pre = true));
    const response = await axios(
      `${import.meta.env.VITE_BASE_URL}/api/movies/genre`,
      { method: "PUT", data: { ...values, id } }
    );
    setAllGenre(response.data);
    action.resetForm();
    setEdit(null);
    toast.success("Edited Genre");
    setLoading((pre) => (pre = false));
  };

  const displayGenre = allGenre?.map((item) => {
    return (
      <div
        key={item._id}
        className="flex min-w-[120px] flex-col overflow-hidden break-words rounded-[15px] bg-[#E8EFF6] px-[10px] py-[6px] text-center text-[#002979] transition ease-in-out hover:scale-[1.1] hover:border-none hover:bg-[#3fc3e0] hover:text-white"
      >
        <div className="flex items-center justify-end gap-[5px] border-b-[1px] py-[5px]">
          <RiEditBoxFill
            onClick={() => {
              setFieldValue("title", item.title), setEdit({ ...item });
            }}
            size={"20px"}
            className="cursor-pointer hover:text-black"
          />
          <AiTwotoneDelete
            onClick={() => confirmationPopup(item._id)}
            size={"20px"}
            className="cursor-pointer hover:text-red-600"
          />
        </div>
        <p className="mt-[10px] cursor-pointer py-[10px]"> {item.title}</p>
      </div>
    );
  });

  return (
    <>
      <div className="shadows flex w-[650px] max-w-[80%] flex-col items-center justify-center rounded-[10px] bg-white p-[20px] text-slate-600">
        <h1 className="font-font-2 text-[22px] font-[700] text-[#002979]">
          Edit/Add Genre
        </h1>
        <form onSubmit={handleSubmit} className="w-full">
          <label className="mb-[10px] w-fit overflow-hidden border-b-[2px] border-[#3fc3e0]">
            <p className="py-[5px] font-[500]">Title</p>
          </label>
          {errors.title && touched.title ? (
            <p className="text-[14px] text-red-600">{errors.title}</p>
          ) : null}
          <div className="flex w-full items-center justify-between gap-[18px]">
            <input
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter Genre"
              className="w-full rounded-[4px] border-[1px] border-[#3fc3e0] px-[10px] py-[9px] outline-none"
            />

            <div>
              <button
                type="submit"
                style={{
                  background: "linear-gradient(to left, #8e2de2, #4a00e0)",
                }}
                className="shadows mr-[40px] w-fit rounded-[4px] px-[35px] py-[10px] text-[18px] font-[600] text-white"
              >
                {edit ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </form>
        <div className="my-[20px] flex w-[95%] flex-wrap items-center justify-center gap-x-[15px] gap-y-[20px]">
          {displayGenre}
        </div>
      </div>
      {showPopup ? (
        <DeletePopup
          setShowPopup={setShowPopup}
          deleteId={deleteId}
          deleteItem={deleteGenre}
        />
      ) : null}
      {loading ? <span className="loader"></span> : null}
    </>
  );
};

export default Genre;
