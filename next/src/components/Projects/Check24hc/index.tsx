import text_styles from '@s/text/main.module.scss';
import basic_layout_styles from '@s/projects/basic_layout.module.scss';

import Link from 'next/link';

const Check24hc = () => {
  return (
    <>
      <div className={basic_layout_styles.wrapper}>
        <div className={basic_layout_styles.main}>
          <div className={basic_layout_styles.top_wrapper}>
            <h1 className={text_styles.title}>Check 24 Holiday Challenge</h1>
            <div className={basic_layout_styles.top_information}>
              View source code{' '}
              <Link
                href='https://github.com/mzoesch/zoeschinger/tree/master/app/lib/c24hc_main.py'
                target='_blank'
                className={text_styles.link}
              >
                here
              </Link>
              .
            </div>
          </div>
          <div className={text_styles.text}>
            <div className={text_styles.paragraph}>
              This is my implementation from the Check 24 Holiday Challenge from
              autumn 2023. You can view the demo{' '}
              <Link
                href='/projects/demo/check24hc'
                className={text_styles.link}
              >
                here
              </Link>
              .
            </div>
            <div className={text_styles.paragraph}>
              You can view the original repository from Check 24{' '}
              <Link
                href='https://github.com/check24-scholarships/holiday-challenge'
                target='_blank'
                className={text_styles.link}
              >
                here
              </Link>
              .
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Check24hc;
