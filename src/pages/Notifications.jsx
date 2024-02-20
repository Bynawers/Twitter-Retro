import SideBar from "../components/home/SideBar";

function Notifications() {
  return (
    <div className="flex h-screen">
      <header>
        <SideBar />
      </header>
      <main className="flex h-screen w-screen border-2 border-gray-100">
        Notification
      </main>
    </div>
  );
}

export default Notifications;
