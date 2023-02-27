import { Parser } from '@l/documentHelper';
import { useEffect, useState, useRef } from 'react';
import React from 'react';

const Projects = () => {
  const [mousePos, setMousePos] = useState('');
  const Div1 = useRef<HTMLElement>(null);
  const Div2 = useRef<HTMLElement>(null);

  let mY = 0;
  let mX = 0;

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

  function addMouseListener() {
    document.addEventListener('mousemove', (e) => {
      setMousePos(e.clientX + ' ' + e.clientY);
      // Print hit if mouse is over Div1
      if (Div1.current?.contains(e.target as Node)) {
        addClass(Div1, ['bg-gradient-to-l', 'from-purple-700', 'to-pink-600']);

        // Get top left corner of Div2
        const rect = Div2.current?.getBoundingClientRect();
        const x = rect?.left;
        const y = rect?.top;

        console.log(x + ' ' + y);
      } else {
        removeClass(Div1, [
          'bg-gradient-to-l',
          'from-purple-700',
          'to-pink-600',
        ]);
      }
    });
  }

  Parser(addMouseListener);

  // console.log(mousePos);

  return (
    <>
      <div
        className='
      relative
      
      bg-primaryLight
      dark:bg-primary
      pt-16
      min-h-screen

      text-primary
      dark:text-primaryLight

      flex items-center justify-center
      '
      >
        <div className='flex justify-center gap-2 flex-wrap'>
          <div
            className='
            w-80 h-60 cursor-pointer opacity-80
            '
            ref={Div1 as React.RefObject<HTMLDivElement>}
          >
            hi
          </div>
          <div
            className={`
            [background:radial-gradient(closest-side,#3f87a6,#ebf8e1,#f69d3c,transparent70%);]
            
            w-80 h-60 relative
          `}
            ref={Div2 as React.RefObject<HTMLDivElement>}
          >
            hi
          </div>
          <div className='bg-slate-800 w-80 h-60'>hi</div>
          <div className='bg-slate-800 w-80 h-60'>hi</div>
          <div className='bg-slate-800 w-80 h-60'>hi</div>
          <div className='bg-slate-800 w-80 h-60'>hi</div>
        </div>
      </div>
    </>
  );
};

export default Projects;
