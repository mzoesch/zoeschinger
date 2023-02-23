import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { LabIcon, DashboardIcon, AtEmailIcon } from '@c/svg';

const Home = () => {
  const hoverOpacity = 'opacity-100';
  const hoverOpacityOther = 'opacity-10';
  const normalOpacity = 'opacity-50';

  const svgFocus = 'opacity-100';
  const svgUnfocus = 'opacity-5';

  const bgGridDashboard = 'top-96';
  const bgGridProjects = 'top-0';
  const bgGridAbout = '-top-96';

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

  function handleOne(hover: boolean) {
    if (one == hover) return;
    setOne(hover);

    if (hover == true) {
      RefDashboard.current !== null &&
        RefDashboard.current.classList.remove(normalOpacity);
      RefProjects.current !== null &&
        RefProjects.current.classList.remove(normalOpacity);
      RefAbout.current !== null &&
        RefAbout.current.classList.remove(normalOpacity);

      RefDashboard.current !== null &&
        RefDashboard.current.classList.add(hoverOpacity);
      RefProjects.current !== null &&
        RefProjects.current.classList.add(hoverOpacityOther);
      RefAbout.current !== null &&
        RefAbout.current.classList.add(hoverOpacityOther);

      RefDashboardIcon.current !== null &&
        RefDashboardIcon.current.classList.remove(svgFocus);
      RefProjectsIcon.current !== null &&
        RefProjectsIcon.current.classList.remove(svgFocus);
      RefAboutIcon.current !== null &&
        RefAboutIcon.current.classList.remove(svgFocus);
      RefDashboardIcon.current !== null &&
        RefDashboardIcon.current.classList.remove(svgUnfocus);
      RefProjectsIcon.current !== null &&
        RefProjectsIcon.current.classList.remove(svgUnfocus);
      RefAboutIcon.current !== null &&
        RefAboutIcon.current.classList.remove(svgUnfocus);

      RefDashboardIcon.current !== null &&
        RefDashboardIcon.current.classList.add(svgFocus);
      RefProjectsIcon.current !== null &&
        RefProjectsIcon.current.classList.add(svgUnfocus);
      RefAboutIcon.current !== null &&
        RefAboutIcon.current.classList.add(svgUnfocus);

      RefBgGrid.current !== null &&
        RefBgGrid.current.classList.remove(bgGridDashboard);
      RefBgGrid.current !== null &&
        RefBgGrid.current.classList.remove(bgGridProjects);
      RefBgGrid.current !== null &&
        RefBgGrid.current.classList.remove(bgGridAbout);

      RefBgGrid.current !== null &&
        RefBgGrid.current.classList.add(bgGridDashboard);
    } else {
      RefDashboard.current !== null &&
        RefDashboard.current.classList.remove(hoverOpacity);
      RefProjects.current !== null &&
        RefProjects.current.classList.remove(hoverOpacityOther);
      RefAbout.current !== null &&
        RefAbout.current.classList.remove(hoverOpacityOther);

      RefDashboard.current !== null &&
        RefDashboard.current.classList.add(normalOpacity);
      RefProjects.current !== null &&
        RefProjects.current.classList.add(normalOpacity);
      RefAbout.current !== null &&
        RefAbout.current.classList.add(normalOpacity);
    }
  }
  function handleTwo(hover: boolean) {
    if (two == hover) return;
    setTwo(hover);

    if (hover == true) {
      RefDashboard.current !== null &&
        RefDashboard.current.classList.remove(normalOpacity);
      RefProjects.current !== null &&
        RefProjects.current.classList.remove(normalOpacity);
      RefAbout.current !== null &&
        RefAbout.current.classList.remove(normalOpacity);

      RefDashboard.current !== null &&
        RefDashboard.current.classList.add(hoverOpacityOther);
      RefProjects.current !== null &&
        RefProjects.current.classList.add(hoverOpacity);
      RefAbout.current !== null &&
        RefAbout.current.classList.add(hoverOpacityOther);

      RefDashboardIcon.current !== null &&
        RefDashboardIcon.current.classList.remove(svgFocus);
      RefProjectsIcon.current !== null &&
        RefProjectsIcon.current.classList.remove(svgFocus);
      RefAboutIcon.current !== null &&
        RefAboutIcon.current.classList.remove(svgFocus);
      RefDashboardIcon.current !== null &&
        RefDashboardIcon.current.classList.remove(svgUnfocus);
      RefProjectsIcon.current !== null &&
        RefProjectsIcon.current.classList.remove(svgUnfocus);
      RefAboutIcon.current !== null &&
        RefAboutIcon.current.classList.remove(svgUnfocus);

      RefDashboardIcon.current !== null &&
        RefDashboardIcon.current.classList.add(svgUnfocus);
      RefProjectsIcon.current !== null &&
        RefProjectsIcon.current.classList.add(svgFocus);
      RefAboutIcon.current !== null &&
        RefAboutIcon.current.classList.add(svgUnfocus);

      RefBgGrid.current !== null &&
        RefBgGrid.current.classList.remove(bgGridDashboard);
      RefBgGrid.current !== null &&
        RefBgGrid.current.classList.remove(bgGridProjects);
      RefBgGrid.current !== null &&
        RefBgGrid.current.classList.remove(bgGridAbout);

      RefBgGrid.current !== null &&
        RefBgGrid.current.classList.add(bgGridProjects);
    } else {
      RefDashboard.current !== null &&
        RefDashboard.current.classList.remove(hoverOpacityOther);
      RefProjects.current !== null &&
        RefProjects.current.classList.remove(hoverOpacity);
      RefAbout.current !== null &&
        RefAbout.current.classList.remove(hoverOpacityOther);

      RefDashboard.current !== null &&
        RefDashboard.current.classList.add(normalOpacity);
      RefProjects.current !== null &&
        RefProjects.current.classList.add(normalOpacity);
      RefAbout.current !== null &&
        RefAbout.current.classList.add(normalOpacity);
    }
  }
  function handleThree(hover: boolean) {
    if (three == hover) return;
    setThree(hover);

    if (hover == true) {
      RefDashboard.current !== null &&
        RefDashboard.current.classList.remove(normalOpacity);
      RefProjects.current !== null &&
        RefProjects.current.classList.remove(normalOpacity);
      RefAbout.current !== null &&
        RefAbout.current.classList.remove(normalOpacity);

      RefDashboard.current !== null &&
        RefDashboard.current.classList.add(hoverOpacityOther);
      RefProjects.current !== null &&
        RefProjects.current.classList.add(hoverOpacityOther);
      RefAbout.current !== null && RefAbout.current.classList.add(hoverOpacity);

      RefDashboardIcon.current !== null &&
        RefDashboardIcon.current.classList.remove(svgFocus);
      RefProjectsIcon.current !== null &&
        RefProjectsIcon.current.classList.remove(svgFocus);
      RefAboutIcon.current !== null &&
        RefAboutIcon.current.classList.remove(svgFocus);
      RefDashboardIcon.current !== null &&
        RefDashboardIcon.current.classList.remove(svgUnfocus);
      RefProjectsIcon.current !== null &&
        RefProjectsIcon.current.classList.remove(svgUnfocus);
      RefAboutIcon.current !== null &&
        RefAboutIcon.current.classList.remove(svgUnfocus);

      RefDashboardIcon.current !== null &&
        RefDashboardIcon.current.classList.add(svgUnfocus);
      RefProjectsIcon.current !== null &&
        RefProjectsIcon.current.classList.add(svgUnfocus);
      RefAboutIcon.current !== null &&
        RefAboutIcon.current.classList.add(svgFocus);

      RefBgGrid.current !== null &&
        RefBgGrid.current.classList.remove(bgGridDashboard);
      RefBgGrid.current !== null &&
        RefBgGrid.current.classList.remove(bgGridProjects);
      RefBgGrid.current !== null &&
        RefBgGrid.current.classList.remove(bgGridAbout);

      RefBgGrid.current !== null &&
        RefBgGrid.current.classList.add(bgGridAbout);
    } else {
      RefDashboard.current !== null &&
        RefDashboard.current.classList.remove(hoverOpacityOther);
      RefProjects.current !== null &&
        RefProjects.current.classList.remove(hoverOpacityOther);
      RefAbout.current !== null &&
        RefAbout.current.classList.remove(hoverOpacity);

      RefDashboard.current !== null &&
        RefDashboard.current.classList.add(normalOpacity);
      RefProjects.current !== null &&
        RefProjects.current.classList.add(normalOpacity);
      RefAbout.current !== null &&
        RefAbout.current.classList.add(normalOpacity);
    }
  }

  useEffect(() => {
    RefDashboardIcon.current !== null &&
      RefDashboardIcon.current.classList.add(svgUnfocus);
    RefProjectsIcon.current !== null &&
      RefProjectsIcon.current.classList.add(svgFocus);
    RefAboutIcon.current !== null &&
      RefAboutIcon.current.classList.add(svgUnfocus);

    RefDashboard.current !== null &&
      RefDashboard.current.classList.add(normalOpacity);
    RefProjects.current !== null &&
      RefProjects.current.classList.add(normalOpacity);
    RefAbout.current !== null && RefAbout.current.classList.add(normalOpacity);

    RefBgGrid.current !== null &&
      RefBgGrid.current.classList.add(bgGridProjects);

    console.log('init');
  }, []);

  return (
    <>
      <div className='bg-gray-900 -z-20'>
        {/* Background icon */}
        <div
          className='absolute flex items-center h-screen z-0 transition-all duration-[2000ms]'
          ref={RefBgGrid as React.RefObject<HTMLDivElement>}
        >
          <div className='grid grid-cols-1 grid-rows-3 fixed'>
            <div
              className='transition-all duration-[1500ms]'
              ref={RefDashboardIcon as React.RefObject<HTMLDivElement>}
            >
              <DashboardIcon className='h-96' />
            </div>
            <div
              className='transition-all duration-[1500ms]'
              ref={RefProjectsIcon as React.RefObject<HTMLDivElement>}
            >
              <LabIcon className='h-96' />
            </div>
            <div
              className='transition-all duration-[1500ms]'
              ref={RefAboutIcon as React.RefObject<HTMLDivElement>}
            >
              <AtEmailIcon className='h-96' />
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
            className='ml-80 mb-20 text-white text-7xl transition-all duration-700'
            ref={RefDashboard as React.RefObject<HTMLDivElement>}
          >
            <Link
              href='/dashboard'
              className=''
              onMouseEnter={() => handleOne(true)}
              onMouseOut={() => handleOne(false)}
            >
              Dashboard
            </Link>
          </div>
          <div
            className='block ml-80 text-white text-7xl transition-all duration-700'
            ref={RefProjects as React.RefObject<HTMLDivElement>}
          >
            <Link
              href='/projects'
              className=''
              onMouseEnter={() => handleTwo(true)}
              onMouseOut={() => handleTwo(false)}
            >
              Projects
            </Link>
          </div>
          <div
            className='block ml-80 mt-20 text-white text-7xl transition-all duration-700'
            ref={RefAbout as React.RefObject<HTMLDivElement>}
          >
            <Link
              href='/about'
              className=''
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
