import styles from '@s/projects/zoeschinger/main.module.scss';
import text_styles from '@s/text/main.module.scss';
import basic_layout_styles from '@s/projects/basic_layout.module.scss';

import { Projects_Zoeschinger_TechStack } from '@c/svg';

import Link from 'next/link';

const Zoeschinger = () => {
  return (
    <>
      <div className={basic_layout_styles.wrapper}>
        <div className={basic_layout_styles.main}>
          <div className={basic_layout_styles.top_wrapper}>
            <h1 className={text_styles.title}>This website</h1>
            <div className={basic_layout_styles.top_information}>
              View source code{' '}
              <Link
                href='https://github.com/mzoesch/zoeschinger'
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
              Just a website to showcase my projects and other things I&apos;ve
              done.
            </div>
          </div>
          <div>
            <h2 className={text_styles.subtitle}>Tech Stack</h2>
            <div
              style={{
                backgroundColor: 'white',
                width: 'calc(100% - 2rem)',
                height: '100%',
                padding: '1rem',
              }}
            >
              <Projects_Zoeschinger_TechStack
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Zoeschinger;
