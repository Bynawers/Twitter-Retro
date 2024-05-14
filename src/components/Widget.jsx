import React, { useState } from "react";

import { useLocation } from "react-router-dom";
import Trends from "./Trends";

import HeaderSearch from "./header/HeaderSearch";

const Widget = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const [search, setSearch] = useState("");

  const showWidget = currentPath === "/messages" ? false : true;

  const showHeaderSearch =
    currentPath === "/bookmark" || currentPath === "/home" ? true : false;

  const showTrends = currentPath === "/explore" ? false : true;

  return (
    <div>
      {showHeaderSearch && (
        <HeaderSearch search={search} setSearch={setSearch} />
      )}
      <main className="flex flex-col w-full h-full mt-10">
        {showWidget && (
          <>
            {showTrends && <Trends />}

            <div className="pb-10" />
          </>
        )}
      </main>
    </div>
  );
};

const RefLink = () => {
  return (
    <div className="flex flex-col text-sm text-icon cursor-pointer">
      <a>Politique de Confidentialité</a>
      <div className="space-x-2">
        <a>Politique relative aux cookies </a>
        <a> Accessibilité</a>
      </div>
      <div className="space-x-2">
        <a>Informations sur les publicités</a>
        <a>Plus</a>
      </div>
      <a>© 2024 Twitter Corp.</a>
    </div>
  );
};
export default Widget;
