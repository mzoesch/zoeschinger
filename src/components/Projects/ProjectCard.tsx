import styles from '@s/projects/cards.module.scss';

import { GitHubLogo, LinkIcon } from '@c/svg';

const ProjectCard = ({
  title,
  subText,
  href,
}: {
  title: any;
  subText: any;
  href: any;
}) => {
  return (
    <>
      <div className={styles.card}>
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
    </>
  );
};

export default ProjectCard;
