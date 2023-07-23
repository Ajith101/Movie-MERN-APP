import { ToastContainer } from "react-toastify";
import MovieProvider from "../utils/MovieContext";
import DashBoard from "../components/DashBoard";
import { Outlet, createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import Genre from "../pages/Genre";
import AddOrEdit from "../pages/AddOrEdit";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/forgotPassword/ForgotPassword";
import {
  LoginProtectedRoute,
  ProtectedRoutes,
  VerificationRouts,
} from "./ProtectedRoutes";
import ConfirmOtp from "../pages/forgotPassword/ConfirmOtp";
import ResetPassword from "../pages/forgotPassword/ResetPassword";
import "react-toastify/dist/ReactToastify.css";

const AppLayout = () => {
  return (
    <MovieProvider>
      <DashBoard>
        <ToastContainer autoClose={1000} />
        <Outlet />
      </DashBoard>
    </MovieProvider>
  );
};

export const apRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: (
      <MovieProvider>
        <DashBoard>
          <ErrorPage />
        </DashBoard>
      </MovieProvider>
    ),
    children: [
      { path: "", element: <HomePage /> },
      { path: "/genre", element: <Genre /> },
      { path: "/add-movies", element: <AddOrEdit /> },
      { path: "/edit-movies/:id", element: <AddOrEdit /> },
      {
        path: "",
        element: <LoginProtectedRoute />,
        children: [
          { path: "/login", element: <Login /> },
          { path: "/register", element: <Register /> },
        ],
      },
      ,
      {
        path: "/user/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "",
        element: <VerificationRouts />,
        children: [
          {
            path: "/user/forgot-password/otp",
            element: <ConfirmOtp />,
          },
          {
            path: "/user/forgot-password/otp/confirm",
            element: <ResetPassword />,
          },
          ,
        ],
      },
    ],
  },
]);
