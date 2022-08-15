import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IFont, IMeta } from "types/meta";

async function fetchMeta(): Promise<IMeta> {
  const response = await fetch(process.env.PUBLIC_URL + "fonts.json");
  const json = await response.json();
  // destruct to proper structure
  const fonts: IFont[] = json.familyMetadataList.map((obj: any, id: number) => {
    const { family, subsets, category, fonts, designers, popularity } = obj;
    return {
      id,
      family,
      subsets,
      category,
      fonts,
      designers,
      popularity,
    } as IFont;
  });

  return {
    fonts,
    length: fonts.length,
    isLoaded: true,
  } as IMeta;
}

const metaThunk = createAsyncThunk<IMeta, undefined, {}>(
  "meta/fetchMeta",
  fetchMeta
);

const initialState: IMeta = {
  fonts: [],
  length: 0,
  isLoaded: false,
};

const metaSlice = createSlice({
  name: "meta",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(metaThunk.pending, (state) => {
        //
      })
      .addCase(metaThunk.fulfilled, (state, action) => {
        // console.log(action.payload.length);
        state.fonts = action.payload.fonts;
        state.length = action.payload.length;
        state.isLoaded = true;
      })
      .addCase(metaThunk.rejected, (state) => {
        //
      });
  },
});
export { metaThunk };
export default metaSlice.reducer;
