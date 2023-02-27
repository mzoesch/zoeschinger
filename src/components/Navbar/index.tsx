import SearchBar from './SearchBar';
import ThemeIcon from './navbarIcons/ThemeIcon';
import NavbarImage from './NavbarImage';

import {
  NavbarIconsDesktop,
  NavbarIconMobile,
} from './navbarIcons/DisplayLinkHelper';

import { Disclosure } from '@headlessui/react';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline';

const Navbar = () => {
  return (
    <>
      <Disclosure as='nav'>
        {({ open }) => (
          <div
            className={
              open
                ? `
                absolute
                z-10
                min-w-full
 
                bg-slate-400 dark:bg-zinc-900
                bg-opacity-100 dark:bg-opacity-100

                sm:bg-slate-300 sm:dark:bg-gray-700
                sm:bg-opacity-50 sm:dark:bg-opacity-50
                `
                : `
                absolute
                z-10
                min-w-full


                bg-primaryLight dark:bg-primary
                bg-opacity-0 dark:bg-opacity-0

                sm:bg-slate-300 sm:dark:bg-gray-700
                sm:bg-opacity-50 sm:dark:bg-opacity-50
              `
            }
          >
            <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
              <div className='relative flex h-16 items-center justify-between'>
                {/* Mobile menu button*/}
                <div
                  className='
                absolute
                
                flex
                sm:hidden
                
                inset-y-0 left-0 items-center
                '
                >
                  <Disclosure.Button
                    className='
                    inline-flex items-center justify-center rounded-md p-2 
                    text-primary dark:text-primaryLight
                    hover:bg-gray-700
                    hover:text-white
                    focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                  >
                    <span className='sr-only'>Open main menu</span>
                    {open ? (
                      <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                    ) : (
                      <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                    )}
                  </Disclosure.Button>
                </div>

                {/* Navbar desktop */}
                <div
                  className='
                flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'
                >
                  <div className='flex flex-shrink-0 items-center'>
                    <NavbarImage hideArguments='block lg:hidden' />
                    <NavbarImage hideArguments='hidden lg:block' />
                  </div>
                  <NavbarIconsDesktop />
                </div>

                {/* Navbar right */}
                <div
                  className='
                absolute
                inset-y-0 right-0
                hidden
                sm:block
                    h-8
                    w-auto
                items-center pr-2
                sm:static sm:inset-auto sm:ml-6 sm:pr-0'
                >
                  <ThemeIcon />

                  {/* Profile dropdown */}
                  {/*
                  <Menu as='div' className='relative ml-3'>
                    <div>
                      <Menu.Button className='flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                        <span className='sr-only'>Open user menu</span>
                        <CgProfile size='35px' className='text-white' />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter='transition ease-out duration-100'
                      enterFrom='transform opacity-0 scale-95'
                      enterTo='transform opacity-100 scale-100'
                      leave='transition ease-in duration-75'
                      leaveFrom='transform opacity-100 scale-100'
                      leaveTo='transform opacity-0 scale-95'
                    >
                      <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href='#'
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href='#'
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href='#'
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                  */}
                </div>
              </div>
            </div>

            {/* Dropdown menu - mobile only */}
            <NavbarIconMobile />
          </div>
        )}
      </Disclosure>
    </>
  );
};

export default Navbar;
