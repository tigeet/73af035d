import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, db } from "fb";
import {
  QueryDocumentSnapshot,
  QuerySnapshot,
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
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
  console.log("", user?.photoURL);
  if (!user) {
    return null;
  }

  const id = user.uid;

  const q = query(collection(db, "users"), where("auth", "==", id));
  const querySnapshot = await getDocs(q);

  const userDocs = toArray(querySnapshot);

  const userDoc = userDocs[0];
  if (!userDoc) {
    const userData: Omit<IUser, "id"> = {
      name: user.displayName ?? user.email ?? "guest",
      auth: user.uid,
      role: "user",
    };
    console.log("@create user", userData);
    const docRef = await addDoc(collection(db, "users"), userData);

    return { ...userData, id: docRef.id };
  }
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
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userThunk.pending, (state) => {})
      .addCase(userThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        console.log("@set user", action.payload);
      })
      .addCase(userThunk.rejected, (state, action) => {});
  },
});
export { userThunk };
export const { logout } = userSlice.actions;
export default userSlice.reducer;
