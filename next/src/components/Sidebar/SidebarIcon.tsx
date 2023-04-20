import styles from '@s/sidebar/sidebarIcon.module.scss';

import {
  DashboardIcon,
  TextIcon,
  SortIcon,
  ShuttleIcon,
  BadAppleIcon,
  SnakeAIIcon,
} from '@c/svg';

import Link from 'next/link';

const SidebarIcon = ({
  icon,
  title,
  href,
}: {
  icon: string;
  title: string;
  href: string;
}) => {
  return (
    <>
      <div className={styles.icon_wrapper}>
        <Link href={href}>
          {icon === 'DashboardIcon' && (
            <div className={styles.icon}>
              <DashboardIcon className={styles.icon_inner} />
            </div>
          )}
          {icon === 'TextIcon' && (
            <div className={styles.icon}>
              <TextIcon className={styles.icon_inner} />
            </div>
          )}
          {icon === 'ShuttleIcon' && (
            <div className={styles.icon}>
              <ShuttleIcon className={styles.icon_inner} />
            </div>
          )}
          {icon === 'SortIcon' && (
            <div className={styles.icon}>
              <SortIcon className={styles.icon_inner} />
            </div>
          )}
          {icon === 'BadAppleIcon' && (
            <div className={styles.icon}>
              <BadAppleIcon className={styles.icon_inner} />
            </div>
          )}
          {icon === 'SnakeAIIcon' && (
            <div className={styles.icon}>
              <SnakeAIIcon className={styles.icon_inner} />
            </div>
          )}
        </Link>
        <div className={styles.title}>{title}</div>
      </div>
    </>
  );
};

export default SidebarIcon;
