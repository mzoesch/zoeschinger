import styles from '@s/FourZeroFour/main.module.scss';
import Link from 'next/link';

import { GetCurrentRoute } from '@l/Routes';
import { Quicksand } from 'next/font/google';

const quicksand = Quicksand({ subsets: ['latin'] });

const Page = () => {
  const route = GetCurrentRoute();

  return (
    <>
      <div className={styles.main}>
        <div className={styles.whooooops}>
          <h1 className={quicksand.className}>Whooooops</h1>
        </div>
        <div className={styles.sub}>
          <h2>
            It looks like <span className={styles.magic_text}>{route}</span>{' '}
            went missing in the matrix 😖
          </h2>
        </div>
        <div className={styles.footer}>
          <div className={styles.footer_text}>
            Learn more about{' '}
            <span>
              <Link
                className={styles.footer_link}
                href={'https://en.wikipedia.org/wiki/HTTP_404'}
                target='_blank'
              >
                error 404
              </Link>
            </span>
          </div>
          <div className={styles.footer_text}>
            <Link
              className={styles.footer_link}
              href={'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}
            >
              Take me back, where I belong
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
