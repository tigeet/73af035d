type Sort = "trending" | "most Popular" | "newest" | "name";
type TDisplayType = "grid" | "block";

type TCategory =
  | "Serif"
  | "Sans Serif"
  | "Display"
  | "Handwriting"
  | "Monospace";
type CategoriesState = {
  [key in TCategory]: boolean;
  // [key: string]: boolean;
};

interface IParams {
  search: string;
  template: string;
  fontSize: number;
  categories: CategoriesState; // mb change to array if categories
  language: string;
  onlyVariable: boolean;
  sort: Sort;
  display: TDisplayType;
}

export type { TCategory, IParams, TDisplayType };
