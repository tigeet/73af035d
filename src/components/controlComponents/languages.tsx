import { MenuItem, Select } from "@mui/material";
import { LANGUAGES } from "globalVars";
import { useAppDispatch, useAppSelector } from "hooks";
import { getParams } from "selectors/selectors";
import { setLanguage } from "slices/options";
import styled from "styled-components";

interface IProps {
  value: string;
  onChange: Function;
}

const Languages = ({ value, onChange }: IProps) => {
  // const { language } = useAppSelector(getParams);
  // const dispatch = useAppDispatch();

  return (
    <Select
      sx={{ width: "100%", height: "fit-content" }}
      className="language-selector"
      variant="standard"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      // onChange={(e) => dispatch(setLanguage(e.target.value))}
      renderValue={(selected) => selected}
    >
      {LANGUAGES.map((_language) => (
        <MenuItem value={_language} key={_language}>
          {_language}
        </MenuItem>
      ))}
    </Select>
  );
};

export default Languages;
