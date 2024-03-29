import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

import IconButton from "../components/button/IconButton";
import ClassicButton from "../components/button/ClassicButton";
import { useAuth } from "../hooks/AuthProvider";

import HeaderBack from "../components/header/HeaderBack";

import { getUsers } from "../services/RequestUsers";

function User() {
  const location = useLocation();
  const auth = useAuth();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    alert("/" + auth.user.tag);
    if (location.pathname == "/" + auth.user.tag) {
      setUserData(auth.User);
      alert("yeyeyey");
    } else {
      // fetch
    }
  }, []);

  const handleFollow = () => {};

  useEffect(() => {
    getUsers(1);
    console.log("YEAHHH");
  }, [auth]);

  return (
    <div className="flex flex-col h-screen">
      <HeaderBack view="user" />
      <main className="flex flex-col h-full w-full overflow-y-auto">
        <img
          className="w-full h-[200px]"
          src="/src/services/images-banner/test.jpeg"
        />
        <div className="w-full h-[300px] px-4 pt-3 mb-4">
          <div className="flex justify-between w-full h-[70px]">
            <div className="relative h-[140px] bottom-[85px] w-[140px]">
              <img
                src="/src/assets/defaultAvatar.png"
                className="rounded-full w-full object-cover border-4 border-white"
              />
            </div>
            <div className="flex h-full w-[169px] space-x-2 items-start">
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
            </div>
          </div>
          <div className="flex flex-col h-[50px] mt-1 mb-3">
            <span className="font-bold text-xl">
              {userData ? userData.fullName : ""}
            </span>
            <span className="font-normal text-sm text-icon-default-color">
              @Bynawers
            </span>
          </div>
          <div className="h-auto w-full mb-3">
            Elite trader, master of x100- I trade psychology |{" "}
          </div>
          <div className="flex h-[20px] w-full space-x-4 text-sm">
            <p className="">
              <span className="font-bold">315 </span>
              <span className="font-normal text-icon-default-color">
                Following
              </span>
            </p>
            <p>
              <span className="font-bold">280K </span>
              <span className="font-normal text-icon-default-color">
                Followers
              </span>
            </p>
          </div>
        </div>
        <nav className="h-[54px] w-full border-b-[1px]"></nav>
      </main>
    </div>
  );
}

export default User;
