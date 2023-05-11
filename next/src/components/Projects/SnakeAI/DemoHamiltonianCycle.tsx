import styles from '@s/projects/snakeai/ham.module.scss';
import text_styles from '@s/text/main.module.scss';
import btn_styles from '@s/buttons/main.module.scss';

import { useRef, useState, useEffect } from 'react';

import { MdKeyboardArrowRight } from 'react-icons/md';

import { Ratio, ratios } from '@l/projects/snakeAIDemo_HamiltonianCycle';
import { PreHam, preHams } from '@l/projects/snakeAIDemo_HamiltonianCycle';
import {
  CalculationMethodForNewHams,
  calculationMethodsForNewHams,
} from '@l/projects/snakeAIDemo_HamiltonianCycle';
import { SnakeAIDemo_HamiltonianCycle } from '@l/projects/snakeAIDemo_HamiltonianCycle';

import { Source_Code_Pro } from 'next/font/google';
const sourceCodePro = Source_Code_Pro({ subsets: ['latin'] });

const Demo = () => {
  const getFirstPreHamByRatio = (ratio: Ratio): number => {
    for (let i = 0; i < preHams.length; i++) {
      if (preHams[i].ratio === ratio.ratio) {
        return i;
      }
    }

    return -1;
  };

  const getRightHeightForHamGridViewInPixels = (
    hamRatioIndex: number
  ): number => {
    if (
      snakeGridContainer.current === null ||
      snakeGridContainer.current === undefined
    )
      return SnakeAIDemo_HamiltonianCycle.DEFAULT_HEIGHT_FOR_SNAKE_GRID_CONTAINER;

    const width = snakeGridContainer.current.clientWidth;
    const ratio = ratios[hamRatioIndex];

    if (ratio.ratio === 'auto')
      return SnakeAIDemo_HamiltonianCycle.DEFAULT_HEIGHT_FOR_SNAKE_GRID_CONTAINER;

    const height = width / ratio.asNumber();

    return height;
  };

  const [heightForSnakeGridView, setHeightForSnakeGridView] = useState<number>(
    SnakeAIDemo_HamiltonianCycle.DEFAULT_HEIGHT_FOR_SNAKE_GRID_CONTAINER
  );
  const [
    currentlySelectedHamRatioForUnsavedChanges,
    setCurrentlySelectedHamRatioForUnsavedChanges,
  ] = useState<number>(Ratio.DEFAULT_RATIO_INDEX);
  const [currentlySelectedHamRatio, setCurrentlySelectedHamRatio] =
    useState<number>(currentlySelectedHamRatioForUnsavedChanges);
  const [currentlySelectedPreHam, setCurrentlySelectedPreHam] =
    useState<number>(getFirstPreHamByRatio(ratios[currentlySelectedHamRatio]));
  const handleSetCurrentlySelectedHamRatioForUnsavedChanges = (i: number) => {
    if (currentlySelectedHamRatioForUnsavedChanges === i) return;
    setCurrentlySelectedHamRatioForUnsavedChanges(i);

    const firstPreHamIndex: number = getFirstPreHamByRatio(ratios[i]);
    setCurrentlySelectedPreHam(firstPreHamIndex);

    return;
  };
  const [
    currentlySelectedMethodForGeneratingANewHamiltonianCycle,
    setCurrentlySelectedMethodForGeneratingANewHamiltonianCycle,
  ] = useState<number>(
    CalculationMethodForNewHams.DEFAULT_CALCULATION_METHOD_INDEX
  );
  const [
    currentlyGeneratingARandomHamiltonianCycle,
    setCurrentlyGeneratingARandomHamiltonianCycle,
  ] = useState<boolean>(false);
  const [snakeIsCurrentlyMoving, setSnakeIsCurrentlyMoving] =
    useState<boolean>(false);

  const snakeGridContainer = useRef<HTMLDivElement>(null);
  const [snakeGrid, DO_NOT_USE] = useState<SnakeAIDemo_HamiltonianCycle>(
    new SnakeAIDemo_HamiltonianCycle(snakeGridContainer.current)
  );
  const [snakeMoves, setSnakeMoves] = useState<number>(0);

  const createSnakeGrid = () => {
    snakeGrid.fillGrid(
      snakeGridContainer.current ?? null,
      preHams[currentlySelectedPreHam].rows,
      preHams[currentlySelectedPreHam].columns
    );
  };

  const [timeSettingsHidden, setTimeSettingsHidden] = useState<boolean>(true);
  const handleTimeSettingsToggle = () => {
    setTimeSettingsHidden(!timeSettingsHidden);
  };

  const [hamCycleSelectionHidden, setHamCycleSelectionHidden] =
    useState<boolean>(true);
  const handleHamCycleSelectionToggle = () => {
    setHamCycleSelectionHidden(!hamCycleSelectionHidden);
  };

  const handleApplyHamSelection = () => {
    setCurrentlySelectedHamRatio(currentlySelectedHamRatioForUnsavedChanges);

    setHeightForSnakeGridView(
      getRightHeightForHamGridViewInPixels(
        currentlySelectedHamRatioForUnsavedChanges
      )
    );
    snakeGrid.generateGridFromPreHam(preHams[currentlySelectedPreHam]);

    handleUpdateDOM();
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
    const rightHeightForSnakeGrid = (): void => {
      const effectGetRightHeightForHamGridViewInPixels = (): number => {
        if (
          snakeGridContainer.current === null ||
          snakeGridContainer.current === undefined
        )
          return SnakeAIDemo_HamiltonianCycle.DEFAULT_HEIGHT_FOR_SNAKE_GRID_CONTAINER;

        const width = snakeGridContainer.current.clientWidth;
        const ratio = ratios[currentlySelectedHamRatio];

        if (ratio.ratio === 'auto')
          return SnakeAIDemo_HamiltonianCycle.DEFAULT_HEIGHT_FOR_SNAKE_GRID_CONTAINER;

        const height = width / ratio.asNumber();

        return height;
      };

      setHeightForSnakeGridView(effectGetRightHeightForHamGridViewInPixels());
    };

    createSnakeGrid();
    rightHeightForSnakeGrid();
    snakeGrid.generateGridFromPreHam(preHams[currentlySelectedPreHam], false);
    handleUpdateDOM();

    return () => {
      return;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const rightHeightForSnakeGrid = (): void => {
      const effectGetRightHeightForHamGridViewInPixels = (): number => {
        if (
          snakeGridContainer.current === null ||
          snakeGridContainer.current === undefined
        )
          return SnakeAIDemo_HamiltonianCycle.DEFAULT_HEIGHT_FOR_SNAKE_GRID_CONTAINER;

        const width = snakeGridContainer.current.clientWidth;
        const ratio = ratios[currentlySelectedHamRatio];

        if (ratio.ratio === 'auto')
          return SnakeAIDemo_HamiltonianCycle.DEFAULT_HEIGHT_FOR_SNAKE_GRID_CONTAINER;

        const height = width / ratio.asNumber();

        return height;
      };

      setHeightForSnakeGridView(effectGetRightHeightForHamGridViewInPixels());
    };

    window.addEventListener('resize', rightHeightForSnakeGrid);

    return () => {
      window.removeEventListener('resize', rightHeightForSnakeGrid);
    };
  }, [currentlySelectedHamRatio]);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <div className={text_styles.text}>
            <h1 className={text_styles.title}>
              Snake Demo - Hamiltonian cycle
            </h1>
            <div className={text_styles.text}>
              <div className={text_styles.paragraph}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                dolore delectus labore, autem dignissimos dolores ratione
                cupiditate corrupti sapiente, amet deleniti inventore quae!
                Error possimus quod enim ratione. Asperiores ipsa atque ut. Ad
                dolor maiores, aperiam mollitia blanditiis tempore unde totam
                sint iusto error consequuntur, praesentium iure quod ipsa sunt?
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
                        snakeGrid.resetTilesWithRecalculation(
                          preHams[currentlySelectedPreHam]
                        );
                      }}
                    >
                      Recalculate cells
                    </div>
                  </div>
                  <div className={styles.btn_area_item}>
                    <div
                      className={btn_styles.dropdown_btn}
                      onClick={() => {
                        handleHamCycleSelectionToggle();
                      }}
                    >
                      Select / Calculate an hamiltonian cycle{' '}
                      <MdKeyboardArrowRight
                        style={{
                          transform: hamCycleSelectionHidden
                            ? 'rotate(0deg)'
                            : 'rotate(90deg)',
                        }}
                        className={styles.section_for_showing_ham_select_arrow}
                      />
                    </div>
                    <div className={styles.main_selection_for_primary_buttons}>
                      {currentlyGeneratingARandomHamiltonianCycle ? (
                        <div
                          className={btn_styles.secondary}
                          style={{
                            display:
                              currentlySelectedHamRatio !== 0
                                ? 'none'
                                : 'block',
                          }}
                        >
                          Generating . . .
                        </div>
                      ) : (
                        <div
                          className={btn_styles.primary}
                          style={{
                            display:
                              currentlySelectedHamRatio !== 0
                                ? 'none'
                                : 'block',
                          }}
                          onClick={async () => {
                            setCurrentlyGeneratingARandomHamiltonianCycle(true);
                            const finish =
                              await snakeGrid.calculateANewHamiltonianCycle();
                            if (finish === true)
                              setCurrentlyGeneratingARandomHamiltonianCycle(
                                false
                              );
                          }}
                        >
                          Generate ham
                        </div>
                      )}
                      {currentlyGeneratingARandomHamiltonianCycle ? (
                        <div className={btn_styles.secondary}>Spawn Snake</div>
                      ) : snakeIsCurrentlyMoving ? (
                        <div className={btn_styles.secondary}>
                          Snake is moving
                        </div>
                      ) : (
                        <div
                          className={btn_styles.primary}
                          onClick={async () => {
                            setSnakeIsCurrentlyMoving(true);
                            const dir: number = snakeGrid.prepareSnakeLoop();

                            while (true) {
                              const answer: boolean =
                                await snakeGrid.snakeLoopCallThisFunctionInALoop(
                                  dir
                                );

                              setSnakeMoves(snakeGrid.snakeMoves);
                              if (answer === false) break;

                              await new Promise((resolve) =>
                                setTimeout(
                                  resolve,
                                  snakeGrid.timeoutAfterSnakeMove
                                )
                              );

                              continue;
                            }

                            if (
                              snakeGrid.snakeLength !==
                              snakeGrid.hamiltonianCycleLength
                            ) {
                              alert(
                                `
The snake length is not equal to the ham cycle length.
Snake length: ${snakeGrid.snakeLength}
Ham cycle length: ${snakeGrid.hamiltonianCycleLength}
`
                              );

                              return;
                            }

                            await snakeGrid.blinkingSuccessAnimationAfterSnakeSucceeded();

                            setSnakeIsCurrentlyMoving(false);
                            return;
                          }}
                        >
                          Spawn Snake
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={text_styles.text}
                style={{
                  display: hamCycleSelectionHidden ? 'none' : 'block',
                }}
              >
                <div className={styles.section_for_showing_ham_select}>
                  <div className={styles.section_for_showing_ham_select_item}>
                    <div>
                      <h2>Precalculated Hamiltonian cycles</h2>
                      <div className={text_styles.paragraph}>
                        These ham cycles were precalculated with the
                        &quot;generate absolute random new ham cycle&quot;
                        option. It is not really handy to use this algorithm
                        because it has a time complexity of O(n^3) and it is
                        therefore not really efficient.
                      </div>
                    </div>
                    <div
                      className={
                        styles.section_for_showing_ham_select_item_list_wrapper
                      }
                    >
                      <div>
                        <h3>Ratio</h3>
                        <div
                          className={
                            styles.section_for_showing_ham_select_item_list
                          }
                        >
                          {ratios.map((ratio: Ratio, i) => {
                            return (
                              <div
                                key={ratio.ratio}
                                onClick={() => {
                                  handleSetCurrentlySelectedHamRatioForUnsavedChanges(
                                    i
                                  );
                                  return;
                                }}
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  backgroundColor:
                                    currentlySelectedHamRatioForUnsavedChanges ===
                                    i
                                      ? PreHam.COLOR_SELECTED
                                      : PreHam.COLOR_UNSELECTED,
                                  border:
                                    '1px solid rgb(var(--primary-negativ) / 100%)',
                                }}
                              >
                                {ratio.ratio}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div
                        style={{
                          display:
                            currentlySelectedHamRatioForUnsavedChanges ===
                            Ratio.AUTO_INDEX
                              ? 'none'
                              : 'block',
                        }}
                      >
                        <h3>
                          Precalculated hams for a{' '}
                          {
                            ratios[currentlySelectedHamRatioForUnsavedChanges]
                              .ratio
                          }{' '}
                          ratio
                        </h3>
                        <div
                          className={
                            styles.section_for_showing_ham_select_item_list
                          }
                        >
                          {preHams.map((ham: PreHam, i) => {
                            if (
                              ham.ratio !==
                              ratios[currentlySelectedHamRatioForUnsavedChanges]
                                .ratio
                            ) {
                              return;
                            }

                            return (
                              <div
                                key={ham.label}
                                onClick={() => {
                                  setCurrentlySelectedPreHam(i);
                                  return;
                                }}
                                style={{
                                  backgroundColor:
                                    currentlySelectedPreHam === i
                                      ? PreHam.COLOR_SELECTED
                                      : PreHam.COLOR_UNSELECTED,
                                  border:
                                    '1px solid rgb(var(--primary-negativ) / 100%)',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}
                              >{`${ham.label}`}</div>
                            );
                          })}
                        </div>
                      </div>
                      <div
                        style={{
                          display:
                            currentlySelectedHamRatioForUnsavedChanges !==
                            Ratio.AUTO_INDEX
                              ? 'none'
                              : 'block',
                        }}
                      >
                        <h3>
                          Which method should be used for generating a new
                          Hamiltonian cycle?
                        </h3>
                        <div
                          className={
                            styles.section_for_showing_ham_select_item_list
                          }
                        >
                          {calculationMethodsForNewHams.map(
                            (method: CalculationMethodForNewHams, i) => {
                              return (
                                <div
                                  key={method.method}
                                  onClick={() => {
                                    setCurrentlySelectedMethodForGeneratingANewHamiltonianCycle(
                                      i
                                    );
                                    return;
                                  }}
                                  style={{
                                    backgroundColor:
                                      currentlySelectedMethodForGeneratingANewHamiltonianCycle ===
                                      i
                                        ? PreHam.COLOR_SELECTED
                                        : PreHam.COLOR_UNSELECTED,
                                    border:
                                      '1px solid rgb(var(--primary-negativ) / 100%)',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: 'fit-content',
                                  }}
                                >{`${method.method} | ${method.complexity}`}</div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </div>
                    <div className={styles.section_for_showing_apply_section}>
                      <div
                        className={btn_styles.secondary}
                        onClick={() => {
                          handleHamCycleSelectionToggle();
                          return;
                        }}
                      >
                        Close
                      </div>
                      <div
                        className={btn_styles.primary}
                        onClick={() => {
                          handleApplyHamSelection();
                          return;
                        }}
                      >
                        Apply
                      </div>
                      <div
                        className={btn_styles.primary}
                        onClick={() => {
                          handleApplyHamSelection();
                          handleHamCycleSelectionToggle();
                          return;
                        }}
                      >
                        Apply and close
                      </div>
                    </div>
                  </div>
                  <div
                    className={styles.section_for_showing_ham_select_item}
                  ></div>
                </div>
              </div>
              <div className={text_styles.text}>
                <div
                  style={{
                    display:
                      currentlySelectedHamRatioForUnsavedChanges !==
                      Ratio.AUTO_INDEX
                        ? 'none'
                        : 'flex',
                  }}
                  className={styles.area_for_showing_time_settings}
                >
                  <div className={styles.btn_for_showing_time_settings}>
                    <div
                      className={btn_styles.green}
                      style={{
                        width: '100%',
                      }}
                      onClick={() => {
                        handleTimeSettingsToggle();
                        return;
                      }}
                    >
                      {timeSettingsHidden ? 'Show' : 'Hide'} timing settings for
                      random ham cycle generation
                    </div>
                  </div>
                  <div
                    style={{
                      display: timeSettingsHidden ? 'none' : 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <div className={styles.time_settings}>
                      <div>
                        <div>Timeout after checking one neighbor</div>
                        <div className={styles.time_settings_inputs}>
                          <div>
                            <input
                              type='number'
                              value={`${snakeGrid.timeoutAfterCheckingOneNeighbor}`}
                              placeholder='delay in ms'
                              onChange={(e) => {
                                snakeGrid.timeoutAfterCheckingOneNeighbor =
                                  parseInt(e.target.value);
                                handleUpdateDOM();
                                return;
                              }}
                              style={{
                                width: '3.5rem',
                                textAlign: 'right',
                              }}
                            />{' '}
                            ms
                          </div>
                          <div>|</div>
                          <div>
                            <input
                              type='checkbox'
                              checked={
                                snakeGrid.animateTimeoutAfterCheckingOneNeighbor
                              }
                              onChange={() => {
                                snakeGrid.animateTimeoutAfterCheckingOneNeighbor =
                                  !snakeGrid.animateTimeoutAfterCheckingOneNeighbor;
                                handleUpdateDOM();
                                return;
                              }}
                            />{' '}
                            animate
                          </div>
                        </div>
                      </div>
                      <div>
                        <div>
                          Timeout after each spread cycle for viable ham if it
                          can reach all unhamed tiles
                        </div>
                        <div className={styles.time_settings_inputs}>
                          <div>
                            <input
                              type='number'
                              value={`${snakeGrid.timeoutAfterEachSpreadCycleForViableHamIfItCanReachAllUnhamedTiles}`}
                              placeholder='delay in ms'
                              onChange={(e) => {
                                snakeGrid.timeoutAfterEachSpreadCycleForViableHamIfItCanReachAllUnhamedTiles =
                                  parseInt(e.target.value);
                                handleUpdateDOM();
                                return;
                              }}
                              style={{ width: '3.5rem', textAlign: 'right' }}
                            />{' '}
                            ms
                          </div>
                          <div>|</div>
                          <div>
                            <input
                              type='checkbox'
                              checked={
                                snakeGrid.animateTimeoutAfterEachSpreadCycleForViableHamIfItCanReachAllUnhamedTiles
                              }
                              onChange={() => {
                                snakeGrid.animateTimeoutAfterEachSpreadCycleForViableHamIfItCanReachAllUnhamedTiles =
                                  !snakeGrid.animateTimeoutAfterEachSpreadCycleForViableHamIfItCanReachAllUnhamedTiles;
                                handleUpdateDOM();
                                return;
                              }}
                            />{' '}
                            animate
                          </div>
                        </div>
                      </div>
                      <div>
                        <div>
                          Timeout after checking if all unhamed tiles are not
                          leading to an unreachable ham cycle for current
                          progressed ham
                        </div>
                        <div className={styles.time_settings_inputs}>
                          <div>
                            <input
                              type='number'
                              value={`${snakeGrid.timeoutAfterCheckingIfAllUnhamedTilesAreNotLeadingToAnUnreachableHamCycleForCurrentProgressedHam}`}
                              placeholder='delay in ms'
                              onChange={(e) => {
                                snakeGrid.timeoutAfterCheckingIfAllUnhamedTilesAreNotLeadingToAnUnreachableHamCycleForCurrentProgressedHam =
                                  parseInt(e.target.value);
                                handleUpdateDOM();
                                return;
                              }}
                              style={{ width: '3.5rem', textAlign: 'right' }}
                            />{' '}
                            ms
                          </div>
                          <div>|</div>
                          <div>
                            <input
                              type='checkbox'
                              checked={
                                snakeGrid.animateTimeoutAfterCheckingIfAllUnhamedTilesAreNotLeadingToAnUnreachableHamCycleForCurrentProgressedHam
                              }
                              onChange={() => {
                                snakeGrid.animateTimeoutAfterCheckingIfAllUnhamedTilesAreNotLeadingToAnUnreachableHamCycleForCurrentProgressedHam =
                                  !snakeGrid.animateTimeoutAfterCheckingIfAllUnhamedTilesAreNotLeadingToAnUnreachableHamCycleForCurrentProgressedHam;
                                handleUpdateDOM();
                                return;
                              }}
                            />{' '}
                            animate
                          </div>
                        </div>
                      </div>
                      <div>
                        <div>Timeout after a not good tile was found</div>
                        <div className={styles.time_settings_inputs}>
                          <div>
                            <input
                              type='number'
                              value={`${snakeGrid.timeoutAfterANotGoodTileWasFound}`}
                              placeholder='delay in ms'
                              onChange={(e) => {
                                snakeGrid.timeoutAfterANotGoodTileWasFound =
                                  parseInt(e.target.value);
                                handleUpdateDOM();
                                return;
                              }}
                              style={{ width: '3.5rem', textAlign: 'right' }}
                            />{' '}
                            ms
                          </div>
                          <div>|</div>
                          <div>
                            <input
                              type='checkbox'
                              checked={
                                snakeGrid.animateTimeoutAfterANotGoodTileWasFound
                              }
                              onChange={() => {
                                snakeGrid.animateTimeoutAfterANotGoodTileWasFound =
                                  !snakeGrid.animateTimeoutAfterANotGoodTileWasFound;
                                handleUpdateDOM();
                                return;
                              }}
                            />{' '}
                            animate
                          </div>
                        </div>
                      </div>
                      <div>
                        <div>
                          Timeout after each spread cycle for two neighbors
                          viable check
                        </div>
                        <div className={styles.time_settings_inputs}>
                          <div>
                            <input
                              type='number'
                              value={`${snakeGrid.timeoutAfterEachSpreadCycleForTwoNeighborsViableCheck}`}
                              placeholder='delay in ms'
                              onChange={(e) => {
                                snakeGrid.timeoutAfterEachSpreadCycleForTwoNeighborsViableCheck =
                                  parseInt(e.target.value);
                                handleUpdateDOM();
                                return;
                              }}
                              style={{ width: '3.5rem', textAlign: 'right' }}
                            />{' '}
                            ms
                          </div>
                          <div>|</div>
                          <div>
                            <input
                              type='checkbox'
                              checked={
                                snakeGrid.animateTimeoutAfterEachSpreadCycleForTwoNeighborsViableCheck
                              }
                              onChange={() => {
                                snakeGrid.animateTimeoutAfterEachSpreadCycleForTwoNeighborsViableCheck =
                                  !snakeGrid.animateTimeoutAfterEachSpreadCycleForTwoNeighborsViableCheck;
                                handleUpdateDOM();
                                return;
                              }}
                            />{' '}
                            animate
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={styles.reset_timing_settings_btn}
                      onClick={() => {
                        snakeGrid.resetTimingSettings();
                        handleUpdateDOM();
                        return;
                      }}
                    >
                      Reset timing settings
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.above_grid}>
              <div className={styles.above_grid_item}>
                <div
                  className={btn_styles.secondary}
                  onClick={() => {
                    snakeGrid.toggleIndices();
                  }}
                >
                  Toggle indices
                </div>
                {snakeGrid.hamiltonianCycleLength > 1 &&
                currentlyGeneratingARandomHamiltonianCycle === false ? (
                  <div
                    className={btn_styles.secondary}
                    onClick={() => {
                      snakeGrid.toggleHamiltonianCycle();
                    }}
                  >
                    Toggle hamiltonian cycle
                  </div>
                ) : null}
              </div>
              <div className={styles.above_grid_item}>
                <div className={styles.snake_speed_slider}>
                  <div
                    style={{
                      display: 'flex',
                      gap: '0.5rem',
                    }}
                    className={sourceCodePro.className}
                  >
                    <div>Snake speed:</div>
                    <div
                      className={sourceCodePro.className}
                    >{`${snakeGrid.timeoutAfterSnakeMove}ms`}</div>
                  </div>
                  <input
                    type='range'
                    min='1'
                    max='1000'
                    value={`${snakeGrid.timeoutAfterSnakeMove}`}
                    onChange={(e) => {
                      snakeGrid.timeoutAfterSnakeMove = parseInt(
                        e.target.value
                      );
                      handleUpdateDOM();
                      return;
                    }}
                  />
                </div>
                <div
                  className={sourceCodePro.className}
                >{`Snake moved: ${snakeMoves}`}</div>
              </div>
            </div>
            <div
              ref={snakeGridContainer}
              className={styles.snakeGridContainer}
              style={{
                height: `${heightForSnakeGridView}px`,
              }}
            />
            <div className={styles.stats}>
              <div className={styles.stats_item}>
                <div>
                  Grid size: {snakeGrid.columns} x {snakeGrid.rows} (
                  {snakeGrid.columns * snakeGrid.rows} tiles)
                </div>
              </div>
              <div className={styles.stats_item}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Demo;
