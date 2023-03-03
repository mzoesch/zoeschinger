import styles from '@s/navbar/main.module.scss';
import { LinksDesktop, LinksMobile } from './LinkHelper';
import ThemeIcon from './ThemeToggler';

import NavbarImage from './NavbarImage';

const Navbar = () => {
  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.left}>
          <div className={styles.left_dekstop}>
            <NavbarImage props={styles.desktop_navbar_img} />
            <LinksDesktop />
          </div>
          <div className={styles.left_mobile}>
            <LinksMobile />
          </div>
        </div>
        {/* Only used on mobile */}
        <div className={styles.middle}>
          <NavbarImage props={styles.mobile_navbar_img} />
        </div>
        <div className={styles.right}>
          <ThemeIcon />
        </div>
      </div>
    </>
  );
};

export default Navbar;
