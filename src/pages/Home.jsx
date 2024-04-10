import { useState } from "react";

import HeaderFeed from "../components/header/HeaderFeed";
import FeedTab from "../components/home/FeedTab";
import SubscriptionTab from "../components/home/SuscriptionTab";

export default function Home() {
  const [view, setView] = useState("Pour vous");

  const handleSetView = (newView) => {
    setView(newView);
  };

  return (
    <div className="">
      <HeaderFeed label="Home" view={view} setView={handleSetView} />
      <main className=" w-full h-full justify-center ">
        {view === "Pour vous" && <FeedTab />}
        {view === "Abonnement" && <SubscriptionTab />}
      </main>
    </div>
  );
}
