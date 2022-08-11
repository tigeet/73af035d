import useFont from "fontLoader";
import { useEffect } from "react";
import styled from "styled-components";
import { IFont } from "types/meta";
import { IParams } from "types/params";

function numberFormatter(amount: number): string {
  return amount + " " + (amount === 1 ? "style" : "styles");
}

function designersFormatter(designers: string[]) {
  if (designers.length < 3)
    return (
      <>
        {"by "}
        <span className="selected">{designers.join(", ")}</span>
      </>
    );

  return (
    <>
      {"by "}
      <span className="selected">{designers.slice(0, 2).join(", ")}</span>
      <span title={designers.join(", ")}>{` and ${
        designers.length - 2
      } more`}</span>
    </>
  );
}

function tagsFormatter(tags: string[]): JSX.Element {
  if (tags.length < 4)
    return <span className="selected">{tags.join(", ")}</span>;

  return (
    <>
      <span className="selected">{tags.slice(0, 3).join(", ")}</span>
      <span title={tags.join(", ")}>{` and ${tags.length - 3} more`}</span>
    </>
  );
}

// show a link to corresponding file
const FontElement = ({
  font,
  searchParams,
}: {
  font: IFont;
  searchParams: IParams;
}) => {
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
        className="font-preview"
        font={font.family}
        fontSize={searchParams.fontSize}
      >
        {searchParams.template || "The quick brown fox jumps over the lazy dog"}
      </FontPreview>

      {/* <div className="tags">{tagsFormatter(font.subsets)}</div> */}
    </Container>
  );
};

export default FontElement;

interface IProps {
  font: string;
  fontSize: number;
}
const FontPreview = styled.div.attrs<IProps>(({ font, fontSize }: IProps) => ({
  style: {
    fontFamily: font,
    fontSize: fontSize + "px",
  },
}))<IProps>`
  word-wrap: break-word;
  flex-grow: 1;
  height: fit-content;
  width: 100%;
  font-weight: bold;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-radius: 6px;
  font-family: "Roboto";
  font-size: 16px;
  gap: 16px;

  border: 1px solid #d6dbd958;

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
