import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashBoard from "../components/DashBoard";
import MovieProvider from "../utils/MovieContext";
import { Outlet, createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import {
  LoginProtectedRoute,
  ProtectedRoutes,
  VerificationRouts,
} from "../routes/ProtectedRoutes";
import WatchLater from "../pages/WatchLater";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/forgotPassword/ForgotPassword";
import ConfirmOtp from "../pages/forgotPassword/ConfirmOtp";
import ResetPassword from "../pages/forgotPassword/ResetPassword";

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

export const appRouter = createBrowserRouter([
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
      {
        path: "",
        element: <ProtectedRoutes />,
        children: [{ path: "/watch-later", element: <WatchLater /> }],
      },
      {
        path: "",
        element: <LoginProtectedRoute />,
        children: [
          { path: "/login", element: <Login /> },
          { path: "/register", element: <Register /> },
        ],
      },
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
