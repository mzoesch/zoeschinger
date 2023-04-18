import { useEffect } from 'react';

const useImgPref = (image) => {
  useEffect(() => {
    const localPref = image;

    const handleOnClick = () => {
      // TODO: Port to useMediaQuery hook
      if (window.matchMedia('all and (max-width: 640px)').matches)
        window.open(localPref.current.src, '').focus();

      return;
    };

    localPref.current?.addEventListener('click', handleOnClick);

    return () => {
      localPref.current?.removeEventListener('click', handleOnClick);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useImgPref;
