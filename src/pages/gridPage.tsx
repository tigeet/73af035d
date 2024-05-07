import { Add } from "@mui/icons-material";
import { Box, Fab, Pagination } from "@mui/material";
import { auth, db } from "fb";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { useAppDispatch, useAppSelector } from "hooks";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFontsMeta, getParams } from "selectors/selectors";
import { metaThunk } from "slices/fonts";
import {
  setFontSize,
  setLanguage,
  setSearch,
  setSort,
  setTemplate,
  toggleCategories,
} from "slices/options";
import { userThunk } from "slices/user";
import styled from "styled-components";
import { IFont } from "types/meta";
import { TCategory, TDisplayType, TSort } from "types/options";

import AdaptiveWrapper from "components/controlComponents/adaptiveWrapper";
import Categories from "components/controlComponents/categories";
import Languages from "components/controlComponents/languages";
import Search from "components/controlComponents/search";
import Size from "components/controlComponents/size";
import Sort from "components/controlComponents/sort";
import Template from "components/controlComponents/template";
import FontElement from "components/fontElement";

function GridPage() {
  const dispatch = useAppDispatch();
  const { fonts } = useAppSelector(getFontsMeta);
  const [page, setPage] = useState<number>(1);
  const ELEMENTS_PER_PAGE = 12;
  const options = useAppSelector(getParams);
  const [loclaFonts, setFonts] = useState<IFont[]>([]);

  useEffect(() => {
    setPage(1);
  }, [options.categories, options.language, options.search]);

  useEffect(() => {
    const _fonts = fonts
      .filter((font) => font.status === "published")
      .filter(
        (font) =>
          font.tags?.includes(options.language) ||
          options.language === "All languages"
      )
      .filter((font) => options.categories.includes(font.category))
      .filter(
        (font) =>
          font.family
            .toLocaleLowerCase()
            .includes(options.search.toLocaleLowerCase())
        // || font.designers.reduce(
        //   (x, y) =>
        //     x ||
        //     y
        //       .toLocaleLowerCase()
        //       .includes(options.search.toLocaleLowerCase()),
        //   false
        // )
      )
      .sort((f1, f2) => {
        if (options.sort === "name") return f1.family.localeCompare(f2.family)!;

        if (options.sort === "most popular")
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
    <Box sx={{ flex: "1 1 auto", display: "flex", flexDirection: "column" }}>
      <Controls>
        <div className="center-wrapper">
          <div className="row">
            <AdaptiveWrapper width={230}>
              <Search
                value={options.search}
                onChange={(v: string) => dispatch(setSearch(v))}
              />
            </AdaptiveWrapper>

            <AdaptiveWrapper width={230}>
              <Template
                value={options.template}
                onChange={(v: string) => dispatch(setTemplate(v))}
              />
            </AdaptiveWrapper>
          </div>
          <div className="row">
            <AdaptiveWrapper width={230}>
              <Categories
                value={options.categories}
                onChange={(v: TCategory[]) => dispatch(toggleCategories(v))}
              />
            </AdaptiveWrapper>

            <AdaptiveWrapper width={230}>
              <Languages
                value={options.language}
                onChange={(v: string) => dispatch(setLanguage(v))}
              />
            </AdaptiveWrapper>

            <AdaptiveWrapper width={230}>
              <Size
                value={options.fontSize}
                onChange={(v: number) => dispatch(setFontSize(v))}
                size="small"
                defaultValue={24}
                max={196}
                min={8}
              />
            </AdaptiveWrapper>

            <AdaptiveWrapper className="sort" width={230}>
              <Sort
                value={options.sort}
                onChange={(v: TSort) => dispatch(setSort(v))}
              />
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
                <Link to={"font/" + font.family} key={font.id} state={font}>
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

      <Link
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
      </Link>
    </Box>
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
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    padding: 12px;
    width: 100%;
    max-width: 1400px;
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
