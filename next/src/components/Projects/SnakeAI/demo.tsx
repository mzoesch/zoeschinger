import styles from '@s/projects/snakeai/main.module.scss';
import text_styles from '@s/text/main.module.scss';
import btn_styles from '@s/buttons/main.module.scss';

import { useRef, useState, useEffect } from 'react';
import { SnakeAIDemo_NoAI } from '@l/projects/snakeAIDemo_NoAI';
import { Tile as snakeGridTile } from '@l/projects/snakeAIDemo_NoAI';

import useKeyDown from '@h/useKeyDown';

const Demo = () => {
  const snakeGridContainer = useRef<HTMLDivElement>(null);
  const [runSnake, setRunSnake] = useState(false);

  const [snakeGrid, DO_NOT_USE] = useState<SnakeAIDemo_NoAI>(
    new SnakeAIDemo_NoAI(setRunSnake)
  );
  const createSnakeGrid = () => {
    snakeGrid.fillGrid({
      width: snakeGridContainer.current?.clientWidth ?? 0,
      height: snakeGridContainer.current?.clientHeight ?? 0,
      snakeGridContainer: snakeGridContainer.current ?? null,
    });

    return;
  };

  const [updateDOM, setUpdateDOM] = useState(0);
  const handleUpdateDOM = () => {
    if (updateDOM == 1) {
      setUpdateDOM(0);

      return;
    }

    setUpdateDOM(1);
    return;
  };

  useEffect(() => {
    createSnakeGrid();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useKeyDown((e: any) => {
    snakeGrid.handleKeyDown(e);
    return;
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!runSnake) return;

      snakeGrid.move();
    }, 100);

    return () => clearTimeout(interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runSnake]);

  return (
    <>
      <div>
        <div>
          <h1>Snake Demo</h1>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio
            dolor error molestias distinctio voluptate velit, quidem sit ex quos
            atque nostrum harum in tempora itaque veritatis necessitatibus
            quaerat totam labore?
          </div>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio
            dolor error molestias distinctio voluptate velit, quidem sit ex quos
            atque nostrum harum in tempora itaque veritatis necessitatibus
            quaerat totam labore?
          </div>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio
            dolor error molestias distinctio voluptate velit, quidem sit ex quos
            atque nostrum harum in tempora itaque veritatis necessitatibus
            quaerat totam labore?
          </div>
        </div>
        <div className={styles.demo}>
          <div className={styles.btn_area}>
            <div
              className={btn_styles.secondary}
              onClick={() => createSnakeGrid()}
            >
              Recalculate Cells
            </div>
            <div
              className={btn_styles.secondary}
              onClick={() => {
                snakeGrid.reset();
                createSnakeGrid();
                snakeGrid.spawnSnake();
                setRunSnake(true);

                return;
              }}
            >
              Spawn Snake
            </div>
            <div
              className={btn_styles.danger_outline}
              onClick={() => {
                snakeGrid.reset();
                return;
              }}
            >
              Reset Snake
            </div>
          </div>
          <div ref={snakeGridContainer} className={styles.snakeGridContainer} />
        </div>
      </div>
    </>
  );
};

export default Demo;
