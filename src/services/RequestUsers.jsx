import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = "http://localhost:3001/";
//const BASE_URL = "https://api.twitter-retro.fr/";

const getUsers = async (userId, auth) => {
  console.log(auth);
  try {
    const response = await axios.get(BASE_URL + "users/" + userId, {
      headers: {
        Auth: `Bearer ${auth}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    throw error;
  }
};

const signupUser = async (data) => {
  try {
    const response = await axios.post(BASE_URL + "auth/register", {
      tag: data.tag,
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    });

    if (response.status === 200) {
      toast.success("Form Submitted");
      console.log(data);
    } else {
      throw new Error("Failed to submit form");
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    throw error;
  }
};

export { getUsers, signupUser };
