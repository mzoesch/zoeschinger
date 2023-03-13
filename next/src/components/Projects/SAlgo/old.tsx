import styles from '@s/projects/salgo/main.module.scss';
import btn_styles from '@s/buttons/main.module.scss';
import Link from 'next/link';

import { MdKeyboardArrowRight } from 'react-icons/md';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { HiQuestionMarkCircle } from 'react-icons/hi';

import { salgs, SAlg } from '@l/salgs';
import { shuffle } from '@l/fisher_yates';

import { useState, createRef, useRef, useEffect } from 'react';

const DEFAULT_ARRAY_SIZE = 10;

const SAlgo = () => {
  const arrayViewDiv = useRef<HTMLElement>(null);
  const textArraySizeInputField = useRef<HTMLInputElement>(null);
  const rangeArraySizeInputField = useRef<HTMLInputElement>(null);
  const test = useRef<HTMLElement>(null);

  const [selAlg, setSelAlg] = useState(salgs[0]);
  const [arraySize, setArraySize] = useState(DEFAULT_ARRAY_SIZE);
  const [arrayInView, setArrayInView] = useState([1, 2]);
  const [arrayInViewVars, setArrayInViewVars] = useState({
    width: 0,
    height: 0,
  });
  const [arrayToBig, setArrayToBig] = useState(false);
  const [maxArraySize, setMaxArraySize] = useState(256);

  const someTesting = () => {
    console.log(test.current?.getBoundingClientRect().height);
  };

  const handleSelectAlg = (element: SAlg) => {
    setSelAlg(element);
    handleGenerateArray();

    return;
  };

  const configureMaxArraySize = () => {
    setMaxArraySize(Number(arrayInViewVars.width * 0.95));

    return;
  };

  const handleInputRangeFieldArraySize = () => {
    configureMaxArraySize();

    if (
      (rangeArraySizeInputField.current?.value ??
        Number(arrayInViewVars.width)) > maxArraySize
    ) {
      setArrayToBig(true);
      return;
    }

    setArrayToBig(false);
    setArraySize(
      Number(rangeArraySizeInputField.current?.value) ?? DEFAULT_ARRAY_SIZE
    );

    return;
  };

  const handleInputTextFieldArraySize = () => {
    configureMaxArraySize();
    if (
      (textArraySizeInputField.current?.value ??
        Number(arrayInViewVars.width)) > maxArraySize
    ) {
      setArrayToBig(true);
      return;
    }

    setArrayToBig(false);
    setArraySize(
      Number(textArraySizeInputField.current?.value) ?? DEFAULT_ARRAY_SIZE
    );

    return;
  };

  const handleGenerateArray = () => {
    setArrayInView(Array.from({ length: arraySize }, (_, i) => i + 1));

    return;
  };

  const handleShuffleArray = () => {
    setArrayInView(shuffle(Array.from({ length: arraySize }, (_, i) => i + 1)));

    return;
  };

  const handleCalculateArrayViewDiv = () => {
    setArrayInViewVars({
      width: arrayViewDiv.current?.getBoundingClientRect().width ?? 0,
      height: arrayViewDiv.current?.getBoundingClientRect().height ?? 0,
    });
  };

  useEffect(() => {
    handleGenerateArray();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arraySize]);

  useEffect(() => {
    const handleResize = (event: Event) => {
      handleCalculateArrayViewDiv();
    };

    window?.addEventListener('resize', handleResize);

    handleCalculateArrayViewDiv();

    return () => {
      window?.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div className={styles.main}>
        <h1 className={styles.title}>Sorting Algorithms</h1>
        <div className={styles.text}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum,
          inventore quia accusamus explicabo cumque est quaerat cupiditate enim
          repellat veniam perferendis. Est impedit aperiam quo id at nemo autem,
          accusamus minima veritatis, error facilis et harum itaque recusandae
          ea. Placeat iste distinctio officiis optio amet voluptatum deserunt
          quas hic aperiam! Placeat harum cupiditate fugit porro optio, eos in
          id eveniet magnam iure aliquid maxime eum excepturi commodi labore.
          Consectetur eveniet reprehenderit, natus, doloremque voluptatum quos
          fuga quae quibusdam exercitationem tempore sit fugiat minima optio
          nesciunt quia nam perspiciatis magnam quasi? Fugiat nostrum pariatur
          architecto obcaecati quia adipisci magnam explicabo vel!
        </div>
        <div className={styles.alg_master}>
          <div className={styles.nav}>
            <div className={styles.nav_section}>
              <div
                className={btn_styles.secondary}
                onClick={handleGenerateArray}
              >
                Generate new array
              </div>
              <div className={btn_styles.danger_outline}>Reset</div>
            </div>
            <div className={styles.nav_section}>
              <div>
                <input
                  type='range'
                  min='1'
                  max={`${maxArraySize}`}
                  onChange={handleInputRangeFieldArraySize}
                  ref={
                    rangeArraySizeInputField as React.MutableRefObject<HTMLInputElement>
                  }
                  value={arraySize}
                />
              </div>
              <div>
                <input
                  type={'number'}
                  placeholder={`${arraySize}`}
                  className={styles.number_input_text}
                  ref={
                    textArraySizeInputField as React.RefObject<HTMLInputElement>
                  }
                  onChange={handleInputTextFieldArraySize}
                  value={arraySize}
                />
                <div
                  className={styles.out_of_bounds}
                  style={
                    arrayToBig ? { display: 'block' } : { display: 'none' }
                  }
                >
                  {`You cannot set this value. The apex that you can set based on your viewport is ${(
                    arrayInViewVars.width * 0.95
                  ).toFixed(0)}.`}
                </div>
              </div>
            </div>
            <div className={styles.nav_section}>
              <div className={btn_styles.dropdown}>
                <div className={btn_styles.drop_btn}>
                  {selAlg.title == '-1' ? 'Select algorithm' : selAlg.title}{' '}
                  <MdKeyboardArrowRight className={btn_styles.arrow} />
                </div>
                <div className={btn_styles.dropdown_content}>
                  {salgs.map((element) => {
                    if (element.title == '-1') return null;
                    return (
                      <div
                        key={element.title}
                        onClick={() => handleSelectAlg(element)}
                      >
                        {element.title}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className={btn_styles.primary}>Shuffle</div>
              <div className={btn_styles.primary}>Execute</div>
            </div>
          </div>
          <div className={styles.alg_bottom}>
            <div
              className={styles.alg_view}
              ref={arrayViewDiv as React.RefObject<HTMLDivElement>}
              onResize={handleCalculateArrayViewDiv}
            >
              {arrayInView.map((element) => {
                return (
                  <div
                    key={element}
                    style={{
                      width: `${arrayInViewVars.width / arraySize}px`,
                      height: `${
                        arrayInViewVars.height * (element / arraySize)
                      }px`,
                    }}
                  />
                );
              })}
            </div>
            <div
              className={styles.alg_explanation}
              ref={test as React.RefObject<HTMLDivElement>}
            >
              {selAlg.title == '-1' ? (
                <h4>Please select an algorithm above to get started.</h4>
              ) : (
                <>
                  <h1 className={styles.title}>{selAlg.title}</h1>
                  <h2 className={styles.subtitle}>Explanation</h2>
                  <div className={styles.alg_explanation_explanation}>
                    {selAlg.explanation}
                  </div>
                  <div>
                    <h2 className={styles.subtitle}>Complexity</h2>

                    <div className={styles.alg_explanation_complexity}>
                      <div>Best</div>
                      <div>{selAlg.bestComplexity}</div>
                      <div>Average</div>
                      <div>{selAlg.avgComplexity}</div>
                      <div>Worst</div>
                      <div>{selAlg.worstComplexity}</div>
                    </div>
                    <br />

                    <div className={styles.alg_explanation_complexity}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'start',
                        }}
                      >
                        <div>Stable</div>
                        <Link
                          target={'_blank'}
                          href={
                            'https://www.baeldung.com/cs/stable-sorting-algorithms'
                          }
                        >
                          <HiQuestionMarkCircle
                            className={styles.link_read_more}
                          />
                        </Link>
                      </div>
                      <div>{`${selAlg.stable}`}</div>
                    </div>
                  </div>

                  <div className={styles.alg_explanation_read_more}>
                    <Link
                      href={selAlg.learnMore}
                      about='Link to external website to learn more about this algorithm'
                      className={styles.alg_explanation_read_more_link}
                      target='_blank'
                    >
                      <div>Learn more</div>
                      <HiOutlineArrowNarrowRight
                        className={styles.alg_explanation_read_more_arrow}
                      />
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SAlgo;
