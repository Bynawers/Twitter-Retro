import React from "react";

import useScrollDirection from "../../utils/ScrollDirection";

import TabNavigator from "../navigation/TabNavigator";

import IconButton from "../button/IconButton";

const HeaderFeed = (props) => {
  const scrollDirection = useScrollDirection();

  return (
    <div
      className={`border-b-[1px] sticky w-full bg-opacity-70 bg-white backdrop-filter backdrop-blur-md transition-all duration-500 sm:top-0 ${
        scrollDirection === "down" ? "-top-24" : "top-0"
      }`}
    >
      <UpperHeader />
      <TabNavigator
        view={props.view}
        setView={props.setView}
        data={["Pour vous", "Abonnement"]}
      />
    </div>
  );
};

const UpperHeader = () => {
  return (
    <div className="flex flex-row flex-1 w-full h-14 sm:hidden justify-between pl-3 pr-1">
      <IconButton name="user" />
      <IconButton name="twitter" />
      <IconButton name="setting" />
    </div>
  );
};

export default HeaderFeed;
