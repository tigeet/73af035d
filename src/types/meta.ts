import { TCategory } from "./options";

interface IUser {
  id: string;
  name: string;
  auth: string;
  role: "author" | "admin" | "user";
}

interface IFont {
  id: string;
  family: string;
  content_id: string;
  tags: string[];
  status: "pending" | "published" | "hidden" | "deleted";
  category: TCategory;
  styles: string[];
  designers: IUser[];
  popularity: number;
}

interface IMeta {
  fonts: IFont[];
  length: number;
}

// type ILoaded = boolean[];

export type { IUser, IFont, IMeta };
