import styles from '@s/navbar/main.module.scss';
import btn_styles from '@s/buttons/main.module.scss';

import NavbarImage from './NavbarImage';
import ThemeIcon from './ThemeToggler';

import { LinksDesktop, LinksMobile } from './LinkHelper';

import { BsLayoutSidebarInset, BsLayoutSidebar } from 'react-icons/bs';

import Link from 'next/link';

const Navbar = () => {
  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.left}>
          <div className={styles.left_desktop}>
            <Link href='/'>
              <NavbarImage props={styles.desktop_navbar_img} />
            </Link>
            <LinksDesktop />
          </div>
          <div className={styles.left_mobile}>
            <LinksMobile />
          </div>
        </div>
        {/* Only used on mobile */}
        <div className={styles.middle}>
          <Link href='/'>
            <NavbarImage props={styles.mobile_navbar_img} />
          </Link>
        </div>
        <div className={styles.right}>
          <ThemeIcon />
        </div>
      </div>
    </>
  );
};

export default Navbar;
