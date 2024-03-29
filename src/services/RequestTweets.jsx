import axios from "axios";
import Cookies from "js-cookie";

//const BASE_URL = "https://api.twitter-retro.fr";
const BASE_URL = "http://localhost:3001";

const getTweets = async () => {
  const token = Cookies.get("token");
  try {
    const response = await axios.get(BASE_URL + "/tweets", {
      headers: {
        Auth: token,
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
