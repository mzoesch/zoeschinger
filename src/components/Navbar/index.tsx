import SearchBar from './SearchBar';
import ThemeIcon from './navbarIcons/ThemeIcon';
import NavbarImage from './NavbarImage';

import { NavbarIconsDesktop } from './navbarIcons/DisplayLinkHelper';

import { CgProfile } from 'react-icons/cg';
import { navbarLinksCurrentMobile, navbarLinksOtherMobile } from './CSSFix';

import styles from '@s/navbar/navbar.module.css';

import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { XMarkIcon, Bars3Icon, BellIcon } from '@heroicons/react/24/outline';

import { useEffect } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/', current: true },
  { name: 'Projects', href: '/projects', current: false },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
  function test() {
    navigation.forEach((item) => {
      if (item.href === window.location.pathname) {
        item.current = true;
      } else {
        item.current = false;
      }
    });

    console.log(window.location.pathname);
  }

  useEffect(() => {
    typeof document != undefined ? test() : console.log('undefined');
  });

  return (
    <div>
      <Disclosure as='nav' className='bg-primaryLight dark:bg-primary'>
        {({ open }) => (
          <>
            {/* Mobile */}
            <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
              <div className='relative flex h-16 items-center justify-between'>
                <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                  {/* Mobile menu button*/}
                  <Disclosure.Button
                    className='
                    inline-flex items-center justify-center rounded-md p-2 
                    text-primary dark:text-primaryLight
                    hover:bg-gray-700
                    hover:text-white
                    focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                  >
                    {/* Screen readers only */}
                    <span className='sr-only'>Open main menu</span>
                    {open ? (
                      <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                    ) : (
                      <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                    )}
                  </Disclosure.Button>
                </div>
                <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
                  <div className='flex flex-shrink-0 items-center'>
                    <NavbarImage hideArguments='block lg:hidden' />
                    <NavbarImage hideArguments='hidden lg:block' />
                  </div>
                  <NavbarIconsDesktop />
                </div>

                {/* Navbar right */}
                <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                  <ThemeIcon />

                  {/* Profile dropdown */}
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
                </div>
              </div>
            </div>

            {/* Dropdown menu - mobile only */}
            <Disclosure.Panel className='sm:hidden'>
              <div className='space-y-1 px-2 pt-2 pb-3'>
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as='a'
                    href={item.href}
                    className={classNames(
                      item.current
                        ? navbarLinksCurrentMobile
                        : navbarLinksOtherMobile
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default Navbar;
