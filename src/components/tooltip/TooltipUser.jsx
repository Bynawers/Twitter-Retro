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
          <button
            className="flex text-left items-center h-[44px]"
            onClick={handleAddAccount}
          >
            <p>Changer les paramètres</p>
          </button>
          <button
            className="flex text-left items-center h-[44px]"
            onClick={handleDisconnect}
          >
            <p>Se déconnecter de @{props.tag}</p>
          </button>
        </div>
      )}
      style={{
        backgroundColor: "white",
        color: "#222",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
        width: 270,
        height: 112,
        borderRadius: 15,
      }}
    />
  );
};

export default TooltipUser;
