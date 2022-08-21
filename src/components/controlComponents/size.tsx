import { Input, Slider } from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks";
import { useDeferredValue, useEffect, useState } from "react";
import { getParams } from "selectors/selectors";
import { setFontSize } from "slices/options";
import styled from "styled-components";

interface IProps {
  size?: "small" | "medium";
  defaultValue: number;
  min: number;
  max: number;
}

const Size = ({ size, defaultValue, max, min }: IProps) => {
  const globalFontSize = useAppSelector(getParams).fontSize;
  const dispatch = useAppDispatch();
  const [localFontSize, setlocalFontSize] = useState<number>(globalFontSize); // extract default value to global vars;
  const deferredSize: number = useDeferredValue(localFontSize);

  useEffect(() => {
    if (deferredSize >= min && deferredSize <= max)
      dispatch(setFontSize(deferredSize));
  }, [deferredSize, dispatch, min, max]);

  function handleInputChange(s: string, p: number): number {
    let res: number = p;
    const i = parseInt(s);

    if (s === "") res = 0;
    else if (!isNaN(i)) {
      if (i <= max) res = i;
    }
    return res;
  }

  return (
    <Container>
      <div className="size-input">
        <Input
          id="input"
          value={deferredSize}
          onChange={(e) =>
            setlocalFontSize((prev) => handleInputChange(e.target.value, prev))
          }
        />

        <label htmlFor="input">px</label>
      </div>
      <Slider
        size={size || "small"}
        sx={{ width: "100%", padding: 0 }}
        defaultValue={defaultValue}
        min={min}
        max={max}
        value={localFontSize}
        onChange={(_, v) => setlocalFontSize(v as number)}
        className="size-scroll"
      />
    </Container>
  );
};

export default Size;

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  /* gap: 24px; */
  width: 100%;

  .size-input {
    display: flex;
    align-items: center;
    input {
      width: 32px;
      text-align: center;
    }

    label {
      color: ${(props) => props.theme.colorText.light};
    }
  }

  .size-scroll {
    flex-grow: 1;
    margin: 24px;
    width: 100%;
  }
`;
