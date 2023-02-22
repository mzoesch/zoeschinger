import ProfileOverview from './ProfileOverview';

const About = () => {
  return (
    <>
      <div
        className='
      
        relative
        overflow-x-hidden

        z-0
        pt-16
        
        bg-primaryLight
        dark:bg-gray-900
        
        min-h-[200vh]

        '
      >
        {/* Rnd background stuff */}
        <div>
          <div
            aria-hidden='true'
            className='
            absolute
            z-0
            
            -right-96
            
            h-32 w-[60rem]

            rotate-45
            rounded-full
            blur-3xl opacity-40
            bg-gradient-to-r from-sky-300 to-cyan-600'
          />
          <div
            aria-hidden='true'
            className='
            absolute
            z-10
            
            hidden
            sm:block lg:block 2xl:block

            sm:mt-36 sm:-ml-3 sm:h-16 sm:w-[30rem]
            lg:mt-60 lg:-ml-5 lg:h-16 lg:w-[40rem]
            2xl:mt-56 2xl:-ml-5 2xl:h-16 2xl:w-[50rem]

            rotate-12
            rounded-r-full
            bg-gradient-to-tr from-pink-600 to-purple-800'
          />
        </div>

        <div
          className='
          relative
          z-20
          grid
          grid-cols-1
          sm:grid-cols-3
        '
        >
          {/* Profile overview */}
          <div
            className='
          col-span-1
          sm:col-span-1
          '
          >
            <div
              className='
            
            block
            sm:block
            lg:flex lg:justify-end
            2xl:flex 2xl:justify-end

            mt-5'
            >
              <ProfileOverview />
            </div>
          </div>

          {/* Home page */}
          <div
            className='
          col-span-1
          sm:col-span-2
          '
          >
            <div
              className='
            mt-10 mx-5
            sm:mx-0 sm:mr-5 sm:mt-10
            lg:mx-0 lg:mr-5 lg:mt-20
    
            max-w-3xl
            outline outline-gray-600 outline-1 outline-offset-0
            backdrop-blur-xl
            bg-gray-800 bg-opacity-25
            '
            >
              <div className='mx-5'>
                <div className='text-justify text-gray-50 font-light'>
                  <br />
                  <p>Lorem ipsum dolor sit</p>
                  <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et
                    justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                    sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                    ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                    nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et
                    justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                    sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                    ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                    nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et
                    justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                    sea takimata sanctus est Lorem ipsum dolor sit amet.
                  </p>
                  <p>
                    Duis autem vel eum iriure dolor in hendrerit in vulputate
                    velit esse molestie consequat, vel illum dolore eu feugiat
                    nulla facilisis at vero eros et accumsan et iusto odio
                    dignissim qui blandit praesent luptatum zzril delenit augue
                    duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit
                    amet, consectetuer adipiscing elit, sed diam nonummy nibh
                    euismod tincidunt ut laoreet dolore magna aliquam erat
                    volutpat.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
