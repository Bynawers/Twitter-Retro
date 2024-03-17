import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

function PublicRoutes() {
  const { token } = useAuth();
  return token ? <Navigate to="/home" /> : <Outlet />;
}

export default PublicRoutes;
