import React from "react";

const TabNavigator = (props) => {
  return (
    <div className="flex flex-row flex-1 w-full h-14">
      {props.data.map((value, index) => {
        return (
          <React.Fragment key={index}>
            <ButtonHeaderNavigation
              setView={props.setView}
              view={props.view}
              text={value}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};

const ButtonHeaderNavigation = (props) => {
  return (
    <button
      onClick={() => props.setView(props.text)}
      className={`flex justify-center hover:bg-gray-200 transition-all duration-300 cursor-pointer flex-[1]`}
    >
      <div className="flex h-full items-center flex-col justify-between">
        <div />
        <span
          className={
            "font-sans font-bold " +
            (props.view === props.text ? "" : "font-medium")
          }
        >
          {props.text}
        </span>
        <Indicator isVisible={props.view === props.text} />
      </div>
    </button>
  );
};

const Indicator = (props) => {
  return (
    <div
      className={
        " b-0 h-1.5 flex-end w-full rounded-xl " +
        (props.isVisible ? "bg-twitter" : "")
      }
    />
  );
};

export default TabNavigator;
