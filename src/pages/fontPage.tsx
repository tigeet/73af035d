import { useAppSelector } from "hooks";
import { useLocation, useParams } from "react-router-dom";
import { getParams } from "selectors/selectors";
import styled from "styled-components";
import { IFont } from "types/meta";
import { IParams } from "types/params";
import { parseWeight } from "utils";

import Size from "components/controlComponents/size";
import Template from "components/controlComponents/template";
import FontPreview from "components/fontComponents/fontPreview";

const FontPage = () => {
  const font = useLocation().state as IFont;
  const { template, fontSize } = useAppSelector(getParams);
  return (
    <Container>
      <div className="center-wrapper">
        {/* mb extract __title__ and __designers__to components */}

        <div className="font-info">
          <span className="font-title">{font.family}</span>
          <span className="font-designers">
            by{" "}
            <span className="selected font-designers">
              {font.designers.join(", ")}
            </span>
          </span>
        </div>

        <div className="controls">
          <Template width={350} />
          <Size max={196} defaultValue={24} width={350} />
        </div>

        <div className="styles">
          {Object.keys(font.fonts)
            .sort((key1, key2) => parseInt(key1) - parseInt(key2))
            .map((key) => (
              <div className="style-preview" key={key}>
                <span className="weight-display">{parseWeight(key).value}</span>
                <FontPreview
                  value={template}
                  fontFamily={font.family}
                  fontSize={fontSize}
                  fontWeight={parseInt(key)}
                  isItalic={parseWeight(key).isItalic}
                  nowrap
                />
              </div>
            ))}
        </div>
      </div>
    </Container>
  );
};

export default FontPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;

  .center-wrapper {
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding: 12px;
    width: 100%;
    max-width: 1400px;
  }

  .controls {
    display: flex;
    gap: 64px;

    @media screen and (max-width: 768px) {
      flex-direction: column;
      gap: 8px;
    }
  }
  .font-info {
    display: flex;
    flex-direction: column;

    .font-title {
      font-weight: bold;
      font-size: 72px;
    }

    .font-designers {
      font-size: 24px;
    }
  }

  .styles {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    .style-preview {
      /* display: grid
      display: flex;
      flex-direction: column; lign-items: center;
 * gap: 64px; */
      display: flex;
      flex-direction: column;
      /* align-items: center; */
      gap: 8px;
      .weight-display {
        color: #007acc;
        font-size: 14px;
      }
    }
  }
`;
