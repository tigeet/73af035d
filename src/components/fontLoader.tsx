import { memo } from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import { getUsedFonts } from "selectors/selectors";

const FontLoader = () => {
  const { used } = useSelector(getUsedFonts);
  const root = document.querySelector("head");
  if (!root) {
    return <></>;
  }

  return ReactDOM.createPortal(
    <>
      {used.map((font) => (
        <style key={font.name}>{`
        @font-face {
          font-family: '${font.name}';
          src: url(${font.url});
        }`}</style>
      ))}
    </>,
    root
  );
};

export default memo(FontLoader);
