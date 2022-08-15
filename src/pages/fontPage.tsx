import { useAppDispatch, useAppSelector } from "hooks";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getFontsMeta, getParams } from "selectors/selectors";
import { metaThunk } from "slices/meta";
import styled from "styled-components";
import { IFont } from "types/meta";
import { IParams } from "types/params";
import { parseWeight } from "utils";

import Size from "components/controlComponents/size";
import Template from "components/controlComponents/template";
import FontPreview from "components/fontComponents/fontPreview";

const FontPage = () => {
  const urlParam = useParams().font;
  const dispatch = useAppDispatch();
  const [isValid, setValid] = useState<boolean>(false);
  const { fonts, isLoaded } = useAppSelector(getFontsMeta);
  const [font, setFont] = useState<IFont>({
    family: "",
    subsets: [],
    designers: [],
    id: 0,
    category: null,
    fonts: {},
    popularity: 0,
  });

  useEffect(() => {
    if (!isLoaded) dispatch(metaThunk());
  }, [dispatch, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      const _fonts: IFont[] = fonts.filter(
        (_font) => _font.family === urlParam!
      );

      if (_fonts.length !== 0) {
        setFont(_fonts[0]);
        setValid(true);
      } else setValid(false);
    }
  }, [fonts, urlParam, isLoaded]);

  const { template, fontSize } = useAppSelector(getParams);

  // loading page
  if (!isLoaded) return <h1>loading</h1>;

  if (!isValid) {
    return <h1>Font doesnt exist</h1>;
  }

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
          <Template width={250} />
          <Size max={196} defaultValue={24} width={250} min={8} />
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
  background-color: ${(props) => props.theme.colorBackground};
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
      /* gap: 8px; */
      .weight-display {
        /* color: #007acc; */
        font-size: 14px;
      }
    }
  }
`;