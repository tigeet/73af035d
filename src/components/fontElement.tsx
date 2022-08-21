import { useEffect } from "react";
import styled from "styled-components";
import { IFont } from "types/meta";
import { IOptions } from "types/options";
import useFont from "utils/fontLoader";
import { designersFormatter, numberFormatter } from "utils/formatters";

import FontPreview from "./fontComponents/fontPreview";

// show a link to corresponding file
const FontElement = ({ font, options }: { font: IFont; options: IOptions }) => {
  const { loadFont } = useFont();

  useEffect(() => {
    loadFont(font.family);
  });

  return (
    // add a link to font page
    <Container>
      <div className="font-info">
        <div className="info-upper-line">
          <span className="font-family">{font.family}</span>
          <span className="styles-amount">
            {numberFormatter(Object.keys(font.fonts).length)}
          </span>
        </div>

        <span className="font-designers">
          {designersFormatter(font.designers)}
        </span>
      </div>

      <FontPreview
        fontFamily={font.family}
        fontSize={options.fontSize}
        value={options.template}
      />

      {/* <div className="tags">{tagsFormatter(font.subsets)}</div> */}
    </Container>
  );
};

export default FontElement;

const Container = styled.div`
  /* background-color: ${(props) => props.theme.colorBackground}; */
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-radius: 6px;
  font-family: "Roboto";
  font-size: 16px;
  gap: 16px;
  height: 100%;
  width: 100%;

  border: ${(props) => `1px solid ${props.theme.colorShadow}`};
  background-color: ${(props) => props.theme.colorBackground};
  color: ${(props) => props.theme.colorText.main};
  .font-info {
    display: flex;
    flex-direction: column;
    width: 100%;

    .info-upper-line {
      display: flex;
      justify-content: space-between;
      width: 100%;

      .styles-amount {
        /* extract to variables */
        font-size: 12px;
      }
    }

    .font-designers {
      /* extract to variables */
      font-size: 12px;
    }
  }

  .tags {
    /* extract to variables */
    font-size: 12px;
  }
`;
