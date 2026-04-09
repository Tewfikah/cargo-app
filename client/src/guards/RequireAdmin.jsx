import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";

const RequireAdmin = () => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  // Not logged in -> go login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // Logged in but not Admin -> go Home
  if (user?.role !== "Admin") {
    return <Navigate to="/" replace />;
  }

  // Admin -> allow
  return <Outlet />;
};

export default RequireAdmin;