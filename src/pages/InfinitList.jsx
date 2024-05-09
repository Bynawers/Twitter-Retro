import React from "react";

import Avatar from "../components/Avatar";

const InfinitList = (props) => {
  return (
    <div className="w-full">
      {props.data.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <Avatar
              search={true}
              id={item._id}
              tag={item.tag}
              username={item.fullName}
              bio={item.bio}
              follow={true}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default InfinitList;
