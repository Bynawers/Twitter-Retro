import React, { useState, useEffect } from "react";

import Feed from "../components/Feed";
import twitterConfig from "../../twitterConfig.json";
import { useAuth } from "../hooks/AuthProvider";
import Header from "../components/header/Header";

const BASE_URL = twitterConfig.local
  ? twitterConfig.BASE_URL_LOCAL + "/images/"
  : twitterConfig.BASE_URL_ONLINE + "/images/";

const Bookmark = (props) => {
  const [bookmark, setBookmark] = useState([]);
  const [bookmarkIds, setBookmarkIds] = useState([]);

  const auth = useAuth();

  useEffect(() => {
    if (!auth.user) {
      return;
    }
    setBookmarkIds(auth.user.bookmarks);
    console.log(auth.user.bookmarks);
  }, []);

  useEffect(() => {
    console.log(bookmark);
  }, [bookmark]);

  if (!auth.user.bookmarks) {
    return;
  }
  return (
    <div className="flex flex-col w-full h-screen">
      <Header text="Bookmarks" name="boo" />
    </div>
  );
};

export default Bookmark;

/*
{auth.user.bookmarks.length != 0 && (
        <Feed ids={bookmarkIds} value={bookmark} setValue={setBookmark} />
      )}
      {auth.user.bookmarks.length == 0 && (
        <span className="pt-20 text-xl">Empty list</span>
      )}
      */
