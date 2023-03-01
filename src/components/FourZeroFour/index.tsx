import styles from '@s/FourZeroFour/main.module.scss';

import { GetCurrentRoute } from '@l/Routes';
import { Quicksand } from 'next/font/google';

const quicksand = Quicksand({ subsets: ['latin'] });

const Page = () => {
  const route = GetCurrentRoute();

  return (
    <>
      <div className={styles.main}>
        <h1 className={quicksand.className}>Whooooops</h1>
        <div className={styles.sub}>
          <h2>
            It looks like <span className={styles.magic_text}>{route}</span>{' '}
            went missing in the matrix 😖
          </h2>
        </div>
      </div>
    </>
  );
};

export default Page;
