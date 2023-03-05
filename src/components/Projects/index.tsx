import styles from '@s/projects/main.module.scss';

import { useRef, useEffect, useState } from 'react';

const Projects = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const RefPrjBox1 = useRef<HTMLElement>(null);
  const RefPrjBox2 = useRef<HTMLElement>(null);
  const RefPrjBox3 = useRef<HTMLElement>(null);
  const RefPrjBox4 = useRef<HTMLElement>(null);
  const RefPrjBox5 = useRef<HTMLElement>(null);
  const RefPrjBox6 = useRef<HTMLElement>(null);

  const RefPrjs = [
    RefPrjBox1,
    RefPrjBox2,
    RefPrjBox3,
    RefPrjBox4,
    RefPrjBox5,
    RefPrjBox6,
  ];

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouse({
        x: event.clientX,
        y: event.clientY,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const onPrjBoxHover = () => {
    for (let i = 0; i < RefPrjs.length; i++) {
      const rect = RefPrjs[i].current?.getBoundingClientRect();
      const x = mouse.x - (rect?.left ?? 0);
      const y = mouse.y - (rect?.top ?? 0);

      RefPrjs[i].current?.style.setProperty('--mouse-x', `${x}px`);
      RefPrjs[i].current?.style.setProperty('--mouse-y', `${y}px`);
    }
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.project_wrapper}>
          <div
            ref={RefPrjBox1 as React.RefObject<HTMLDivElement>}
            className={styles.project}
            onMouseMove={onPrjBoxHover}
          >
            <div className={styles.project_border}></div>
            <div className={styles.project_content}>Prj</div>
          </div>
          <div
            ref={RefPrjBox2 as React.RefObject<HTMLDivElement>}
            className={styles.project}
            onMouseMove={onPrjBoxHover}
          >
            <div className={styles.project_border}></div>
            <div className={styles.project_content}>Prj</div>
          </div>
          <div
            ref={RefPrjBox3 as React.RefObject<HTMLDivElement>}
            className={styles.project}
            onMouseMove={onPrjBoxHover}
          >
            <div className={styles.project_border}></div>
            <div className={styles.project_content}>Prj</div>
          </div>
          <div
            ref={RefPrjBox4 as React.RefObject<HTMLDivElement>}
            className={styles.project}
            onMouseMove={onPrjBoxHover}
          >
            <div className={styles.project_border}></div>
            <div className={styles.project_content}>Prj</div>
          </div>
          <div
            ref={RefPrjBox5 as React.RefObject<HTMLDivElement>}
            className={styles.project}
            onMouseMove={onPrjBoxHover}
          >
            <div className={styles.project_border}></div>
            <div className={styles.project_content}>Prj</div>
          </div>
          <div
            ref={RefPrjBox6 as React.RefObject<HTMLDivElement>}
            className={styles.project}
            onMouseMove={onPrjBoxHover}
          >
            <div className={styles.project_border}></div>
            <div className={styles.project_content}>Prj</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
