import { createContext, useContext, useState, useEffect } from "react";

import { getTweetsPerIds } from "../services/RequestTweets";
import { getUsers } from "../services/RequestUsers";

import { useAuth } from "./AuthProvider";

const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const auth = useAuth();

  const [latestSearch, setLatestSearch] = useState(() => {
    const storedLatestSearch = localStorage.getItem("latestSearch");
    return storedLatestSearch ? JSON.parse(storedLatestSearch) : [];
  });

  const [likes, setLikes] = useState([]);
  const [retweets, setRetweets] = useState([]);
  const [posts, setPosts] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  const [authInit, setAuthInit] = useState(null);
  const [loading, setLoading] = useState(null);
  const [loadingTweets, setLoadingTweets] = useState(null);
  const [loadingUsers, setLoadingUsers] = useState(null);

  const [fetchLikes, setFetchLikes] = useState([]);
  const [fetchRetweets, setFetchRetweets] = useState([]);
  const [fetchPosts, setFecthPosts] = useState([]);
  const [fetchBookmarks, setFetchBookmarks] = useState([]);

  const [fetchUsers, setFetchUsers] = useState([]);

  useEffect(() => {
    if (auth.user.likes && auth.user.retweets && auth.user.tweets) {
      setAuthInit(true);
    }
  }, [auth.user]);

  useEffect(() => {
    localStorage.setItem("latestSearch", JSON.stringify(latestSearch));
  }, [latestSearch]);

  useEffect(() => {
    if (loading || !authInit) {
      return;
    }

    const fetchTweets = async () => {
      setFetchLikes(await getTweetsPerIds(auth.user.likes));
      setFetchRetweets(await getTweetsPerIds(auth.user.retweets));
      setFecthPosts(await getTweetsPerIds(auth.user.tweets));
      setFetchBookmarks(await getTweetsPerIds(auth.user.bookmarks));

      setLoadingTweets(false);
    };

    setLoading(true);
    setLoadingTweets(true);
    fetchTweets();
  }, [authInit]);

  useEffect(() => {
    if (loadingTweets) {
      return;
    }

    const fetchUsers = async () => {
      try {
        let usersIds = [];
        fetchLikes.map((obj) => usersIds.push(obj.author._id));
        fetchRetweets.map((obj) => usersIds.push(obj.author._id));
        fetchBookmarks.map((obj) => usersIds.push(obj.author._id));

        const uniqueIds = [...new Set(usersIds)];

        setFetchUsers(await getUsers(uniqueIds));
        setLoadingUsers(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des users:", error);
      }
    };

    setLoadingUsers(true);
    fetchUsers();
  }, [loadingTweets]);

  useEffect(() => {
    if (loadingTweets || loadingUsers) {
      return;
    }

    const mergedLikes = fetchLikes.map((tweet) => {
      const author = fetchUsers.find((user) => user._id === tweet.author._id);
      return { ...tweet, author };
    });

    const mergedRetweets = fetchRetweets.map((tweet) => {
      const author = fetchUsers.find((user) => user._id === tweet.author._id);
      return { ...tweet, author };
    });

    const mergedBookmarks = fetchBookmarks.map((tweet) => {
      const author = fetchUsers.find((user) => user._id === tweet.author._id);
      return { ...tweet, author };
    });

    const mergedPosts = fetchPosts.map((tweet) => {
      const author = auth.user;
      return { ...tweet, author };
    });

    setLikes(mergedLikes);
    setRetweets(mergedRetweets);
    setPosts(mergedPosts);
    setBookmarks(mergedBookmarks);

    setLoading(false);
  }, [loadingUsers]);

  const addLikedTweet = (tweet, newStat) => {
    setPostStat(tweet._id, newStat);
    setBookmarkStat(tweet._id, newStat);
    setLikes([{ ...tweet, stat: newStat }, ...likes]);
  };

  const addRetweetedTweet = (tweet, newStat) => {
    setPostStat(tweet._id, newStat);
    setBookmarkStat(tweet._id, newStat);
    setRetweets([{ ...tweet, stat: newStat }, ...retweets]);
  };

  const addPostedTweet = (tweet) => {
    setPosts([tweet, ...posts]);
  };

  const addBookmarkedTweet = (tweet) => {
    setBookmarks([tweet, ...bookmarks]);
  };

  const removeLikedTweet = (tweetId, newStat) => {
    setPostStat(tweetId, newStat);
    setBookmarkStat(tweetId, newStat);
    setLikes(likes.filter((item) => item._id !== tweetId));
  };

  const removeRetweetedTweet = (tweetId, newStat) => {
    setPostStat(tweetId, newStat);
    setBookmarkStat(tweetId, newStat);
    setRetweets(retweets.filter((item) => item._id !== tweetId));
  };

  const removeBookmarkedTweet = (tweetId) => {
    setBookmarks(bookmarks.filter((item) => item._id !== tweetId));
  };

  const removePostedTweet = (tweetId) => {
    if (likes.some((item) => item._id === tweetId)) {
      setLikes(likes.filter((item) => item._id !== tweetId));
    }
    if (retweets.some((item) => item._id === tweetId)) {
      setRetweets(retweets.filter((item) => item._id !== tweetId));
    }
    if (bookmarks.some((item) => item._id === tweetId)) {
      setBookmarks(bookmarks.filter((item) => item._id !== tweetId));
    }
    setPosts(posts.filter((item) => item._id !== tweetId));
  };

  const setPostStat = (tweetId, newStat) => {
    const newPost = posts.map((post) =>
      post._id == tweetId ? { ...post, stat: newStat } : post
    );
    setPosts(newPost);
  };

  const setBookmarkStat = (tweetId, newStat) => {
    const newBookmarks = bookmarks.map((post) =>
      post._id == tweetId ? { ...post, stat: newStat } : post
    );
    setBookmarks(newBookmarks);
  };

  const addLatestSearch = (search) => {
    if (latestSearch.includes(search)) {
      const index = latestSearch.indexOf(search);
      const updatedLatestSearch = [...latestSearch];
      updatedLatestSearch.splice(index, 1);
      updatedLatestSearch.unshift(search);
      setLatestSearch(updatedLatestSearch);
      return;
    }
    setLatestSearch([search, ...latestSearch]);
  };

  const removeLatestSearch = (search) => {
    setLatestSearch(latestSearch.filter((item) => item != search));
  };

  const removeAllLatestSearch = () => {
    setLatestSearch([]);
  };

  const value = {
    likes,
    retweets,
    posts,
    bookmarks,
    latestSearch,
    addLikedTweet,
    addRetweetedTweet,
    addPostedTweet,
    addBookmarkedTweet,
    removeLikedTweet,
    removeRetweetedTweet,
    removePostedTweet,
    removeBookmarkedTweet,
    addLatestSearch,
    removeLatestSearch,
    removeAllLatestSearch,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export default ProfileProvider;

export const useProfile = () => {
  return useContext(ProfileContext);
};
