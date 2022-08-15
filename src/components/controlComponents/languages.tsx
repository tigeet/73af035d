import { MenuItem, Select } from "@mui/material";
import { LANGUAGES } from "globalVars";
import { useAppDispatch, useAppSelector } from "hooks";
import { getParams } from "selectors/selectors";
import { setLanguage } from "slices/params";
import styled from "styled-components";

interface IProps {
  width?: number;
}

const Languages = ({ width }: IProps) => {
  const { language } = useAppSelector(getParams);
  const dispatch = useAppDispatch();

  return (
    <Container width={width}>
      <Select
        sx={{ width: "100%", height: "fit-content" }}
        className="language-selector"
        variant="standard"
        value={language}
        onChange={(e) => dispatch(setLanguage(e.target.value))}
        renderValue={(selected) => selected}
      >
        {LANGUAGES.map((_language) => (
          <MenuItem value={_language} key={_language}>
            {_language}
          </MenuItem>
        ))}
      </Select>
    </Container>
  );
};

export default Languages;

interface SProps {
  width?: number;
}

const Container = styled.div<SProps>`
  width: ${(props) => (props.width ? props.width + "px" : "100%")};
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
