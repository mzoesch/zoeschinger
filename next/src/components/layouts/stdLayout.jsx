import Navbar from '@c/Navbar';
import Footer from '@c/Footer';
import styles from '@s/wrapper.module.css';

function Layout({ children }) {
  return (
    <>
      <div className={styles.wrapper}>
        {children}
        <Navbar />
        <Footer />
      </div>
    </>
  );
}

export default Layout;
