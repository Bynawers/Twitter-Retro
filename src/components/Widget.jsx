import React from "react";

const Widget = () => {
  return (
    <div className="flex p-4 flex-col w-full h-full overflow-hidden overflow-y-hidden">
      <Trends />
    </div>
  );
};

const Trends = () => {
  const trends = [
    {
      name: "Dune 2",
      stat: 2004034,
    },
    {
      name: "Bitcoin",
      stat: 5049302,
    },
    {
      name: "Russie",
      stat: 48034823,
    },
    {
      name: "Macron",
      stat: 2234234,
    },
  ];
  return (
    <div className="flex flex-col bg-grey-100 text-black text-xl font-semibold bg-gray-100 rounded-xl px-3 py-4">
      <span>Tendances : France</span>
      {trends.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <span>{item.name}</span>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Widget;
