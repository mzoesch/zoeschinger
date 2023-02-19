import { navigation } from '@l/navbar/navbarLinks';
import { navbarLinksCurrent, navbarLinksOther } from '@c/Navbar/CSSFix';

const NavbarIconsDesktop = () => {
  return (
    <>
      {navigation.map((element) => {
        return (
          <div className='hidden sm:ml-6 sm:block' key={element.name}>
            <div className='flex space-x-4'>
              <a
                href={element.href}
                className={
                  element.current ? navbarLinksCurrent : navbarLinksOther
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

export { NavbarIconsDesktop };
