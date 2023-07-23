import React from "react";
import { useMoviesStore } from "../utils/MovieContext";
import { Navigate, Outlet } from "react-router-dom";

export const VerificationRouts = () => {
  const { mail } = useMoviesStore();
  return mail ? <Outlet /> : <Navigate to={"/login"} />;
};

export const ProtectedRoutes = () => {
  const { user } = useMoviesStore();
  return user ? <Outlet /> : <Navigate to={"/login"} />;
};

export const LoginProtectedRoute = () => {
  const { user } = useMoviesStore();
  return user ? <Navigate to={"/"} /> : <Outlet />;
};
