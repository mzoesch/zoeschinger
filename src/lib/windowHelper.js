import { useEffect } from 'react';

/**
 * @param {function} func
 * @returns {void}
 * @description
 * Helper function to check if window is defined
 */
const Parser = (func) => {
  function exec(func) {
    if (typeof func === 'function') func();
  }

  useEffect(() => {
    typeof window != undefined ? exec(func) : null;

    return () => {};
  });
};

export { Parser };
