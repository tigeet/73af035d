import { cn } from "@bem-react/classname";
import { Input, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { memo, useEffect, useState } from "react";
import X from "static/x.svg";
import styled from "styled-components";
import { IFont } from "types/meta";

import MultiSelect, { TOption } from "components/multi-select/multiSelect";
import Upload from "components/upload/upload";

type IFontDto = {
  family: string;
  designers: string[];
  content: File;
  category: "Serif" | "Sans Serif" | "Display" | "Handwriting" | "Monospace";
  tags: string[];
  styles: string[];
};
const UploadPage = () => {
  const [tagOptions, setTagOptions] = useState(["cyrillic", "latin"]);
  const [data, setData] = useState<Partial<IFontDto>>({
    family: "",
    tags: [],
    styles: [],
    designers: ["41jOnoAT2491l1Sxbn3J"],
  });

  const setFamily = (family: string) =>
    setData((data) => ({ ...data, family }));

  const handleAddTagOption = (option: TOption) =>
    setTagOptions((options) => [...options, option]);
  const handleSetTag = (fn: (opt: TOption[]) => TOption[]) =>
    setData((data) => ({
      ...data,
      tags: fn(data.tags ?? []),
    }));

  const [styleOptions, setStyleOptions] = useState(["400", "500"]);
  const handleAddStyleOption = (option: TOption) =>
    setStyleOptions((options) => [...options, option]);
  const handleSetStyle = (fn: (opt: TOption[]) => TOption[]) =>
    setData((data) => ({
      ...data,
      styles: fn(data.styles ?? []),
    }));

  const handleUpload = (files: FileList) => {
    if (files.length === 0) return;
    setData((data) => ({ ...data, content: files[0] }));
  };

  useEffect(() => console.log(data));
  return (
    <Container>
      <div className="center-wrapper">
        <div className="form">
          <TextField
            label="Name"
            value={data.family}
            onChange={(e) => setFamily(e.target.value)}
          />

          <MultiSelect
            selected={data.tags ?? []}
            setSelected={handleSetTag}
            onAdd={handleAddTagOption}
            options={tagOptions}
          />

          <MultiSelect
            selected={data.styles ?? []}
            setSelected={handleSetStyle}
            onAdd={handleAddStyleOption}
            options={styleOptions}
          />

          {data.content ? (
            <div>
              File uploaded
              <button
                onClick={() =>
                  setData((data) => ({ ...data, content: undefined }))
                }
              >
                <img className="x" src={X} alt="delete file" />
              </button>
            </div>
          ) : (
            <Upload accept="font/ttf" onUpload={handleUpload} />
          )}
        </div>
      </div>
    </Container>
  );
};

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

  .x {
    flex: 0 0 auto;
    width: 12px;
    height: 12px;
    .close {
      color: white;
    }
  }
`;

export default memo(UploadPage);
