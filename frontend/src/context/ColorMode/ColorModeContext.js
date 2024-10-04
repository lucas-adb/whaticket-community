import React, { useState, createContext } from "react";

const ColorModeContext = createContext();

const ColorModeProvider = ({ children }) => {
  const [colorMode, setColorMode] = useState("light");

  return (
    <ColorModeContext.Provider value={{ colorMode, setColorMode }}>
      {children}
    </ColorModeContext.Provider>
  );
}

export { ColorModeContext, ColorModeProvider };