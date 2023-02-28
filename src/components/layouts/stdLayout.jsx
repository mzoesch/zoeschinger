import Navbar from '@c/Navbar';
import Footer from '@c/Footer';
import styles from '@s/stdLayout/stdLayout.module.css';

function Layout({ children }) {
  return (
    <>
      <div className={styles.overall_grid}>
        <Navbar />
        {children}
        <Footer />
      </div>
    </>
  );
}

export default Layout;
