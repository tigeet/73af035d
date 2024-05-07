import { useSelect } from "@mui/base";
import { Check, Clear } from "@mui/icons-material";
import {
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { db } from "fb";
import { doc, updateDoc } from "firebase/firestore";
import { useAppSelector } from "hooks";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getFontsMeta, getUser } from "selectors/selectors";
import options from "slices/options";
import styled from "styled-components";
import { IOptions } from "types/options";
import { designersFormatter } from "utils/formatters";

import FontElement from "components/fontElement";

const AdminPage = () => {
  const user = useSelector(getUser);
  const { fonts } = useAppSelector(getFontsMeta);
  const pendingFonts = useMemo(
    () => fonts.filter((font) => font.status === "pending"),
    [fonts]
  );

  const handleSubmit = useCallback(async (id: string) => {
    const washingtonRef = doc(db, "fonts", id);

    await updateDoc(washingtonRef, {
      status: "published",
    });
  }, []);

  const handleReject = useCallback(async (id: string) => {
    const washingtonRef = doc(db, "fonts", id);

    await updateDoc(washingtonRef, {
      status: "hidden",
    });
  }, []);

  if (!user || user.role !== "admin")
    return (
      <Box>
        <Typography>You must be an admin to view this page</Typography>
      </Box>
    );
  return (
    <Box>
      <List>
        {pendingFonts.map((font) => (
          <Link to={"/font/" + font.family} key={font.id} state={font}>
            <ListItem sx={{ width: "100%" }}>
              <Container>
                <div className="font-info">
                  <div className="info-upper-line">
                    <span className="font-family">{font.family}</span>
                  </div>

                  <span className="font-designers">
                    {designersFormatter(
                      font.designers.map((designer) => designer.name)
                    )}
                  </span>
                </div>

                <div className="controls">
                  <IconButton
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmit(font.id);
                    }}
                  >
                    <Check color="success" />
                  </IconButton>
                  <IconButton
                    onClick={(e) => {
                      e.preventDefault();
                      handleReject(font.id);
                    }}
                  >
                    <Clear color="error" />
                  </IconButton>
                </div>
              </Container>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding: 16px;
  border-radius: 6px;

  border: ${(props) => `1px solid ${props.theme.colorShadow}`};
  background-color: ${(props) => props.theme.colorBackground};
  color: ${(props) => props.theme.colorText.main};
`;
export default memo(AdminPage);
