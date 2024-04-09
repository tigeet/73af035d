import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, db } from "fb";
import {
  QueryDocumentSnapshot,
  QuerySnapshot,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { IFont, IUser } from "types/meta";

const toArray = (iterable: QuerySnapshot): QueryDocumentSnapshot[] => {
  const array: QueryDocumentSnapshot[] = [];
  iterable.forEach((item) => array.push(item));
  return array;
};

interface IAppState {
  user: IUser | null;
}

const initialState: IAppState = {
  user: null,
};

async function fetchUser(): Promise<IUser | null> {
  const user = auth.currentUser;
  if (!user) {
    return null;
  }

  const id = user.uid;
  console.log("@id", id);
  const q = query(collection(db, "users"), where("auth", "==", id));
  const querySnapshot = await getDocs(q);

  const userDoc = toArray(querySnapshot)[0];
  if (!userDoc) return null;
  const userData = userDoc.data() as IUser;
  return { ...userData, id: userDoc.id };
}

const userThunk = createAsyncThunk<IUser | null, undefined, {}>(
  "user/fetchUser",
  fetchUser
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userThunk.pending, (state) => {})
      .addCase(userThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        console.log("@set user", action.payload);
      })
      .addCase(userThunk.rejected, (state, action) => {
        console.log("@user/reject", action);
      });
  },
});
export { userThunk };
export default userSlice.reducer;
