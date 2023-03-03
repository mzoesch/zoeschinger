import styles from '@s/home/main.module.scss';

import { Quicksand } from 'next/font/google';
import { useState, useRef } from 'react';
import Link from 'next/link';

const quicksand = Quicksand({ subsets: ['latin'] });

import { DashboardIcon, LabIcon, AtEmailIcon } from '@c/svg';

const Home = () => {
  const [translate, setTranslate] = useState<string>('0%0%');

  const plus = '35%';
  const mid = '0%';
  const minus = '-35%';

  const RefBackgroundThingy = useRef<HTMLElement>(null);
  const RefDashboardIcon = useRef<HTMLElement>(null);
  const RefProjectIcon = useRef<HTMLElement>(null);
  const RefAboutIcon = useRef<HTMLElement>(null);

  const handleZero = () => {
    setTranslate(`0%${plus}`);
  };

  const handleOne = () => {
    setTranslate(`0%${mid}`);
  };

  const handleTwo = () => {
    setTranslate(`0%${minus}`);
  };

  return (
    <>
      <div className={quicksand.className}>
        <div className={styles.overall}>
          <div className={styles.zoeschinger}>
            zoeschinger<span className={styles.com}>.com</span>
          </div>
          <div className={styles.main}>
            <div className={styles.menu}>
              <div className={styles.menu_item} onMouseEnter={handleZero}>
                <Link href='/dashboard' className={styles.link}>
                  Dashboard
                </Link>
              </div>
              <div className={styles.menu_item} onMouseEnter={handleOne}>
                <Link href='/projects' className={styles.link}>
                  Projects
                </Link>
              </div>
              <div className={styles.menu_item} onMouseEnter={handleTwo}>
                <Link href='/about' className={styles.link}>
                  About
                </Link>
              </div>
            </div>
            <div className={styles.background_stuff_wrapper}>
              <div
                className={styles.background_stuff}
                style={{ translate }}
                ref={RefBackgroundThingy as React.RefObject<HTMLDivElement>}
              >
                <div ref={RefDashboardIcon as React.RefObject<HTMLDivElement>}>
                  <DashboardIcon className={styles.icon} />
                </div>
                <div ref={RefProjectIcon as React.RefObject<HTMLDivElement>}>
                  <LabIcon className={styles.icon} />
                </div>
                <div ref={RefAboutIcon as React.RefObject<HTMLDivElement>}>
                  <AtEmailIcon className={styles.icon} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
