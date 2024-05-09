import SideBarElement from "./SideBarElement";
import useScrollDirection from "../../utils/ScrollDirection";

const BottomBar = () => {
  const scrollDirection = useScrollDirection();
  return (
    <div
      className={`inline z-50 sm:hidden w-full transition-all duration-500 ${
        scrollDirection === "down" ? "opacity-30" : "opacity-full"
      }`}
    >
      <div className="flex flex-row justify-evenly fixed bottom-0 w-full bg-white border-t-[1px] ">
        <SideBarElement name="Accueil" path="/home" />
        <SideBarElement name="Explorer" path="/explore" />
        <SideBarElement name="Notifications" path="/notifications" />
        <SideBarElement name="Messages" path="/not-found" />
      </div>
    </div>
  );
};

export default BottomBar;
