import { MenuItem, Pagination, Select } from "@mui/material";
import { LANGUAGES } from "global";
import { useAppDispatch, useAppSelector } from "hooks";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFontsMeta, getParams } from "selectors/selectors";
import { metaThunk } from "slices/meta";
import { setLanguage } from "slices/params";
import styled from "styled-components";
import { IFont } from "types/meta";
import { TDisplayType } from "types/params";

import Categories from "components/controlComponents/categories";
import Languages from "components/controlComponents/languages";
import Search from "components/controlComponents/search";
import Size from "components/controlComponents/size";
import Template from "components/controlComponents/template";

import FontElement from "../components/fontElement";

function GridPage() {
  const dispatch = useAppDispatch();
  const meta = useAppSelector(getFontsMeta);
  const [page, setPage] = useState<number>(1);
  const PAGE_SIZE = 12;
  const searchParams = useAppSelector(getParams);
  const [fonts, setFonts] = useState<IFont[]>([]);

  useEffect(() => {
    dispatch(metaThunk());
  }, [dispatch]);

  useEffect(() => {
    setPage(1);
  }, [searchParams.categories, searchParams.language, searchParams.search]);

  useEffect(() => {
    const _fonts = meta
      .filter(
        (font) =>
          font.subsets?.includes(searchParams.language) ||
          searchParams.language === "All languages"
      )
      .filter((font) => searchParams.categories.includes(font.category))
      .filter(
        (font) =>
          font.family
            .toLocaleLowerCase()
            .includes(searchParams.search.toLocaleLowerCase()) ||
          font.designers.reduce(
            (x, y) =>
              x ||
              y
                .toLocaleLowerCase()
                .includes(searchParams.search.toLocaleLowerCase()),
            false
          )
      );

    setFonts(_fonts);
  }, [
    searchParams.categories,
    searchParams.language,
    searchParams.search,
    meta,
  ]);

  return (
    <>
      <Controls>
        <div className="center-wrapper">
          <div className="row">
            <Search width={230} />

            <Template width={230} />
          </div>
          <div className="row">
            <Categories width={230} />

            {/* style the scroll bar */}
            <Languages width={230} />

            <Size size="small" defaultValue={24} max={196} width={230} />
          </div>
        </div>
      </Controls>

      <Container>
        <div className="center-wrapper">
          <FontsGrid className="grid" display={searchParams.display}>
            {fonts
              .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
              .map((font) => (
                <Link to={"" + font.id} key={font.id} state={font}>
                  <FontElement font={font} searchParams={searchParams} />
                </Link>
              ))}
          </FontsGrid>

          <Pagination
            page={page}
            onChange={(_, v) => setPage(v)}
            count={Math.ceil(fonts.length / PAGE_SIZE)}
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
