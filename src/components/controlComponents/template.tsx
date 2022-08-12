import { Close } from "@mui/icons-material";
import {
  IconButton,
  Input,
  InputAdornment,
  Select,
  TextField,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks";
import { useDeferredValue, useEffect, useState } from "react";
import { getParams } from "selectors/selectors";
import { setTemplate } from "slices/params";
import styled from "styled-components";

// edit props
interface IProps {
  width?: number;
}

const Template = ({ width }: IProps) => {
  const dispatch = useAppDispatch();
  const globalTemplate = useAppSelector(getParams).template;
  const [localTemplate, setLocalTemplate] = useState<string>(globalTemplate);
  const deferredTemplate = useDeferredValue(localTemplate);

  function handleReset() {
    setLocalTemplate("");
  }

  useEffect(() => {
    dispatch(setTemplate(deferredTemplate));
  }, [deferredTemplate, dispatch]);
  return (
    <Container width={width}>
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
    </Container>
  );
};

export default Template;

interface SProps {
  width?: number;
}

// .attrs(({ width }: SProps) => ({
//   style: {
//     width: width ?? "100%",
//   },
// }))
const Container = styled.div<SProps>`
  width: ${(props) => (props.width ? props.width + "px" : "100%")};
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
