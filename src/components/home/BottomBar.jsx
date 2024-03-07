import SideBarElement from "./SideBarElement";

const BottomBar = () => {
  return (
    <div className="inline sm:hidden w-full">
      <div className="flex flex-row justify-evenly fixed bottom-0 w-full bg-white border-t-[1px]">
        <SideBarElement name="Accueil" path="/home" />
        <SideBarElement name="Explorer" path="/explore" />
        <SideBarElement name="Notifications" path="/notifications" />
        <SideBarElement name="Messages" path="/not-found" />
      </div>
    </div>
  );
};

export default BottomBar;
