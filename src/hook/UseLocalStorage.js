import { useEffect, useState } from "react";

const PREFIX = "LIVE-CODE-EDITOR-";

export default function useLocalStorage(key, initialValue) {
  const prefixedKey = PREFIX + key;

  const [value, setValue] = useState(() => {
    const LocalItem = localStorage.getItem(prefixedKey);
    if (LocalItem != null) return JSON.parse(LocalItem);

    if (typeof initialValue === "function") {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
}
