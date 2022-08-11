import { Category } from "@mui/icons-material";
import { MenuItem, OutlinedInput, Select, Slider } from "@mui/material";
import { LANGUAGES } from "global";
import { useAppDispatch, useAppSelector } from "hooks";
import { useDeferredValue, useEffect, useState } from "react";
import { getParams } from "selectors/selectors";
import { setFontSize, setLanguage, toggleCategories } from "slices/params";
import styled from "styled-components";
import { TCategory } from "types/params";

import Categories from "./categories";
import Search from "./search";
import Size from "./size";
import Template from "./template";

const Controls = () => {
  const { language } = useAppSelector(getParams);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(setFontSize(deferredSize));
  // }, [deferredSize, dispatch]);
  return (
    <Container>
      <div className="center-wrapper">
        <div className="row">
          <Search />

          <Template />
        </div>
        <div className="row">
          <Categories />

          {/* style the scroll bar */}
          <Select
            sx={{ width: 220, height: "fit-content" }}
            className="language-selector"
            variant="standard"
            value={language}
            onChange={(e) => dispatch(setLanguage(e.target.value))}
            renderValue={(selected) => selected}
          >
            {LANGUAGES.map((_language) => (
              <MenuItem value={_language} key={_language}>
                {_language}
              </MenuItem>
            ))}
          </Select>

          <Size size="small" defaultValue={24} max={196} width={200} />
        </div>
      </div>
    </Container>
  );
};

export default Controls;

const Container = styled.div`
  justify-content: center;
  width: 100%;
  display: flex;
  height: fit-content;

  .center-wrapper {
    padding: 12px;
    width: 100%;
    max-width: 1400px;
    .row {
      display: flex;
      gap: 64px;
      /* justify-content: space-between; */
      width: 100%;
    }

    .size-scroll-wrapper {
      display: flex;
      align-items: center;
      gap: 24px;
      label {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32px;
        font-size: 16px;
      }
      .size-scroll {
        width: 300px;
      }
    }
  }
`;
