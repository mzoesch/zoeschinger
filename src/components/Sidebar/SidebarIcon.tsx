import { DashboardIcon, TextIcon, SortIcon, ShuttleIcon } from '@c/svg';
import styles from '@s/sidebar/sidebarIcon.module.scss';
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
        </Link>
        <div className={styles.title}>{title}</div>
      </div>
    </>
  );
};

export default SidebarIcon;
