import React, { useState, useEffect } from "react";

import twitterConfig from "../../twitterConfig.json";
import { useAuth } from "../hooks/AuthProvider";
import Header from "../components/header/Header";
import { useProfile } from "../hooks/ProfileProvider";
import Feed from "../components/Feed";

const Bookmark = (props) => {
  const { bookmarks } = useProfile();

  const auth = useAuth();

  return (
    <div className="flex flex-col w-full h-screen">
      <Header user={auth.user.tag} name="Bookmarks" view="bookmark" />

      {bookmarks && <Feed value={bookmarks} />}
    </div>
  );
};

export default Bookmark;
