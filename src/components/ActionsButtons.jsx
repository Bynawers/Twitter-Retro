import ReduceBigNumber from "../utils/ReduceBigNumbers";

import IconButton from "./button/IconButton";

const ActionButtons = (props) => {
  const reduceValue = ReduceBigNumber(props.value);

  const handleClickButton = (e) => {
    e.preventDefault();
    alert("test");
  };

  return (
    <div
      className={`flex flex-row justify-between h-12 w-full " ${
        props.view == "main" ? "border-b-[1px] border-t-[1px]" : ""
      }`}
    >
      <IconButton
        event={handleClickButton}
        value={ReduceBigNumber(7246324)}
        name="chat"
      />
      <IconButton
        event={handleClickButton}
        value={ReduceBigNumber(84932)}
        name="retweet"
      />
      <IconButton
        event={handleClickButton}
        value={ReduceBigNumber(3482)}
        name="like"
      />

      {props.view == "menu" && (
        <IconButton
          event={handleClickButton}
          value={ReduceBigNumber(865658)}
          name="view"
        />
      )}
      {props.view == "main" && (
        <IconButton
          event={handleClickButton}
          value={ReduceBigNumber(34)}
          name="bookmark"
        />
      )}

      {props.view == "menu" && (
        <div className="flex flex-row space-x-1">
          <IconButton name="bookmark" />
          <IconButton name="share" />
        </div>
      )}
    </div>
  );
};

const PostButton = (props) => {
  const reduceValue = ReduceBigNumber(props.value);

  const handleClickButton = (e) => {
    e.preventDefault();
    alert("test");
  };

  return (
    <button className="flex items-center" onClick={handleClickButton}>
      <div className="active:bg-iconBackgroundHover p-2 rounded-full">
        {props.icon}
      </div>
      {props.value !== null && (
        <span className="text-icon pl-2 text-sm">{reduceValue}</span>
      )}
    </button>
  );
};

export default ActionButtons;
