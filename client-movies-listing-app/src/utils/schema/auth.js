import * as YUP from "yup";

export const registerSchema = YUP.object({
  userName: YUP.string()
    .min(3, "Minimum 3 character required")
    .required("Please enter user name"),
  email: YUP.string()
    .email("The mail is wrong")
    .required("Please enter mail id"),
  password: YUP.string().required("Please enter your password"),
  c_password: YUP.string()
    .required("Enter password")
    .oneOf([YUP.ref("password"), null], "Password must be match"),
});

export const loginSchema = YUP.object({
  email: YUP.string()
    .email("The mail is wrong")
    .required("Please enter mail id"),
  password: YUP.string().required("Please enter your password"),
});

export const forgotSchema = YUP.object({
  email: YUP.string()
    .email("The mail is wrong")
    .required("Please enter your email"),
});

export const OtpSchema = YUP.object({
  otp: YUP.string().required("Please enter your OTP"),
});

export const confirmPasswordSchema = YUP.object({
  password: YUP.string().required("Please enter new password"),
  c_password: YUP.string()
    .oneOf([YUP.ref("password"), null], "Password must be match")
    .required("enter password"),
});
