import styles from '@s/projects/salgo/main.module.scss';
import btn_styles from '@s/buttons/main.module.scss';

import { TbLayoutNavbar } from 'react-icons/tb';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { RxQuestionMarkCircled } from 'react-icons/rx';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import {
  SortingAlgorithm,
  ArrayIndex,
  ReturnOfReplicateStep,
  DEFAULT_ARRAY_SIZE,
} from '@l/projects/salg';
import { SAlgInformation, salgs } from '@l/projects/salgs';

import { Source_Code_Pro } from 'next/font/google';
const sourceCodePro = Source_Code_Pro({ subsets: ['latin'] });

// Following the norm of ~view.dio
const WRITE_TO_MAIN_ARRAY = 'write_main_arr';
const WRITE_TO_AUXILIARY_ARRAY = 'write_aux_arr';
const COMPARISON = 'comparison';

const SAlgo = () => {
  const [arrayInView, setArrayInView] = useState<ArrayIndex[]>([]);
  const [sa, RESET_SA_COULD_BREAK_EVERYTHING_NEVER_EVER_USE_THIS_SHIT] =
    useState<SortingAlgorithm>(new SortingAlgorithm());

  // region inputs

  const arraySizeSlider = useRef<HTMLInputElement>(null);
  const handleArraySizeSlider = () => {
    sa.size = Number(arraySizeSlider.current?.value) ?? DEFAULT_ARRAY_SIZE;
    handleUpdateDOM();
    return;
  };

  const arraySizeTextField = useRef<HTMLInputElement>(null);
  const handleArraySizeTextField = () => {
    sa.size = Number(arraySizeTextField.current?.value) ?? DEFAULT_ARRAY_SIZE;
    handleUpdateDOM();
    return;
  };

  const delaySlider = useRef<HTMLInputElement>(null);
  const handleDelaySlider = () => {
    sa.delay = Number(delaySlider.current?.value) ?? 0;
    handleUpdateDOM();
    return;
  };

  const delayTextField = useRef<HTMLInputElement>(null);
  const handleDelayTextField = () => {
    sa.delay = Number(delayTextField.current?.value) ?? 0;
    handleUpdateDOM();
    return;
  };

  const [currentSelectedAlgorithm, setCurrentSelectedAlgorithm] =
    useState<SAlgInformation>(salgs[0]);
  const handleSelectNewAlgorithm = (element: SAlgInformation) => {
    setCurrentSelectedAlgorithm(element);
    sa.sortingType = element.apiAcronym;
    return;
  };

  // endregion

  const algorithmView = useRef<HTMLDivElement>(null);
  const handleAlgViewBoundaries = () => {
    sa.boundariesX = algorithmView.current?.getBoundingClientRect().width ?? 0;
    sa.boundariesY = algorithmView.current?.getBoundingClientRect().height ?? 0;

    handleUpdateDOM();
    return;
  };

  const [subnavCollapsed, setSubnavCollapsed] = useState(false);
  const handleCollapseSubnav = () => {
    setSubnavCollapsed(!subnavCollapsed);
    return;
  };

  const [updateDOM, setUpdateDOM] = useState(0);
  const handleUpdateDOM = () => {
    if (updateDOM == 1) {
      setUpdateDOM(0);

      return;
    }

    setUpdateDOM(1);
  };

  return (
    <>
      <div className={styles.main}>
        <h1 className={styles.title}>Sorting Algorithms</h1>
        <div className={styles.text}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione
          aperiam quisquam aspernatur earum, velit nam dicta excepturi accusamus
          rem veritatis.
        </div>
        <div className={styles.alg_view_master}>
          <div className={styles.alg_view_nav}>
            <div className={styles.alg_view_nav_section}>
              <input
                type='range'
                min='1'
                max='256'
                ref={arraySizeSlider as React.RefObject<HTMLInputElement>}
                onChange={handleArraySizeSlider}
                value={`${sa.size}`}
              />
              <input
                type='number'
                ref={arraySizeTextField as React.RefObject<HTMLInputElement>}
                onChange={handleArraySizeTextField}
                value={`${sa.size}`}
                placeholder='array size'
                style={{ width: '3.5rem', textAlign: 'right' }}
              />
              <div
                className={btn_styles.secondary}
                onClick={() => {
                  sa.generateArrayFromSize();
                  handleAlgViewBoundaries();
                  setArrayInView([]);
                  for (let i = 0; i < sa.array.length; i++)
                    setArrayInView((prev) => [
                      ...prev,
                      new ArrayIndex(sa.array[i]),
                    ]);
                }}
              >
                Generate
              </div>
            </div>
            <div className={styles.alg_view_nav_section}>
              <div className={btn_styles.dropdown}>
                <div className={btn_styles.dropdown_btn}>
                  {currentSelectedAlgorithm.title == '-1'
                    ? 'Select Algorithm'
                    : currentSelectedAlgorithm.title}
                  <MdKeyboardArrowRight className={btn_styles.arrow} />
                </div>
                <div className={btn_styles.dropdown_content}>
                  {salgs.map((element: SAlgInformation) => {
                    if (element.title == '-1') return;

                    return (
                      <div
                        key={element.title}
                        onClick={() => {
                          handleSelectNewAlgorithm(element);
                        }}
                      >
                        {element.title}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div
                className={btn_styles.primary}
                onClick={() => {
                  sa.shuffle();
                  setArrayInView([]);
                  for (let i = 0; i < sa.array.length; i++)
                    setArrayInView((prev) => [
                      ...prev,
                      new ArrayIndex(sa.array[i]),
                    ]);
                }}
              >
                Shuffle
              </div>
              <div
                className={btn_styles.primary}
                onClick={async () => {
                  await sa.execute();

                  for (let i = 0; i < sa.sortingSteps.length; i++) {
                    const stepInfo: ReturnOfReplicateStep = sa.replicateStep(i);

                    if (sa.animateSorting == false) continue;

                    if (stepInfo.typeOfChange == WRITE_TO_MAIN_ARRAY) {
                      if (
                        stepInfo.arrayChanged == false &&
                        sa.animateReplication == false
                      ) {
                        sa.skippedFrames += 1;
                        continue;
                      }

                      setArrayInView([]);
                      for (let i = 0; i < sa.array.length; i++)
                        setArrayInView((prev) => [
                          ...prev,
                          new ArrayIndex(sa.array[i]),
                        ]);

                      await new Promise((resolve) =>
                        setTimeout(resolve, sa.delay)
                      );

                      continue;
                    }

                    if (stepInfo.typeOfChange == COMPARISON) {
                      // TODO: Change color
                      continue;
                    }

                    if (stepInfo.typeOfChange == WRITE_TO_AUXILIARY_ARRAY)
                      continue;

                    continue;
                  }

                  if (
                    sa.animateSorting == false ||
                    sa.animateReplication == false
                  ) {
                    setArrayInView([]);
                    for (let i = 0; i < sa.array.length; i++)
                      setArrayInView((prev) => [
                        ...prev,
                        new ArrayIndex(sa.array[i]),
                      ]);
                  }
                }}
              >
                Sort
              </div>
              <div
                className={btn_styles.secondary}
                onClick={handleCollapseSubnav}
              >
                <TbLayoutNavbar />
              </div>
            </div>
          </div>
          <div
            className={styles.alg_view_subnav}
            style={subnavCollapsed ? { display: 'none' } : { display: 'grid' }}
          >
            <div className={styles.alg_view_subnav_section1}>
              <div className={styles.alg_view_subnav_row}>
                <input type='checkbox' />
                <div style={{ marginLeft: '0.5rem' }}>
                  Enable sounds (WiP 🚀)
                </div>
              </div>
              <div className={styles.alg_view_subnav_row}>
                <input
                  type='checkbox'
                  checked={sa.animateShuffle}
                  value='Should the shuffle animation be played?'
                  onChange={() => {
                    sa.animateShuffle = !sa.animateShuffle;
                    handleUpdateDOM();
                  }}
                />
                <div style={{ marginLeft: '0.5rem' }}>Animate shuffle</div>
              </div>
              <div className={styles.alg_view_subnav_row}>
                <input
                  type='checkbox'
                  checked={sa.animateSorting}
                  value='Should the sorting animation be played?'
                  onChange={() => {
                    sa.animateSorting = !sa.animateSorting;
                    handleUpdateDOM();

                    if (sa.animateSorting == false)
                      alert('Weird choice, but okay. 🤔');
                  }}
                />
                <div style={{ marginLeft: '0.5rem' }}>Animate sorting</div>
              </div>
              <div className={styles.alg_view_subnav_row}>
                <div className={styles.alg_view_subnav_row_hint_hover_obj}>
                  <input
                    type='checkbox'
                    checked={sa.animateReplication}
                    value='Should replicated steps be animated?'
                    onChange={() => {
                      sa.animateReplication = !sa.animateReplication;
                      handleUpdateDOM();
                    }}
                  />
                  <div style={{ marginLeft: '0.5rem' }}>
                    Animate replicated steps <RxQuestionMarkCircled />
                  </div>
                  <div className={styles.alg_view_subnav_row_hint}>
                    Some algorithms have steps which are writing a value to an
                    index multiple times.
                    <br />
                    This can happen if the array is using an auxiliary array, or
                    if the algorithm is using a recursive approach.
                  </div>
                </div>
              </div>
              <div className={styles.alg_view_subnav_row}>
                <input
                  type='range'
                  min='1'
                  max='2000'
                  ref={delaySlider as React.RefObject<HTMLInputElement>}
                  onChange={handleDelaySlider}
                  value={`${sa.delay}`}
                />
                <input
                  type='text'
                  ref={delayTextField as React.RefObject<HTMLInputElement>}
                  onChange={handleDelayTextField}
                  value={`${sa.delay}`}
                  placeholder='delay'
                  style={{
                    width: '2rem',
                    textAlign: 'right',
                    marginLeft: '0.5rem',
                    marginRight: '0.5rem',
                  }}
                />
                <div>Delay in ms.</div>
              </div>
              <div className={styles.alg_view_subnav_row}>
                <div
                  className={btn_styles.secondary}
                  onClick={handleAlgViewBoundaries}
                  style={{ width: '100%' }}
                >
                  Array to Viewport
                </div>
              </div>
              <div className={styles.alg_view_subnav_row}>
                <div
                  className={btn_styles.danger_outline}
                  onClick={() => {
                    window.location.reload();
                  }}
                  style={{ width: '100%' }}
                >
                  Reset
                </div>
              </div>
            </div>
            <div className={styles.alg_view_subnav_section2}></div>
          </div>
          <div className={styles.alg_view_visualization_master}>
            <div
              className={styles.alg_view_visualization_view_master}
              style={
                currentSelectedAlgorithm.title == '-1'
                  ? { display: 'none' }
                  : { display: 'block' }
              }
            >
              <div className={sourceCodePro.className}>
                <div className={styles.alg_view_visualization_view_nav}>
                  <div
                    className={styles.alg_view_visualization_view_nav_section}
                  >
                    {/* <div>0 array accesses</div> */}
                    <div>{`${sa.arrayWrites ?? 0}`} writes to main array</div>
                    <div>
                      {`${sa.auxiliaryArrayWrites ?? 0}`} writes to auxiliary
                      array(s)
                    </div>
                    <div>0 array swaps</div>
                    <div>{`${sa.comparison ?? 0}`} comparisons</div>
                  </div>
                  <div
                    className={styles.alg_view_visualization_view_nav_section}
                  >
                    <div>{`${sa.skippedFrames ?? 0}`} skipped frames</div>
                  </div>
                </div>
              </div>
              <div
                className={styles.alg_view_visualization_view_view}
                ref={algorithmView as React.RefObject<HTMLDivElement>}
              >
                <div
                  className={styles.alg_view_visualization_view_view_wrapper}
                >
                  {arrayInView.map((element: ArrayIndex) => {
                    return (
                      <div
                        key={element.id}
                        style={{
                          width: `${sa.boundariesX / sa.size}px`,
                          height: `${
                            sa.boundariesY * (element.value / sa.size)
                          }px`,
                          backgroundColor: 'rgb(var(--primary-negativ))',
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            <div className={styles.alg_view_visualization_explanation}>
              <div className={styles.text}>
                {currentSelectedAlgorithm.title == '-1' ? (
                  <h4>Select an algorithm above to get started.</h4>
                ) : (
                  <>
                    <h1 className={styles.title} style={{ marginTop: '0rem' }}>
                      {currentSelectedAlgorithm.title}
                    </h1>
                    <h2 className={styles.subtitle}>Explanation</h2>
                    <div
                      className={styles.alg_view_visualization_explanation_text}
                    >
                      {currentSelectedAlgorithm.explanation}
                    </div>
                    <div>
                      <h2 className={styles.subtitle}>Time Complexity</h2>
                      <div
                        className={
                          styles.alg_view_visualization_explanation_table
                        }
                      >
                        <div>Best</div>
                        <div>{currentSelectedAlgorithm.bestComplexity}</div>
                        <div>Average</div>
                        <div>{currentSelectedAlgorithm.avgComplexity}</div>
                        <div>Worst</div>
                        <div>{currentSelectedAlgorithm.worstComplexity}</div>
                      </div>
                    </div>
                    <h2 className={styles.subtitle}>Other</h2>
                    <div>
                      <div
                        className={
                          styles.alg_view_visualization_explanation_table
                        }
                      >
                        <div>Memory</div>
                        <div>{currentSelectedAlgorithm.memory}</div>
                        <div>Stable</div>
                        <div>{`${currentSelectedAlgorithm.stable}`}</div>
                      </div>
                    </div>
                    <br />
                    <div>
                      <Link
                        href={currentSelectedAlgorithm.learnMore}
                        about='Link to external website to learn more about this algorithm'
                        target='_blank'
                        className={btn_styles.polished_button}
                      >
                        <div>Learn more</div>
                        <HiOutlineArrowNarrowRight
                          className={btn_styles.polished_button_arrow}
                        />
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SAlgo;
