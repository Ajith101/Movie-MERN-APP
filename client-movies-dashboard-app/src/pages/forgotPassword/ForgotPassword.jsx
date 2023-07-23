import { useFormik } from "formik";
import React, { useState } from "react";
import { forgotSchema } from "../../utils/schema/auth";
import InputForm from "../../components/InputForm";
import FormLayout from "../../components/layout/FormLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMoviesStore } from "../../utils/MovieContext";
import { toast } from "react-toastify";

const initialValues = { email: "" };
const ForgotPassword = () => {
  const { setMail } = useMoviesStore();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { handleBlur, handleChange, values, errors, touched, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: forgotSchema,
      onSubmit: async (values, action) => {
        await getOtp(values);
      },
    });

  const getOtp = async (values) => {
    try {
      setLoading((pre) => (pre = true));
      const response = await axios(`${import.meta.env.VITE_FORGOT_PASSWORD}`, {
        method: "POST",
        data: { ...values },
      });
      setLoading((pre) => (pre = false));
      if (response.status === 200) {
        toast.success("OTP sended on your email", { position: "top-center" });
        setMail(values.email);
        navigate("/user/forgot-password/otp");
      }
    } catch (error) {
      setLoading((pre) => (pre = false));
      toast.error(error.response.data.message, { position: "top-center" });
    }
  };

  return (
    <FormLayout>
      <form onSubmit={handleSubmit} className="flex flex-col gap-[25px]">
        <h1 className="py-[20px] text-center text-[24px] font-[700]">
          Forgot Password
        </h1>
        <InputForm
          title={"Email"}
          name={"email"}
          type={"email"}
          value={values.email}
          handleChange={handleChange}
          handleBlur={handleBlur}
          errors={errors}
          touched={touched}
        />
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

export default ForgotPassword;
