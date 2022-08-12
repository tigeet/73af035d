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
import styled from "styled-components";
import { TCategory } from "types/params";

interface IProps {
  width?: number;
}

const Categories = ({ width }: IProps) => {
  const { categories } = useAppSelector(getParams);
  const dispatch = useAppDispatch();

  function handleChange(selected: string | TCategory[]) {
    const res: TCategory[] =
      typeof selected === "string" ? [selected as TCategory] : selected;
    dispatch(toggleCategories(res));
  }

  return (
    <Container width={width}>
      <Select
        sx={{ height: "fit-content", width: "100%" }}
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
    </Container>
  );
};

export default Categories;

interface SProps {
  width?: number;
}

const Container = styled.div<SProps>`
  width: ${(props) => (props.width ? props.width + "px" : "100%")};
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
