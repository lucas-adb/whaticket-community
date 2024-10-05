import React, { useState, useEffect, useContext } from "react";
import Routes from "./routes";
import "react-toastify/dist/ReactToastify.css";

import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { ptBR } from "@material-ui/core/locale";

import { ColorModeContext } from "./context/ColorMode/ColorModeContext";
import { grey } from "@material-ui/core/colors";

const App = () => {
  const [locale, setLocale] = useState();
  const { colorMode } = useContext(ColorModeContext);

  const lightTheme = createTheme(
    {
      scrollbarStyles: {
        "&::-webkit-scrollbar": {
          width: "8px",
          height: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
          backgroundColor: "#e8e8e8",
        },
      },
      palette: {
        primary: { main: "#2576d2", light: "#eee" },
        message: { main: "#fff" },
        text: { tertiary: "#0000001f" },
      },
    },
    locale
  );

  const darkTheme = createTheme(
    {
      scrollbarStyles: {
        "&::-webkit-scrollbar": {
          width: "8px",
          height: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
          backgroundColor: "#e8e8e8",
        },
      },
      palette: {
        mode: "dark",
        primary: {
          main: "#0BD953",
          contrastText: "#101D25",
          light: "#232D36",
          dark: "#101D25",
        },
        secondary: { main: "#fc4338", contrastText: "#fff" },
        message: { main: "#101D25" },
        background: {
          paper: "#111111",
        },
        text: {
          primary: "#fff",
          secondary: grey[300],
          tertiary: grey[300],
        },
      },
      fill: {
        primary: "#ffffff",
      },
      icon: {
        primary: "#ffffff",
      },
      overrides: {
        MuiListItem: {
          root: {
            "&.Mui-selected, &.Mui-selected:hover": {
              backgroundColor: "#232D36",
            },
          },
        },
        MuiSelect: {
          icon: {
            color: "#0BD953",
          },
        },
      },
    },
    locale
  );

  useEffect(() => {
    const i18nlocale = localStorage.getItem("i18nextLng");
    const browserLocale =
      i18nlocale.substring(0, 2) + i18nlocale.substring(3, 5);

    if (browserLocale === "ptBR") {
      setLocale(ptBR);
    }
  }, []);

  return (
    <ThemeProvider theme={colorMode === "dark" ? darkTheme : lightTheme}>
      <Routes />
    </ThemeProvider>
  );
};

export default App;
