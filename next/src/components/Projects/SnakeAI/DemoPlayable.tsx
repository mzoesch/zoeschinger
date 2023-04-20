import styles from '@s/projects/snakeai/main.module.scss';
import text_styles from '@s/text/main.module.scss';
import btn_styles from '@s/buttons/main.module.scss';

import { useRef, useState, useEffect } from 'react';
import { SnakeAIDemo_NoAI } from '@l/projects/snakeAIDemo_NoAI';

import useKeyDown from '@h/useKeyDown';
import useSnakeAIDemo_NoAIStats from '@h/useSnakeAIDemo_NoAIStats';

import { Source_Code_Pro } from 'next/font/google';
const sourceCodePro = Source_Code_Pro({ subsets: ['latin'] });

const Demo = () => {
  const [highscore, setHighscore] = useSnakeAIDemo_NoAIStats(0);

  const [updateDOM, setUpdateDOM] = useState(0);
  const handleUpdateDOM = () => {
    if (updateDOM == 1) {
      setUpdateDOM(0);

      return;
    }

    setUpdateDOM(1);
    return;
  };

  const snakeGridContainer = useRef<HTMLDivElement>(null);
  const [runSnake, setRunSnake] = useState(false);

  const [score, setScore] = useState(0);
  const handleScoreUpdate = (score: number) => {
    setScore(score);

    return;
  };

  const [timeAlive, setTimeAlive] = useState(0);
  const handleTimeAliveUpdate = (timeAlive: number): void => {
    setTimeAlive(timeAlive);
    return;
  };

  const [snakeGrid, DO_NOT_USE] = useState<SnakeAIDemo_NoAI>(
    new SnakeAIDemo_NoAI(
      setRunSnake,
      handleScoreUpdate,
      handleTimeAliveUpdate,
      setHighscore
    )
  );
  const createSnakeGrid = () => {
    snakeGrid.fillGrid({
      width: snakeGridContainer.current?.clientWidth ?? 0,
      height: snakeGridContainer.current?.clientHeight ?? 0,
      snakeGridContainer: snakeGridContainer.current ?? null,
    });

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
      <div className={styles.wrapper}>
        <div className={text_styles.text}>
          <h1 className={text_styles.title}>Snake Demo - No AI</h1>
          <div className={text_styles.text}>
            <div className={text_styles.paragraph}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio
              dolor error molestias distinctio voluptate velit, quidem sit ex
              quos atque nostrum harum in tempora itaque veritatis
              necessitatibus quaerat totam labore?
            </div>
            <div className={text_styles.paragraph}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio
              dolor error molestias distinctio voluptate velit, quidem sit ex
              quos atque nostrum harum in tempora itaque veritatis
              necessitatibus quaerat totam labore?
            </div>
            <h2>Controls</h2>
            <div className={text_styles.paragraph}>
              -{' '}
              <span
                className={sourceCodePro.className}
                style={{
                  backgroundColor: 'gray',
                  color: 'white',

                  paddingTop: '0.25rem',
                  paddingBottom: '0.25rem',
                  paddingLeft: '0.5rem',
                  paddingRight: '0.5rem',

                  borderRadius: '0.25rem',
                }}
              >
                W
              </span>{' '}
              : Move up
            </div>
            <div className={text_styles.paragraph}>
              -{' '}
              <span
                className={sourceCodePro.className}
                style={{
                  backgroundColor: 'gray',
                  color: 'white',

                  paddingTop: '0.25rem',
                  paddingBottom: '0.25rem',
                  paddingLeft: '0.5rem',
                  paddingRight: '0.5rem',

                  borderRadius: '0.25rem',
                }}
              >
                S
              </span>{' '}
              : Move down
            </div>
            <div className={text_styles.paragraph}>
              -{' '}
              <span
                className={sourceCodePro.className}
                style={{
                  backgroundColor: 'gray',
                  color: 'white',

                  paddingTop: '0.25rem',
                  paddingBottom: '0.25rem',
                  paddingLeft: '0.5rem',
                  paddingRight: '0.5rem',
                  borderRadius: '0.25rem',
                }}
              >
                A
              </span>{' '}
              : Move left
            </div>
            <div className={text_styles.paragraph}>
              -{' '}
              <span
                className={sourceCodePro.className}
                style={{
                  backgroundColor: 'gray',
                  color: 'white',

                  paddingTop: '0.25rem',
                  paddingBottom: '0.25rem',
                  paddingLeft: '0.5rem',
                  paddingRight: '0.5rem',
                  borderRadius: '0.25rem',
                }}
              >
                D
              </span>{' '}
              : Move right
            </div>
          </div>
        </div>
        <div className={styles.demo}>
          <div className={styles.btn_area}>
            <div className={styles.btn_area_item}>
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
            </div>
            <div className={styles.btn_area_item}>
              <div>Time alive: {`${timeAlive}`}s</div>
              <div>Highscore: {`${highscore}`}</div>
              <div>Score: {`${score}`}</div>
            </div>
          </div>
          <div ref={snakeGridContainer} className={styles.snakeGridContainer} />
        </div>
      </div>
    </>
  );
};

export default Demo;
