import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

function GetCurrentRoute() {
  const router = useRouter('');
  const [r, setR] = useState('');

  useEffect(() => {
    setR(router.asPath);
  }, [router.asPath]);

  return r;
}

export { GetCurrentRoute };
