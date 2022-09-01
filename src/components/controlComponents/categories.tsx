import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { CATEGORIES } from "globalVars";
import { useAppDispatch, useAppSelector } from "hooks";
import { getParams } from "selectors/selectors";
import { toggleCategories } from "slices/options";
import styled from "styled-components";
import { TCategory } from "types/options";

interface IProps {
  value: TCategory[];
  onChange: Function;
}
const Categories = ({ value, onChange }: IProps) => {
  // const { categories } = useAppSelector(getParams);
  // const dispatch = useAppDispatch();

  function handleChange(selected: string | TCategory[]) {
    const res: TCategory[] =
      typeof selected === "string" ? [selected as TCategory] : selected;
    // dispatch(toggleCategories(res));
    onChange(res);
  }

  return (
    <Select
      sx={{ height: "fit-content", width: "100%" }}
      multiple
      variant="standard"
      value={value}
      displayEmpty
      // defaultValue="empty"
      renderValue={() => "Categories"}
      onChange={(e) => handleChange(e.target.value)}
    >
      {CATEGORIES.map((category) => (
        <MenuItem key={category} value={category}>
          <Checkbox
            color="primary"
            checked={value.includes(category as TCategory)}
          />
          <ListItemText>{category}</ListItemText>
        </MenuItem>
      ))}
    </Select>
  );
};

export default Categories;
