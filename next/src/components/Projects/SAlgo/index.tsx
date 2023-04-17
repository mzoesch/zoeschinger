import styles from '@s/projects/salgo/main.module.scss';
import text_styles from '@s/text/main.module.scss';
import btn_styles from '@s/buttons/main.module.scss';
import basic_layout_styles from '@s/projects/basic_layout.module.scss';

import { TbLayoutNavbar } from 'react-icons/tb';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { RxQuestionMarkCircled } from 'react-icons/rx';

import { Projects_SAlgo_SSD } from '@c/svg';

import {
  SortingAlgorithm,
  ArrayIndex,
  ReturnOfReplicateStep,
  ReturnOfReplicateShuffleStep,
  DEFAULT_ARRAY_SIZE,
  WRITE_TO_MAIN_ARRAY,
  WRITE_TO_AUXILIARY_ARRAY,
  ARRAY_SWAP,
  COMPARISON,
  DELAY_FOR_THINGS_AFTER_VIEWPORT_SIZE_CHANGE,
} from '@l/projects/salg';
import { SAlgInformation, salgs } from '@l/projects/salgs';

import Link from 'next/link';

import { useState, useRef, useEffect } from 'react';

import { Source_Code_Pro } from 'next/font/google';
const sourceCodePro = Source_Code_Pro({ subsets: ['latin'] });

