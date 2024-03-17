import React from "react";

import { useLocation, Link } from "react-router-dom";

import { IoEllipsisHorizontal } from "react-icons/io5";

import HeaderBack from "../components/header/HeaderBack";

import ActionButtons from "../components/ActionsButtons";
import Comment from "../components/Comment";
import PostYourself from "../components/PostYourself";

function Post() {
  const location = useLocation();

  const postId = location.pathname;

  const comment = [
    {
      user: "Creme",
      username: "@kittymicropig",
      authentified: false,
      content:
        "Poirier va lui envoyer une grande sifflante en un round ça va être nimp",
      stat: {
        retweet: 0,
        like: 12,
        view: 14000,
      },
      comment: [],
    },
  ];

  return (
    <div className="flex flex-col h-screen">
      <HeaderBack />
      <div className="pl-4 pr-4">
        <div className="h-3 w-full" />
        <div className="flex flex-row h-[42px] bg-red">
          <img
            className="flex h-[40px] w-[40px] rounded-full object-cover mr-2"
            src="/src/services/images-profile/laSueur.jpg"
          />
          <div className="w-full h-full flex flex-col">
            <span className="text-sm font-bold">Bynawers</span>
            <span className="text-sm font-light">@Byna_wers</span>
          </div>
          <div className="h-full ml-2">
            <button>
              <IoEllipsisHorizontal size={20} />
            </button>
          </div>
        </div>
        <main className="flex w-full flex-col">
          <div className="mt-3 flex w-full">
            <p className="text-left text-md">
              ISLAM MAKHACHEV EST CHAUD POUR AFFRONTER DUSTIN POIRIER EN JUIN
            </p>
          </div>
          <div className="flex mt-3 w-full">
            <img
              className="flex rounded-xl object-cover mt-3"
              src="/src/services/images-content/charriere.jpeg"
            />
          </div>
          <div className="flex w-full h-5 mt-4 mb-4 space-x-1">
            <time className="text-sm text-textLight">
              9:16 AM · 11 mars 2024
            </time>
            <span>·</span>
            <span className="text-sm text-textLight">
              <span className="text-black font-bold">61,6 k</span> vues
            </span>
          </div>
          <ActionButtons view="main" />
          <PostYourself />
        </main>
      </div>
      <div className="mb-10">
        {comment.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <Comment data={item} />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default Post;
