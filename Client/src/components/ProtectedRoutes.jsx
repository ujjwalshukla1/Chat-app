import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProtectedRoutes({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated, screenLoading } = useSelector((state) => state.userSlice);
  useEffect(() => {
    if (!screenLoading && !isAuthenticated) navigate("/login");
  }, [isAuthenticated, screenLoading, navigate]);
  return children;
}

export default ProtectedRoutes;
