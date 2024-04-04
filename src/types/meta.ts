import { TCategory } from "./options";

interface IAuthor {
  name: string;
}

interface IFont {
  id: string;
  family: string;
  content_id: string;
  tags: string[];
  status: "pending" | "published" | "hidden" | "deleted";
  category: TCategory;
  styles: string[];
  designers: IAuthor[];
  popularity: number;
}

interface IMeta {
  fonts: IFont[];
  length: number;
}

// type ILoaded = boolean[];

export type { IAuthor, IFont, IMeta };
