import clsx from "clsx";
import React, { memo } from "react";
import X from "static/x.svg";

import "./option.css";

type OptionProps = {
  value: string;
  onDelete?: (value: string) => void;
  onClick?: (value: string) => void;
  wide?: boolean;
};

const Option = ({ value, onDelete, onClick, wide }: OptionProps) => {
  const hasDelete = onDelete !== undefined;
  return (
    <div
      className={clsx("option", { wide })}
      key={value}
      onClick={() => onClick?.(value)}
    >
      <span className="title">{value}</span>
      {hasDelete && (
        <button className="close-btn" onClick={() => onDelete?.(value)}>
          <img src={X} className="close" alt="close icon" />
        </button>
      )}
    </div>
  );
};

export default memo(Option);
