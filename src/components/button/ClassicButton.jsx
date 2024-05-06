import { useState } from "react";

const ClassicButton = (props) => {
  const [isHover, setIsHover] = useState(false);

  const color = {
    black: "black",
    twitter: "#00ADED",
    twitter_text: "#00ADED",
    white: "white",
  };

  const textColor = {
    black: "white",
    twitter: "white",
    twitter_text: "#00ADED",
    white: "black",
  };

  const hoverColor = {
    black: "#3b3b3b",
    twitter: "#1a8cd8",
    twitter_text: "#d5e5eb",
    white: "#eff1f1",
  };

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  if (props.text == "Following") {
    return (
      <button
        onClick={props.event}
        className="flex py-3 min-w-[100px] h-[34px] rounded-3xl items-center justify-center font-semibold border-[1px]"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          backgroundColor: isHover ? "#ffebeb" : "white",
          color: isHover ? "red" : "black",
          borderWidth: props.textButton ? 0 : 1,
          borderColor: isHover ? "red" : "#e1e1e3",
        }}
      >
        {isHover ? "Unfollow" : props.text}
      </button>
    );
  }

  return (
    <button
      onClick={props.event}
      className="flex px-4 py-3 h-[34px] rounded-3xl items-center font-semibold border-[1px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundColor: isHover
          ? hoverColor[props.color]
          : props.textButton
          ? ""
          : color[props.color],
        color: textColor[props.color],
        borderWidth: props.textButton ? 0 : 1,
        fontSize: 15,
      }}
    >
      {props.text}
    </button>
  );
};

export default ClassicButton;
