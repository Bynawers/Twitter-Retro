import { useState } from "react";

const ClassicButton = (props) => {
  const [isHover, setIsHover] = useState(false);

  const color = {
    black: "black",
    twitter: "#00ADED",
    white: "white",
  };

  const textColor = {
    black: "white",
    twitter: "black",
    white: "black",
  };

  const hoverColor = {
    black: "red",
    twitter: "#1a8cd8",
    white: "#eff1f1",
  };

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <button
      onClick={props.event}
      className="flex px-4 py-3 h-[34px] rounded-3xl items-center font-semibold border-[1px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundColor: isHover ? hoverColor[props.color] : color[props.color],
        color: textColor[props.color],
      }}
    >
      {props.text}
    </button>
  );
};

export default ClassicButton;
