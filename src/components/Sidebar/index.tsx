import styles from '@s/sidebar/main.module.scss';

import { useRef, useEffect } from 'react';

const Sidebar = () => {
  const outerSB = useRef<HTMLElement>(null);
  const innerSB = useRef<HTMLElement>(null);

  const setWidthToOutSB = () => {
    // FIXME: This is a hacky solution && some px off
    if (innerSB.current) {
      outerSB.current?.style.setProperty(
        '--inner-width',
        `${innerSB.current?.getBoundingClientRect().width}px`
      );
    }
  };

  useEffect(() => {
    setWidthToOutSB();

    window.addEventListener('resize', setWidthToOutSB);

    return () => {
      window.removeEventListener('resize', setWidthToOutSB);
    };
  }, []);

  return (
    <>
      <div
        className={styles.sidebar}
        ref={outerSB as React.RefObject<HTMLDivElement>}
      >
        <div
          className={styles.sidebar_inner}
          ref={innerSB as React.RefObject<HTMLDivElement>}
        >
          <div>icon</div>
          <div>icon</div>
          <div>icon</div>
          <div>icon</div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
