import React, { useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

import {
  IoMdPersonAdd,
  IoMdVolumeOff,
  IoIosFlag,
  IoIosCode,
  IoIosStats,
  IoMdSad,
  IoIosCloseCircle,
  IoMdListBox,
} from "react-icons/io";

const TooltipMoreDetails = (props) => {
  const items = [
    {
      icon: <IoMdSad size={20} />,
      text: "Ce post ne m'intéresse pas",
    },
    {
      icon: <IoMdPersonAdd size={20} />,
      text: "Suivre " + props.data.username,
    },
    {
      icon: <IoMdListBox size={20} />,
      text:
        "Ajouter " +
        props.data.username +
        " à des Listes/ le retirer de Listes",
    },
    {
      icon: <IoMdVolumeOff size={20} />,
      text: "Masquer " + props.data.username,
    },
    {
      icon: <IoIosCloseCircle size={20} />,
      text: "Bloquer " + props.data.username,
    },
    {
      icon: <IoIosStats size={20} />,
      text: "Voir les engagements avec le post",
    },
    {
      icon: <IoIosCode size={20} />,
      text: "Intégrer post",
    },
    {
      icon: <IoIosFlag size={20} />,
      text: "Signaler post",
    },
  ];

  return (
    <ReactTooltip
      id="postMoreDetails"
      openOnClick={true}
      clickable
      place="bottom-start"
      arrowColor="transparent"
      offset={-30}
      opacity={1}
      render={() => (
        <div className="font-bold text-base">
          {items.map((item, index) => {
            const styles =
              index == 0
                ? "rounded-t-xl"
                : index == items.length - 1
                ? "rounded-b-xl"
                : "";
            return (
              <React.Fragment key={index}>
                <button
                  className={
                    `flex w-full py-3 items-center pl-3 hover:bg-gray-100 text-left space-x-2 ` +
                    styles
                  }
                >
                  {item.icon}
                  <span>{item.text}</span>
                </button>
              </React.Fragment>
            );
          })}
        </div>
      )}
      style={{
        backgroundColor: "white",
        color: "black",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
        width: 384,
        borderRadius: 12,
        padding: 0,
      }}
    />
  );
};

export default TooltipMoreDetails;
