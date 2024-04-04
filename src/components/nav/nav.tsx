import { Brightness6 } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks";
import { Link } from "react-router-dom";
import { getAppSettings } from "selectors/selectors";
import { toggleTheme } from "slices/settings";

const Nav = () => {
  const { theme } = useAppSelector(getAppSettings);

  const dispatch = useAppDispatch();

  return (
    <AppBar position="static">
      <Toolbar variant="dense" sx={{ justifyContent: "space-between" }}>
        <Link to="/">
          <Typography variant="h5" sx={{ fontFamily: "JiroMonocraft" }}>
            FontForge
          </Typography>
        </Link>

        <IconButton
          onClick={() =>
            dispatch(toggleTheme(theme === "light" ? "dark" : "light"))
          }
        >
          <Brightness6 color="info" />
          {/* {theme === 'light' ? } */}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
