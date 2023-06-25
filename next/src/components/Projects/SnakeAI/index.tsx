import text_styles from '@s/text/main.module.scss';
import basic_layout_styles from '@s/projects/basic_layout.module.scss';

import Link from 'next/link';

const SnakeAI = () => {
  return (
    <>
      <div className={basic_layout_styles.wrapper}>
        <div className={basic_layout_styles.main}>
          <div className={basic_layout_styles.top_wrapper}>
            <h1 className={text_styles.title}>Snake AI</h1>
            <div className={basic_layout_styles.top_information}>
              View source code{' '}
              <Link
                href='https://github.com/mzoesch/zoeschinger/tree/master/next/src/lib/projects'
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
              Snakes can still bite you besides being legless.
            </div>
            <div className={text_styles.paragraph}>
              This is a collection of snake games with different AI
              implementations. Well, currently with no AI 🙃.
            </div>
          </div>
          <div>
            <h2 className={text_styles.subtitle}>Versions</h2>
            <div>
              <h3
                className={text_styles.subtitle}
                style={{ marginTop: '2rem' }}
              >
                Playable version
              </h3>
              <div className={text_styles.text}>
                <div className={text_styles.paragraph}>
                  This is a playable version from snake. No AI and other stuff.
                </div>
                <div className={text_styles.paragraph}>
                  Check it out{' '}
                  <Link
                    href='/projects/demo/snakeai-playable'
                    className={text_styles.link}
                  >
                    here
                  </Link>
                  .
                </div>
              </div>
            </div>
            <div>
              <h3
                className={text_styles.subtitle}
                style={{ marginTop: '2rem' }}
              >
                AI versions
              </h3>
              <div>
                <h4
                  className={text_styles.subtitle}
                  style={{ marginTop: '1rem' }}
                >
                  Hamiltonian cycle
                </h4>
                <div className={text_styles.text}>
                  <div className={text_styles.paragraph}>
                    Also no AI, but I put it here to feel better. The snake
                    follows somewhat a hamiltonian cycle.
                  </div>
                  <div className={text_styles.paragraph}>
                    Check it out{' '}
                    <Link
                      href='/projects/demo/snakeai-hamiltonian-cycle'
                      className={text_styles.link}
                    >
                      here
                    </Link>
                    .
                  </div>
                </div>
              </div>
              <div>
                <h4
                  className={text_styles.subtitle}
                  style={{ marginTop: '1rem' }}
                >
                  Q learning
                </h4>
                <div className={text_styles.text}>
                  <div className={text_styles.paragraph}>in progress</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SnakeAI;
