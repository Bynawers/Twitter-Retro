import React from "react";

import { useLocation } from "react-router-dom";

import ReduceBigNumber from "../utils/ReduceBigNumbers";

import HeaderSearch from "./header/HeaderSearch";
import IconButton from "./button/IconButton";

const Widget = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div>
      {currentPath !== "/messages" && <HeaderSearch />}
      <main className="flex flex-col w-full h-full mt-10">
        {currentPath !== "/messages" && (
          <>
            <Trends />
            <Trends />
            <RefLink />
          </>
        )}
      </main>
    </div>
  );
};

const Trends = () => {
  const trends = [
    {
      name: "Dune 2",
      stat: 200034,
    },
    {
      name: "Bitcoin",
      stat: 509302,
    },
    {
      name: "Cryptographie",
      stat: 4034823,
    },
    {
      name: "Champions League",
      stat: 2234234,
    },
  ];
  return (
    <div className="flex flex-col mb-4 bg-grey-100 font-semibold bg-foreground rounded-xl w-full">
      <div className="px-3 py-4 flex flex-col">
        <span className="font-extrabold text-xl text-black">
          Tendances : France
        </span>
      </div>
      {trends.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <TrendsElement item={item} rank={index + 1} />
          </React.Fragment>
        );
      })}
      <div className="px-2 py-3 rounded-b-xl font-normal text-twitter hover:bg-foregroundHover cursor-pointer">
        <span>Voir plus</span>
      </div>
    </div>
  );
};

const TrendsElement = (props) => {
  const reduceValue = ReduceBigNumber(props.item.stat);
  const handleTooltip = () => {};

  return (
    <div className="px-3 py-4 flex flex-col hover:bg-foregroundHover cursor-pointer ">
      <div className="h-5 flex justify-between">
        <span className="font-normal text-textLight text-sm">
          {props.rank} · Tendances
        </span>
        <IconButton
          name="more"
          styles="hover:bg-iconBackgroundHover"
          color={"#229df0"}
          background={"#dae8f0"}
          event={handleTooltip}
          value={null}
        />
      </div>
      <div className="h-5">
        <span>#{props.item.name}</span>
      </div>
      <div className="h-5">
        <span className="font-normal text-textLight text-sm">
          {reduceValue} Posts
        </span>
      </div>
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
