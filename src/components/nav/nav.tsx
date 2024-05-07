import { Brightness6, Logout, Person } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { auth, provider } from "fb";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { useAppDispatch, useAppSelector } from "hooks";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAppSettings, getUser } from "selectors/selectors";
import { toggleTheme } from "slices/settings";
import { logout } from "slices/user";
import styled from "styled-components";

const Nav = () => {
  const { theme } = useAppSelector(getAppSettings);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);

  const onProfileClick = useCallback(() => {
    signInWithPopup(auth, provider);
  }, []);

  const onLogoutClick = useCallback(() => {
    dispatch(logout());
    signOut(auth);
  }, [dispatch]);
  return (
    <AppBar position="sticky">
      <Toolbar variant="dense" sx={{ justifyContent: "space-between" }}>
        <Container>
          <Link to="/">
            <Typography variant="h5" sx={{ fontFamily: "Monocraft" }}>
              FontForge
            </Typography>
          </Link>

          <div className="right">
            <IconButton
              onClick={() =>
                dispatch(toggleTheme(theme === "light" ? "dark" : "light"))
              }
            >
              <Brightness6 color="info" />
              {/* {theme === 'light' ? } */}
            </IconButton>

            {user ? (
              <div className="profile">
                <span className="username" style={{ fontFamily: "Monocraft" }}>
                  {user.name}
                </span>
                <IconButton onClick={onLogoutClick}>
                  <Logout color="info" />
                </IconButton>
              </div>
            ) : (
              <IconButton onClick={onProfileClick}>
                <Person color="info" />
              </IconButton>
            )}
          </div>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

const Container = styled.nav`
  width: 100%;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .right {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    width: fit-content;
  }

  .profile {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

export default Nav;
