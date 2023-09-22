import styles from '@s/dashboard/main.module.scss';
import text_styles from '@s/text/main.module.scss';

import Link from 'next/link';

import { Quicksand } from 'next/font/google';

const quicksand = Quicksand({ subsets: ['latin'] });

const Dashboard = () => {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.wrapper}>
          <h1 className={quicksand.className}>🚧 WiP 🚧</h1>
        </div>
        <div className={styles.sub}>
          <h2 className={text_styles.text}>
            See the legacy Dashboard{' '}
            <span className={text_styles.link}>
              <Link
                className={styles.footer_link}
                href={'https://zoeschinger.de/legacy/dashboard'}
              >
                here
              </Link>
            </span>
            .
          </h2>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
