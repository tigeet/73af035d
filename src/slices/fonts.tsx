import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "fb";
import {
  DocumentReference,
  QueryDocumentSnapshot,
  QuerySnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore";
import { IAuthor, IFont, IMeta } from "types/meta";

const toArray = (iterable: QuerySnapshot): QueryDocumentSnapshot[] => {
  const array: QueryDocumentSnapshot[] = [];
  iterable.forEach((item) => array.push(item));
  return array;
};
const fromRef = async (ref: any) => {
  const dc = await getDoc(ref);
  const data = dc.data() as object;
  return { id: ref.id, ...data };
};

async function fetchMeta(): Promise<IMeta> {
  const q = query(collection(db, "fonts"));
  const querySnapshot = await getDocs(q);
  const fonts: IFont[] = [];

  for (const snapshot of toArray(querySnapshot)) {
    const data = snapshot.data();
    const authorsRef = data.designers;
    const designers = await Promise.all(
      authorsRef.map((ref: any) => fromRef(ref))
    );

    fonts.push({ id: snapshot.id, ...data, designers } as IFont);
  }

  return { fonts, length: fonts.length };
}

const metaThunk = createAsyncThunk<IMeta, undefined, {}>(
  "meta/fetchMeta",
  fetchMeta
);

const initialState: IMeta = {
  fonts: [],
  length: 0,
};

const metaSlice = createSlice({
  name: "meta",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(metaThunk.pending, (state) => {})
      .addCase(metaThunk.fulfilled, (state, action) => {
        state.fonts = action.payload.fonts;
        state.length = action.payload.length;
      })
      .addCase(metaThunk.rejected, (state, action) => {});
  },
});
export { metaThunk };
export default metaSlice.reducer;
