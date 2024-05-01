import React from "react";
import IconButton from "./button/IconButton";

import ReduceBigNumber from "../utils/ReduceBigNumbers";

const Trends = (props) => {
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
      stat: 403823,
    },
    {
      name: "Champions League",
      stat: 2234234,
    },
    {
      name: "Twitter Retro",
      stat: 23424,
    },
    {
      name: "JO 2024",
      stat: 924234,
    },
    {
      name: "PSG - BARCA",
      stat: 53492,
    },
    {
      name: "Orages",
      stat: 91492,
    },
    {
      name: "PSG - BARCA",
      stat: 23492,
    },
  ];
  return (
    <div
      className={`flex flex-col mb-4 bg-grey-100 font-semibold rounded-xl w-full ${
        props.white ? "bg-white" : "bg-foreground"
      }`}
    >
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
          colorHover={"#229df0"}
          backgroundHover={"#dae8f0"}
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

export default Trends;
