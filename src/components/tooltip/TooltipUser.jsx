import { Tooltip as ReactTooltip } from "react-tooltip";

import { useAuth } from "../../hooks/AuthProvider";

const TooltipUser = (props) => {
  const { logOut } = useAuth();

  const handleDisconnect = () => {
    logOut();
  };
  const handleAddAccount = () => {};

  return (
    <ReactTooltip
      id="signup"
      openOnClick={true}
      clickable
      render={() => (
        <div className="font-bold text-base">
          <div
            className="flex justify-center items-center text-center h-[50px] cursor-pointer"
            onClick={handleDisconnect}
          >
            <p>Se déconnecter de @{props.tag}</p>
          </div>
        </div>
      )}
      style={{
        backgroundColor: "white",
        color: "#222",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",

        width: 270,
        height: 70,
        borderRadius: 15,
        zIndex: 9999,
      }}
    />
  );
};

export default TooltipUser;
