const colors = [
  "#475B63",
  "#54428E",
  "#883677",
  "#403D39",
  "#54494B",
  "#395B50",
  "#415A77",
] as const;
export type TColor = (typeof colors)[number];

export function pickRandomColor(): TColor {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}
