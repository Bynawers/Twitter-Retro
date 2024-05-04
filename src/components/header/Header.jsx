import React from "react";

import useScrollDirection from "../../utils/ScrollDirection";

const Header = (props) => {
  const scrollDirection = useScrollDirection();

  return (
    <div
      className={`z-10 pl-3 m-x-4 border-b-[1px] sticky w-full bg-opacity-70 bg-white backdrop-filter backdrop-blur-md transition-all duration-500 sm:top-0 ${
        scrollDirection === "down" ? "-top-24" : "top-0"
      }`}
    >
      <div className="flex flex-row p-5 pl-0 flex-1 h-14 items-center">
        {props.view == "post" && (
          <span className="text-xl font-base">{props.text}</span>
        )}
        {props.view == "user" && (
          <div className="flex flex-col">
            <span className="font-bold text-xl">{props.name}</span>
            <span className="font-normal text-sm text-icon-default-color">
              {props.post} {props.post == 0 ? "post" : "posts"}
            </span>
          </div>
        )}
        {props.view == "bookmark" && (
          <div className="flex flex-col">
            <span className="font-bold text-xl">{props.name}</span>
            <span className="font-normal text-sm text-icon-default-color">
              @{props.user}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
