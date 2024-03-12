import { useState } from "react";

import HeaderFeed from "../components/home/HeaderFeed";
import Feed from "../components/home/Feed";

export default function Home() {
  const [view, setView] = useState("Pour vous");

  const handleSetView = (newView) => {
    setView(newView);
  };

  return (
    <div style={{}}>
      <HeaderFeed label="Home" view={view} setView={handleSetView} />
      <main
        className=" w-full h-full justify-center "
        style={{ height: "calc(100vh - 4rem)" }}
      >
        {view === "Pour vous" && <Feed />}
        {view === "Abonnement" && <Subscription />}
      </main>
    </div>
  );
}

const Subscription = () => {
  return (
    <p>
      Lorem ipsum dolor sit amet. Ut architecto laudantium aut quos eveniet non
      odit autem eos vitae nihil ex quaerat mollitia vel ullam dolor. Nam
      repudiandae totam vel sint dolore et autem laboriosam. Et esse facere ad
      consequuntur odit ut rerum accusantium vel voluptates atque. Aut debitis
      magni aut exercitationem vero non quam possimus. Sed minima autem quo
      velit nesciunt sed galisum quam sed molestiae deserunt in praesentium
      repudiandae 33 iure inventore non porro dolorum? Ut sint voluptate eum
      dolorum dolor ea nihil voluptatem et doloremque consequatur sit pariatur
      omnis est deleniti delectus. Eos fugit officiis cum nobis maiores 33
      voluptatem laborum. Qui dolores eaque aut sapiente sint nam perspiciatis
      fugiat est cupiditate porro aut repellendus tempore ut eaque ipsam. Et
      quaerat maxime quo sunt nemo ex adipisci quia quo dolorem ipsum? Qui nobis
      itaque aut nihil ducimus et dolor tempora ut quod voluptas sit sint animi
      qui accusamus amet.Lorem ipsum dolor sit amet. Ut architecto laudantium
      aut quos eveniet non odit autem eos vitae nihil ex quaerat mollitia vel
      ullam dolor. Nam repudiandae totam vel sint dolore et autem laboriosam. Et
      esse facere ad consequuntur odit ut rerum accusantium vel voluptates
      atque. Aut debitis magni aut exercitationem vero non quam possimus. Sed
      minima autem quo velit nesciunt sed galisum quam sed molestiae deserunt in
      praesentium repudiandae 33 iure inventore non porro dolorum? Ut sint
      voluptate eum dolorum dolor ea nihil voluptatem et doloremque consequatur
      sit pariatur omnis est deleniti delectus. Eos fugit officiis cum nobis
      maiores 33 voluptatem laborum. Qui dolores eaque aut sapiente sint nam
      perspiciatis fugiat est cupiditate porro aut repellendus tempore ut eaque
      ipsam. Et quaerat maxime quo sunt nemo ex adipisci quia quo dolorem ipsum?
      Qui nobis itaque aut nihil ducimus et dolor tempora ut quod voluptas sit
      sint animi qui accusamus amet.Lorem ipsum dolor sit amet. Ut architecto
      laudantium aut quos eveniet non odit autem eos vitae nihil ex quaerat
      mollitia vel ullam dolor. Nam repudiandae totam vel sint dolore et autem
      laboriosam. Et esse facere ad consequuntur odit ut rerum accusantium vel
      voluptates atque. Aut debitis magni aut exercitationem vero non quam
      possimus. Sed minima autem quo velit nesciunt sed galisum quam sed
      molestiae deserunt in praesentium repudiandae 33 iure inventore non porro
      dolorum? Ut sint voluptate eum dolorum dolor ea nihil voluptatem et
      doloremque consequatur sit pariatur omnis est deleniti delectus. Eos fugit
      officiis cum nobis maiores 33 voluptatem laborum. Qui dolores eaque aut
      sapiente sint nam perspiciatis fugiat est cupiditate porro aut repellendus
      tempore ut eaque ipsam. Et quaerat maxime quo sunt nemo ex adipisci quia
      quo dolorem ipsum? Qui nobis itaque aut nihil ducimus et dolor tempora ut
      quod voluptas sit sint animi qui accusamus amet.Lorem ipsum dolor sit
      amet. Ut architecto laudantium aut quos eveniet non odit autem eos vitae
      nihil ex quaerat mollitia vel ullam dolor. Nam repudiandae totam vel sint
      dolore et autem laboriosam. Et esse facere ad consequuntur odit ut rerum
      accusantium vel voluptates atque. Aut debitis magni aut exercitationem
      vero non quam possimus. Sed minima autem quo velit nesciunt sed galisum
      quam sed molestiae deserunt in praesentium repudiandae 33 iure inventore
      non porro dolorum? Ut sint voluptate eum dolorum dolor ea nihil voluptatem
      et doloremque consequatur sit pariatur omnis est deleniti delectus. Eos
      fugit officiis cum nobis maiores 33 voluptatem laborum. Qui dolores eaque
      aut sapiente sint nam perspiciatis fugiat est cupiditate porro aut
      repellendus tempore ut eaque ipsam. Et quaerat maxime quo sunt nemo ex
      adipisci quia quo dolorem ipsum? Qui nobis itaque aut nihil ducimus et
      dolor tempora ut quod voluptas sit sint animi qui accusamus amet.Lorem
      ipsum dolor sit amet. Ut architecto laudantium aut quos eveniet non odit
      autem eos vitae nihil ex quaerat mollitia vel ullam dolor. Nam repudiandae
      totam vel sint dolore et autem laboriosam. Et esse facere ad consequuntur
      odit ut rerum accusantium vel voluptates atque. Aut debitis magni aut
      exercitationem vero non quam possimus. Sed minima autem quo velit nesciunt
      sed galisum quam sed molestiae deserunt in praesentium repudiandae 33 iure
      inventore non porro dolorum? Ut sint voluptate eum dolorum dolor ea nihil
      voluptatem et doloremque consequatur sit pariatur omnis est deleniti
      delectus. Eos fugit officiis cum nobis maiores 33 voluptatem laborum. Qui
      dolores eaque aut sapiente sint nam perspiciatis fugiat est cupiditate
      porro aut repellendus tempore ut eaque ipsam. Et quaerat maxime quo sunt
      nemo ex adipisci quia quo dolorem ipsum? Qui nobis itaque aut nihil
      ducimus et dolor tempora ut quod voluptas sit sint animi qui accusamus
      amet.Lorem ipsum dolor sit amet. Ut architecto laudantium aut quos eveniet
      non odit autem eos vitae nihil ex quaerat mollitia vel ullam dolor. Nam
      repudiandae totam vel sint dolore et autem laboriosam. Et esse facere ad
      consequuntur odit ut rerum accusantium vel voluptates atque. Aut debitis
      magni aut exercitationem vero non quam possimus. Sed minima autem quo
      velit nesciunt sed galisum quam sed molestiae deserunt in praesentium
      repudiandae 33 iure inventore non porro dolorum? Ut sint voluptate eum
      dolorum dolor ea nihil voluptatem et doloremque consequatur sit pariatur
      omnis est deleniti delectus. Eos fugit officiis cum nobis maiores 33
      voluptatem laborum. Qui dolores eaque aut sapiente sint nam perspiciatis
      fugiat est cupiditate porro aut repellendus tempore ut eaque ipsam. Et
      quaerat maxime quo sunt nemo ex adipisci quia quo dolorem ipsum? Qui nobis
      itaque aut nihil ducimus et dolor tempora ut quod voluptas sit sint animi
      qui accusamus amet.
    </p>
  );
};

const ForYou = () => {
  return <p>Pour vous content</p>;
};
