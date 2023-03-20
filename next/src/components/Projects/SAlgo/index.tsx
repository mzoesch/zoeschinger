import styles from '@s/projects/salgo/main.module.scss';
import btn_styles from '@s/buttons/main.module.scss';
import { Projects_SAlgo_SSD } from '@c/svg';

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
  ReturnOfReplicateShuffleStep,
  DEFAULT_ARRAY_SIZE,
} from '@l/projects/salg';
import { SAlgInformation, salgs } from '@l/projects/salgs';

import { Source_Code_Pro } from 'next/font/google';
const sourceCodePro = Source_Code_Pro({ subsets: ['latin'] });

// Following the norm of ~view.dio
const WRITE_TO_MAIN_ARRAY = 'write_main_arr';
const WRITE_TO_AUXILIARY_ARRAY = 'write_aux_arr';
const ARRAY_SWAP = 'swap';
const COMPARISON = 'comparison';

const SAlgo = () => {
  const [arrayInView, setArrayInView] = useState<ArrayIndex[]>([]);
  const [
    sa,
    RESET_SA_COULD_BREAK_EVERYTHING_NEVER_EVER_USE_THIS_SHIT_EXCEPT_YOU_KNOW_WHAT_YOU_ARE_DOING_BUT_EVEN_THEN_BE_PREPARED_FOR_HELLFIRE,
  ] = useState<SortingAlgorithm>(new SortingAlgorithm());

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
        <div className={styles.outside_text}>
          <div className={styles.paragraph}>
            This page is a collection of sorting algorithms. It allows the user
            to visualize some algorithms in action, and also provides a short
            explanation of how the algorithm works and its complexity.
          </div>
          <div className={styles.paragraph}>
            See the{' '}
            <Link
              href={'#TechnicalDetails'}
              style={{
                color: 'rgb(70 126 236 / 100%)',
                textDecoration: 'none',
              }}
            >
              technical details
            </Link>{' '}
            for more information on how this page was created.
          </div>
          <div className={styles.paragraph}>
            When shuffling or sorting the array you will notice two different
            colors:
          </div>
          <div className={styles.indented_text}>
            <span style={{ textDecoration: 'underline' }}>Red</span> is used to
            indicate that the current element is being changed in some way.
            Note, it is possible that two elements are red (being changed) at
            the same time. This only happens when these elements are being
            swapped.
          </div>
          <div className={styles.indented_text}>
            <span style={{ textDecoration: 'underline' }}>Yellow</span> is used
            to indicate that the current element is being compared to another
            element. (Note, in order to see this color you will need to enable
            the Animate comparisons option.)
          </div>
        </div>
        <div className={styles.subtitle} style={{ fontSize: '1.5rem' }}>
          Get started
        </div>
        <div className={styles.text}>
          <div className={styles.paragraph}>
            Select an algorithm you want to visualize
          </div>
          <div className={styles.paragraph}>
            Select the size of the array you want to sort and generate it
          </div>
          <div className={styles.paragraph}>
            Shuffle the array and then start the algorithm
          </div>
          <div className={styles.paragraph}>
            Below you can choose more advanced options
          </div>
        </div>
        <h1 className={styles.title} style={{ marginTop: '5rem' }}>
          Visualization
        </h1>
        <div className={styles.alg_view_master} style={{ marginTop: '2.5rem' }}>
          <div className={styles.alg_view_nav}>
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
              <div
                className={btn_styles.primary}
                onClick={async () => {
                  sa.shuffle();

                  for (let i = 0; i < sa.shuffleSteps.length; i++) {
                    const stepInfo: ReturnOfReplicateShuffleStep =
                      sa.replicateShuffleStep(i);

                    if (sa.animateShuffle == false) continue;

                    setArrayInView([]);
                    for (let j = 0; j < sa.array.length; j++) {
                      if (stepInfo.indices.includes(j))
                        setArrayInView((prev) => [
                          ...prev,
                          new ArrayIndex(sa.array[j], true),
                        ]);
                      else
                        setArrayInView((prev) => [
                          ...prev,
                          new ArrayIndex(sa.array[j]),
                        ]);
                    }

                    if (sa.soundEnabled == true)
                      sa.playSound(
                        (sa.shuffleSteps[i].values[0] / sa.size) * 100
                      );

                    await new Promise((resolve) =>
                      setTimeout(resolve, sa.delay)
                    );

                    continue;
                  }

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
                      for (let j = 0; j < sa.array.length; j++) {
                        if (sa.sortingSteps[i].indices[0] == j)
                          setArrayInView((prev) => [
                            ...prev,
                            new ArrayIndex(sa.array[j], true),
                          ]);
                        else
                          setArrayInView((prev) => [
                            ...prev,
                            new ArrayIndex(sa.array[j], false),
                          ]);
                      }

                      if (sa.soundEnabled == true)
                        sa.playSound(
                          (sa.sortingSteps[i].values[0] / sa.size) * 100
                        );

                      await new Promise((resolve) =>
                        setTimeout(resolve, sa.delay)
                      );

                      continue;
                    }

                    if (stepInfo.typeOfChange == ARRAY_SWAP) {
                      setArrayInView([]);
                      for (let j = 0; j < sa.array.length; j++) {
                        if (sa.sortingSteps[i].indices.includes(j))
                          setArrayInView((prev) => [
                            ...prev,
                            new ArrayIndex(sa.array[j], true),
                          ]);
                        else
                          setArrayInView((prev) => [
                            ...prev,
                            new ArrayIndex(sa.array[j]),
                          ]);
                      }

                      if (sa.soundEnabled == true)
                        sa.playSound(
                          (sa.sortingSteps[i].values[0] / sa.size) * 100
                        );

                      await new Promise((resolve) =>
                        setTimeout(resolve, sa.delay)
                      );

                      continue;
                    }

                    if (stepInfo.typeOfChange == COMPARISON) {
                      if (sa.animateComparison == false) continue;

                      setArrayInView([]);
                      for (let j = 0; j < sa.array.length; j++) {
                        if (sa.sortingSteps[i].indices.includes(j))
                          setArrayInView((prev) => [
                            ...prev,
                            new ArrayIndex(sa.array[j], false, true),
                          ]);
                        else
                          setArrayInView((prev) => [
                            ...prev,
                            new ArrayIndex(sa.array[j]),
                          ]);
                      }

                      // TODO: Should comparisons be with sound?

                      await new Promise((resolve) =>
                        setTimeout(resolve, sa.delay)
                      );

                      continue;
                    }

                    if (stepInfo.typeOfChange == WRITE_TO_AUXILIARY_ARRAY)
                      continue;

                    continue;
                  }

                  setArrayInView([]);
                  for (let i = 0; i < sa.array.length; i++)
                    setArrayInView((prev) => [
                      ...prev,
                      new ArrayIndex(sa.array[i]),
                    ]);
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
                <input
                  type='checkbox'
                  checked={sa.soundEnabled}
                  value='Should the sorting sound be played when animating?'
                  onChange={() => {
                    sa.soundEnabled = !sa.soundEnabled;
                    handleUpdateDOM();
                  }}
                />
                <div style={{ marginLeft: '0.5rem' }}>Enable sounds</div>
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
                  type='checkbox'
                  checked={sa.animateComparison}
                  value='Should the comparison animation be played?'
                  onChange={() => {
                    sa.animateComparison = !sa.animateComparison;
                    handleUpdateDOM();
                  }}
                />
                <div style={{ marginLeft: '0.5rem' }}>Animate comparisons</div>
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
                    <div>{`${sa.arraySwaps ?? 0}`} array swaps</div>
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
                        style={
                          element.comparison
                            ? {
                                width: `${sa.boundariesX / sa.size}px`,
                                height: `${
                                  sa.boundariesY * (element.value / sa.size)
                                }px`,
                                backgroundColor: 'rgb(255 255 0 / 100)',
                              }
                            : element.changed
                            ? {
                                width: `${sa.boundariesX / sa.size}px`,
                                height: `${
                                  sa.boundariesY * (element.value / sa.size)
                                }px`,
                                backgroundColor: 'rgb(255 0 0 / 100)',
                              }
                            : {
                                width: `${sa.boundariesX / sa.size}px`,
                                height: `${
                                  sa.boundariesY * (element.value / sa.size)
                                }px`,
                                backgroundColor: 'rgb(var(--primary-negativ))',
                              }
                        }
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
                      {currentSelectedAlgorithm.explanation.map(
                        (element: string) => {
                          return (
                            <div
                              key={element}
                              style={{
                                marginTop: '0.5rem',
                                marginBottom: '0.5rem',
                              }}
                            >
                              {element}
                            </div>
                          );
                        }
                      )}
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
        <div>
          <h1
            className={styles.title}
            style={{ marginTop: '5rem' }}
            id='TechnicalDetails'
          >
            Technical Details
          </h1>
          <div className={styles.outside_text}>
            <div className={styles.paragraph}>
              The visualization is built using different sized divs. The height
              of each div is determined by the value of the element in the
              array. When you shuffle the array, the JavaScript on your browser
              will calculate the shuffle, and saves each step in an array. The
              visualization will then try to replicate each step of the shuffle.
            </div>
            <div className={styles.paragraph}>
              The sorting on the other hand works different. Your browser will
              send a request to a server with the algorithm you selected and the
              array that you want to sort. The server will then try to sort it
              and saves each step in an other array. When its done sorting, the
              sever will respond to your browser with each step. Your browser
              will then try to replicate each step of the sorting and colorize
              it respectively.
            </div>
            <div className={styles.paragraph}>
              You might be wondering why I didn&apos;t just use the JavaScript
              on your browser to sort the array. Well I think you overlooked the
              insane amount of advantages that the server has over your browser:
            </div>
            <div className={styles.indented_text}>
              First the server has a lot more computing power than your machine.
              It is running in a virtual box with a bizarre amount of one CPU
              core. And the next gen RAM supports your requests with its
              whopping 500MB of RAM. So the server must be definitely faster
              than your browser.
            </div>
            <div className={styles.indented_text}>
              Second this approach costs a lot more internet bandwidth. Just
              think about it. When the server responds to your browser with each
              step of the sorting, it will send a lot more data than if your
              browser would just sort the array. Imagine the sheer amount of
              JSON that is being used to describe the thousands of steps for the
              sorting. So offloading the calculations to the server is
              definitely way more efficient.
            </div>
            <div className={styles.indented_text}>
              Third idk. I ran out of ideas. Submit a PR if you know some.
            </div>
            <div className={styles.paragraph}>
              But yes, at least this project was a really great learning
              experience for me and I didn&apos;t enjoyed every minute of it. It
              was pure pain and suffering.
              <br />I hope you had a great time.
            </div>
            <div className={styles.signed}>
              <div>Text primarily written by ChatGPT</div>
            </div>
          </div>
          <div
            className={styles.subtitle}
            style={{
              fontSize: '1.5rem',
              marginTop: '5rem',
              marginBottom: '2rem',
            }}
          >
            System Sequence Diagram
          </div>{' '}
          <Projects_SAlgo_SSD
            style={{
              padding: '1rem',
              backgroundColor: 'rgb(255 255 255 / 100)',
            }}
          />
        </div>
      </div>
    </>
  );
};

export default SAlgo;
