import { useContext, createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const BASE_URL = "https://api.twitter-retro.fr";
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const loginAction = async (data) => {
    const ERROR_MESSAGE = {
      401: "Unknow User, please retry",
      _: "Unknow Error",
    };

    try {
      await axios
        .post(`${BASE_URL}/auth/login`, data)
        .then((response) => {
          console.log("Réponse du serveur :", response.data.user);
          setToken(response.data.token);
          setUser(response.data.user);
          localStorage.setItem("token", response.data.token);
          toast.success("Logged in successfully");
        })
        .catch((error) => {
          if (error.response) {
            toast.error(ERROR_MESSAGE[error.response.status]);
          }
        });
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
