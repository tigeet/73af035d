import { useAppDispatch, useAppSelector } from "hooks";
import { getFontsState } from "selectors/selectors";
import { submitFont, submitFonts } from "slices/fontState";

const WebFont = require("webfontloader");
// pass list of font id's
function useFont() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(getFontsState).loaded;

  function loadFont(font: string) {
    if (status[font] === undefined) {
      WebFont.load({
        google: {
          families: [font],
        },
      });
      dispatch(submitFonts([font]));
    }
  }

  function loadFonts(fontIds: string[]) {
    const pack = fontIds.filter((font) => status[font] === undefined);

    if (pack.length > 0) {
      WebFont.load({
        google: {
          families: pack,
        },
      });
      dispatch(submitFonts(pack));
    }
  }

  return { loadFonts, loadFont };
}

export default useFont;
