function numberFormatter(amount: number): string {
  return amount + " " + (amount === 1 ? "style" : "styles");
}

function designersFormatter(designers: string[]) {
  if (designers.length < 3)
    return (
      <>
        {"by "}
        <span className="selected">{designers.join(", ")}</span>
      </>
    );

  return (
    <>
      {"by "}
      <span className="selected">{designers.slice(0, 2).join(", ")}</span>
      <span title={designers.join(", ")}>{` and ${
        designers.length - 2
      } more`}</span>
    </>
  );
}

function tagsFormatter(tags: string[]): JSX.Element {
  if (tags.length < 4)
    return <span className="selected">{tags.join(", ")}</span>;

  return (
    <>
      <span className="selected">{tags.slice(0, 3).join(", ")}</span>
      <span title={tags.join(", ")}>{` and ${tags.length - 3} more`}</span>
    </>
  );
}

function parseWeight(s: string) {
  const pattern = /(\d+)(\w?)/;
  const match = s.match(pattern);
  const weight: number = parseInt(match![1]);
  const isItalic: boolean = !!match![2];

  let type = "";
  if (weight === 100) type = "Thin";
  if (weight === 200) type = "Extra Light";
  if (weight === 300) type = "Light";
  if (weight === 400) type = "Regular";
  if (weight === 500) type = "Medium";
  if (weight === 600) type = "SemiBold";
  if (weight === 700) type = "Bold";
  if (weight === 800) type = "ExtraBold";
  if (weight >= 900) type = "Black";

  return `${type} ${weight} ${isItalic ? "Italic" : ""}`;
}
export { tagsFormatter, numberFormatter, designersFormatter, parseWeight };
