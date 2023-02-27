import { useEffect, useState } from 'react';

/**
 * @param {function} func
 * @returns {}
 * @description
 * Helper function to check if document is defined
 */
const Parser = (func) => {
  const [value, setValue] = useState(null);

  function exec(func) {
    if (typeof func === 'function') setValue(func());
  }

  useEffect(() => {
    typeof document !== undefined ? exec(func) : null;

    return () => {};
  }, [func]);

  return value ?? null;
};

export { Parser };
