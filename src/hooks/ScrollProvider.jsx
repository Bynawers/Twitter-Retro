import React, { createContext, useContext, useState } from "react";

const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
  const [isScrollEnd, setIsScrollEnd] = useState(false);

  return (
    <ScrollContext.Provider value={{ isScrollEnd, setIsScrollEnd }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => {
  return useContext(ScrollContext);
};

export default ScrollProvider;
