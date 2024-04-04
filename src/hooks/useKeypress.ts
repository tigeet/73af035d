import { useCallback, useEffect, useMemo } from "react";

type UseKeyPressProps = {
  key: string | string[];
  callback: (key: string) => void;
};

const useKeyPress = ({ key, callback }: UseKeyPressProps) => {
  const keys = useMemo(() => (Array.isArray(key) ? key : [key]), [key]);

  const handleKeyPress = useCallback(
    (ev: KeyboardEvent) => {
      if (keys.includes(ev.key)) {
        callback(ev.key);
      }
    },
    [callback, keys]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);
};

export default useKeyPress;
