import styles from '@s/dashboard/main.module.scss';
import text_styles from '@s/text/main.module.scss';
import layout_styles from '@s/wrapper.module.css';

import Content, { IProps } from './Content';

import Navbar from '@c/Navbar';
import Footer from '@c/Footer';

const DashboardMobile = () => {
  return (
    <div className={layout_styles.wrapper}>
      <div className={styles.back_wrapper_mobile}>
        <div>
          <Content desktop={false} />
        </div>
      </div>
      <Navbar />
      <Footer />
    </div>
  );
};

export default DashboardMobile;
