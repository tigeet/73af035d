import { fontWeight } from "@mui/system";
import styled from "styled-components";

interface IProps {
  value: string;
  // defaultValue: string,
  fontFamily: string;
  fontSize: number;
  fontWeight?: number;
  nowrap?: boolean;
  isItalic?: boolean;
}

const FontPreview = ({
  value,
  fontFamily,
  fontSize,
  fontWeight,
  nowrap,
  isItalic,
}: IProps) => {
  return (
    <Container
      fontFamily={fontFamily}
      fontSize={fontSize}
      fontWeight={fontWeight}
      nowrap={nowrap}
      isItalic={isItalic}
    >
      {value || "The quick brown fox jumps over the lazy dog"}
    </Container>
  );
};

export default FontPreview;

interface SProps {
  fontFamily: string;
  fontSize: number;
  fontWeight?: number;
  nowrap?: boolean;
  isItalic?: boolean;
}
const Container = styled.div.attrs<SProps>(
  ({ fontFamily, fontSize, fontWeight, nowrap, isItalic }: SProps) => ({
    style: {
      fontFamily: `${fontFamily}`,
      fontSize: fontSize + "px",
      fontWeight: fontWeight ?? "normal",
      whiteSpace: nowrap ? "pre" : "unset",
      fontStyle: isItalic ? "italic" : "normal",
    },
  })
)<SProps>`
  background-color: ${(props) => props.theme.colorBackground};
  color: ${(props) => props.theme.colorText.main};
  word-wrap: break-word;
  flex-grow: 1;
  height: 100%;
  width: 100%;
  overflow: hidden;
  font-family: "${(props) => props.fontFamily}";
`;
