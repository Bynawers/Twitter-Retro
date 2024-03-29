import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

function PublicRoutes() {
  const auth = useAuth();
  return auth.token ? <Navigate to="/home" /> : <Outlet />;
}

export default PublicRoutes;
