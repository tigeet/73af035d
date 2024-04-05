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
import UploadPage from "pages/uploadPage";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { getAppSettings } from "selectors/selectors";
import { ThemeProvider as SCThemeProvider } from "styled-components";

import FontLoader from "components/fontLoader";

// const GridPage = React.lazy(() => import("pages/gridPage"));
// const FontPage = React.lazy(() => import("pages/fontPage"));

// extract dispatch, useSelector from  control components and pass them as props instead
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
          <FontLoader />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={
                  // <Suspense>
                  <GridPage />
                  // </Suspense>
                }
              />
              <Route
                path="font/:font"
                element={
                  // <Suspense>
                  <FontPage />
                  // </Suspense>
                }
              />

              <Route path="upload" element={<UploadPage />} />
            </Route>
          </Routes>
        </MuiThemeProvider>
      </SCThemeProvider>
    </>
  );
}

export default App;
