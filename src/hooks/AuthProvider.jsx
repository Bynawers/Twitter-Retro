import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();
  const loginAction = async (data) => {
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        // Parse the JSON response
        const res = await response.json();
        // Now you can access the response data
        if (res) {
          setUser(res.user.tag);
          //console.log(res)
          setToken(res.token);
          localStorage.setItem("site", res.token);
          console.log("token set");
          toast.success("Logged in successfully");
          navigate("/home");

          return;
        }
      } else {
        toast.error("Failed to login");
        throw new Error("Failed to login: " + response.statusText);
      }
    } catch (err) {
      // Handle any errors that occurred during the fetch
      console.error(err);
    }
  };
  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/login");
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
