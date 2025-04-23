import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PublicRoutes({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated, screenLoading } = useSelector((state) => state.userSlice);

  useEffect(() => {
    if (!screenLoading && isAuthenticated) {
      navigate("/"); // or wherever you want to send them
    }
  }, [isAuthenticated, screenLoading, navigate]);
// or loading spinner
  return children;
}

export default PublicRoutes;