const SAlgo = () => {
  // region media queries

  const [smallerThanSCSSlg, setSmallerThanSCSSlg] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setSmallerThanSCSSlg(
        // TODO: Port to useMediaQuery hook
        window.matchMedia('all and (max-width: 1024px)').matches ? true : false
      );
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const algorithmView = useRef<HTMLDivElement>(null);
  const handleAlgViewBoundaries = () => {
    sa.boundariesX = algorithmView.current?.getBoundingClientRect().width ?? 0;
    sa.boundariesY = algorithmView.current?.getBoundingClientRect().height ?? 0;

    handleUpdateDOM();
    return;
  };

  // endregion

  const [arrayInView, setArrayInView] = useState<ArrayIndex[]>([]);
  const [
    sa,
    RESET_SA_COULD_BREAK_EVERYTHING_NEVER_EVER_USE_THIS_SHIT_EXCEPT_YOU_KNOW_WHAT_YOU_ARE_DOING_BUT_EVEN_THEN_BE_PREPARED_FOR_HELLFIRE,
  ] = useState<SortingAlgorithm>(new SortingAlgorithm());

  // region inputs

  const [currentSelectedAlgorithm, setCurrentSelectedAlgorithm] =
    useState<SAlgInformation>(salgs[0]);
  const handleSelectNewAlgorithm = (element: SAlgInformation) => {
    setCurrentSelectedAlgorithm(element);
    sa.sortingType = element.apiAcronym;

    if (typeof sa.array === 'undefined') {
      setTimeout(() => {
        handleGenerateArray();
      }, DELAY_FOR_THINGS_AFTER_VIEWPORT_SIZE_CHANGE);
      return;
    }

    return;
  };

  const arraySizeSlider = useRef<HTMLInputElement>(null);
  const handleArraySizeSlider = () => {
    sa.size = Number(arraySizeSlider.current?.value) ?? DEFAULT_ARRAY_SIZE;
    sa.generateArrayFromSize();
    handleAlgViewBoundaries();

    setArrayInView([]);
    for (let i = 0; i < sa.array.length; i++)
      setArrayInView((prev) => [...prev, new ArrayIndex(sa.array[i])]);

    return;
  };

  const arraySizeTextField = useRef<HTMLInputElement>(null);
  const handleArraySizeTextField = () => {
    sa.size = Number(arraySizeTextField.current?.value) ?? DEFAULT_ARRAY_SIZE;
    sa.generateArrayFromSize();
    handleAlgViewBoundaries();

    setArrayInView([]);
    for (let i = 0; i < sa.array.length; i++)
      setArrayInView((prev) => [...prev, new ArrayIndex(sa.array[i])]);

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

  // endregion

  const [subnavCollapsed, setSubnavCollapsed] = useState(true);
  const handleCollapseSubnav = () => {
    setSubnavCollapsed(!subnavCollapsed);
    return;
  };

  const [explanationCollapsed, setExplanationCollapsed] = useState(false);
  const handleCollapseExplanation = () => {
    setExplanationCollapsed(!explanationCollapsed);
    return;
  };

  const handleGenerateArray = () => {
    sa.generateArrayFromSize();

    handleAlgViewBoundaries();

    setArrayInView([]);
    for (let i = 0; i < sa.array.length; i++)
      setArrayInView((prev) => [...prev, new ArrayIndex(sa.array[i])]);

    return;
  };

  const handleShuffle = async () => {
    sa.currentlyShuffling = true;
    handleUpdateDOM();

    sa.shuffle();

    for (let i = 0; i < sa.shuffleSteps.length; i++) {
      const stepInfo: ReturnOfReplicateShuffleStep = sa.replicateShuffleStep(i);

      if (sa.animateShuffle == false) continue;

      setArrayInView([]);
      for (let j = 0; j < sa.array.length; j++) {
        if (stepInfo.indices.includes(j))
          setArrayInView((prev) => [
            ...prev,
            new ArrayIndex(sa.array[j], true),
          ]);
        else setArrayInView((prev) => [...prev, new ArrayIndex(sa.array[j])]);
      }

      if (sa.soundEnabled == true)
        sa.playSound((sa.shuffleSteps[i].values[0] / sa.size) * 100);

      await new Promise((resolve) => setTimeout(resolve, sa.delay));

      continue;
    }

    setArrayInView([]);
    for (let i = 0; i < sa.array.length; i++)
      setArrayInView((prev) => [...prev, new ArrayIndex(sa.array[i])]);

    sa.currentlyShuffling = false;
    handleUpdateDOM();
  };

  const handleSort = async () => {
    sa.currentlySorting = true;
    handleUpdateDOM();

    await sa.execute();

    for (let i = 0; i < sa.sortingSteps.length; i++) {
      const stepInfo: ReturnOfReplicateStep = sa.replicateStep(i);

      if (sa.animateSorting === false) continue;

      if (stepInfo.typeOfChange === WRITE_TO_MAIN_ARRAY) {
        if (
          stepInfo.arrayChanged === false &&
          sa.animateReplication === false
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
          sa.playSound((sa.sortingSteps[i].values[0] / sa.size) * 100);

        await new Promise((resolve) => setTimeout(resolve, sa.delay));

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
          else setArrayInView((prev) => [...prev, new ArrayIndex(sa.array[j])]);
        }

        if (sa.soundEnabled == true)
          sa.playSound((sa.sortingSteps[i].values[0] / sa.size) * 100);

        await new Promise((resolve) => setTimeout(resolve, sa.delay));

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
          else setArrayInView((prev) => [...prev, new ArrayIndex(sa.array[j])]);
        }

        // TODO: Should comparisons be with sound?

        await new Promise((resolve) => setTimeout(resolve, sa.delay));

        continue;
      }

      if (stepInfo.typeOfChange == WRITE_TO_AUXILIARY_ARRAY) continue;

      continue;
    }

    setArrayInView([]);
    for (let i = 0; i < sa.array.length; i++)
      setArrayInView((prev) => [...prev, new ArrayIndex(sa.array[i])]);

    sa.currentlySorting = false;
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
    const handleResize = () => {
      handleAlgViewBoundaries();

      if (typeof sa.array === 'undefined') return;

      setArrayInView([]);
      for (let i = 0; i < sa.array.length; i++)
        setArrayInView((prev) => [...prev, new ArrayIndex(sa.array[i])]);

      return;
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={basic_layout_styles.wrapper}>
        <div className={basic_layout_styles.main}>
          <div className={basic_layout_styles.top_wrapper}>
            <h1 className={text_styles.title}>Sorting Algorithms</h1>
            <div className={basic_layout_styles.top_information}>
              View source code{' '}
              <Link
                href={
                  'https://github.com/mzoesch/zoeschinger/tree/master/app/lib/salgo'
                }
                target='_blank'
                className={text_styles.link}
              >
                here
              </Link>
              .
            </div>
          </div>
          <div className={text_styles.text}>
            <div className={text_styles.paragraph}>
              This page is a collection of sorting algorithms. It allows the
              user to visualize some algorithms in action and also provides a
              short explanation of how the algorithms work and their complexity.
            </div>
            <div className={text_styles.paragraph}>
              See the{' '}
              <Link href={'#TechnicalDetails'} className={text_styles.link}>
                technical details
              </Link>{' '}
              for more information on how this page was created.
            </div>
            <div className={text_styles.paragraph}>
              When shuffling or sorting the array you will notice two different
              colors:
            </div>
            <div
              className={text_styles.paragraph}
              style={{
                marginLeft: '2rem',
              }}
            >
              <span
                style={{
                  textDecoration: 'underline',
                }}
              >
                Red
              </span>{' '}
              is used to indicate that the current element is being changed in
              some way. Note, it is possible that two elements are red (being
              changed) at the time. This only happens when these elements are
              being swapped.
            </div>
            <div
              className={text_styles.paragraph}
              style={{
                marginLeft: '2rem',
              }}
            >
              <span
                style={{
                  textDecoration: 'underline',
                }}
              >
                Yellow
              </span>{' '}
              is used to indicate that the current element is being compared to
              another element. (Note, in order to see this color you will need
              to enable the &quot;Animate comparisons&quot; option.)
            </div>
          </div>
          <div className={text_styles.text}>
            <h1
              className={text_styles.subtitle}
              style={{
                marginTop: '5rem',
              }}
            >
              Visualization
            </h1>
            <div className={text_styles.text}>
              <h2 className={text_styles.subtitle}>How to get started</h2>
              <div
                className={text_styles.paragraph}
                style={{
                  marginTop: '0rem',
                  marginBottom: '0rem',
                }}
              >
                1. Select an algorithm you want to visualize from the dropdown
                menu.
              </div>
              <div
                className={text_styles.paragraph}
                style={{
                  marginTop: '0rem',
                  marginBottom: '0rem',
                }}
              >
                2. Generate the array. You can freely change the size of the
                array.
              </div>
              <div
                className={text_styles.paragraph}
                style={{
                  marginTop: '0rem',
                  marginBottom: '0rem',
                }}
              >
                3. Shuffle the array and start the visualization.
              </div>
              <div
                className={text_styles.paragraph}
                style={{
                  marginTop: '0rem',
                  marginBottom: '0rem',
                }}
              >
                4. (opt) In the{' '}
                <span
                  onClick={() => {
                    handleCollapseSubnav();
                  }}
                  style={{
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                  className={text_styles.link}
                >
                  drop down
                </span>{' '}
                you can choose between more advanced options.
              </div>
            </div>
            <div className={styles.visualization_wrapper}>
              <div className={styles.visualization_nav}>
                <div className={styles.visualization_nav_top}>
                  <div
                    className={styles.visualization_nav_item}
                    style={
                      smallerThanSCSSlg
                        ? {
                            width: '100%',
                            justifyContent: 'space-between',
                          }
                        : {
                            width: 'auto',
                            justifyContent: 'flex-start',
                          }
                    }
                  >
                    <div className={btn_styles.dropdown}>
                      <div className={btn_styles.dropdown_btn}>
                        {currentSelectedAlgorithm.title === '-1'
                          ? 'Select algorithm'
                          : currentSelectedAlgorithm.title}
                        <MdKeyboardArrowRight className={btn_styles.arrow} />
                      </div>
                      <div className={btn_styles.dropdown_content}>
                        {salgs.map((element: SAlgInformation) => {
                          if (element.title === '-1') return;

                          return (
                            <div
                              key={element.title}
                              onClick={() => handleSelectNewAlgorithm(element)}
                            >
                              {element.title}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className={styles.size_input}>
                      <div>Array size</div>
                      <div>
                        <input
                          type='range'
                          min='1'
                          max='256'
                          ref={
                            arraySizeSlider as React.RefObject<HTMLInputElement>
                          }
                          onChange={handleArraySizeSlider}
                          value={`${sa.size}`}
                          className={styles.slider}
                          disabled={
                            sa.currentlyShuffling
                              ? true
                              : sa.currentlySorting
                              ? true
                              : false
                          }
                        />
                        <input
                          type='number'
                          ref={
                            arraySizeTextField as React.RefObject<HTMLInputElement>
                          }
                          onChange={handleArraySizeTextField}
                          value={`${sa.size}`}
                          placeholder='array size'
                          style={{ width: '3.5rem', textAlign: 'right' }}
                          disabled={
                            sa.currentlyShuffling
                              ? true
                              : sa.currentlySorting
                              ? true
                              : false
                          }
                        />
                      </div>
                    </div>
                    {sa.currentlyShuffling ? (
                      <div className={btn_styles.secondary}>Generate</div>
                    ) : sa.currentlySorting ? (
                      <div className={btn_styles.secondary}>Generate</div>
                    ) : (
                      <div
                        className={btn_styles.secondary}
                        onClick={() => {
                          handleGenerateArray();
                        }}
                      >
                        Generate
                      </div>
                    )}
                  </div>
                  <div className={styles.visualization_nav_item}>
                    <div className={styles.visualization_nav_top_primary_btn}>
                      {sa.currentlyShuffling ? (
                        <div
                          className={btn_styles.primary}
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <AiOutlineLoading3Quarters
                            style={{ marginRight: '0.5rem' }}
                            className={btn_styles.loading}
                          />
                          Shuffling
                        </div>
                      ) : sa.currentlySorting ? (
                        <div className={btn_styles.secondary}>Shuffle</div>
                      ) : currentSelectedAlgorithm.title === '-1' ? (
                        <div className={btn_styles.secondary}>Shuffle</div>
                      ) : (
                        <div
                          className={btn_styles.primary}
                          onClick={() => handleShuffle()}
                        >
                          Shuffle
                        </div>
                      )}
                    </div>
                    <div className={styles.visualization_nav_top_primary_btn}>
                      {sa.currentlySorting ? (
                        <div
                          className={btn_styles.primary}
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <AiOutlineLoading3Quarters
                            style={{ marginRight: '0.5rem' }}
                            className={btn_styles.loading}
                          />
                          Shuffling
                        </div>
                      ) : sa.currentlyShuffling ? (
                        <div className={btn_styles.secondary}>Sort</div>
                      ) : currentSelectedAlgorithm.title === '-1' ? (
                        <div className={btn_styles.secondary}>Sort</div>
                      ) : (
                        <div
                          className={btn_styles.primary}
                          onClick={() => handleSort()}
                        >
                          Sort
                        </div>
                      )}
                    </div>
                    <div className={styles.toggle_advanced_options_nav}>
                      <div
                        className={btn_styles.secondary}
                        onClick={handleCollapseSubnav}
                      >
                        <TbLayoutNavbar />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.visualization_nav_bot}>
                  <div className={styles.visualization_nav_item}>
                    <div
                      className={btn_styles.secondary}
                      onClick={handleCollapseExplanation}
                    >
                      Toggle algorithm explanation
                    </div>
                    <div
                      className={btn_styles.secondary}
                      onClick={handleCollapseSubnav}
                    >
                      Toggle advanced options
                    </div>
                  </div>
                  <div
                    className={styles.visualization_nav_item}
                    style={{
                      justifyContent: 'flex-end',
                    }}
                  >
                    {sa.currentlyShuffling ? (
                      <div
                        className={btn_styles.primary}
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <AiOutlineLoading3Quarters
                          style={{ marginRight: '0.5rem' }}
                          className={btn_styles.loading}
                        />
                        Shuffling
                      </div>
                    ) : sa.currentlySorting ? (
                      <div className={btn_styles.secondary}>Shuffle</div>
                    ) : currentSelectedAlgorithm.title === '-1' ? (
                      <div className={btn_styles.secondary}>Shuffle</div>
                    ) : (
                      <div
                        className={btn_styles.primary}
                        onClick={() => handleShuffle()}
                      >
                        Shuffle
                      </div>
                    )}
                    {sa.currentlySorting ? (
                      <div
                        className={btn_styles.primary}
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <AiOutlineLoading3Quarters
                          style={{ marginRight: '0.5rem' }}
                          className={btn_styles.loading}
                        />
                        Shuffling
                      </div>
                    ) : sa.currentlyShuffling ? (
                      <div className={btn_styles.secondary}>Sort</div>
                    ) : currentSelectedAlgorithm.title === '-1' ? (
                      <div className={btn_styles.secondary}>Sort</div>
                    ) : (
                      <div
                        className={btn_styles.primary}
                        onClick={() => handleSort()}
                      >
                        Sort
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div
                className={styles.visualization_sub_nav}
                style={
                  subnavCollapsed
                    ? {
                        display: 'none',
                      }
                    : {
                        display: 'grid',
                      }
                }
              >
                <h2 className={styles.visualization_sub_nav_header}>General</h2>
                <div className={styles.visualization_sub_nav_item}>
                  <div>
                    <input
                      type='checkbox'
                      checked={sa.soundEnabled}
                      value='Should the shuffling or sorting sound be played when animating?'
                      onChange={() => {
                        sa.soundEnabled = !sa.soundEnabled;
                        handleUpdateDOM();
                        return;
                      }}
                    />
                    <div
                      style={{
                        marginLeft: '0.5rem',
                      }}
                    >
                      Enable sounds (WiP)
                    </div>
                  </div>
                  <div>
                    <input
                      type='checkbox'
                      checked={sa.animateShuffle}
                      value='Should the shuffle animation be played?'
                      onChange={() => {
                        sa.animateShuffle = !sa.animateShuffle;
                        handleUpdateDOM();
                        return;
                      }}
                    />
                    <div style={{ marginLeft: '0.5rem' }}>Animate shuffle</div>
                  </div>
                  <div>
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
                  <div style={{ position: 'relative' }}>
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
                    <div className={styles.tooltip}>
                      <div className={text_styles.paragraph}>
                        Some algorithms have steps which are writing a value to
                        an index multiple times.
                      </div>
                      <div className={text_styles.paragraph}>
                        This can happen if the array is using an auxiliary
                        array, or if the algorithm is using a recursive
                        approach.
                      </div>
                    </div>
                  </div>
                  <div>
                    <input
                      type='checkbox'
                      checked={sa.animateComparison}
                      value='Should the comparison animation be played?'
                      onChange={() => {
                        sa.animateComparison = !sa.animateComparison;
                        handleUpdateDOM();
                      }}
                    />
                    <div style={{ marginLeft: '0.5rem' }}>
                      Animate comparisons
                    </div>
                  </div>
                  <div>
                    <input
                      type='range'
                      min='1'
                      max='2000'
                      ref={delaySlider as React.RefObject<HTMLInputElement>}
                      onChange={handleDelaySlider}
                      className={styles.slider}
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
                  <div></div>
                  <div></div>
                </div>
                <h2 className={styles.visualization_sub_nav_header}>Other</h2>
                <div className={styles.visualization_sub_nav_item}>
                  <div
                    className={btn_styles.secondary}
                    onClick={handleAlgViewBoundaries}
                    style={{
                      margin: '0rem',
                      width: 'calc(100% - 1rem)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    Array to Viewport
                  </div>
                  <div
                    className={btn_styles.danger_outline}
                    onClick={() => {
                      window.location.reload();
                    }}
                    style={{
                      margin: '0rem',
                      width: 'calc(100% - 1rem)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    Reset
                  </div>
                </div>
                <div className={styles.visualization_sub_nav_item}></div>
              </div>
              <div className={styles.visualization}>
                <div
                  className={styles.visualization_view}
                  style={
                    currentSelectedAlgorithm.title === '-1'
                      ? {
                          display: 'none',
                        }
                      : {
                          display: 'block',
                        }
                  }
                >
                  <div className={sourceCodePro.className}>
                    <div className={styles.visualization_view_nav}>
                      <div className={styles.visualization_view_nav_item_grid}>
                        <div>
                          {`${sa.arrayWrites ?? 0}`}
                          {` `}
                          writes to main array
                        </div>
                        <div>
                          {`${sa.auxiliaryArrayWrites ?? 0}`} writes to
                          auxiliary array(s)
                        </div>
                        <div>{`${sa.arraySwaps ?? 0}`} array swaps</div>
                        <div>{`${sa.comparison ?? 0}`} comparisons</div>
                      </div>
                      <div className={styles.visualization_view_nav_item_flex}>
                        <div>{`${sa.skippedFrames ?? 0}`} skipped frames</div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={styles.visualization_view_wrapper}
                    ref={algorithmView as React.RefObject<HTMLDivElement>}
                  >
                    <div>
                      {arrayInView.map((element: ArrayIndex, _: number) => {
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
                                    backgroundColor:
                                      'rgb(var(--primary-negativ))',
                                  }
                            }
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div
                  className={styles.visualization_explanation}
                  style={
                    smallerThanSCSSlg
                      ? explanationCollapsed
                        ? {
                            display: 'none',
                          }
                        : {
                            display: 'block',
                          }
                      : {
                          display: 'block',
                        }
                  }
                >
                  <div className={styles.text}>
                    {currentSelectedAlgorithm.title === '-1' ? (
                      <h4>Select an algorithm above to get started.</h4>
                    ) : (
                      <>
                        <h1
                          className={text_styles.title}
                          style={{ marginTop: '0rem' }}
                        >
                          {currentSelectedAlgorithm.title}
                        </h1>
                        <h2 className={text_styles.subtitle}>Explanation</h2>
                        <div className={text_styles.text}>
                          {currentSelectedAlgorithm.explanation.map(
                            (element: string, index: number) => {
                              return (
                                <div
                                  key={index}
                                  className={text_styles.paragraph}
                                >
                                  {element}
                                </div>
                              );
                            }
                          )}
                        </div>
                        <div>
                          <h2 className={text_styles.subtitle}>
                            Time Complexity
                          </h2>
                          <div
                            className={styles.visualization_complexity_table}
                          >
                            <div>Best</div>
                            <div>{currentSelectedAlgorithm.bestComplexity}</div>
                            <div>Average</div>
                            <div>{currentSelectedAlgorithm.avgComplexity}</div>
                            <div>Worst</div>
                            <div>
                              {currentSelectedAlgorithm.worstComplexity}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={text_styles.text}>
            <h1 className={text_styles.subtitle}>Technical Details</h1>
            <div className={text_styles.paragraph}>
              The visualization is built with HTML divs. The height of each div
              is determined by the value of the element in the array. When you
              shuffle the array, the JavaScript on your browser will calculate
              the shuffle, and saves each step in an array. The visualization
              will then try to replicate each step of the shuffle.
            </div>
            <div className={text_styles.paragraph}>
              The sorting on the other hand works different. Your browser will
              send a request to a server with the algorithm you selected and the
              array that you want to sort. The server will then try to sort it
              and saves each step in an other array. When its done sorting, the
              sever will respond to your browser with each step. Your browser
              will then try to replicate each step of the sorting and colorize
              it respectively.
            </div>
            <div className={text_styles.paragraph}>
              You might be wondering why I didn&apos;t just use the JavaScript
              on your browser to sort the array. Well I think you overlooked the
              insane amount of advantages that the server has over your browser:
            </div>
            <div
              className={text_styles.paragraph}
              style={{
                marginLeft: '2rem',
              }}
            >
              First the server has a lot more computing power than your machine.
              It is running in a virtual box with a bizarre amount of one CPU
              core. And the next gen RAM supports your requests with its
              whopping 500MB of RAM. So the server must be definitely faster
              than your browser.
            </div>
            <div
              className={text_styles.paragraph}
              style={{
                marginLeft: '2rem',
              }}
            >
              Second this approach costs a lot more internet bandwidth. Just
              think about it. When the server responds to your browser with each
              step of the sorting, it will send a lot more data than if your
              browser would just sort the array. Imagine the sheer amount of
              JSON that is being used to describe the thousands of steps for the
              sorting. So offloading the calculations to the server is
              definitely way more efficient.
            </div>
            <div
              className={text_styles.paragraph}
              style={{
                marginLeft: '2rem',
              }}
            >
              Third idk. I ran out of ideas. Submit a PR if you know some.
            </div>
            <div className={text_styles.paragraph}>
              {' '}
              But yes, at least this project was a really great learning
              experience for me and I didn&apos;t enjoyed every minute of it. It
              was pure pain and suffering.
              <br />I hope you had a great time.
            </div>
            <div className={text_styles.signed}>
              <div>Text primarily written by ChatGPT and GitHub Copilot.</div>
            </div>
          </div>
          <div className={text_styles.text}>
            <h1 className={text_styles.subtitle}>System Sequence Diagram</h1>
            <Projects_SAlgo_SSD className={styles.SSD} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SAlgo;
