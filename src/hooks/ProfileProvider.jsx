import { createContext, useContext, useState, useEffect } from "react";

import {
  getUserPosts,
  getUserRetweets,
  getUserLikes,
  getUserBookmarks,
} from "../services/RequestUsers";

import { useAuth } from "./AuthProvider";

const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const auth = useAuth();

  const [latestSearch, setLatestSearch] = useState(() => {
    const storedLatestSearch = localStorage.getItem("latestSearch");
    return storedLatestSearch ? JSON.parse(storedLatestSearch) : [];
  });

  const [postsPages, setPostsPages] = useState(1);
  const [repliesPages, setRepliesPages] = useState(1);
  const [likesPages, setLikesPages] = useState(1);
  const [retweetsPages, setRetweetsPages] = useState(1);
  const [bookmarksPages, setBookmarksPages] = useState(1);
  const [maxPostsPages, setMaxPostsPages] = useState(null);
  const [maxRepliesPages, setMaxRepliesPages] = useState(null);
  const [maxLikesPages, setMaxLikesPages] = useState(null);
  const [maxRetweetsPages, setMaxRetweetsPages] = useState(null);
  const [maxBookmarksPages, setMaxBookmarksPages] = useState(null);

  const [likes, setLikes] = useState([]);
  const [retweets, setRetweets] = useState([]);
  const [posts, setPosts] = useState([]);
  const [replies, setReplies] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  const [authInit, setAuthInit] = useState(null);
  const [loading, setLoading] = useState(null);

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
      const userPosts = await getUserPosts(auth.user.tag, postsPages, "tweet");
      setPosts(userPosts.data);
      const userReplies = await getUserPosts(
        auth.user.tag,
        repliesPages,
        "reply"
      );
      setReplies(userReplies.data);
      const userRetweets = await getUserRetweets(auth.user.tag);
      setRetweets(userRetweets.data);
      const userLikes = await getUserLikes(auth.user.tag);
      setLikes(userLikes.data);
      const userBookmarks = await getUserBookmarks(auth.user.tag);
      setBookmarks(userBookmarks.data);
      setPostsPages(postsPages + 1);
      setMaxRepliesPages(userReplies.totalPages);
      setMaxPostsPages(userPosts.totalPages);
      setMaxLikesPages(userLikes.totalPages);
      setMaxRetweetsPages(userRetweets.totalPages);
    };

    setLoading(true);
    fetchTweets();
  }, [authInit]);

  const nextPage = async (type) => {
    if (type === "Posts") {
      if (maxPostsPages) {
        if (postsPages > maxPostsPages) {
          return;
        }
      }
      const newUserPosts = await getUserPosts(
        auth.user.tag,
        postsPages,
        "tweet"
      );
      setPosts([...posts, ...newUserPosts.data.reverse()]);
      setMaxPostsPages(newUserPosts.totalPages);
      setPostsPages(postsPages + 1);
    } else if (type === "Likes") {
      if (maxLikesPages) {
        if (likesPages >= maxLikesPages) {
          return;
        }
      }
      const newUserLikes = await getUserLikes(auth.user.tag, likesPages);
      setLikes([...likes, ...newUserLikes.data.reverse()]);
      setMaxLikesPages(newUserLikes.totalPages);
      setLikesPages(likesPages + 1);
    } else if (type === "Retweets") {
      if (maxRetweetsPages) {
        if (retweetsPages >= maxRetweetsPages) {
          return;
        }
      }
      const newUserRetweets = await getUserRetweets(
        auth.user.tag,
        retweetsPages
      );
      setRetweets([...likes, ...newUserRetweets.data.reverse()]);
      setMaxRetweetsPages(newUserRetweets.totalPages);
      setRetweetsPages(retweetsPages + 1);
    } else if (type === "Bookmarks") {
      if (maxBookmarksPages) {
        if (bookmarksPages >= maxBookmarksPages) {
          return;
        }
      }
      const newUserBookmarks = await getUserBookmarks(
        auth.user.tag,
        bookmarksPages
      );
      setBookmarks([...bookmarks, ...newUserBookmarks.data.reverse()]);
      setMaxBookmarksPages(newUserBookmarks.totalPages);
      setBookmarksPages(bookmarksPages + 1);
    } else if (type === "Replies") {
      console.log(repliesPages + " > " + maxRepliesPages);
      if (maxRepliesPages) {
        if (repliesPages >= maxRepliesPages) {
          return;
        }
      }
      const newUserReplies = await getUserPosts(
        auth.user.tag,
        repliesPages,
        "reply"
      );
      setReplies([...replies, ...newUserReplies.data.reverse()]);
      setMaxRepliesPages(newUserReplies.totalPages);
      setRepliesPages(repliesPages + 1);
    }
  };
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

  const addRepliedTweet = (tweet) => {
    setReplies([tweet, ...replies]);
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

  const removeRepliedTweet = (tweetId) => {
    if (likes.some((item) => item._id === tweetId)) {
      setLikes(likes.filter((item) => item._id !== tweetId));
    }
    if (retweets.some((item) => item._id === tweetId)) {
      setRetweets(retweets.filter((item) => item._id !== tweetId));
    }
    if (bookmarks.some((item) => item._id === tweetId)) {
      setBookmarks(bookmarks.filter((item) => item._id !== tweetId));
    }
    setReplies(replies.filter((item) => item._id !== tweetId));
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
    replies,
    latestSearch,
    addLikedTweet,
    addRetweetedTweet,
    addPostedTweet,
    addBookmarkedTweet,
    addRepliedTweet,
    removeLikedTweet,
    removeRetweetedTweet,
    removePostedTweet,
    removeBookmarkedTweet,
    removeRepliedTweet,
    addLatestSearch,
    removeLatestSearch,
    removeAllLatestSearch,
    nextPage,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export default ProfileProvider;

export const useProfile = () => {
  return useContext(ProfileContext);
};
