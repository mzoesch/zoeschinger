import styles from '@s/projects/main.module.scss';

import { Parser } from '@l/documentHelper';
import { useRef } from 'react';

const Projects = () => {
  function test() {
    const hanldeOnMouseMove = (e: any) => {
      const { currentTarget: target } = e;

      const rect = target.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;

      console.log(x);
      console.log(y);
    };

    for (const project_card of document.querySelectorAll('.project_card')) {
      project_card.mousemove = (e: any) => {
        hanldeOnMouseMove(e);
      };
    }
  }

  Parser(test);

  return (
    <>
      <div className={styles.main}>
        <div className={styles.project_wrapper}>
          <div id='.project_card' className={styles.project}>
            Project 1
          </div>
          <div id='.project_card' className={styles.project}>
            Project 2
          </div>
          <div className={styles.project}>Project 3</div>
          <div className={styles.project}>Project 4</div>
          <div className={styles.project}>Project 5</div>
          <div className={styles.project}>Project 6</div>
        </div>
      </div>
    </>
  );
};

export default Projects;
