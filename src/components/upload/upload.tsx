import { cn } from "@bem-react/classname";
import React, { memo, useCallback, useRef, useState } from "react";
import upload from "static/upload.svg";

import "./upload.scss";

const cnUpload = cn("upload");
type UploadProps = {
  onUpload: (files: FileList) => void;
  accept?: string;
  multiple?: boolean;
};
const Upload = ({ onUpload, multiple, accept }: UploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const handleClick = useCallback(() => inputRef.current?.click(), []);

  const handleDragStart = () => setDragActive(true);
  const handleDragEnd = () => setDragActive(false);
  const handleUpload = useCallback(
    (files: FileList) => {
      if (files.length === 0) return;

      onUpload(files);
    },
    [onUpload]
  );

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
      handleDragEnd();
      const files = event.dataTransfer.files;

      handleUpload(files);
    },
    [handleUpload]
  );

  const handleInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      files && handleUpload(files);
    },
    [handleUpload]
  );

  const stopEvent = (event: React.DragEvent) => {
    event.stopPropagation();
    event.preventDefault();
  };
  return (
    <form
      className={cnUpload({ drag: dragActive })}
      onDragEnter={handleDragStart}
      onDragOver={stopEvent}
      onSubmit={(e) => e.preventDefault()}
    >
      <div className={cnUpload("main")}>
        <button className={cnUpload("uploadButton")} onClick={handleClick}>
          <img
            className={cnUpload("uploadIcon")}
            src={upload}
            alt="upload icon"
          />
          <input
            type="file"
            className={cnUpload("input")}
            ref={inputRef}
            accept={accept}
            multiple={multiple ?? false}
            onChange={handleInput}
          />
        </button>
        <p>Drag an image here or upload a file</p>
      </div>

      {dragActive && (
        <div
          className={cnUpload("drop")}
          onDrop={handleDrop}
          onDragLeave={handleDragEnd}
          onDragEnd={handleDragEnd}
        ></div>
      )}
    </form>
  );
};
export default memo(Upload);
