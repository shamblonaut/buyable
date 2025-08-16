import { useEffect, useState } from "react";

const useLocalStorage = (name, initialValue = null) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(name);
    return storedValue !== null ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(name, JSON.stringify(value));
  }, [name, value]);

  return [value, setValue];
};

export default useLocalStorage;
