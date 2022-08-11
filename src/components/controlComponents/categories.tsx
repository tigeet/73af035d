import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { CATEGORIES } from "global";
import { useAppDispatch, useAppSelector } from "hooks";
import { getParams } from "selectors/selectors";
import { toggleCategories } from "slices/params";
import { TCategory } from "types/params";

const Categories = () => {
  const { categories } = useAppSelector(getParams);
  const dispatch = useAppDispatch();

  function handleChange(selected: string | TCategory[]) {
    const res: TCategory[] =
      typeof selected === "string" ? [selected as TCategory] : selected;
    dispatch(toggleCategories(res));
  }

  return (
    <>
      <Select
        sx={{ height: "fit-content" }}
        multiple
        variant="standard"
        value={categories}
        displayEmpty
        // defaultValue="empty"
        renderValue={() => "Categories"}
        onChange={(e) => handleChange(e.target.value)}
      >
        {CATEGORIES.map((category) => (
          <MenuItem key={category} value={category}>
            <Checkbox checked={categories.includes(category as TCategory)} />
            <ListItemText>{category}</ListItemText>
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default Categories;
