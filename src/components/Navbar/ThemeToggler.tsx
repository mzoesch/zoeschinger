import { FaSun, FaMoon } from 'react-icons/fa';
import useDarkMode from '@h/useDarkMode';
import styles from '@s/navbar/themeIcon.module.css';
import useLoaded from '@l/fixWarningPropDError';

const ThemeIcon = () => {
  const [theme, setTheme] = useDarkMode();
  const handleMode = () => setTheme(!theme);

  const loaded = useLoaded();
  if (!loaded) return <></>;

  return (
    <span onClick={handleMode}>
      {theme ? (
        <FaSun className={styles.sun} />
      ) : (
        <FaMoon className={styles.moon} />
      )}
    </span>
  );
};

export default ThemeIcon;
