import styles from '@s/projects/main.module.scss';

import { createRef, useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import { projects } from '@l/projects';

const Projects = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  let projectRefs: any = [];

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
    for (let i = 0; i < projectRefs.length; i++) {
      const rect = projectRefs[i].current?.getBoundingClientRect();
      const x = mouse.x - (rect?.left ?? 0);
      const y = mouse.y - (rect?.top ?? 0);

      projectRefs[i].current?.style.setProperty('--mouse-x', `${x}px`);
      projectRefs[i].current?.style.setProperty('--mouse-y', `${y}px`);
    }
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.project_wrapper}>
          {projects.map((element) => {
            const elementRef = createRef<HTMLElement>();
            projectRefs.push(elementRef);

            return (
              <div
                key={element.title}
                ref={elementRef as React.RefObject<HTMLDivElement>}
                className={styles.project}
                onMouseMove={onPrjBoxHover}
              >
                <div className={styles.project_border} />
                <div className={styles.project_content}>
                  <ProjectCard
                    title={element.title}
                    subText={element.subText}
                    href={element.href}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Projects;
