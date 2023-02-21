import ProfileOverview from './ProfileOverview';
import gradientStyles from '@s/home/gradients.module.css';
import styles from '@s/home/home.module.css';

const Home = () => {
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
            className='rotate-45
        
        absolute
        z-0

        -right-96
       
        h-32 w-[60rem]
        rounded-full
        blur-3xl opacity-40
        bg-gradient-to-r from-sky-300 to-cyan-600'
          />
          <div
            aria-hidden='true'
            className='rotate-12

          absolute
          z-10

          hidden
          sm:block

          sm:mt-32 sm:-ml-[28rem] sm:mr-0 sm:inset-x-96
          lg:mt-52 lg:-ml-[40rem] lg:mr-0 lg:inset-x-[38rem]
          2xl:mt-52 2xl:-ml-[70rem] 2xl:mr-0 2xl:inset-x-[60rem]

          h-16
          rounded-r-full
          bg-gradient-to-tr from-pink-600 to-purple-800'
          />
        </div>

        <div className={styles.page}>
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
            <div className={styles.welcome_text}>
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

export default Home;
