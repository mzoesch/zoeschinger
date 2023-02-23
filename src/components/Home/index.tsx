import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { LabIcon, DashboardIcon, AtEmailIcon } from '@c/svg';

const Home = () => {
  function addClass(component: any, array: any) {
    if (array[0][0].toString().length > 1) {
      const array2 = array[0];

      for (let i = 0; i < array2.length; i++) {
        const element = array2[i];
        component.current !== null && component.current.classList.add(element);
      }

      return;
    }

    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      component.current !== null && component.current.classList.add(element);
    }
  }

  function removeClass(component: any, array: any) {
    if (array[0][0].toString().length > 1) {
      const array2 = array[0];

      for (let i = 0; i < array2.length; i++) {
        const element = array2[i];
        component.current !== null &&
          component.current.classList.remove(element);
      }

      return;
    }

    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      component.current !== null && component.current.classList.remove(element);
    }
  }

  const hoverOpacity = 'opacity-100';
  const hoverOpacityOther = 'opacity-10';
  const normalOpacity = 'opacity-50';

  const svgFocus = 'opacity-100';
  const svgUnfocus = 'opacity-5';

  const bgGridDashboard = [
    'top-[12rem]',
    'sm:top-[18rem]',
    'lg:top-[40rem]',
    '2xl:top-[48rem]',
  ];
  const bgGridProjects = 'top-0';
  const bgGridAbout = [
    '-top-[12rem]',
    'sm:-top-[18rem]',
    'lg:-top-[40rem]',
    '2xl:-top-[48rem]',
  ];

  const bgGridOpacityHover = 'opacity-25';
  const bgGridSizeHover = [
    'h-[15rem]',
    'sm:h-[23rem]',
    'lg:h-[38rem]',
    '2xl:h-[44rem]',
  ];
  const bgGridMarginHover = ['ml-10', 'sm:ml-18', 'lg:ml-40', '2xl:ml-48'];

  const bgGridOpacityNormal = 'opacity-100';
  const bgGridSizeNormal = [
    'h-[16rem]',
    'sm:h-[25rem]',
    'lg:h-[40rem]',
    '2xl:h-[48rem]',
  ];
  const bgGridMarginNormal = 'ml-0';

  const RefDashboard = useRef<HTMLElement>(null);
  const RefProjects = useRef<HTMLElement>(null);
  const RefAbout = useRef<HTMLElement>(null);

  const RefDashboardIcon = useRef<HTMLElement>(null);
  const RefProjectsIcon = useRef<HTMLElement>(null);
  const RefAboutIcon = useRef<HTMLElement>(null);

  const RefBgGrid = useRef<HTMLElement>(null);

  const [one, setOne] = useState(false);
  const [two, setTwo] = useState(false);
  const [three, setThree] = useState(false);

  function fadeOut() {
    removeClass(RefBgGrid, [bgGridOpacityNormal]);
    addClass(RefBgGrid, [bgGridOpacityHover]);

    removeClass(RefBgGrid, [bgGridMarginNormal]);
    addClass(RefBgGrid, [bgGridMarginHover]);

    // Only one of all icons is needed to be resized
    removeClass(RefDashboardIcon, [bgGridSizeNormal]);
    addClass(RefDashboardIcon, [bgGridSizeHover]);
  }

  function fadeIn() {
    removeClass(RefBgGrid, [bgGridOpacityHover]);
    addClass(RefBgGrid, [bgGridOpacityNormal]);

    removeClass(RefBgGrid, [bgGridMarginHover]);
    addClass(RefBgGrid, [bgGridMarginNormal]);

    removeClass(RefDashboardIcon, [bgGridSizeHover]);
    addClass(RefDashboardIcon, [bgGridSizeNormal]);
  }

  function handleOne(hover: boolean) {
    if (one == hover) return;
    setOne(hover);

    if (hover == true) {
      removeClass(RefDashboard, [normalOpacity]);
      removeClass(RefProjects, [normalOpacity]);
      removeClass(RefAbout, [normalOpacity]);

      addClass(RefDashboard, [hoverOpacity]);
      addClass(RefProjects, [hoverOpacityOther]);
      addClass(RefAbout, [hoverOpacityOther]);

      removeClass(RefDashboardIcon, [svgFocus]);
      removeClass(RefProjectsIcon, [svgFocus]);
      removeClass(RefAboutIcon, [svgFocus]);
      removeClass(RefDashboardIcon, [svgUnfocus]);
      removeClass(RefProjectsIcon, [svgUnfocus]);
      removeClass(RefAboutIcon, [svgUnfocus]);

      addClass(RefDashboardIcon, [svgFocus]);
      addClass(RefProjectsIcon, [svgUnfocus]);
      addClass(RefAboutIcon, [svgUnfocus]);

      removeClass(RefBgGrid, [bgGridDashboard]);
      removeClass(RefBgGrid, [bgGridProjects]);
      removeClass(RefBgGrid, [bgGridAbout]);

      addClass(RefBgGrid, [bgGridDashboard]);

      fadeOut();
    } else {
      removeClass(RefDashboard, [hoverOpacity]);
      removeClass(RefProjects, [hoverOpacityOther]);
      removeClass(RefAbout, [hoverOpacityOther]);

      addClass(RefDashboard, [normalOpacity]);
      addClass(RefProjects, [normalOpacity]);
      addClass(RefAbout, [normalOpacity]);

      fadeIn();
    }
  }

  function handleTwo(hover: boolean) {
    if (two == hover) return;
    setTwo(hover);

    if (hover == true) {
      removeClass(RefDashboard, [normalOpacity]);
      removeClass(RefProjects, [normalOpacity]);
      removeClass(RefAbout, [normalOpacity]);

      addClass(RefDashboard, [hoverOpacityOther]);
      addClass(RefProjects, [hoverOpacity]);
      addClass(RefAbout, [hoverOpacityOther]);

      removeClass(RefDashboardIcon, [svgFocus]);
      removeClass(RefProjectsIcon, [svgFocus]);
      removeClass(RefAboutIcon, [svgFocus]);
      removeClass(RefDashboardIcon, [svgUnfocus]);
      removeClass(RefProjectsIcon, [svgUnfocus]);
      removeClass(RefAboutIcon, [svgUnfocus]);

      addClass(RefDashboardIcon, [svgUnfocus]);
      addClass(RefProjectsIcon, [svgFocus]);
      addClass(RefAboutIcon, [svgUnfocus]);

      removeClass(RefBgGrid, [bgGridDashboard]);
      removeClass(RefBgGrid, [bgGridProjects]);
      removeClass(RefBgGrid, [bgGridAbout]);

      addClass(RefBgGrid, [bgGridProjects]);

      fadeOut();
    } else {
      removeClass(RefDashboard, [hoverOpacityOther]);
      removeClass(RefProjects, [hoverOpacity]);
      removeClass(RefAbout, [hoverOpacityOther]);

      addClass(RefDashboard, [normalOpacity]);
      addClass(RefProjects, [normalOpacity]);
      addClass(RefAbout, [normalOpacity]);

      fadeIn();
    }
  }

  function handleThree(hover: boolean) {
    if (three == hover) return;
    setThree(hover);

    if (hover == true) {
      removeClass(RefDashboard, [normalOpacity]);
      removeClass(RefProjects, [normalOpacity]);
      removeClass(RefAbout, [normalOpacity]);

      addClass(RefDashboard, [hoverOpacityOther]);
      addClass(RefProjects, [hoverOpacityOther]);
      addClass(RefAbout, [hoverOpacity]);

      removeClass(RefDashboardIcon, [svgFocus]);
      removeClass(RefProjectsIcon, [svgFocus]);
      removeClass(RefAboutIcon, [svgFocus]);
      removeClass(RefDashboardIcon, [svgUnfocus]);
      removeClass(RefProjectsIcon, [svgUnfocus]);
      removeClass(RefAboutIcon, [svgUnfocus]);

      addClass(RefDashboardIcon, [svgUnfocus]);
      addClass(RefProjectsIcon, [svgUnfocus]);
      addClass(RefAboutIcon, [svgFocus]);

      removeClass(RefBgGrid, [bgGridDashboard]);
      removeClass(RefBgGrid, [bgGridProjects]);
      removeClass(RefBgGrid, [bgGridAbout]);

      addClass(RefBgGrid, [bgGridAbout]);

      fadeOut();
    } else {
      removeClass(RefDashboard, [hoverOpacityOther]);
      removeClass(RefProjects, [hoverOpacityOther]);
      removeClass(RefAbout, [hoverOpacity]);

      addClass(RefDashboard, [normalOpacity]);
      addClass(RefProjects, [normalOpacity]);
      addClass(RefAbout, [normalOpacity]);

      fadeIn();
    }
  }

  useEffect(() => {
    addClass(RefDashboard, [normalOpacity]);
    addClass(RefProjects, [normalOpacity]);
    addClass(RefAbout, [normalOpacity]);

    addClass(RefDashboardIcon, [svgUnfocus]);
    addClass(RefProjectsIcon, [svgFocus]);
    addClass(RefAboutIcon, [svgUnfocus]);

    addClass(RefBgGrid, [bgGridProjects]);

    addClass(RefDashboardIcon, [bgGridSizeNormal]);
  }, []);

  return (
    <>
      <div className='bg-gray-900 -z-20'>
        <div
          className='
          absolute
          text-gray-500 font-extralight font-quicksand
          
          mt-3 mr-3 text-xl
          sm:mt-3 sm:mr-3 sm:text-3xl
          lg:mt-6 lg:mr-6 lg:text-5xl
          2xl:mt-12 2xl:mr-20
          
          right-0
        '
        >
          zoeschinger<span className='text-xl'>.com</span>
        </div>
        {/* Background icon */}
        <div
          className='absolute flex items-center h-screen z-0 transition-all duration-[1000ms]'
          ref={RefBgGrid as React.RefObject<HTMLDivElement>}
        >
          <div className='grid grid-cols-1 grid-rows-3 fixed '>
            <div
              className='transition-all duration-[1000ms]'
              ref={RefDashboardIcon as React.RefObject<HTMLDivElement>}
            >
              <DashboardIcon className='transition-all duration-500 h-full' />
            </div>
            <div
              className='transition-all duration-[1000ms]'
              ref={RefProjectsIcon as React.RefObject<HTMLDivElement>}
            >
              <LabIcon className='transition-all duration-500 h-full' />
            </div>
            <div
              className='transition-all duration-[1000ms]'
              ref={RefAboutIcon as React.RefObject<HTMLDivElement>}
            >
              <AtEmailIcon className='transition-all duration-500 h-full' />
            </div>
          </div>
        </div>

        {/* Menu */}
        <div
          className='        
        h-screen flex flex-col justify-center relative z-0
        '
        >
          <div
            className='
            transition-all duration-700
            mb-20 text-white

            ml-10 text-4xl
            sm:ml-20 sm:text-7xl
            lg:ml-56
            2xl:ml-96
            '
            ref={RefDashboard as React.RefObject<HTMLDivElement>}
          >
            <Link
              href='/dashboard'
              className='font-quicksand font-extralight'
              onMouseEnter={() => handleOne(true)}
              onMouseOut={() => handleOne(false)}
            >
              Dashboard
            </Link>
          </div>
          <div
            className='
            transition-all duration-700
            text-white
        
            ml-10 text-4xl
            sm:ml-20 sm:text-7xl
            lg:ml-56
            2xl:ml-96
            '
            ref={RefProjects as React.RefObject<HTMLDivElement>}
          >
            <Link
              href='/projects'
              className='font-quicksand font-extralight'
              onMouseEnter={() => handleTwo(true)}
              onMouseOut={() => handleTwo(false)}
            >
              Projects
            </Link>
          </div>
          <div
            className='
            transition-all duration-700
            mt-20 text-white

            ml-10 text-4xl
            sm:ml-20 sm:text-7xl
            lg:ml-56
            2xl:ml-96
            '
            ref={RefAbout as React.RefObject<HTMLDivElement>}
          >
            <Link
              href='/about'
              className='font-quicksand font-extralight'
              onMouseEnter={() => handleThree(true)}
              onMouseOut={() => handleThree(false)}
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
