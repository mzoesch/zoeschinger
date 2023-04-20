// Just for reference
// Do not use - unsafe file

import { useEffect, useState } from 'react';

const LOCAL_STORAGE_KEY = 'snake-ai-demo-noai-stats-highscore';

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      console.log('Key: ', key);
      const item = window.localStorage.getItem(key);

      console.log('Item: ', item);

      if (typeof item === 'undefined' || item === null) {
        console.log(
          'Item is undefined. Returning initial value ',
          initialValue
        );
        return initialValue;
      }

      console.log('Returning parsed item: ', JSON.parse(item));
      return JSON.parse(item);
    } catch (error) {
      /* Will always throw on server side */
      // console.log(error);

      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      console.log('Try to store');
      console.log('stored: ', storedValue, ' toStore: ', valueToStore);

      if (storedValue > valueToStore) {
        console.log('Not storing');
        return;
      }

      console.log('Storing');

      setStoredValue(999);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      console.log('stored: ', storedValue, ' toStore: ', valueToStore);

      return;
    } catch (error) {
      console.log(error);
      alert(error);

      return;
    }

    return;
  };

  return [storedValue, setValue];
};

const useSnakeAIDemo_NoAIStats = (initialValue) => {
  const [highscore, setHighscore] = useLocalStorage(
    LOCAL_STORAGE_KEY,
    initialValue
  );

  return [highscore, setHighscore];
};

export default useSnakeAIDemo_NoAIStats;
