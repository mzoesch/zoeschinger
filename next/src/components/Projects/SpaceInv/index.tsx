import styles from '@s/projects/spaceinv/main.module.scss';
import text_styles from '@s/text/main.module.scss';
import basic_layout_styles from '@s/projects/basic_layout.module.scss';

import Link from 'next/link';

const SAlgo = () => {
  return (
    <>
      <div className={basic_layout_styles.wrapper}>
        <div className={basic_layout_styles.main}>
          <div className={basic_layout_styles.top_wrapper}>
            <h1 className={text_styles.title}>Space Invaders</h1>
            <div className={basic_layout_styles.top_information}>
              View source code{' '}
              <Link
                href='https://www.github.com/mzoesch/Planet_Attacked'
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
              Due to very high security standards, this project is completely
              undocumented. The only thing I can say is that it is a shitty
              game. And I mean it. It is a shitty game. I am not proud of it.
            </div>
            <div className={text_styles.paragraph}>
              But I am proud of the fact that I made it. I am proud of the fact
              that I made it in 2 days (edit: thats definitely totally true). I
              am proud of the fact that I made it with a shitty language. I am
              proud of the fact that I made it without any help. I am proud of
              the fact that I made it without any knowledge of the language. I
              am proud of the fact that I made it without any knowledge of the
              language. I am proud of the fact that I made it without any
              knowledge of the language. I am proud of the fact that I made it
              without any knowledge of the language. I am proud of the fact that
              I made it without any knowledge of the language. I am proud of the
              fact that I made it without any knowledge of the language. I am
              proud of the fact that I made it ...
            </div>
            <div className={text_styles.signed}>
              <div>
                Yea, I think GitHub Copilot kinda messed up the above text here
                and ended in an infinite loop.
              </div>
              <div>
                I just wrote the first sentence and well - ty for that weird
                front.
              </div>
            </div>
          </div>
          <div>
            <h2 className={text_styles.subtitle}>
              Very high intense gameplay demo
            </h2>
            <iframe
              width='560'
              height='315'
              src='https://www.youtube.com/embed/G9BBEeAD4bo'
              title='High intense space invaders - planet attacked gameplay demo'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SAlgo;
