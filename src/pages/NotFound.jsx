import SideBar from "../components/home/SideBar";

function NotFound() {
  return (
    <div className="flex h-screen">
      <header>
        <SideBar />
      </header>
      <main className="flex h-screen w-screen justify-center pt-20 border-2 border-gray-100">
        <p className="text-xl font-medium hover:font-medium pl-3">
          Hum... la page est introuvable
        </p>
      </main>
    </div>
  );
}

export default NotFound;
