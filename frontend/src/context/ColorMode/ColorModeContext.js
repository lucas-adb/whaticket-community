import React, { useState, createContext } from "react";

const ColorModeContext = createContext();

const ColorModeProvider = ({ children }) => {
  const [colorMode, setColorMode] = useState("light");

  // todo: se o usuário tiver escolhido um tema no localStorage, use-o

  return (
    <ColorModeContext.Provider value={{ colorMode, setColorMode }}>
      {children}
    </ColorModeContext.Provider>
  );
}

export { ColorModeContext, ColorModeProvider };