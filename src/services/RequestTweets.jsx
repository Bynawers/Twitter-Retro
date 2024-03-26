import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = "https://api.twitter-retro.fr";

const getTweets = async (userId, auth) => {
  console.log("token : " + auth);
  try {
    const response = await axios.get(BASE_URL + "/tweets", {
      headers: {
        Auth: auth,
      },
    });
    console.log(response.data.tweets);
    return response.data.tweets;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    throw error;
  }
};

export { getTweets };
