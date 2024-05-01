import React, { useState, useEffect } from "react";

import useScrollDirection from "../../utils/ScrollDirection";

import SearchBar from "../../components/SearchBar";
import TabNavigator from "../navigation/TabNavigator";

const HeaderSearch = (props) => {
  const scrollDirection = useScrollDirection();

  return (
    <div
      className={`sticky w-full bg-white backdrop-filter transition-all duration-500 sm:top-0 ${
        scrollDirection === "down" ? "-top-24" : "top-0"
      }`}
    >
      <div className="flex px-4 flex-row p-5 pl-1 pr-1 flex-1 h-14 items-center">
        <SearchBar
          search={props.search}
          setSearch={props.setSearch}
          dataUser={props.dataUser}
          dataTop={props.dataTop}
          requestData={props.requestData}
          source={props.source}
        />
      </div>
      {props.tab && props.source && (
        <TabNavigator
          view={props.view}
          setView={props.setView}
          data={["Top", "Latest", "People"]}
        />
      )}
      {props.tab && <div className="h-[1px] w-full bg-gray-200" />}
    </div>
  );
};

export default HeaderSearch;
