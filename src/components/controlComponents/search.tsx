import { Close, SearchOutlined } from "@mui/icons-material";
import {
  Button,
  IconButton,
  Input,
  InputAdornment,
  Select,
  TextField,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks";
import { useDeferredValue, useEffect, useState } from "react";
import { getParams } from "selectors/selectors";
import { setSearch } from "slices/params";
import styled from "styled-components";

// edit props
interface IProps {
  type: "";
}

const Search = () => {
  const dispatch = useAppDispatch();
  const globalSearch = useAppSelector(getParams).search;
  const [localSearch, setLocalSearch] = useState<string>(globalSearch);
  const deferredSearch = useDeferredValue(localSearch);

  // mb extract close btn to component
  function handleReset() {
    setLocalSearch("");
  }

  useEffect(() => {
    dispatch(setSearch(deferredSearch));
  }, [deferredSearch, dispatch]);
  return (
    <Container>
      <TextField
        id="search"
        variant="standard"
        placeholder="Search"
        value={deferredSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlined />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleReset}>
                <Close sx={{ width: 14, height: 14 }} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      ></TextField>
    </Container>
  );
};

export default Search;

const Container = styled.div``;
