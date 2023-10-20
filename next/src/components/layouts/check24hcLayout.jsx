import Footer from '@c/Footer/FooterCheck24';
import styles from '@s/wrapper.module.css';

function Layout({ children }) {
  return (
    <>
      <div className={styles.wrapper}>
        {children}
        <Footer />
      </div>
    </>
  );
}

export default Layout;
