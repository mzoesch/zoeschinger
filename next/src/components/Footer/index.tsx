import styles from '@s/footer/main.module.scss';
import text_styles from '@s/text/main.module.scss';

import Link from 'next/link';

const Footer = () => {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.copyright}>
          ©2023 Magnus Zoeschinger (mzoesch). All rights reserved.
        </div>
        <div className={styles.links}>
          <div className={styles.link_section}>
            <Link
              href='https://api.zoeschinger.com/'
              target='_blank'
              className={styles.link}
            >
              API
            </Link>
            <Link
              href='https://api.zoeschinger.com/redoc'
              target='_blank'
              className={styles.link}
            >
              API docs
            </Link>
            <Link
              href='https://api.zoeschinger.com/docs'
              target='_blank'
              className={styles.link}
            >
              interactive API docs
            </Link>
          </div>
          <div className={styles.link_section}>
            <Link href='/disclaimer' className={styles.link}>
              disclaimer
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
