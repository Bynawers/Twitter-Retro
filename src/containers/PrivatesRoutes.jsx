import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

function PrivateRoutes() {
  const auth = useAuth();
  return auth.token ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
