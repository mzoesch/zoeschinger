import styles from '@s/projects/cards.module.scss';
import Image from 'next/image';
import Link from 'next/link';

import { GitHubLogo, LinkIcon, DashboardIcon } from '@c/svg';
import { Raleway, Josefin_Sans } from 'next/font/google';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
const raleway = Raleway({ subsets: ['latin'] });
const josefinSans = Josefin_Sans({ subsets: ['latin'] });

const ProjectCard = ({
  title,
  subText,
  href,
  source,
  readMore,
}: // img,
{
  title: any;
  subText: any;
  href: any;
  source: any;
  readMore: any;
  // img: any;
}) => {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.top_img_wrapper}>
          <DashboardIcon className={styles.top_img} />
        </div>
        <div className={styles.bottom}>
          <div className={styles.title} style={josefinSans.style}>
            {title}
          </div>
          <div className={styles.subText} style={raleway.style}>
            {subText}
          </div>
          <div className={styles.footer}>
            <Link href={readMore} className={styles.read_more}>
              {readMore == '-1' ? null : (
                <div className={styles.button}>
                  <div>Read more</div>
                  <HiOutlineArrowNarrowRight className={styles.arrow} />
                </div>
              )}
            </Link>
            <div className={styles.links}>
              {source == '-1' ? null : (
                <Link href={source} target='_blank'>
                  <GitHubLogo className={styles.icons} />
                </Link>
              )}

              {href == '-1' ? null : (
                <Link href={href} target='_blank'>
                  <LinkIcon className={styles.icons} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
