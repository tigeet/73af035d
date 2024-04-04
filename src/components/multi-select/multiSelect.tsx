import useKeyPress from "hooks/useKeypress";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import "./multiSelect.css";
import Option from "./option/option";
import Suggestions from "./suggestions/suggestions";
import { TColor, pickRandomColor } from "./utils/color";

export type TOption = string;

type MultiSelectProps = {
  options: readonly TOption[];
  onAdd: (option: TOption) => void;
  selected: TOption[];
  setSelected: (fn: (selected: TOption[]) => TOption[]) => void;
};
const MultiSelect = ({
  options,
  onAdd,
  selected,
  setSelected,
}: MultiSelectProps) => {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [opened, setOpened] = useState(false);
  const [suggestionColor, setSuggestionColor] = useState(pickRandomColor());
  // const [selected, setSelected] = useState<TOption[]>([]);
  const [search, setSearch] = useState<string>("");

  const [suggestionIndex, setSuggestionIndex] = useState<number | undefined>(
    undefined
  );

  const suggestions = useMemo(
    () => options.filter((option) => option.includes(search)),
    [options, search]
  );
  useEffect(() => {
    if (opened) {
      searchRef.current?.focus();
    }
  }, [opened]);

  const handleDecreaseSuggestionIndex = useCallback(() => {
    setSuggestionIndex((index) => {
      if (index === undefined) return index;
      if (index === 0) return index;
      return index - 1;
    });
  }, []);

  const handleIncreaseSuggestionIndex = useCallback(() => {
    const lastIndex = search ? suggestions.length : suggestions.length - 1;
    setSuggestionIndex((index) => {
      if (index === undefined) return 0;
      if (index === lastIndex) return index;
      return index + 1;
    });
  }, [search, suggestions.length]);

  useKeyPress({
    key: "ArrowDown",
    callback: handleIncreaseSuggestionIndex,
  });

  useKeyPress({
    key: "ArrowUp",
    callback: handleDecreaseSuggestionIndex,
  });

  const handleOpen = useCallback(() => {
    setOpened(true);
    setSuggestionIndex(undefined);
    setSuggestionColor(pickRandomColor());
    setSearch("");
  }, []);

  const handleClose = useCallback(() => setOpened(false), []);
  const handleSelect = useCallback(
    (optionToAdd: TOption) => {
      if (selected.find((option) => option === optionToAdd)) {
        return;
      }

      setSelected((selected) => [...selected, optionToAdd]);
      searchRef.current?.focus();
    },
    [selected, setSelected]
  );

  const handleSetSearch = useCallback((search: string) => {
    setSearch(search);
    setSuggestionIndex(search === "" ? undefined : 0);
  }, []);
  const handleSelectById = useCallback(
    (value: string) => {
      const optionToAdd = options.find((option) => option === value);
      if (!optionToAdd) {
        return;
      }
      handleSelect(optionToAdd);
    },
    [handleSelect, options]
  );

  const handleDeselect = useCallback(
    (value: string) => {
      setSelected((selected) => selected.filter((option) => option !== value));
      searchRef.current?.focus();
    },
    [setSelected]
  );

  const handleCreate = useCallback(
    (value: string, color?: TColor) => {
      if (options.find((option) => option === value)) {
        return;
      }
      const option: TOption = value;
      onAdd(option);
      handleSelect(option);
      handleSetSearch("");
    },
    [onAdd, handleSelect, handleSetSearch, options]
  );
  useKeyPress({
    key: "Escape",
    callback: handleClose,
  });

  const handleEnterPress = useCallback(() => {
    if (suggestionIndex === undefined) {
      return;
    }
    const lastIndex = suggestions.length;
    if (suggestionIndex === lastIndex) {
      handleCreate(search, suggestionColor);
    } else {
      handleSelect(suggestions[suggestionIndex]);
    }
  }, [
    handleCreate,
    handleSelect,
    search,
    suggestionColor,
    suggestionIndex,
    suggestions,
  ]);
  useKeyPress({
    key: "Enter",
    callback: handleEnterPress,
  });

  return (
    <div className="multiSelect">
      <div className="displayed" onClick={handleOpen}>
        {selected.map((option) => (
          <Option key={option} value={option} />
        ))}
      </div>

      {opened && (
        <div className="modal">
          <div className="chosenOptions">
            {selected.map((option) => (
              <Option key={option} value={option} onDelete={handleDeselect} />
            ))}

            <input
              ref={searchRef}
              value={search}
              placeholder={selected.length > 0 ? "" : "Search for an option"}
              onChange={(e) => handleSetSearch(e.target.value)}
            />
          </div>

          <Suggestions
            search={search}
            color={suggestionColor}
            options={suggestions}
            selected={suggestionIndex}
            onSelect={(index) => setSuggestionIndex(index)}
            onSubmit={handleSelectById}
            onCreate={(value) => handleCreate(value)}
          />
        </div>
      )}
    </div>
  );
};

export default memo(MultiSelect);
