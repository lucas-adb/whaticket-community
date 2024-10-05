import React, { useState, createContext, useEffect } from "react";

const ColorModeContext = createContext();

const ColorModeProvider = ({ children }) => {
  const [colorMode, setColorMode] = useState("light");

  function handleSetColorMode() {
    setColorMode(colorMode === "light" ? "dark" : "light");
    localStorage.setItem("deskrio-theme", colorMode === "light" ? "dark" : "light");
  }

  useEffect(() => {
    const theme = localStorage.getItem("deskrio-theme");
    console.log("theme", theme);
    if (theme) {
      setColorMode(theme);
    }
  }, []);

  return (
    <ColorModeContext.Provider value={{ colorMode, handleSetColorMode }}>
      {children}
    </ColorModeContext.Provider>
  );
}

export { ColorModeContext, ColorModeProvider };