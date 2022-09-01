import { Close } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks";
import { useDeferredValue, useEffect, useState } from "react";
import { getParams } from "selectors/selectors";
import { setTemplate } from "slices/options";

interface IProps {
  value: string;
  onChange: Function;
}
const Template = ({ value, onChange }: IProps) => {
  // const dispatch = useAppDispatch();
  // const globalTemplate = useAppSelector(getParams).template;
  const [localTemplate, setLocalTemplate] = useState<string>(value);
  const deferredTemplate = useDeferredValue(localTemplate);

  function handleReset() {
    setLocalTemplate("");
  }

  useEffect(() => {
    onChange(deferredTemplate);
    // dispatch(setTemplate(deferredTemplate));
  }, [deferredTemplate, onChange]);
  return (
    <TextField
      sx={{ width: "100%" }}
      id="template"
      variant="standard"
      placeholder="Sentence"
      value={deferredTemplate}
      onChange={(e) => setLocalTemplate(e.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleReset}>
              <Close sx={{ width: 14, height: 14 }} />
            </IconButton>
          </InputAdornment>
        ),
      }}
    ></TextField>
  );
};

export default Template;
