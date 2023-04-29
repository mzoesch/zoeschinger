import styles from '@s/projects/snakeai/ham.module.scss';
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

  const [timeSettingsHidden, setTimeSettingsHidden] = useState<boolean>(true);
  const handleTimeSettingsToggle = () => {
    setTimeSettingsHidden(!timeSettingsHidden);
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
          <div className={styles.nav_wrap}>
            <div className={text_styles.text}>
              <div className={styles.btn_area}>
                <div className={styles.btn_area_item}>
                  <div
                    className={btn_styles.danger_outline}
                    onClick={() => {
                      snakeGrid.resetTilesWithRecalculation();
                    }}
                  >
                    Recalculate cells
                  </div>
                  <div
                    className={btn_styles.secondary}
                    onClick={() => {
                      snakeGrid.toggleIndices();
                    }}
                  >
                    Toggle indices
                  </div>
                </div>
                <div className={styles.btn_area_item}>
                  <div className={btn_styles.secondary}>
                    Toggle hamiltonian cycle
                  </div>
                  <div
                    className={btn_styles.primary}
                    onClick={() => {
                      snakeGrid.calculateANewHamiltonianCycle();
                    }}
                  >
                    Calculate an hamiltonian cycle
                  </div>
                  <div className={btn_styles.primary}>Spawn Snake</div>
                </div>
              </div>
            </div>
            <div className={text_styles.text}>
              <div className={styles.area_for_showing_time_settings}>
                <div className={styles.btn_for_showing_time_settings}>
                  <div
                    className={btn_styles.green}
                    onClick={() => {
                      handleTimeSettingsToggle();
                      return;
                    }}
                  >
                    {timeSettingsHidden ? 'Show' : 'Hide'} time settings
                  </div>
                </div>
                <div
                  className={styles.time_settings}
                  style={{ display: timeSettingsHidden ? 'none' : 'flex' }}
                >
                  <div>
                    <div>Timeout after checking one Neighbor</div>
                    <div className={styles.time_settings_inputs}>
                      <div>
                        <input type='number' style={{ textAlign: 'right' }} />{' '}
                        ms
                      </div>
                      <div>|</div>
                      <div>
                        <input type='checkbox' /> animate
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      Timeout after each spread cycle for viable ham if it can
                      reach all unhamed tiles
                    </div>
                    <div className={styles.time_settings_inputs}>
                      <div>
                        <input type='number' style={{ textAlign: 'right' }} />{' '}
                        ms
                      </div>
                      <div>|</div>
                      <div>
                        <input type='checkbox' /> animate
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      Timeout after checking if all unhamed tiles are not
                      leading to an unreachable ham cycle for current progressed
                      ham
                    </div>
                    <div className={styles.time_settings_inputs}>
                      <div>
                        <input type='number' style={{ textAlign: 'right' }} />{' '}
                        ms
                      </div>
                      <div>|</div>
                      <div>
                        <input type='checkbox' /> animate
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>Timeout after a not good tile was found</div>
                    <div className={styles.time_settings_inputs}>
                      <div>
                        <input type='number' style={{ textAlign: 'right' }} />{' '}
                        ms
                      </div>
                      <div>|</div>
                      <div>
                        <input type='checkbox' /> animate
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      Timeout after each spread cycle for two neighbors viable
                      check
                    </div>
                    <div className={styles.time_settings_inputs}>
                      <div>
                        <input type='number' style={{ textAlign: 'right' }} />{' '}
                        ms
                      </div>
                      <div>|</div>
                      <div>
                        <input type='checkbox' /> animate
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.stats}></div>
          <div ref={snakeGridContainer} className={styles.snakeGridContainer} />
        </div>
      </div>
    </>
  );
};

export default Demo;
