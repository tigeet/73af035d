import { Pagination } from "@mui/material";
import useFont from "fontLoader";
import { useAppDispatch, useAppSelector } from "hooks";
import React, { useEffect, useState } from "react";
import { getFontsMeta, getParams } from "selectors/selectors";
import { metaThunk } from "slices/meta";
import styled from "styled-components";
import { IFont } from "types/meta";
import { TDisplayType } from "types/params";

import FontElement from "./fontElement";

function FontsPage() {
  const dispatch = useAppDispatch();
  const meta = useAppSelector(getFontsMeta);
  const [page, setPage] = useState<number>(1);
  const PAGE_SIZE = 12;
  const searchParams = useAppSelector(getParams);
  const [fonts, setFonts] = useState<IFont[]>([]);

  useEffect(() => {
    dispatch(metaThunk());
  }, []);

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
    console.log("render");
  }, [
    searchParams.categories,
    searchParams.language,
    searchParams.search,
    meta,
  ]);

  return (
    <Container>
      <div className="center-wrapper">
        <FontsGrid className="grid" display={searchParams.display}>
          {fonts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map((font) => (
            <FontElement
              font={font}
              searchParams={searchParams}
              key={font.id}
            />
          ))}
        </FontsGrid>

        <Pagination
          page={page}
          onChange={(_, v) => setPage(v)}
          count={Math.ceil(fonts.length / PAGE_SIZE)}
        />
      </div>
    </Container>
  );
}

export default FontsPage;

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
