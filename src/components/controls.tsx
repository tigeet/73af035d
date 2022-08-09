import { MenuItem, OutlinedInput, Select, Slider } from "@mui/material";
import { LANGUAGES } from "global";
import { useAppDispatch, useAppSelector } from "hooks";
import { useDeferredValue, useEffect, useState } from "react";
import { getParams } from "selectors/selectors";
import { setFontSize, setLanguage, toggleCategories } from "slices/params";
import styled from "styled-components";
import { TCategory } from "types/params";

import FontSizeScroll from "./fontSizeScroll";

const Controls = () => {
  const { language, fontSize } = useAppSelector(getParams);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(setFontSize(deferredSize));
  // }, [deferredSize, dispatch]);
  return (
    <Container>
      <FontSizeScroll
        size="small"
        defaultValue={24}
        min={8}
        max={72}
        width={200}
      />

      {/* style the scroll bar */}
      <Select
        className="language-selector"
        value={language}
        onChange={(e) => dispatch(setLanguage(e.target.value))}
        input={<OutlinedInput />}
        renderValue={(selected) => selected}
      >
        {LANGUAGES.map((_language) => (
          <MenuItem value={_language} key={_language}>
            {_language}
          </MenuItem>
        ))}
      </Select>
    </Container>
  );
};

export default Controls;

const Container = styled.div`
  width: 100%;
  height: fit-content;

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
`;
