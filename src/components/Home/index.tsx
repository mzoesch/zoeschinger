import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { LabIcon, DashboardIcon, AtEmailIcon } from '@c/svg';

const Home = () => {
  const hoverOpacity = 'opacity-100';
  const hoverOpacityOther = 'opacity-10';
  const normalOpacity = 'opacity-50';

  const svgFocus = 'opacity-100';
  const svgUnfocus = 'opacity-5';

  const RefDashboard = useRef<HTMLElement>(null);
  const RefProjects = useRef<HTMLElement>(null);
  const RefAbout = useRef<HTMLElement>(null);

  const RefDashboardIcon = useRef<HTMLElement>(null);
  const RefProjectsIcon = useRef<HTMLElement>(null);
  const RefAboutIcon = useRef<HTMLElement>(null);

  const [one, setOne] = useState(false);
  const [two, setTwo] = useState(false);
  const [three, setThree] = useState(false);

  const DashboardNode = RefDashboard.current;
  const ProjectNode = RefProjects.current;
  const AboutNode = RefAbout.current;

  const DashboardIconNode = RefDashboardIcon.current;
  const ProjectIconNode = RefProjectsIcon.current;
  const AboutIconNode = RefAboutIcon.current;

  function handleOne(hover: boolean) {
    console.log(hover);
    setOne(hover);

    if (hover == true) {
      DashboardNode !== null && DashboardNode.classList.remove(normalOpacity);
      ProjectNode !== null && ProjectNode.classList.remove(normalOpacity);
      AboutNode !== null && AboutNode.classList.remove(normalOpacity);

      DashboardNode !== null && DashboardNode.classList.add(hoverOpacity);
      ProjectNode !== null && ProjectNode.classList.add(hoverOpacityOther);
      AboutNode !== null && AboutNode.classList.add(hoverOpacityOther);

      DashboardIconNode !== null &&
        DashboardIconNode.classList.remove(svgFocus);
      ProjectIconNode !== null && ProjectIconNode.classList.remove(svgFocus);
      AboutIconNode !== null && AboutIconNode.classList.remove(svgFocus);
      DashboardIconNode !== null &&
        DashboardIconNode.classList.remove(svgUnfocus);
      ProjectIconNode !== null && ProjectIconNode.classList.remove(svgUnfocus);
      AboutIconNode !== null && AboutIconNode.classList.remove(svgUnfocus);

      DashboardIconNode !== null && DashboardIconNode.classList.add(svgFocus);
      ProjectIconNode !== null && ProjectIconNode.classList.add(svgUnfocus);
      AboutIconNode !== null && AboutIconNode.classList.add(svgUnfocus);
    } else {
      DashboardNode !== null && DashboardNode.classList.remove(hoverOpacity);
      ProjectNode !== null && ProjectNode.classList.remove(hoverOpacityOther);
      AboutNode !== null && AboutNode.classList.remove(hoverOpacityOther);

      DashboardNode !== null && DashboardNode.classList.add(normalOpacity);
      ProjectNode !== null && ProjectNode.classList.add(normalOpacity);
      AboutNode !== null && AboutNode.classList.add(normalOpacity);
    }
  }
  function handleTwo(hover: boolean) {
    setTwo(hover);

    if (hover == true) {
      DashboardNode !== null && DashboardNode.classList.remove(normalOpacity);
      ProjectNode !== null && ProjectNode.classList.remove(normalOpacity);
      AboutNode !== null && AboutNode.classList.remove(normalOpacity);

      DashboardNode !== null && DashboardNode.classList.add(hoverOpacityOther);
      ProjectNode !== null && ProjectNode.classList.add(hoverOpacity);
      AboutNode !== null && AboutNode.classList.add(hoverOpacityOther);

      DashboardIconNode !== null &&
        DashboardIconNode.classList.remove(svgFocus);
      ProjectIconNode !== null && ProjectIconNode.classList.remove(svgFocus);
      AboutIconNode !== null && AboutIconNode.classList.remove(svgFocus);
      DashboardIconNode !== null &&
        DashboardIconNode.classList.remove(svgUnfocus);
      ProjectIconNode !== null && ProjectIconNode.classList.remove(svgUnfocus);
      AboutIconNode !== null && AboutIconNode.classList.remove(svgUnfocus);

      DashboardIconNode !== null && DashboardIconNode.classList.add(svgUnfocus);
      ProjectIconNode !== null && ProjectIconNode.classList.add(svgFocus);
      AboutIconNode !== null && AboutIconNode.classList.add(svgUnfocus);
    } else {
      DashboardNode !== null &&
        DashboardNode.classList.remove(hoverOpacityOther);
      ProjectNode !== null && ProjectNode.classList.remove(hoverOpacity);
      AboutNode !== null && AboutNode.classList.remove(hoverOpacityOther);

      DashboardNode !== null && DashboardNode.classList.add(normalOpacity);
      ProjectNode !== null && ProjectNode.classList.add(normalOpacity);
      AboutNode !== null && AboutNode.classList.add(normalOpacity);
    }
  }
  function handleThree(hover: boolean) {
    setThree(hover);

    if (hover == true) {
      DashboardNode !== null && DashboardNode.classList.remove(normalOpacity);
      ProjectNode !== null && ProjectNode.classList.remove(normalOpacity);
      AboutNode !== null && AboutNode.classList.remove(normalOpacity);

      DashboardNode !== null && DashboardNode.classList.add(hoverOpacityOther);
      ProjectNode !== null && ProjectNode.classList.add(hoverOpacityOther);
      AboutNode !== null && AboutNode.classList.add(hoverOpacity);

      DashboardIconNode !== null &&
        DashboardIconNode.classList.remove(svgFocus);
      ProjectIconNode !== null && ProjectIconNode.classList.remove(svgFocus);
      AboutIconNode !== null && AboutIconNode.classList.remove(svgFocus);
      DashboardIconNode !== null &&
        DashboardIconNode.classList.remove(svgUnfocus);
      ProjectIconNode !== null && ProjectIconNode.classList.remove(svgUnfocus);
      AboutIconNode !== null && AboutIconNode.classList.remove(svgUnfocus);

      DashboardIconNode !== null && DashboardIconNode.classList.add(svgUnfocus);
      ProjectIconNode !== null && ProjectIconNode.classList.add(svgUnfocus);
      AboutIconNode !== null && AboutIconNode.classList.add(svgFocus);
    } else {
      DashboardNode !== null &&
        DashboardNode.classList.remove(hoverOpacityOther);
      ProjectNode !== null && ProjectNode.classList.remove(hoverOpacityOther);
      AboutNode !== null && AboutNode.classList.remove(hoverOpacity);

      DashboardNode !== null && DashboardNode.classList.add(normalOpacity);
      ProjectNode !== null && ProjectNode.classList.add(normalOpacity);
      AboutNode !== null && AboutNode.classList.add(normalOpacity);
    }
  }

  useEffect(() => {
    RefDashboard.current.classList.add(normalOpacity);
    RefProjects.current.classList.add(normalOpacity);
    RefAbout.current.classList.add(normalOpacity);

    RefDashboardIcon.current.classList.add(svgUnfocus);
    RefProjectsIcon.current.classList.add(svgFocus);
    RefAboutIcon.current.classList.add(svgUnfocus);

    console.log('init');
  }, []);

  return (
    <>
      <div className='bg-gray-900 -z-20'>
        {/* Background icon */}
        <div className='absolute flex items-center h-screen z-0'>
          <div className='grid grid-cols-1 grid-rows-3 fixed'>
            <div
              className='transition-all duration-1000'
              ref={RefDashboardIcon}
            >
              <DashboardIcon className='h-96' />
            </div>
            <div className='transition-all duration-1000' ref={RefProjectsIcon}>
              <LabIcon className='h-96' />
            </div>
            <div className='transition-all duration-1000' ref={RefAboutIcon}>
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
            ref={RefDashboard}
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
            ref={RefProjects}
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
            ref={RefAbout}
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
