import styles from '@s/navbar/navbarLinks.module.scss';

import NavbarImage from './NavbarImage';
import DarkModeTogglerThingy from './DarkModeTogglerThingy';

import { projects } from '@l/projects';
import { navigation } from '@l/navbarLinks';
import { Parser } from '@l/windowHelper';

import {
  GitHubLogo,
  LinkIcon,
  DashboardIcon,
  TextIcon,
  SortIcon,
  ShuttleIcon,
  BadAppleIcon,
  SnakeAIIcon,
} from '@c/svg';

import { useState, useEffect, useRef } from 'react';
import { HiOutlineBars3BottomLeft, HiXMark } from 'react-icons/hi2';

import Link from 'next/link';

function DisplayCurrentToLink() {
  let p: string = '';
  if ((window.location.pathname.match(/\//g) || []).length > 1)
    p = window.location.pathname.replace(/\/[^/]*$/, '');
  else p = window.location.pathname;

  navigation.forEach((element) => {
    if (element.href === p) element.current = true;
    else element.current = false;
  });
}

function isCurrentPageEqualToProjectPage() {
  let p: string = '';
  if ((window.location.pathname.match(/\//g) || []).length > 1)
    p = window.location.pathname.replace(/\/[^/]*$/, '');
  else p = window.location.pathname;

  if (p === '/projects') return true;
  return false;
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

  useEffect(() => {
    const event = new CustomEvent('hideIFrames');
    window.dispatchEvent(event);
  }, [open]);

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
          {open ? (
            <Link href='/'>
              <NavbarImage props={styles.mobile_navbar_img} />
            </Link>
          ) : null}
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
            <div className={styles.separator} />
            {isCurrentPageEqualToProjectPage() ? (
              <>
                <div className={styles.prj_header}>My projects:</div>
                <div className={styles.projects_overview}>
                  {projects.map((element) => {
                    return (
                      <a
                        key={element.title}
                        href={element.readMore}
                        style={{ textDecoration: 'none' }}
                      >
                        {element.icon === 'DashboardIcon' && (
                          <DashboardIcon className={styles.prj_icon} />
                        )}
                        {element.icon === 'TextIcon' && (
                          <TextIcon className={styles.prj_icon} />
                        )}
                        {element.icon === 'SortIcon' && (
                          <SortIcon className={styles.prj_icon} />
                        )}
                        {element.icon === 'ShuttleIcon' && (
                          <ShuttleIcon className={styles.prj_icon} />
                        )}
                        {element.icon === 'BadAppleIcon' && (
                          <BadAppleIcon className={styles.prj_icon} />
                        )}
                        {element.icon === 'SnakeAIIcon' && (
                          <SnakeAIIcon className={styles.prj_icon} />
                        )}
                        {element.title}
                      </a>
                    );
                  })}
                </div>
                <div className={styles.separator} />
              </>
            ) : null}
            <DarkModeTogglerThingy />
          </div>
        ) : null}
      </div>
    </>
  );
};

export { LinksDesktop };
export { LinksMobile };
