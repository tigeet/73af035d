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

    @font-face {
        font-family: "JiroMonocraft";
        src: url("https://firebasestorage.googleapis.com/v0/b/fonts-38282.appspot.com/o/Monocraft-no-ligatures.ttf?alt=media&token=01b7f66d-d5ae-49ef-82aa-05d79f4405de");
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


    *::-webkit-scrollbar {
    width: 0.4em;
  }
  *::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  }
  *::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: ${(props) => props.theme.colorScrollbar};
  }
  `;

const SCDarkTheme: SCTheme = {
  colorBackground: "#1e1e1e",
  colorPrimary: "#007acc",
  colorText: {
    main: "#dadada",
    light: "#757575",
    alternative: "#000000",
  },
  colorShadow: "#3d3d3d",
  colorScrollbar: "#757575 ",
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

  components: {},
});

const SCLightTheme: SCTheme = {
  colorBackground: "#ffffff",
  colorPrimary: "#007acc",
  colorText: {
    main: "#000000",
    light: "#757575",
    alternative: "#ffffff",
  },
  colorScrollbar: "#bfbcbc",
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
