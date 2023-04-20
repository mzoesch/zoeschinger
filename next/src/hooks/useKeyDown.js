import { useEffect } from 'react';

const useKeyDown = (handler, deps = []) => {
  useEffect(() => {
    document.addEventListener('keydown', handler);

    return () => {
      document.removeEventListener('keydown', handler);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useKeyDown;
