import styles from '@s/dashboard/main.module.scss';
import text_styles from '@s/text/main.module.scss';

import { useRef, useEffect, useState } from 'react';

import triggerAnim from '@l/dashboardFixTSExportErrorAnime';
import Navbar from '@c/Navbar';
import Footer from '@c/Footer';

import { Dancing_Script } from 'next/font/google';

const dancingScript = Dancing_Script({ subsets: ['latin'] });

class Effect {
  columns: number;
  rows: number;
  tileSize: number;
  toggled: boolean;
  canPlayAgain: boolean;

  CLASS_LIST_ELEMENT_TOGGLE: string = 'toggled';
  CLASS_LIST_ELEMENT_TILE: string = 'tile';

  // TODO: Animation will reset if values are different,
  // TODO: fixed by pausing animation on toggle
  BACKGROUND_PAN_LENGTH_TOGGLED: number = 20;
  BACKGROUND_PAN_LENGTH_UNTOGGLED: number = 20;

  FRONT_FADE_DURATION_IN_MS: number = 1300;
  BACK_FADE_DURATION_IN_MS: number = 1300;

  constructor() {
    this.columns = 0;
    this.rows = 0;
    this.tileSize = 0;
    this.toggled = false;
    this.canPlayAgain = true;
  }
}

const Dashboard = () => {
  const main = useRef<HTMLDivElement>(null);
  const tiles = useRef<HTMLDivElement>(null);
  const [
    effect,
    PLEASE_DO_NOT_USE_THIS_VARIABLE_IN_YOUR_CODE_OR_YOU_WILL_BE_FIRED_AND_WILL_BE_FORCED_TO_WORK_IN_A_SOFTWARE_COMPANY_IN_INDIA,
  ] = useState<Effect>(new Effect());
  const [stateToggle, setStateToggle] = useState<boolean>(effect.toggled);
  const [displayFront, setDisplayFront] = useState<boolean>(true);
  const [fadeFront, setFadeFront] = useState<boolean>(false);
  const [fadeBack, setFadeBack] = useState<boolean>(true);
  const [displayBack, setDisplayBack] = useState<boolean>(false);

  useEffect(() => {
    const createGrid = () => {
      const createTiles = (quantity: number) => {
        const createTile = (index: number) => {
          const handleOnClick = (index: number) => {
            const toggle = () => {
              effect.toggled = !effect.toggled;
              main.current?.classList.toggle(effect.CLASS_LIST_ELEMENT_TOGGLE);
            };

            if (effect.canPlayAgain === false) return;
            effect.canPlayAgain = false;

            toggle();
            triggerAnim(effect, index, main);
            setStateToggle(effect.toggled);

            effect.toggled
              ? setTimeout(
                  () => setDisplayFront(false),
                  effect.FRONT_FADE_DURATION_IN_MS
                )
              : setDisplayFront(true);

            effect.toggled
              ? setFadeFront(true)
              : setTimeout(
                  () => setFadeFront(false),
                  effect.FRONT_FADE_DURATION_IN_MS
                );

            effect.toggled
              ? setDisplayBack(true)
              : setTimeout(
                  () => setDisplayBack(false),
                  effect.BACK_FADE_DURATION_IN_MS
                );

            effect.toggled
              ? setTimeout(
                  () => setFadeBack(false),
                  effect.BACK_FADE_DURATION_IN_MS
                )
              : setFadeBack(true);
          };

          const tile = document.createElement('div');
          tile.className = styles.tile;
          tile.classList.add(effect.CLASS_LIST_ELEMENT_TILE);
          tile.style.opacity = effect.toggled ? '0' : '1';

          tile.addEventListener('click', () => handleOnClick(index));

          return tile;
        };

        Array.from(Array(quantity)).map((_, index) => {
          tiles.current?.appendChild(createTile(index));
        });
      };

      effect.tileSize = document.body?.clientWidth > 800 ? 50 : 25;

      effect.columns = Math.floor(document.body?.clientWidth / effect.tileSize);
      effect.rows = Math.floor(document.body?.clientHeight / effect.tileSize);

      tiles.current?.style.setProperty('--columns', effect.columns.toString());
      tiles.current?.style.setProperty('--rows', effect.rows.toString());

      createTiles(effect.columns * effect.rows);
      main.current?.style.setProperty(
        '--time',
        `${effect.BACKGROUND_PAN_LENGTH_UNTOGGLED}s`
      );
    };

    createGrid();

    window.addEventListener('resize', () => createGrid());

    return () => {
      window.removeEventListener('resize', () => createGrid());
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        ref={main}
        className={styles.main}
        style={
          stateToggle
            ? {
                animationPlayState: 'paused',
              }
            : {
                animationPlayState: 'running',
              }
        }
      >
        <div ref={tiles} className={styles.tiles} />
      </div>
      <div
        className={styles.back_wrapper}
        style={
          displayBack
            ? fadeBack
              ? {
                  opacity: '0',
                  display: 'block',
                }
              : {
                  opacity: '1',
                  display: 'block',
                }
            : {
                display: 'none',
              }
        }
      >
        <h1>Dashboard</h1>
        <div style={{ color: 'white' }}>
          <div className={text_styles.paragraph}>content tbd</div>
        </div>
      </div>
      <div
        className={styles.back_navbar}
        style={
          displayBack
            ? fadeBack
              ? {
                  opacity: '0',
                  display: 'block',
                }
              : {
                  opacity: '1',
                  display: 'block',
                }
            : {
                display: 'none',
              }
        }
      >
        <Navbar />
      </div>
      <div
        className={styles.back_footer}
        style={
          displayBack
            ? fadeBack
              ? {
                  opacity: '0',
                  display: 'block',
                }
              : {
                  opacity: '1',
                  display: 'block',
                }
            : {
                display: 'none',
              }
        }
      >
        <Footer />
      </div>
      <h1
        className={styles.front_text}
        style={
          displayFront
            ? fadeFront
              ? {
                  opacity: '0',
                  display: 'block',
                }
              : {
                  opacity: '1',
                  display: 'block',
                }
            : {
                display: 'none',
              }
        }
      >
        Welcome to my{' '}
        <span
          className={styles.very_intense_fancy_text}
          style={dancingScript.style}
        >
          dashboard
        </span>
        .
      </h1>
    </>
  );
};

export default Dashboard;
