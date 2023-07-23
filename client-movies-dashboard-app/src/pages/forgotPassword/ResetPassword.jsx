import React from "react";
import FormLayout from "../../components/layout/FormLayout";
import { confirmPasswordSchema } from "../../utils/schema/auth";
import { useFormik } from "formik";
import InputForm from "../../components/InputForm";
import { useMoviesStore } from "../../utils/MovieContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Confirm_user = () => {
  return <h>Password changed</h>;
};

const initialValues = { password: "", c_password: "" };
const ResetPassword = () => {
  const navigate = useNavigate();
  const { mail, setMail, loading, setLoading, error, setError } =
    useMoviesStore();
  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: confirmPasswordSchema,
      onSubmit: (values, action) => {
        change_password(values);
      },
    });

  const inputFormData = [
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

  const change_password = async (values) => {
    try {
      setLoading((pre) => (pre = true));
      const response = await axios(`${import.meta.env.VITE_CHANGE_PASSWORD}`, {
        method: "POST",
        data: { password: values.password, email: mail },
      });
      if (response.status === 200) {
        setLoading((pre) => (pre = false));
        setMail(null);
        navigate("/login");
        toast.success("Password changed successfully");
      }
    } catch (error) {
      setLoading((pre) => (pre = false));
      setError(error.response.data.message);
    }
  };

  return (
    <FormLayout>
      <form onSubmit={handleSubmit} className="flex flex-col gap-[25px]">
        <h1 className="py-[15px] text-center text-[24px] font-[700]">
          Reset Password
        </h1>
        {error ? <h1 className="text-red-600">{error}</h1> : null}
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
      {loading ? <span className="loader"></span> : null}
    </FormLayout>
  );
};

export default ResetPassword;
