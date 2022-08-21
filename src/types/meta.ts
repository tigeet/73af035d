import { TCategory } from "./options";

interface IThickness {
  [thickness: string]: {
    thickness: null | number;
    slant: null | number;
    width: null | number;
    lineHeight: null | number;
  };
}

interface IFont {
  id: number;
  family: string;
  subsets: string[];
  category: TCategory;
  fonts: IThickness;
  designers: string[];
  popularity: number;
}

interface IMeta {
  fonts: IFont[];
  length: number;
  isLoaded: boolean;
}

// type ILoaded = boolean[];

export type { IFont, IMeta };
