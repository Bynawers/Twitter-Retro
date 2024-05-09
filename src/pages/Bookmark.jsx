import React, { useState, useEffect } from "react";

import twitterConfig from "../../twitterConfig.json";
import { useAuth } from "../hooks/AuthProvider";
import Header from "../components/header/Header";
import { useProfile } from "../hooks/ProfileProvider";
import { useScroll } from "../hooks/ScrollProvider";
import Feed from "../components/Feed";

const Bookmark = (props) => {
  const { bookmarks } = useProfile();

  const { nextPage } = useProfile();

  const auth = useAuth();
  const scroll = useScroll();

  useEffect(() => {
    if (scroll.isScrollEnd) {
      nextPage(props.view);
    }
  }, [scroll.isScrollEnd]);

  return (
    <div className="flex flex-col w-full h-screen">
      <Header user={auth.user.tag} name="Bookmarks" view="bookmark" />

      {bookmarks && <Feed value={bookmarks} />}
    </div>
  );
};

export default Bookmark;
