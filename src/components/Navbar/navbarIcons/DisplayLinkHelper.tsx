import { navigation } from '@l/navbar/navbarLinks';
import useDarkMode from '@h/useDarkMode';
import { Parser } from '@l/windowHelper';
import { Disclosure, Switch } from '@headlessui/react';

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
                    ? `
                    px-3 py-2 rounded-md
                    text-sm
                   
                    bg-gray-900 text-white
                    `
                    : `
                    px-3 py-2 rounded-md
                    text-sm
                    
                    text-gray-900 hover:bg-gray-400 hover:text-white
                    
                    dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white
                    
                    `
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

  const [theme, setTheme] = useDarkMode();
  const handleSwitch = () => setTheme(!theme);

  return (
    <Disclosure.Panel
      className='
      block
      sm:hidden
      
      bg-slate-400 dark:bg-zinc-900

      opacity-100
      bg-opacity-100
    '
    >
      <div className='space-y-1 px-2 pt-2 pb-3'>
        {navigation.map((element) => (
          <Disclosure.Button
            key={element.name}
            as='a'
            href={element.href}
            className={
              element.current
                ? `
                block
                
                text-gray-900 bg-white
                dark:text-white dark:bg-gray-800
                
                px-3 py-2 rounded-md
                text-base
                `
                : `
                block

                text-gray-900 hover:bg-gray-700 hover:text-white
                dark:text-gray-300

                px-3 py-2 rounded-md
                text-base
                `
            }
            aria-current={element.current ? 'page' : undefined}
          >
            {element.name}
          </Disclosure.Button>
        ))}
        {/* Seperators */}
        <div className='h-3' />
        <div
          className='  
        min-w-fit
        h-[0.1rem]
        mx-5
        
        mt-[20px]

        bg-gray-300
        '
        />
        <div className='h-3'></div>
        <div className='flex justify-between items-center'>
          <div
            className='
            
          block

          text-gray-900
          dark:text-gray-300

          px-3 mt-2 rounded-md
          text-base
        '
          >
            Darkmode
          </div>
          <Switch
            checked={theme}
            onChange={handleSwitch}
            className={`
            
            block
            cursor-pointer
            
            mr-3 mt-2
            h-8 w-16

            rounded-full
            ${theme ? 'bg-sky-400' : 'bg-gray-300'}
            
            
            `}
          >
            <span className='sr-only'>
              Switch between themes on this website
            </span>
            <span
              aria-hidden='true'
              className={`
            ${theme ? 'translate-x-4' : '-translate-x-4'}
            
            pointer-events-none
            inline-block
            
            min-h-full
            w-[2rem]
            
            transform rounded-full
            
            bg-white
            shadow-lg
            
            ring-0
            transition duration-200 ease-in-out
            `}
            />
          </Switch>
        </div>
      </div>
    </Disclosure.Panel>
  );
};

export { NavbarIconsDesktop };
export { NavbarIconMobile };
