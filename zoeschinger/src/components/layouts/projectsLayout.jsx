import Navbar from '@c/Navbar';
import Sidebar from '@c/Sidebar';
import Footer from '@c/Footer';
import styles from '@s/wrapper.module.css';

function Layout({ children }) {
  return (
    <>
      <div className={styles.wrapper_projects}>
        <div className={styles.wrapper_sub_projects}>
          <Sidebar />
          <div className={styles.wrapper_children}>
            <Navbar />
            {children}
          </div>
        </div>
        <div className={styles.footer_wrapper}>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Layout;
