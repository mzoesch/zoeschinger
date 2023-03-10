import styles from '@s/projects/zoeschinger/main.module.scss';
import Link from 'next/link';

const Zoeschinger = () => {
  return (
    <>
      <div className={styles.main}>
        <h1>This website</h1>
        <Link href={'/projects/zoeschinger/reqtest'}>to req testing</Link>
      </div>
    </>
  );
};

export default Zoeschinger;
