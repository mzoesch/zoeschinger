import styles from '@s/projects/badapple/main.module.scss';
import text_styles from '@s/text/main.module.scss';
import basic_layout_styles from '@s/projects/basic_layout.module.scss';

import Link from 'next/link';

const BadApple = () => {
  return (
    <>
      <div className={basic_layout_styles.wrapper}>
        <div className={basic_layout_styles.main}>
          <div className={basic_layout_styles.top_wrapper}>
            <h1 className={text_styles.title}>Bad Apple</h1>
            <div className={basic_layout_styles.top_information}>
              View source code{' '}
              <Link
                href='https://www.github.com/mzoesch/BadApple'
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
              A Bad Apple video player written in Python. Just for fun. See the
              original{' '}
              <Link
                href='https://www.youtube.com/watch?v=FtutLA63Cp8'
                target='_blank'
                className={text_styles.link}
              >
                here
              </Link>
              . The video is played in the terminal using ANSI escape codes.
            </div>
          </div>
          <div>
            <h2 className={text_styles.subtitle}>
              Preview of{' '}
              <Link
                href='https://github.com/mzoesch/BadApple/blob/master/ba_v3.py'
                className={text_styles.link}
                target='_blank'
              >
                v3
              </Link>
            </h2>
            <iframe
              width='560'
              height='315'
              src='https://www.youtube.com/embed/oX1Oq-ycfUk'
              title='YouTube video player'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BadApple;
