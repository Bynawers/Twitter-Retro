import { Tooltip as ReactTooltip } from "react-tooltip";

import { useAuth } from "../../hooks/AuthProvider";

const TooltipUser = (props) => {
  const { logOut } = useAuth();

  const handleDisconnect = () => {
    console.log("Disconnect..");
    logOut();
  };
  const handleAddAccount = () => {
    console.log("AddAccount..");
  };

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
            <a>Ajoutez un compte existant</a>
          </button>
          <button
            className="flex text-left items-center h-[44px]"
            onClick={handleDisconnect}
          >
            <a>Se déconnecter de @Bynawers</a>
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
