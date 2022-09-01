type TSort = "trending" | "most Popular" | "newest" | "name";
type TDisplayType = "grid" | "block";

type TCategory =
  | null
  | "Serif"
  | "Sans Serif"
  | "Display"
  | "Handwriting"
  | "Monospace";
// type CategoriesState = {
//   [key in TCategory]: boolean;
//   // [key: string]: boolean;
// };

interface IOptions {
  search: string;
  template: string;
  fontSize: number;
  categories: TCategory[]; // CategoriesState, mb change to array if categories
  language: string;
  onlyVariable: boolean;
  sort: TSort;
  display: TDisplayType;
}

export type { IOptions, TCategory, TDisplayType, TSort };
