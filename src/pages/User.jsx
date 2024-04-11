import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

import { useAuth } from "../hooks/AuthProvider";

import IconButton from "../components/button/IconButton";
import ClassicButton from "../components/button/ClassicButton";

import HeaderBack from "../components/header/HeaderBack";
import TabNavigator from "../components/navigation/TabNavigator";

import ReduceBigNumbers from "../utils/ReduceBigNumbers";

import twitterConfig from "../../twitterConfig.json";

import { getUserByTag } from "../services/RequestUsers";

const BASE_URL_IMAGE = twitterConfig.local
  ? twitterConfig.BASE_URL_LOCAL + "/images/"
  : twitterConfig.BASE_URL_ONLINE + "/images/";

function User() {
  const [init, setInit] = useState(false);
  const [view, setView] = useState("Posts");
  const [profilePath, setProfilePath] = useState("Posts");
  const [user, setUser] = useState([]);
  const [me, setMe] = useState(null);
  const location = useLocation();

  const parts = location.pathname.split("/");
  const username = parts[parts.length - 1];

  const data = location.state ? location.state.data : null;

  const auth = useAuth();

  useEffect(() => {
    const myTag = auth.user.tag;
    setMe(username === myTag);
  }, [auth]);

  useEffect(() => {
    setInit(true);
    const fetchData = async () => {
      if (user.length > 0) {
        return;
      }
      try {
        const data = await getUserByTag(username);
        setUser(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des tweets:", error);
      }
    };

    if (!me) {
      fetchData();
    }
  }, [me]);

  const handleFollow = () => {};

  if (!me && user.tag == null) {
    return <AccountNotExist name={username} />;
  }

  return (
    <div className="flex flex-col h-screen">
      <HeaderBack view="user" name={me ? auth.user.fullName : user.fullName} />
      <main className="flex flex-col h-full w-full overflow-y-auto">
        <div className="w-full h-[200px] bg-banner">
          {auth.user.bannerImage && (
            <img
              src={BASE_URL_IMAGE + "banner/" + (me ? auth.user.tag : user.tag)}
              className="w-full h-[200px] object-cover"
            />
          )}
        </div>
        <div className="w-full px-4 pt-3 mb-4">
          <div className="flex justify-between w-full h-[70px]">
            <div className="relative h-[140px] bottom-[85px] w-[140px] rounded-full bg-foreground border-4 border-white">
              <img
                src={
                  BASE_URL_IMAGE + "profile/" + (me ? auth.user.tag : user.tag)
                }
                className="rounded-full w-full object-cove"
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
            <span className="font-bold text-xl">
              {me ? auth.user.fullName : user.fullName}
            </span>
            <span className="font-normal text-sm text-icon-default-color">
              @{me ? auth.user.tag : user.tag}
            </span>
          </div>
          <div className="h-auto w-full mb-3 overflow-x-hidden break-words">
            {me ? auth.user.description : user.description}
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

const AccountNotExist = (props) => {
  return (
    <div className="flex flex-col h-screen">
      <HeaderBack view="user" name="Profile" />
      <main className="flex flex-col h-full w-full overflow-y-auto">
        <div className="w-full h-[200px] bg-banner" />
        <div className="w-full px-4 pt-3 mb-4">
          <div className="flex justify-between w-full h-[70px]">
            <div className="relative h-[140px] bottom-[85px] w-[140px] rounded-full bg-foreground border-4 border-white" />
          </div>
          <div className="flex flex-col h-[50px] mt-1 mb-3">
            <span className="font-bold text-xl">@{props.name}</span>
          </div>
        </div>
        <div className="flex flex-col h-[200px] w-full justify-center items-center">
          <div className="flex flex-col w-[320px]">
            <span className="text-3xl font-black">
              This account doesn’t exist
            </span>
            <span className="font-normal text-icon-default-color">
              Try searching for another.
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default User;
