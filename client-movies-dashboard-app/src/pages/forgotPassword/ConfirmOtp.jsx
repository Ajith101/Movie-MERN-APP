import React from "react";
import { useFormik } from "formik";
import FormLayout from "../../components/layout/FormLayout";
import InputForm from "../../components/InputForm";
import { OtpSchema } from "../../utils/schema/auth";
import axios from "axios";
import { useMoviesStore } from "../../utils/MovieContext";
import { useNavigate } from "react-router-dom";

const initialValues = { otp: "" };
const ConfirmOtp = () => {
  const { mail, setError, error } = useMoviesStore();
  const navigate = useNavigate();
  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: OtpSchema,
      onSubmit: async (values, action) => {
        await verify_otp(values);
      },
    });

  const verify_otp = async (otp) => {
    try {
      const response = await axios(`${import.meta.env.VITE_VERIFY_OTP}`, {
        method: "POST",
        data: { otp: String(otp.otp), email: mail },
      });
      if (response.status === 200) {
        navigate("/user/forgot-password/otp/confirm");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <FormLayout>
      <form onSubmit={handleSubmit} className="flex flex-col gap-[25px]">
        <h1 className="py-[15px] text-center text-[24px] font-[700]">
          Confirm OTP
        </h1>
        {error ? <h1 className="text-red-600">{error}</h1> : null}
        <InputForm
          title={"OTP"}
          name={"otp"}
          type={"number"}
          value={values.otp}
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
    </FormLayout>
  );
};

export default ConfirmOtp;
