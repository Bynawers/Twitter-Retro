import SideBar from "../components/home/SideBar";

function Explorer() {
  return (
    <div className="flex h-screen">
      <header>
        <SideBar />
      </header>
      <main className="flex h-screen w-screen border-2 border-gray-100">
        Explorer
      </main>
    </div>
  );
}

export default Explorer;
