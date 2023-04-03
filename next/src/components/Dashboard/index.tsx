import styles from '@s/dashboard/main.module.scss';
import text_styles from '@s/text/main.module.scss';

import { useRef, useEffect, useState } from 'react';

class Effect {
  columns: number;
  rows: number;
  tileSize: number;
  toggled: boolean;

  CLASS_LIST_ELEMENT_TOGGLE = 'toggled';

  constructor() {
    this.columns = 0;
    this.rows = 0;
    this.tileSize = 0;
    this.toggled = false;
  }
}

const Dashboard = () => {
  const tiles = useRef<HTMLDivElement>(null);
  const [
    effect,
    PLEASE_DO_NOT_USE_THIS_VARIABLE_IN_YOUR_CODE_OR_YOU_WILL_BE_FIRED_AND_WILL_BE_FORCED_TO_WORK_IN_A_SOFTWARE_COMPANY_IN_INDIA,
  ] = useState<Effect>(new Effect());

  useEffect(() => {
    const createGrid = () => {
      const createTiles = (quantity: number) => {
        const createTile = (index: number) => {
          const handleOnClick = (index: number) => {
            const toggle = () => {
              effect.toggled = !effect.toggled;
              tiles.current?.classList.toggle(effect.CLASS_LIST_ELEMENT_TOGGLE);
            };

            toggle();
          };

          const tile = document.createElement('div');
          tile.className = styles.tile;
          tile.style.opacity = effect.toggled ? '0' : '1';

          tile.addEventListener('click', () => handleOnClick(index));

          return tile;
        };

        Array.from(Array(quantity)).map((_, index) => {
          tiles.current?.appendChild(createTile(index));
        });
      };

      effect.tileSize = document.body?.clientWidth > 800 ? 100 : 50;

      effect.columns = Math.floor(document.body?.clientWidth / effect.tileSize);
      effect.rows = Math.floor(document.body?.clientHeight / effect.tileSize);

      tiles.current?.style.setProperty('--columns', effect.columns.toString());
      tiles.current?.style.setProperty('--rows', effect.rows.toString());

      createTiles(effect.columns * effect.rows);
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
      <div className={styles.main}>
        <div ref={tiles} className={styles.tiles} />
      </div>
    </>
  );
};

export default Dashboard;
