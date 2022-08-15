import { CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material";
import {
  Global,
  MuiDarkTheme,
  MuiLightTheme,
  SCDarkTheme,
  SCLightTheme,
} from "globalStyles";
import { useAppSelector } from "hooks";
import FontPage from "pages/fontPage";
import GridPage from "pages/gridPage";
import Layout from "pages/layout";
import { Route, Routes } from "react-router-dom";
import { getAppSettings } from "selectors/selectors";
import { ThemeProvider as SCThemeProvider } from "styled-components";

function App() {
  const { theme } = useAppSelector(getAppSettings);

  let scTheme = SCLightTheme;
  let muiTheme = MuiLightTheme;

  if (theme === "light") {
    scTheme = SCLightTheme;
    muiTheme = MuiLightTheme;
  }

  if (theme === "dark") {
    scTheme = SCDarkTheme;
    muiTheme = MuiDarkTheme;
  }

  return (
    <>
      <SCThemeProvider theme={scTheme}>
        <MuiThemeProvider theme={muiTheme}>
          <CssBaseline />
          <Global />

          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<GridPage />} />
              <Route path=":font" element={<FontPage />} />
            </Route>
          </Routes>
        </MuiThemeProvider>
      </SCThemeProvider>
    </>
  );
}

export default App;
