import styles from '@s/projects/snakeai/main.module.scss';

import { useRef, useState, useEffect } from 'react';
import snakeAIDemo_NOAI from '@l/projects/snakeAIDemo_NOAI';

const Demo = () => {
  const snakeGridContainer = useRef<HTMLDivElement>(null);

  const [snakeGrid, _] = useState<snakeAIDemo_NOAI>(new snakeAIDemo_NOAI());

  const createSnakeGrid = () => {
    const createTiles = (quantity: number) => {
      const createTile = (index: number) => {
        const tile = document.createElement('div');
        tile.className = styles.snakeGridTile;

        console.log('index: ', index);

        return tile;
      };

      console.log('CreateTiles: ', quantity);

      Array.from(Array(quantity)).map((_, index) => {
        snakeGridContainer.current?.appendChild(createTile(index));
      });
    };

    while (snakeGridContainer.current?.firstChild) {
      snakeGridContainer.current?.removeChild(
        snakeGridContainer.current.firstChild
      );
    }

    snakeGrid.fillGrid({
      width: document.body?.clientWidth,
      height: document.body?.clientHeight,
    });

    snakeGridContainer.current?.style.setProperty(
      '--columns',
      snakeGrid.columns.toString()
    );
    snakeGridContainer.current?.style.setProperty(
      '--rows',
      snakeGrid.rows.toString()
    );
    createTiles(snakeGrid.columns * snakeGrid.rows);

    return;
  };

  useEffect(() => {
    createSnakeGrid();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div ref={snakeGridContainer} className={styles.snakeGridContainer} />
    </>
  );
};

export default Demo;
