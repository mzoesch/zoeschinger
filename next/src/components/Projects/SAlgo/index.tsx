import styles from '@s/projects/salgo/main.module.scss';
import btn_styles from '@s/buttons/main.module.scss';

import { TbLayoutNavbar } from 'react-icons/tb';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

import Link from 'next/link';
import { useRef, createRef, useState, useEffect } from 'react';

import { SAlgInformation, salgs } from '@l/projects/salgs';
import { SortingAlgorithm, DEFAULT_ARRAY_SIZE } from '@l/projects/salg';

const SAlgo = () => {
  const [sa, RESET_SA] = useState(new SortingAlgorithm());

  // region change array size

  const rangeSlider = useRef<HTMLInputElement>(null);
  const handleRangeSlider = () => {
    sa.size = Number(rangeSlider.current?.value ?? DEFAULT_ARRAY_SIZE);
    sa.setArrayOnSize();

    handleAlgViewBoundaries();
    return;
  };

  const numberTextField = useRef<HTMLInputElement>(null);
  const handleNumberTextField = () => {
    sa.size = Number(numberTextField.current?.value ?? DEFAULT_ARRAY_SIZE);
    sa.setArrayOnSize();

    handleAlgViewBoundaries();
    return;
  };

  // endregion

  const algView = useRef<HTMLElement>(null);
  const handleAlgViewBoundaries = () => {
    sa.boundariesX = algView.current?.getBoundingClientRect().width;
    sa.boundariesY = algView.current?.getBoundingClientRect().height;

    handleUpdateDOM();

    return;
  };

  const [currentSelectedAlgorithm, setCurrentSelectedAlgorithm] = useState(
    salgs[0]
  );
  const handleSelectNewAlgorithm = (element: SAlgInformation) => {
    setCurrentSelectedAlgorithm(element);
    return;
  };

  const [subnavCollapsed, setSubnavCollapsed] = useState(false);
  const handleCollapseSubnav = () => {
    setSubnavCollapsed(!subnavCollapsed);

    return;
  };

  // DOM does not auto update if var in a class is changing
  const [updateDOM, setUpdateDOM] = useState(0);
  const handleUpdateDOM = () => {
    if (updateDOM == 1) {
      setUpdateDOM(0);

      return;
    }

    setUpdateDOM(1);
  };

  useEffect(() => {
    handleAlgViewBoundaries();
    sa.setArrayOnSize();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={styles.main}>
        <h1 className={styles.title}>Sorting Algorithms</h1>
        <div className={styles.text}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo,
          eveniet.
        </div>
        <div className={styles.alg_view_master}>
          <div className={styles.alg_view_nav}>
            <div className={styles.alg_view_nav_section}>
              <input
                type='range'
                min='1'
                max='256'
                ref={rangeSlider as React.RefObject<HTMLInputElement>}
                onChange={handleRangeSlider}
                value={`${sa.size}`}
              />
              <input
                type='number'
                ref={numberTextField as React.RefObject<HTMLInputElement>}
                onChange={handleNumberTextField}
                value={`${sa.size}`}
                style={{ width: '3.5rem', textAlign: 'right' }}
                placeholder='size'
              />
            </div>
            <div className={styles.alg_view_nav_section}>
              <div className={btn_styles.dropdown}>
                <div className={btn_styles.dropdown_btn}>
                  {currentSelectedAlgorithm.title == '-1'
                    ? 'Select algorithm'
                    : currentSelectedAlgorithm.title}
                  <MdKeyboardArrowRight className={btn_styles.arrow} />
                </div>
                <div className={btn_styles.dropdown_content}>
                  {salgs.map((element) => {
                    if (element.title == '-1') return null;

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
              <div
                className={btn_styles.primary}
                onClick={() => {
                  sa.shuffle();
                  handleUpdateDOM();
                  return;
                }}
              >
                Shuffle
              </div>
              <div className={btn_styles.primary}>Execute</div>
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
                <div style={{ marginLeft: '0.5rem' }}>Animate shuffle</div>
              </div>
              <div className={styles.alg_view_subnav_row}>
                <input type='checkbox' />
                <div style={{ marginLeft: '0.5rem' }}>Animate sorting</div>
              </div>
              <div className={styles.alg_view_subnav_row}>
                <input type='checkbox' />
                <div style={{ marginLeft: '0.5rem' }}>
                  Enable sounds (WiP 🚀)
                </div>
              </div>
              <div
                className={btn_styles.secondary}
                onClick={handleAlgViewBoundaries}
              >
                Set array to viewport
              </div>
              <div
                className={btn_styles.secondary}
                onClick={() => {
                  sa.setArrayOnSize();
                  handleAlgViewBoundaries();
                  handleUpdateDOM();
                  return;
                }}
              >
                Generate new array
              </div>
              <div
                className={btn_styles.danger_outline}
                onClick={() => {
                  RESET_SA(new SortingAlgorithm());
                  sa.setArrayOnSize();
                  handleAlgViewBoundaries();
                  handleUpdateDOM();
                  return;
                }}
              >
                Reset
              </div>
            </div>
            <div className={styles.alg_view_subnav_section2}>
              <h1
                className={styles.subtitle}
                style={{ margin: '0rem', fontSize: '1.5rem' }}
              >
                Visualization
              </h1>
              <div className={styles.alg_view_subnav_select_algview}>
                <div className={btn_styles.secondary}>block</div>
                <div className={btn_styles.secondary}>sin</div>
              </div>
            </div>
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
              <div className={styles.alg_view_visualization_view_nav}>
                <div className={styles.alg_view_visualization_view_nav_section}>
                  <div>0 comparisons</div>
                  <div>0 array accesses</div>
                  <div>0 swaps?</div>
                  <div>0 wse</div>
                </div>
                <div className={styles.alg_view_visualization_view_nav_section}>
                  <div>delay: 0.0ms</div>
                </div>
              </div>
              <div
                className={styles.alg_view_visualization_view_view}
                ref={algView as React.RefObject<HTMLDivElement>}
              >
                <div
                  className={styles.alg_view_visualization_view_view_wrapper}
                >
                  {sa.array?.map((element: number) => {
                    return (
                      <div
                        key={`${element}`}
                        style={{
                          width: `${sa.boundariesX / sa.size}px`,
                          height: `${sa.boundariesY * (element / sa.size)}px`,
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
