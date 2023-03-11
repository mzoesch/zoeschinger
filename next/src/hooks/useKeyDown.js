import { useEffect } from 'react';

const useKeyDown = (handler, deps = []) => {
  useEffect(() => {
    document.addEventListener('keydown', handler);

    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, [deps, handler]);
};

export { useKeyDown };
