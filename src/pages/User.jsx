import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

import { useAuth } from "../hooks/AuthProvider";

import IconButton from "../components/button/IconButton";
import ClassicButton from "../components/button/ClassicButton";

import HeaderBack from "../components/header/HeaderBack";
import TabNavigator from "../components/navigation/TabNavigator";

import ReduceBigNumbers from "../utils/ReduceBigNumbers";

const BASE_URL_IMAGE = "http://localhost:3001/images/";

function User() {
  const [init, setInit] = useState(false);
  const [view, setView] = useState("Posts");
  const [me, setMe] = useState(null);
  const location = useLocation();
  const auth = useAuth();

  useEffect(() => {
    const mePath = "/" + auth.user.tag;
    setMe(location.pathname === mePath);
  }, [auth]);

  useEffect(() => {
    setInit(true);
  }, [me]);

  const handleFollow = () => {};

  return (
    <div className="flex flex-col h-screen">
      <HeaderBack view="user" />
      <main className="flex flex-col h-full w-full overflow-y-auto">
        <div className="w-full h-[200px] bg-banner">
          {auth.user.bannerImage && (
            <img
              src={BASE_URL_IMAGE + "banner/" + auth.user.tag}
              className="w-full h-[200px] object-cover"
            />
          )}
        </div>
        <div className="w-full px-4 pt-3 mb-4">
          <div className="flex justify-between w-full h-[70px]">
            <div className="relative h-[140px] bottom-[85px] w-[140px] rounded-full bg-white">
              <img
                src={BASE_URL_IMAGE + "profile/" + auth.user.tag}
                className="rounded-full w-full object-cover border-4 border-white"
              />
            </div>
            {init && (
              <div className="flex h-full w-[169px] space-x-2 items-start justify-end">
                {me && (
                  <ClassicButton
                    text="Edit Profile"
                    color="white"
                    event={handleFollow}
                  />
                )}
                {!me && (
                  <>
                    <div className="flex space-x-2">
                      <IconButton name="more" styles="border-[1px]" />
                      <IconButton name="message" styles="border-[1px]" />
                    </div>
                    <ClassicButton
                      text="Follow"
                      color="black"
                      type="full"
                      event={handleFollow}
                    />
                  </>
                )}
              </div>
            )}
          </div>
          <div className="flex flex-col h-[50px] mt-1 mb-3">
            <span className="font-bold text-xl">{auth.user.fullName}</span>
            <span className="font-normal text-sm text-icon-default-color">
              @{auth.user.tag}
            </span>
          </div>
          <div className="h-auto w-full mb-3 overflow-x-hidden break-words">
            {auth.user.description}
          </div>
          <div className="flex h-[20px] w-full space-x-4 text-sm">
            <p className="">
              <span className="font-bold">{ReduceBigNumbers(315)} </span>
              <span className="font-normal text-icon-default-color">
                Following
              </span>
            </p>
            <p>
              <span className="font-bold">{ReduceBigNumbers(2800070)} </span>
              <span className="font-normal text-icon-default-color">
                Followers
              </span>
            </p>
          </div>
        </div>
        <nav className="h-[54px] w-full border-b-[1px]">
          <TabNavigator
            view={view}
            setView={setView}
            data={["Posts", "Retweets", "likes"]}
          />
        </nav>
        <div className="flex flex-1"></div>
      </main>
    </div>
  );
}

export default User;
