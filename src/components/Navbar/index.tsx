import styles from '@s/navbar/navbar.module.scss';
import { LinksDesktop } from './LinkHelper';

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
            <>X</>
          </div>
        </div>
        {/* Only used on mobile */}
        <div className={styles.middle}>
          <NavbarImage props={styles.mobile_navbar_img} />
        </div>
        <div className={styles.right}>c</div>
      </div>
    </>
  );
};

export default Navbar;
