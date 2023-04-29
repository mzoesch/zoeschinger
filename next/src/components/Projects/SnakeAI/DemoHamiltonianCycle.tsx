import styles from '@s/projects/snakeai/main.module.scss';
import text_styles from '@s/text/main.module.scss';
import btn_styles from '@s/buttons/main.module.scss';

import { useRef, useState, useEffect } from 'react';

import { SnakeAIDemo_HamiltonianCycle } from '@l/projects/snakeAIDemo_HamiltonianCycle';

const Demo = () => {
  const snakeGridContainer = useRef<HTMLDivElement>(null);
  const [snakeGrid, DO_NOT_USE] = useState<SnakeAIDemo_HamiltonianCycle>(
    new SnakeAIDemo_HamiltonianCycle(snakeGridContainer.current)
  );

  const createSnakeGrid = () => {
    snakeGrid.fillGrid(snakeGridContainer.current ?? null);
  };

  useEffect(() => {
    createSnakeGrid();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={text_styles.text}>
          <h1 className={text_styles.title}>Snake Demo - Hamiltonian cycle</h1>
          <div className={text_styles.text}>
            <div className={text_styles.paragraph}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              dolore delectus labore, autem dignissimos dolores ratione
              cupiditate corrupti sapiente, amet deleniti inventore quae! Error
              possimus quod enim ratione. Asperiores ipsa atque ut. Ad dolor
              maiores, aperiam mollitia blanditiis tempore unde totam sint iusto
              error consequuntur, praesentium iure quod ipsa sunt?
            </div>
          </div>
        </div>
        <div className={styles.demo}>
          <div className={styles.btn_area}>
            <div className={styles.btn_area_item}>
              <div
                className={btn_styles.danger_outline}
                onClick={() => {
                  snakeGrid.resetTilesWithRecalculation();
                  return;
                }}
              >
                <div className={text_styles.text}>Recalculate cells</div>
              </div>
              <div
                className={btn_styles.danger_outline}
                onClick={() => {
                  snakeGrid.devToolWriteIndicesToInnerHTML();
                  return;
                }}
              >
                <div className={text_styles.text}>Show indices</div>
              </div>
              <div
                className={btn_styles.secondary}
                onClick={() => {
                  snakeGrid.toggleHamiltonianCycle();
                }}
              >
                <div className={text_styles.text}>Toggle hamiltonian grid</div>
              </div>
              <div className={btn_styles.primary}>Start</div>
            </div>
            <div className={text_styles.text}>
              <div className={styles.btn_area_item}>
                <div>Some stats</div>
                <div>Some other stuff</div>
              </div>
            </div>
          </div>
          <div ref={snakeGridContainer} className={styles.snakeGridContainer} />
        </div>
      </div>
    </>
  );
};

export default Demo;
