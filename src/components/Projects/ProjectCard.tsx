import styles from '@s/projects/cards.module.scss';
import Image from 'next/image';

import { GitHubLogo, LinkIcon, DashboardIcon } from '@c/svg';

const ProjectCard = ({
  title,
  subText,
  href,
}: // img,
{
  title: any;
  subText: any;
  href: any;
  // img: any;
}) => {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.top_img_wrapper}>
          <DashboardIcon className={styles.top_img} />
        </div>
        <div className={styles.bottom}>
          <div className={styles.title}>{title}</div>
          <div className={styles.subText}>{subText}</div>
          <div className={styles.footer}>
            <div>Read more -D</div>
            <div className={styles.links}>
              <GitHubLogo className={styles.icons} />
              <LinkIcon className={styles.icons} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
