import useDarkMode from '@h/useDarkMode';
import { FaSun, FaMoon } from 'react-icons/fa';
import styles from '@s/navbar/navbar.module.css';
import useLoaded from '@l/FixWarningPropD';

const ThemeIcon = () => {
  const [theme, setTheme] = useDarkMode();
  const handleMode = () => setTheme(!theme);

  const loaded = useLoaded();

  if (!loaded) return <></>;

  return (
    <span onClick={handleMode}>
      {theme ? (
        <FaSun className={styles.navbar_icon_sun} />
      ) : (
        <FaMoon className={styles.navbar_icon_moon} />
      )}
    </span>
  );
};

export default ThemeIcon;
