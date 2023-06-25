import styles from '@s/projects/snakeai/playable.module.scss';
import text_styles from '@s/text/main.module.scss';
import btn_styles from '@s/buttons/main.module.scss';

import { useRef, useState, useEffect } from 'react';

import { SnakeAIDemo_NoAI } from '@l/projects/snakeAIDemo_NoAI';

import {
  AiOutlineArrowDown,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineArrowUp,
} from 'react-icons/ai';

import { BiSpaceBar } from 'react-icons/bi';

import Link from 'next/link';

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
    if (
      ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(
        e.code
      )
    )
      e.preventDefault();

    if (e.code === 'Space') {
      snakeGrid.reset();
      createSnakeGrid();
      snakeGrid.spawnSnake();
      setRunSnake(true);
      return;
    }

    snakeGrid.handleKeyDown(e);
    return;
  }, []);

  useEffect(() => {
    const controller = async () => {
      while (true) {
        console.log('runSnake', runSnake);
        if (runSnake === false) return;

        snakeGrid.move();

        await new Promise((resolve) => setTimeout(resolve, snakeGrid.speed));
        controller;
      }
    };

    return () => {};

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runSnake]);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <div className={text_styles.text}>
            <h1 className={text_styles.title}>Snake Demo - No AI</h1>
            <div className={text_styles.text}>
              <div className={text_styles.paragraph}>
                No support for mobile devices (keyboard required).
              </div>
              <div className={text_styles.paragraph}>
                This is a demo of the{' '}
                <Link
                  href='https://en.wikipedia.org/wiki/Snake_(video_game_genre)'
                  target='_blank'
                  rel='noopener noreferrer'
                  className={text_styles.link}
                >
                  snake game
                </Link>
                . The snake is controlled by the user. The snake will die if it
                hits the wall or itself (Head (red tile) and tail (green
                tile[s])). The snake will grow by 1 tile if it eats an apple
                (blue tile).
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
                  <BiSpaceBar />
                </span>{' '}
                (space) : To spawn snake
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
                  W
                </span>{' '}
                or{' '}
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
                  <AiOutlineArrowUp />
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
                or{' '}
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
                  <AiOutlineArrowDown />
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
                or{' '}
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
                  <AiOutlineArrowLeft />
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
                or{' '}
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
                  <AiOutlineArrowRight />
                </span>{' '}
                : Move right
              </div>
            </div>
          </div>
          <div className={styles.demo}>
            <div className={styles.btn_area}>
              <div className={styles.btn_area_item}>
                {runSnake ? (
                  <div className={btn_styles.secondary}>Recalculate Cells</div>
                ) : (
                  <div
                    className={btn_styles.secondary}
                    onClick={() => createSnakeGrid()}
                  >
                    <div className={text_styles.text}>Recalculate Cells</div>
                  </div>
                )}
                <div
                  className={btn_styles.primary}
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
              <div className={text_styles.text}>
                <div className={styles.btn_area_item}>
                  <div>Time alive: {`${timeAlive}`}s</div>
                  <div>Highscore: {`${highscore}`}</div>
                  <div>Score: {`${score}`}</div>{' '}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'gray',
                      color: 'white',
                      borderRadius: '0.25rem',
                      padding: '0.25rem',
                      border: '1px solid white',
                    }}
                  >
                    <div>Speed: {snakeGrid.speed} ms</div>
                    <input
                      type='range'
                      min='1'
                      max='500'
                      value={snakeGrid.speed}
                      onChange={(e) => {
                        snakeGrid.speed = parseInt(e.target.value);
                        handleUpdateDOM();
                        return;
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              ref={snakeGridContainer}
              className={styles.snakeGridContainer}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Demo;
