import { Close } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import {
  memo,
  useCallback,
  useDeferredValue,
  useEffect,
  useState,
} from "react";

interface IProps {
  value: string;
  onChange: Function;
}
const Template = ({ value, onChange }: IProps) => {
  const [localTemplate, setLocalTemplate] = useState<string>(value);
  const deferredTemplate = useDeferredValue(localTemplate);

  const handleReset = useCallback(() => {
    setLocalTemplate("");
  }, []);

  useEffect(() => {
    onChange(deferredTemplate);
  }, [deferredTemplate, onChange]);
  return (
    <TextField
      sx={{ width: "100%" }}
      id="template"
      variant="standard"
      placeholder="Sentence"
      value={localTemplate}
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

export default memo(Template);
