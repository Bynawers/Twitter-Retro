import { useState } from "react";

import HeaderFeed from "../components/header/HeaderFeed";
import Feed from "../components/home/Feed";
import Subscription from "../components/home/Suscription";

export default function Home() {
  const [view, setView] = useState("Pour vous");

  const handleSetView = (newView) => {
    setView(newView);
  };

  return (
    <div className="">
      <HeaderFeed label="Home" view={view} setView={handleSetView} />
      <main className=" w-full h-full justify-center ">
        {view === "Pour vous" && <Feed />}
        {view === "Abonnement" && <Subscription />}
      </main>
    </div>
  );
}
