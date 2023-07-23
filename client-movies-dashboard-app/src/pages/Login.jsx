import React, { useEffect, useState } from "react";
import InputForm from "../components/InputForm";
import { useFormik } from "formik";
import { loginSchema } from "../utils/schema/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormLayout from "../components/layout/FormLayout";
import { useMoviesStore } from "../utils/MovieContext";

const initialState = { email: "", password: "" };

const Login = () => {
  const { setUser } = useMoviesStore();
  const navigate = useNavigate();
  const { values, handleBlur, handleChange, errors, touched, handleSubmit } =
    useFormik({
      initialValues: initialState,
      validationSchema: loginSchema,
      onSubmit: (values, action) => {
        loginUser(values);
      },
    });
  const inputFormData = [
    { title: "Email", name: "email", value: values.email, type: "" },
    {
      title: "Password",
      name: "password",
      value: values.password,
      type: "password",
    },
  ];

  const loginUser = async (values) => {
    try {
      const response = await axios(`${import.meta.env.VITE_LOGIN}`, {
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

  return (
    <FormLayout>
      <form
        // autoComplete="off"
        onSubmit={handleSubmit}
        className="flex flex-col gap-[25px]"
      >
        <h1 className="text-center text-[24px] font-[700]">Login</h1>
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
        <p
          onClick={() => navigate("/user/forgot-password")}
          className="cursor-pointer text-right text-[14px] font-[500] text-red-500"
        >
          Forgot password ?
        </p>
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
        Dont have a account?{" "}
        <span
          onClick={() => navigate("/register")}
          className="cursor-pointer font-[500] text-red-600"
        >
          Sign Up
        </span>
      </h2>
    </FormLayout>
  );
};

export default Login;
