import styles from '@s/navbar/navbarLinks.module.scss';

import { navigation } from '@l/navbarLinks';
import { Parser } from '@l/windowHelper';
import { useState } from 'react';
import { HiOutlineBars3BottomLeft, HiXMark } from 'react-icons/hi2';
import NavbarImage from './NavbarImage';
import DarkModeTogglerThingy from './DarkModeTogglerThingy';

function DisplayCurrentToLink() {
  navigation.forEach((element) => {
    if (element.href === window.location.pathname) element.current = true;
    else element.current = false;
  });
}

const LinksDesktop = () => {
  Parser(DisplayCurrentToLink);

  return (
    <>
      <div className={styles.all_links}>
        {navigation.map((element) => {
          return (
            <div key={element.name}>
              <a
                href={element.href}
                className={
                  element.current
                    ? styles.link_selected
                    : styles.link_unselected
                }
              >
                {element.name}
              </a>
            </div>
          );
        })}
      </div>
    </>
  );
};

const LinksMobile = () => {
  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen(!open);

  return (
    <>
      <div className={open ? styles.all_links_open : styles.all_links_closed}>
        <div>
          {open ? (
            <HiXMark
              className={styles.mobile_menu_icon}
              onClick={handleToggle}
            />
          ) : (
            <HiOutlineBars3BottomLeft
              className={styles.mobile_menu_icon}
              onClick={handleToggle}
            />
          )}
          {open ? <NavbarImage props={styles.mobile_navbar_img} /> : null}
        </div>
        {open ? (
          <div className={styles.mobile_dropdown}>
            {navigation.map((element) => {
              return (
                <a
                  key={element.name}
                  href={element.href}
                  className={
                    element.current
                      ? styles.link_selected
                      : styles.link_unselected
                  }
                >
                  {element.name}
                </a>
              );
            })}
            <div className={styles.seperator} />
            <DarkModeTogglerThingy />
          </div>
        ) : null}
      </div>
    </>
  );
};

export { LinksDesktop };
export { LinksMobile };
