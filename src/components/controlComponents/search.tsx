import { Close, SearchOutlined } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks";
import { useDeferredValue, useEffect, useState } from "react";
import { getParams } from "selectors/selectors";
import { setSearch } from "slices/options";

const Search = () => {
  const dispatch = useAppDispatch();
  const globalSearch = useAppSelector(getParams).search;
  const [localSearch, setLocalSearch] = useState<string>(globalSearch);
  const deferredSearch = useDeferredValue(localSearch);

  function handleReset() {
    setLocalSearch("");
  }

  useEffect(() => {
    dispatch(setSearch(deferredSearch));
  }, [deferredSearch, dispatch]);
  return (
    <TextField
      sx={{ width: "100%" }}
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
    />
  );
};

export default Search;
