import { Slider, SliderTypeMap } from "@mui/material";
import { useAppDispatch } from "hooks";
import { useDeferredValue, useEffect, useState } from "react";
import { setFontSize } from "slices/params";
import styled from "styled-components";

interface IProps {
  size?: "small" | "medium";
  defaultValue: number;
  min: number;
  max: number;
  width?: number;
}

const FontSizeScroll = ({ size, defaultValue, min, max, width }: IProps) => {
  const dispatch = useAppDispatch();
  const [localFontSize, setlocalFontSize] = useState<number>(24); // extract default value to global vars;
  const deferredSize: number = useDeferredValue(localFontSize);

  useEffect(() => {
    dispatch(setFontSize(deferredSize));
  }, [deferredSize, dispatch]);

  return (
    <Container width={width}>
      <label htmlFor="size-scroll">{localFontSize}px</label>
      <Slider
        id="size-scroll"
        size={size || "small"}
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

export default FontSizeScroll;

const Container = styled.div<{ width?: number }>`
  display: flex;
  align-items: center;
  /* gap: 24px; */
  width: ${(props) => (props.width ? `${props.width}px` : "100%")};
  label {
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    width: 32px;
    font-size: 16px;
  }
  .size-scroll {
    flex-grow: 1;
    margin: 24px;
    width: 100%;
  }
`;
