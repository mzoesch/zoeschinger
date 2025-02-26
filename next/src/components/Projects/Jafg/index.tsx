import text_styles from '@s/text/main.module.scss';
import basic_layout_styles from '@s/projects/basic_layout.module.scss';
import Link from 'next/link';

const Jafg = () => {
  return (
    <>
      <div className={basic_layout_styles.wrapper}>
        <div className={basic_layout_styles.main}>
          <div className={basic_layout_styles.top_wrapper}>
            <h1 className={text_styles.title}>Jafg</h1>
            <div className={basic_layout_styles.top_information}>
              View source code{' '}
              <Link
                href='https://github.com/mzoesch/S-Jafg'
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
              Jafg is a modular voxel based game / engine written in C/C++ and GoLang. It currently runs natively on Windows
              and crosscompiles to WebAssembly
              via <Link href={'https://emscripten.org/'} className={text_styles.link}>Emscripten</Link> so
              that it can be played on the browser aswell.
            </div>
            <div className={text_styles.paragraph}>
                You can play Jafg <Link href={'https://api.zoeschinger.com/static/Jafg/Runtime.html'} className={text_styles.link}>here</Link>.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Jafg;
