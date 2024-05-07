import { Add } from "@mui/icons-material";
import { Button, Fab, Link } from "@mui/material";
import { cloud } from "fb";
import { getDownloadURL, ref } from "firebase/storage";
import { useAppDispatch, useAppSelector } from "hooks";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getFontsMeta, getParams } from "selectors/selectors";
import { metaThunk } from "slices/fonts";
import { setFontSize, setTemplate } from "slices/options";
import styled from "styled-components";
import { IFont } from "types/meta";
import { parseWeight } from "utils/formatters";

import AdaptiveWrapper from "components/controlComponents/adaptiveWrapper";
import Size from "components/controlComponents/size";
import Template from "components/controlComponents/template";
import FontPreview from "components/fontComponents/fontPreview";

// https://firebasestorage.googleapis.com/v0/b/fonts-38282.appspot.com/o/fonts%2FMonocraft-no-ligatures.ttf?alt=media&token=263fb390-b217-437d-9b2e-4d1048da03ad
// https://firebasestorage.googleapis.com/v0/b/fonts-38282.appspot.com/o/fonts%252FMonocraft-no-ligatures.ttf?alt=media&token=263fb390-b217-437d-9b2e-4d1048da03ad
const getUrl = async (content_id: string): Promise<string> => {
  return await getDownloadURL(ref(cloud, `fonts/${content_id}`));
};
const FontPage = () => {
  const urlParam = useParams().font;
  const dispatch = useAppDispatch();
  const [isValid, setValid] = useState<boolean>(false);
  const { template, fontSize } = useAppSelector(getParams);
  const { fonts } = useAppSelector(getFontsMeta);
  const [font, setFont] = useState<IFont | null>(null);

  useEffect(() => {
    dispatch(metaThunk());
  }, [dispatch]);

  const [url, setUrl] = useState("");
  useEffect(() => {
    async function run() {
      if (!font) return;
      setUrl(await getUrl(font?.content_id));
    }

    run();
  });
  useEffect(() => {
    const _fonts: IFont[] = fonts.filter((_font) => _font.family === urlParam!);

    if (_fonts.length !== 0) {
      setFont(_fonts[0]);
      setValid(true);
    } else setValid(false);
  }, [fonts, urlParam]);

  if (!isValid) {
    return <h1>Font doesnt exist</h1>;
  }

  if (!font) return null;
  return (
    <Container>
      <div className="center-wrapper">
        {/* mb extract __title__ and __designers__to components */}

        <div className="font-info">
          <span className="font-title">{font.family}</span>
          <span className="font-designers">
            by
            <span className="selected font-designers">
              {font.designers.map((designer) => designer.name).join(", ")}
            </span>
          </span>
        </div>

        <div className="controls">
          <AdaptiveWrapper width={250}>
            <Template
              value={template}
              onChange={(v: string) => dispatch(setTemplate(v))}
            />
          </AdaptiveWrapper>

          <AdaptiveWrapper width={250}>
            <Size
              value={fontSize}
              onChange={(v: number) => dispatch(setFontSize(v))}
              max={196}
              defaultValue={24}
              min={8}
            />
          </AdaptiveWrapper>

          <AdaptiveWrapper width={128} className="download-wrapper">
            {/* <Button> */}
            <Link
              // variant="h6"
              underline="none"
              className="download-link"
              href={
                url
                // `https://fonts.google.com/download?family=${font.family}`
              }
            >
              DOWNLOAD
            </Link>
            {/* </Button> */}
          </AdaptiveWrapper>
        </div>

        <div className="styles">
          {font.styles.toSorted().map((key) => (
            <div className="style-preview" key={key}>
              <span className="weight-display">{parseWeight(key).value}</span>
              <FontPreview
                value={template}
                fontFamily={font.family}
                fontSize={fontSize}
                fontWeight={parseInt(key)}
                isItalic={parseWeight(key).isItalic}
                fontContent={font.content_id}
                nowrap
              />
            </div>
          ))}
        </div>
      </div>

      <RouterLink
        to="/upload"
        style={{
          position: "absolute",
          right: "16px",
          bottom: "16px",
        }}
      >
        <Fab aria-label="Upload">
          <Add />
        </Fab>
      </RouterLink>
    </Container>
  );
};

export default FontPage;

const Container = styled.div`
  background-color: ${(props) => props.theme.colorBackground};
  color: ${(props) => props.theme.colorText.main};
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
    width: 100%;

    @media screen and (max-width: 768px) {
      flex-direction: column;
      gap: 8px;
    }

    .download-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 0;
      margin-left: auto;

      .download-link {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
      }
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
