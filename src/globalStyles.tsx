// change to .ts
import { createTheme } from "@mui/material";
import { createGlobalStyle } from "styled-components";
import { SCTheme } from "types/styles";

const Global = createGlobalStyle<{ theme: SCTheme }>`
    * {
      margin: 0;
      padding: 0;
      font-size: 16px;
      font-family: 'Nunito';
      box-sizing: border-box;
      text-decoration: none;

      /* color: ${(props) => props.theme.colorText.main} */
    }

    html {
      background-color: ${(props) => props.theme.colorBackground};
    }

    a {
      color: inherit;
      text-decoration: none;
    }
  
    .selected {
      color: ${(props) => props.theme.colorPrimary};;
    }
  `;

const SCDarkTheme: SCTheme = {
  colorBackground: "#1e1e1e",
  colorPrimary: "#007acc",
  colorText: {
    main: "#ffffff",
    light: "#757575",
    alternative: "#000000",
  },
  colorShadow: "#292525",
};

// create styled components theme, use it inside mui theme

const MuiDarkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: SCDarkTheme.colorPrimary,
      dark: "#1C3041",
    },
    info: { main: SCDarkTheme.colorText.main },
    secondary: { main: SCDarkTheme.colorPrimary },
  },
});

const SCLightTheme: SCTheme = {
  colorBackground: "#ffffff",
  colorPrimary: "#007acc",
  colorText: {
    main: "#000000",
    light: "#757575",
    alternative: "#ffffff",
  },

  colorShadow: "#ebe7e7",
};

const MuiLightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: SCLightTheme.colorPrimary,
      dark: "#1C3041",
    },
    info: {
      main: SCLightTheme.colorText.alternative,
      light: SCLightTheme.colorText.main,
    },
    secondary: { main: SCLightTheme.colorPrimary },
  },
});

export { Global, MuiDarkTheme, MuiLightTheme, SCDarkTheme, SCLightTheme };
