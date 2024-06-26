import axios from "axios";
import Cookies from "js-cookie";
import twitterConfig from "../../twitterConfig.json";

const BASE_URL = twitterConfig.local
  ? twitterConfig.BASE_URL_LOCAL
  : twitterConfig.BASE_URL_ONLINE;

const getTweets = async () => {
  const token = Cookies.get("token");
  try {
    const response = await axios.get(BASE_URL + "/tweets/feed", {
      headers: {
        Auth: token,
      },
    });
    return response.data.tweets;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    throw error;
  }
};

const getTweetsPerIds = async (ids) => {
  const token = Cookies.get("token");
  try {
    const response = await axios.get(BASE_URL + "/tweets", {
      params: { ids },
      headers: {
        Auth: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    throw error;
  }
};

const getTweetPerId = async (id) => {
  const token = Cookies.get("token");
  try {
    const response = await axios.get(BASE_URL + "/tweets/" + id, {
      headers: {
        Auth: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    return null;
  }
};

const createTweet = async (formData) => {
  const token = Cookies.get("token");
  try {
    const response = await axios.post(BASE_URL + "/tweets", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Auth: token,
      },
    });
    return response;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    return null;
  }
};

const deleteTweet = async (id) => {
  const token = Cookies.get("token");
  try {
    const response = await axios.delete(BASE_URL + "/tweets/" + id, {
      headers: {
        "Content-Type": "multipart/form-data",
        Auth: token,
      },
    });
    return response;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    return null;
  }
};

const getComments = async (id, page) => {
  const token = Cookies.get("token");
  try {
    const response = await axios.get(
      BASE_URL + "/tweets/" + id + "/comment?page=" + page,
      {
        headers: {
          Auth: token,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    return null;
  }
};

const likeTweet = async (id) => {
  const token = Cookies.get("token");
  try {
    const response = await axios.post(
      BASE_URL + "/tweets/" + id + "/like",
      {},
      {
        headers: {
          Auth: token,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    return { response: 500 };
  }
};

const unlikeTweet = async (id) => {
  const token = Cookies.get("token");
  try {
    const response = await axios.post(
      BASE_URL + "/tweets/" + id + "/unlike",
      {},
      {
        headers: {
          Auth: token,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    return { response: 500 };
  }
};

const retweetTweet = async (id) => {
  const token = Cookies.get("token");
  try {
    const response = await axios.post(
      BASE_URL + "/tweets/" + id + "/retweet",
      {},
      {
        headers: {
          Auth: token,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    return { response: 500 };
  }
};

const unretweetTweet = async (id) => {
  const token = Cookies.get("token");
  try {
    const response = await axios.post(
      BASE_URL + "/tweets/" + id + "/unretweet",
      {},
      {
        headers: {
          Auth: token,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    return { response: 500 };
  }
};

const bookmarkTweet = async (id) => {
  const token = Cookies.get("token");
  try {
    const response = await axios.post(
      BASE_URL + "/tweets/" + id + "/bookmark",
      {},
      {
        headers: {
          Auth: token,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    return { response: 500 };
  }
};

const unbookmarkTweet = async (id) => {
  const token = Cookies.get("token");
  try {
    const response = await axios.post(
      BASE_URL + "/tweets/" + id + "/unbookmark",
      {},
      {
        headers: {
          Auth: token,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    return { response: 500 };
  }
};

const searchLatestTweet = async (search) => {
  const token = Cookies.get("token");
  try {
    const response = await axios.get(BASE_URL + "/tweets/latest/" + search, {
      headers: {
        Auth: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    return null;
  }
};

const getFeedTrendy = async (pageTmp) => {
  const token = Cookies.get("token");
  const page = pageTmp ? pageTmp : 1;
  try {
    const response = await axios.get(
      BASE_URL + "/tweets/feedTrendy?page=" + page,
      {
        headers: {
          Auth: token,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    return null;
  }
};

const getFeed = async (pageTmp) => {
  const token = Cookies.get("token");
  const page = pageTmp ? pageTmp : 1;
  try {
    const response = await axios.get(BASE_URL + "/tweets/feed?page=" + page, {
      headers: {
        Auth: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    return null;
  }
};

const searchHashtags = async (search) => {
  const token = Cookies.get("token");
  try {
    const response = await axios.get(
      BASE_URL + "/tweets/searchByHashtag/" + search,
      {
        headers: {
          Auth: token,
        },
      }
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    return null;
  }
};

const getTopHashtag = async (pageTmp, pageSizeTmp) => {
  const token = Cookies.get("token");
  const page = pageTmp ? pageTmp : 1;
  const pageSize = pageSizeTmp ? pageSizeTmp : 10;
  try {
    const response = await axios.get(
      BASE_URL + "/tweets/topHashtags?page=" + page + "&pageSize=" + pageSize,
      {
        headers: {
          Auth: token,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    return null;
  }
};

export {
  getTweets,
  createTweet,
  deleteTweet,
  getTweetsPerIds,
  likeTweet,
  unlikeTweet,
  retweetTweet,
  unretweetTweet,
  bookmarkTweet,
  unbookmarkTweet,
  searchLatestTweet,
  getTweetPerId,
  getComments,
  getFeedTrendy,
  searchHashtags,
  getFeed,
  getTopHashtag,
};
