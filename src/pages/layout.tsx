import { Add, PlusOne } from "@mui/icons-material";
import { Box, Fab, IconButton } from "@mui/material";
import { useCallback } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import Nav from "components/nav/nav";

const Layout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "relative",
      }}
    >
      <Nav />
      <Box sx={{ display: "flex", flexDirection: "column", flex: "1 1 auto" }}>
        <Outlet />
      </Box>
    </Box>
  );
};
export default Layout;
