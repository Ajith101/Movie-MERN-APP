import React, { useEffect, useState } from "react";
import InputForm from "../components/InputForm";
import { useFormik } from "formik";
import { registerSchema } from "../utils/schema/auth";
import axios from "axios";
import FormLayout from "../components/layout/FormLayout";
import { useNavigate } from "react-router-dom";
import { useMoviesStore } from "../utils/MovieContext";

const initialState = { email: "", userName: "", password: "", c_password: "" };

const Register = () => {
  const { setUser } = useMoviesStore();
  const navigate = useNavigate();
  const { values, handleBlur, handleChange, handleSubmit, touched, errors } =
    useFormik({
      initialValues: initialState,
      validationSchema: registerSchema,
      onSubmit: (values, action) => {
        registerUser(values);
      },
    });

  const registerUser = async (values) => {
    try {
      const response = await axios(`${import.meta.env.VITE_REGISTER}`, {
        method: "POST",
        data: { ...values },
      });
      if (response.status === 200) {
        setUser(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", JSON.stringify(response.data.token));
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message, { position: "top-center" });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 50);
  }, []);

  const inputFormData = [
    { title: "Email", name: "email", value: values.email, type: "" },
    {
      title: "User Name",
      name: "userName",
      value: values.userName,
      type: "",
    },
    {
      title: "Password",
      name: "password",
      value: values.password,
      type: "password",
    },
    {
      title: "Confirm password",
      name: "c_password",
      value: values.c_password,
      type: "password",
    },
  ];

  return (
    <FormLayout>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="flex flex-col gap-[25px]"
      >
        <h1 className="py-[18px] text-center text-[24px] font-[700]">
          Register
        </h1>
        {inputFormData.map((item, id) => {
          return (
            <InputForm
              key={id}
              title={item.title}
              name={item.name}
              type={item.type}
              value={item.value}
              handleChange={handleChange}
              handleBlur={handleBlur}
              errors={errors}
              touched={touched}
            />
          );
        })}
        <div className="w-full">
          <button
            type="submit"
            className="w-full rounded-[4px] bg-[#002979] py-[15px] text-center text-[18px] font-semibold text-white"
          >
            Submit
          </button>
        </div>
      </form>
      <h2 className="pt-[40px] text-center">
        Already have account?{" "}
        <span
          onClick={() => navigate("/login")}
          className="cursor-pointer font-[500] text-red-600"
        >
          Sign In
        </span>
      </h2>
    </FormLayout>
  );
};

export default Register;
