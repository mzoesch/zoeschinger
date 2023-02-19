import { navigation } from '@l/navbar/navbarLinks';
import { Parser } from '@l/windowHelper';
import {
  navbarLinksCurrentDesktop,
  navbarLinksOtherDesktop,
  navbarLinksCurrentMobile,
  navbarLinksOtherMobile,
} from '@c/Navbar/CSSFix';
import { Disclosure } from '@headlessui/react';

function DisplayCurrentToLink() {
  navigation.forEach((element) => {
    if (element.href === window.location.pathname) element.current = true;
    else element.current = false;
  });
}

const NavbarIconsDesktop = () => {
  Parser(DisplayCurrentToLink);

  return (
    <>
      {navigation.map((element) => {
        return (
          <div key={element.name} className='hidden sm:ml-6 sm:block'>
            <div className='flex space-x-4'>
              <a
                href={element.href}
                className={
                  element.current
                    ? navbarLinksCurrentDesktop
                    : navbarLinksOtherDesktop
                }
                aria-current={element.current ? 'page' : undefined}
              >
                {element.name}
              </a>
            </div>
          </div>
        );
      })}
    </>
  );
};

const NavbarIconMobile = () => {
  Parser(DisplayCurrentToLink);

  return (
    <Disclosure.Panel className='sm:hidden'>
      <div className='space-y-1 px-2 pt-2 pb-3'>
        {navigation.map((element) => (
          <Disclosure.Button
            key={element.name}
            as='a'
            href={element.href}
            className={
              element.current
                ? navbarLinksCurrentMobile
                : navbarLinksOtherMobile
            }
            aria-current={element.current ? 'page' : undefined}
          >
            {element.name}
          </Disclosure.Button>
        ))}
      </div>
    </Disclosure.Panel>
  );
};

export { NavbarIconsDesktop };
export { NavbarIconMobile };
