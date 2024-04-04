// change to .ts
import { createTheme } from "@mui/material";
import { createGlobalStyle } from "styled-components";
import { SCTheme } from "types/styles";

const Global = createGlobalStyle<{ theme: SCTheme }>`
* {
  margin: 0px;
  border: none;
  padding: 0px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

:focus,
:active {
  /*outline: none;*/
}

a:focus,
a:active {
  /* outline: none;*/
}

/* Links */

a,
a:link,
a:visited {
  /* color: inherit; */
  text-decoration: none;
  /* display: inline-block; */
}

a:hover {
  /* color: inherit; */
  text-decoration: none;
}

/* Common */

aside,
nav,
footer,
header,
section,
main {
  display: block;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  font-weight: inherit;
  font-size: inherit;
}

ul,
ul li {
  list-style: none;
}

img {
  vertical-align: top;
}

img,
svg {
  max-width: 100%;
  height: auto;
}

address {
  font-style: normal;
}

/* Form */

input,
textarea,
button,
select {
  background-color: transparent;
  color: inherit;
  font-size: inherit;
  font-family: inherit;
}

input::-ms-clear {
  display: none;
}

button,
input[type="submit"] {
  display: inline-block;
  cursor: pointer;
  box-shadow: none;
  background-color: transparent;
  background: none;
}

input:focus,
input:active,
button:focus,
button:active {
  outline: none;
}

button::-moz-focus-inner {
  border: 0;
  padding: 0;
}

label {
  cursor: pointer;
}

legend {
  display: block;
}


    * {
      margin: 0;
      padding: 0;
      font-size: 16px;
      font-family: 'Nunito', "Roboto", "Monocraft";
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
