import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';

function GetCurrentRoute() {
  const router = useRouter();
  const [r, setR] = useState('');

  useEffect(() => {
    const temp = router.asPath;
    setR(temp);
  }, [router.asPath]);

  return r;
}

const Four0Four = () => {
  let route = GetCurrentRoute();

  return (
    <>
      <div
        className='
      bg-primaryLight
      dark:bg-primary
      flex justify-center items-center
      min-h-screen h-screen      
      '
      >
        <div
          className='
          gird
          grid-cols-1

          mx-10
          text-4xl
          text-gray-700 dark:text-slate-300
          '
        >
          <div className='text-7xl flex justify-center mb-20'>
            <h1>Whooops</h1>
          </div>
          <div className='flex justify-center text-center'>
            <h2>
              It looks like{' '}
              <span
                className='
              animate-magic_background
              bg-[length:200%_100%] h-[3.4rrem]

              text-transparent bg-clip-text
              bg-gradient-to-r from-purple-700 via-pink-500 to-purple-700
              '
              >
                {route}
              </span>{' '}
              went missing in the matrix
            </h2>
          </div>

          {/* Mobile view */}
          <div className='block sm:hidden items-center mt-32 text-lg'>
            <div className='text-left'>
              <h3
                className='
              underline text-blue-500
              '
              >
                <Link href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'>
                  Take me back, where I belong
                </Link>
              </h3>
            </div>
            <div className='text-left mt-20'>
              <h3>
                Learn more about{' '}
                <span
                  className='
                  text-blue-500 underline
                '
                >
                  <Link
                    href='https://en.wikipedia.org/wiki/HTTP_404'
                    target='_blank'
                  >
                    error 404
                  </Link>
                </span>
              </h3>
            </div>
          </div>

          {/* Desktop view */}
          <div className='hidden sm:flex justify-around items-center mt-96 text-lg'>
            <div className='text-left'>
              <h3>
                Learn more about{' '}
                <span
                  className='
                  text-blue-500 underline
                '
                >
                  <Link
                    href='https://en.wikipedia.org/wiki/HTTP_404'
                    target='_blank'
                  >
                    error 404
                  </Link>
                </span>
              </h3>
            </div>
            <div className='text-right'>
              <h3
                className='
              underline text-blue-500
              '
              >
                <Link href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'>
                  Take me back, where I belong
                </Link>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Four0Four;
