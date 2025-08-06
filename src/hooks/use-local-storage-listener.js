import { useEffect, useState } from 'react';

export const useLocalStorageListener = (key, defaultValue = null) => {
  const readValue = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${ key }":`, error);
      return defaultValue;
    }
  };

  const [value, setValue] = useState(readValue);

  useEffect(() => {
    const handleChange = () => {
      setValue(readValue());
    };

    window.addEventListener('local-storage', handleChange); // same tab
    window.addEventListener('storage', handleChange);       // across tabs

    return () => {
      window.removeEventListener('local-storage', handleChange);
      window.removeEventListener('storage', handleChange);
    };
  }, [key]);

  return value;
};
