import { clsx } from "clsx";
import React, { memo, useState } from "react";

import type { TOption } from "../multiSelect";
import Option from "../option/option";
import { TColor, pickRandomColor } from "../utils/color";
import "./suggestions.css";

type TSuggestionsProps = {
  search: string;
  options: TOption[];
  selected: number | undefined;
  onSelect: (index: number) => void;
  onSubmit: (value: string) => void;
  color: TColor;
  onCreate: (value: string, color: TColor) => void;
};

const Suggestions = ({
  color,
  search,
  options,
  onSubmit,
  onCreate,
  selected,
  onSelect,
}: TSuggestionsProps) => {
  const lastIndex = options.length;

  return (
    <div className="suggestions">
      <div className="options">
        {options.map((option, i) => (
          <div
            className={clsx("suggestion", selected === i && "selected")}
            key={option}
            onMouseOver={() => onSelect(i)}
          >
            <Option value={option} onClick={() => onSubmit(option)} wide />
          </div>
        ))}
      </div>

      {search !== "" && (
        <div
          className={clsx(
            "create suggestion",
            selected === lastIndex && "selected"
          )}
          onMouseOver={() => onSelect(lastIndex)}
          onClick={() => onCreate(search, color)}
        >
          Create <Option value={search}></Option>
        </div>
      )}
    </div>
  );
};

export default memo(Suggestions);
