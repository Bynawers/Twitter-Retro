import React, { useRef } from "react";
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

import { IoPencil, IoTrashBin } from "react-icons/io5";

const TooltipMoreDetails = (props) => {
  const tooltipRef = useRef(null);
  const name = props.data.author ? props.data.author.fullName : "";

  const other = [];

  const closeTooltip = () => {
    tooltipRef.current?.close();
  };

  const me = [
    {
      icon: <IoTrashBin size={20} />,
      text: "Supprimer ",
      event: () => props.handleDeleteTweet(props.data._id),
    },
  ];

  const isMe = props.data.author
    ? props.data.author.tag === props.myTag
    : false;

  const handleModalOpen = () => {};

  return (
    <ReactTooltip
      id="postMoreDetails"
      ref={tooltipRef}
      openOnClick={true}
      afterShow={handleModalOpen}
      clickable
      place="bottom-start"
      arrowColor="transparent"
      offset={-30}
      opacity={1}
      isCapture={true}
      render={() => (
        <div className="font-bold text-base" style={{ zIndex: 9999 }}>
          {isMe &&
            me.map((item, index) => {
              const styles =
                index == 0
                  ? "rounded-t-xl"
                  : index == other.length - 1
                  ? "rounded-b-xl"
                  : "";
              return (
                <React.Fragment key={index}>
                  <button
                    className={
                      `flex w-full py-3 items-center pl-3 hover:bg-gray-100 text-left space-x-2 ` +
                      styles
                    }
                    onClick={() => {
                      closeTooltip();
                      item.event();
                    }}
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
        width: isMe ? 200 : 384,
        borderRadius: 12,
        padding: 0,
        zIndex: 9999,
      }}
    />
  );
};

export default TooltipMoreDetails;
