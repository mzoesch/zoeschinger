import ProfileOverview from './ProfileOverview';
import gradientStyles from '@s/home/gradients.module.css';
import styles from '@s/home/home.module.css';

const Home = () => {
  return (
    <>
      <div className={styles.home}>
        {/* Rnd background stuff */}
        <div>
          <div aria-hidden='true' className={gradientStyles.profile_gradient} />
          <div aria-hidden='true' className={gradientStyles.blur_gradient} />
        </div>

        <div className={styles.page}>
          {/* Profile overview */}
          <div
            className='
          col-span-1
          sm:col-span-1
          '
          >
            <div className={styles.profile_overview_master}>
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
