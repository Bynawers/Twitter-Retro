import { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

function PrivateRoutes() {
  const auth = useAuth();

  useEffect(() => {
    if (auth.token) {
      auth.getUserData();
    }
  }, []);

  return auth.token ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
