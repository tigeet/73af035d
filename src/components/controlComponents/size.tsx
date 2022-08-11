import { useSelect } from "@mui/base";
import { Input, Slider, SliderTypeMap } from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks";
import { useDeferredValue, useEffect, useState } from "react";
import { getParams } from "selectors/selectors";
import { setFontSize } from "slices/params";
import styled from "styled-components";

interface IProps {
  size?: "small" | "medium";
  defaultValue: number;
  // min: number;
  max: number;
  width?: number;
}

const Size = ({ size, defaultValue, max, width }: IProps) => {
  const globalFontSize = useAppSelector(getParams).fontSize;
  const dispatch = useAppDispatch();
  const [localFontSize, setlocalFontSize] = useState<number>(globalFontSize); // extract default value to global vars;
  const deferredSize: number = useDeferredValue(localFontSize);

  useEffect(() => {
    dispatch(setFontSize(deferredSize));
  }, [deferredSize, dispatch]);

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
    <Container width={width}>
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
        defaultValue={defaultValue}
        min={0}
        max={max}
        value={localFontSize}
        onChange={(_, v) => setlocalFontSize(v as number)}
        className="size-scroll"
      />
    </Container>
  );
};

export default Size;

const Container = styled.div<{ width?: number }>`
  display: flex;
  align-items: center;
  height: 32px;
  /* gap: 24px; */
  width: ${(props) => (props.width ? `${props.width}px` : "100%")};

  .size-input {
    display: flex;
    align-items: center;
    input {
      width: 32px;
      text-align: center;
    }

    label {
      color: #757575;
    }
  }

  .size-scroll {
    flex-grow: 1;
    margin: 24px;
    width: 100%;
  }
`;
