import React, { useState, useEffect } from "react";

import twitterConfig from "../../twitterConfig.json";
import { useAuth } from "../hooks/AuthProvider";
import Header from "../components/header/Header";
import { useProfile } from "../hooks/ProfileProvider";
import { useScroll } from "../hooks/ScrollProvider";
import Feed from "../components/Feed";

const Bookmark = (props) => {
  const { nextPage, bookmarks } = useProfile();

  const auth = useAuth();
  const scroll = useScroll();

  useEffect(() => {
    if (scroll.isScrollEnd) {
      nextPage(props.view);
    }
  }, [scroll.isScrollEnd]);

  if (auth.user.bookmarks.length === 0) {
    return (
      <>
        <Header user={auth.user.tag} name="Bookmarks" view="bookmark" />
        <div className="flex flex-col pl-[20%] pr-[20%] pt-10 space-y-2">
          <p className="font-black text-3xl">Vous n'avez pas de signet</p>
          <span className="font-normal text-sm text-icon-default-color">
            Sauvegardez les tweets que vous souhaitez pour les regarder plus
            tard ici.
          </span>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col w-full h-screen">
      <Header user={auth.user.tag} name="Bookmarks" view="bookmark" />

      {bookmarks && <Feed value={bookmarks} />}
    </div>
  );
};

export default Bookmark;
