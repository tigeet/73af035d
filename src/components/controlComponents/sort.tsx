import { ListItemText, MenuItem, Select } from "@mui/material";
import { SORT_OPTIONS } from "globalVars";
import { useAppDispatch, useAppSelector } from "hooks";
import { getParams } from "selectors/selectors";
import { setSort } from "slices/options";
import styled from "styled-components";
import { TSort } from "types/options";

interface IProps {
  value: TSort;
  onChange: Function;
}
const Sort = ({ value, onChange }: IProps) => {
  // const dispatch = useAppDispatch();
  // const { sort } = useAppSelector(getParams);

  return (
    <Select
      className="sort"
      sx={{ height: "fit-content", width: "100%" }}
      variant="standard"
      value={value}
      displayEmpty
      renderValue={() => `Sort by: ${value}`}
      onChange={(e) => onChange(e.target.value)}
      // onChange={(e) => dispatch(setSort(e.target.value))}
    >
      {SORT_OPTIONS.map((option) => (
        <MenuItem key={option} value={option}>
          <ListItemText>{option}</ListItemText>
        </MenuItem>
      ))}
    </Select>
  );
};

export default Sort;
