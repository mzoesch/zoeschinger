import Navbar from '@c/Navbar';
import Footer from '@c/Footer';
import styles from '@s/wrapper.module.css';

function Layout({ children }) {
  return (
    <>
      <div className={styles.wrapper}>
        <Navbar />
        {children}
        <Footer />
      </div>
    </>
  );
}

export default Layout;
