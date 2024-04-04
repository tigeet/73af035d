import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import MultiSelect, { TOption } from "./multiSelect";

const meta = {
  title: "MultiSelect",
  component: MultiSelect,
  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],
} satisfies Meta<typeof MultiSelect>;

export default meta;

const mockOptions: TOption[] = [
  { value: "Inert Salsoto", color: "#415A77" },
  { value: "Broken Keel", color: "#54494B" },
];

export const Primary = () => {
  const [options, setOptions] = useState(mockOptions);

  return (
    <MultiSelect
      options={options}
      onAdd={(option) => setOptions((options) => [...options, option])}
    />
  );
};
