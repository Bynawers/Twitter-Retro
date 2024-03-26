const ClassicButton = (props) => {
  const color = {
    black: "black",
    twitter: "#00ADED",
  };

  const textColor = {
    black: "white",
    twitter: "black",
  };

  const hoverColor = {
    black: "red",
    twitter: "#1a8cd8",
  };

  return (
    <button
      onClick={props.event}
      className="flex px-4 py-3 h-[34px] rounded-3xl items-center font-semibold"
      style={{
        backgroundColor: color[props.color],
        color: textColor[props.color],
      }}
    >
      {props.text}
    </button>
  );
};

export default ClassicButton;
