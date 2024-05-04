import { Tooltip as ReactTooltip } from "react-tooltip";

const TooltipSearch = (props) => {
  return (
    <ReactTooltip
      id="search"
      openOnClick={true}
      clickable
      opacity={1}
      arrowColor="transparent"
      place="bottom"
      offset={1}
      render={() => (
        <div className="flex flex-1 font-medium text-center text-base text-icon items-center justify-center">
          <span className="pt-5">
            Essayez de chercher des personnes, des Listes ou des mots‑clés.
          </span>
        </div>
      )}
      style={{
        backgroundColor: "white",
        color: "#222",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
        width: 334,
        height: 112,
        right: 16,
        borderRadius: 15,
      }}
    />
  );
};

export default TooltipSearch;
