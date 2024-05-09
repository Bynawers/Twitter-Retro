import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

import { Link } from "react-router-dom";

import ClassicButton from "../button/ClassicButton";
import IconButton from "../button/IconButton";
import Avatar from "../Avatar";

import { useProfile } from "../../hooks/ProfileProvider";

const TooltipSearch = (props) => {
  const {
    latestSearch,
    addLatestSearch,
    removeLatestSearch,
    removeAllLatestSearch,
  } = useProfile();

  return (
    <ReactTooltip
      id="search"
      openOnClick={true}
      ref={props.tooltipRef}
      clickable
      opacity={1}
      arrowColor="transparent"
      place="bottom"
      offset={1}
      render={() => (
        <div className="flex flex-1 max-h-[600px] overflow-y-auto font-medium text-center text-base text-icon">
          {props.search.length == 0 && latestSearch.length == 0 && (
            <span className="py-10 px-3">
              Essayez de chercher des personnes, des Listes ou des mots‑clés.
            </span>
          )}

          {latestSearch.length != 0 && props.search.length == 0 && (
            <div className="flex flex-col w-full">
              <div className="flex justify-between w-full text-start px-4 py-2">
                <span className="text-2xl font-bold">Recent : </span>
                <ClassicButton
                  text="Clear all"
                  color="twitter_text"
                  textButton={true}
                  event={() => removeAllLatestSearch()}
                />
              </div>
              <div>
                {latestSearch.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <div
                        className="flex w-full h-14 justify-between items-center px-3 hover:bg-gray-100"
                        style={{
                          borderBottomLeftRadius:
                            index == latestSearch.length - 1 ? 15 : 0,

                          borderBottomRightRadius:
                            index == latestSearch.length - 1 ? 15 : 0,
                        }}
                      >
                        <div className="flex items-center">
                          <IconButton name="search" size={25} />
                          <span>{item}</span>
                        </div>
                        <IconButton
                          name="close"
                          color="#00ADED"
                          colorHover={"#54b3f3"}
                          backgroundHover={"#d5e5eb"}
                          event={() => removeLatestSearch(item)}
                        />
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          )}

          {props.search.length > 0 && (
            <div className="w-full">
              {props.dataTop && (
                <div className="flex w-full h-14 justify-between items-center px-3 hover:bg-gray-100">
                  <span>Search for "{props.search}"</span>
                </div>
              )}
              <div className="h-[1px] bg-gray-200" />
              {props.dataUser &&
                props.dataUser.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <UserElement
                        data={item}
                        event={() => addLatestSearch(props.search)}
                      />
                    </React.Fragment>
                  );
                })}
              <Link
                className="flex w-full h-14 justify-between items-center px-3 hover:bg-gray-100"
                to={"/" + props.search}
                onClick={() => addLatestSearch(props.search)}
              >
                <span>Go to @{props.search}</span>
              </Link>
            </div>
          )}
        </div>
      )}
      style={{
        backgroundColor: "white",
        color: "#222",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
        width: "auto",
        right: 16,
        borderRadius: 15,
        padding: 0,
      }}
    />
  );
};

const UserElement = (props) => {
  return (
    <div className="w-full h-[65px]">
      <Avatar
        static
        id={props.data._id}
        username={props.data.fullName}
        tag={props.data.tag}
        event={props.event}
      />
    </div>
  );
};

export default TooltipSearch;
