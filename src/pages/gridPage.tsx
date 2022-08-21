import { Pagination } from "@mui/material";
import { useAppDispatch, useAppSelector } from "hooks";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFontsMeta, getParams } from "selectors/selectors";
import { metaThunk } from "slices/meta";
import styled from "styled-components";
import { IFont } from "types/meta";
import { TDisplayType } from "types/options";

import AdaptiveWrapper from "components/controlComponents/adaptiveWrapper";
import Categories from "components/controlComponents/categories";
import Languages from "components/controlComponents/languages";
import Search from "components/controlComponents/search";
import Size from "components/controlComponents/size";
import Sort from "components/controlComponents/sort";
import Template from "components/controlComponents/template";

import FontElement from "../components/fontElement";

function GridPage() {
  const dispatch = useAppDispatch();
  const { fonts } = useAppSelector(getFontsMeta);
  const [page, setPage] = useState<number>(1);
  const ELEMENTS_PER_PAGE = 12;
  const options = useAppSelector(getParams);
  const [loclaFonts, setFonts] = useState<IFont[]>([]);

  useEffect(() => {
    dispatch(metaThunk());
  }, [dispatch]);

  useEffect(() => {
    setPage(1);
  }, [options.categories, options.language, options.search]);

  useEffect(() => {
    const _fonts = fonts
      .filter(
        (font) =>
          font.subsets?.includes(options.language) ||
          options.language === "All languages"
      )
      .filter((font) => options.categories.includes(font.category))
      .filter(
        (font) =>
          font.family
            .toLocaleLowerCase()
            .includes(options.search.toLocaleLowerCase()) ||
          font.designers.reduce(
            (x, y) =>
              x ||
              y
                .toLocaleLowerCase()
                .includes(options.search.toLocaleLowerCase()),
            false
          )
      )
      .sort((f1, f2) => {
        if (options.sort === "name") return f1.family.localeCompare(f2.family)!;

        if (options.sort === "most Popular")
          return f1.popularity - f2.popularity;

        return 0;
      });

    setFonts(_fonts);
  }, [
    options.categories,
    options.language,
    options.search,
    fonts,
    options.sort,
  ]);

  return (
    <>
      <Controls>
        <div className="center-wrapper">
          <div className="row">
            <AdaptiveWrapper width={230}>
              <Search />
            </AdaptiveWrapper>

            <AdaptiveWrapper width={230}>
              <Template />
            </AdaptiveWrapper>
          </div>
          <div className="row">
            <AdaptiveWrapper width={230}>
              <Categories />
            </AdaptiveWrapper>

            <AdaptiveWrapper width={230}>
              <Languages />
            </AdaptiveWrapper>

            <AdaptiveWrapper width={230}>
              <Size size="small" defaultValue={24} max={196} min={8} />
            </AdaptiveWrapper>

            <AdaptiveWrapper className="sort" width={230}>
              <Sort />
            </AdaptiveWrapper>
          </div>
        </div>
      </Controls>

      <Container>
        <div className="center-wrapper">
          <FontsGrid className="grid" display={options.display}>
            {loclaFonts
              .slice((page - 1) * ELEMENTS_PER_PAGE, page * ELEMENTS_PER_PAGE)
              .map((font) => (
                <Link to={"" + font.family} key={font.id} state={font}>
                  <FontElement font={font} options={options} />
                </Link>
              ))}
          </FontsGrid>

          <Pagination
            // color=""
            page={page}
            onChange={(_, v) => setPage(v)}
            count={Math.ceil(loclaFonts.length / ELEMENTS_PER_PAGE)}
          />
        </div>
      </Container>
    </>
  );
}

export default GridPage;

const FontsGrid = styled.div<{ display: TDisplayType }>`
  display: grid;
  width: 100%;
  justify-content: center;
  /* grid-auto-rows: 250px; */
  gap: 12px;
  grid-template-columns: ${(props) => {
    switch (props.display) {
      case "block":
        return "1fr";
      case "grid":
        return "repeat(auto-fit, minmax(400px, 1fr))";
    }
  }};
`;

const Container = styled.div`
  background-color: ${(props) => props.theme.colorBackground};
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;

  .center-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 12px;
    width: 100%;
    max-width: 1400px;
    height: 100%;
  }
`;

const Controls = styled.div`
  background-color: ${(props) => props.theme.colorBackground};
  justify-content: center;
  width: 100%;
  display: flex;
  height: fit-content;

  .center-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px;
    width: 100%;
    max-width: 1400px;
    .row {
      display: flex;
      gap: 64px;
      /* justify-content: space-between; */
      width: 100%;

      @media screen and (max-width: 768px) {
        flex-direction: column;
        gap: 8px;
      }
    }

    .sort {
      margin-left: auto;
    }

    .size-scroll-wrapper {
      display: flex;
      align-items: center;
      gap: 24px;

      label {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32px;
        font-size: 16px;
      }
      .size-scroll {
        width: 300px;
      }
    }
  }
`;
