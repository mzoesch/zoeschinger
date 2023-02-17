import useDarkMode from '@h/useDarkMode';
import { FaSun, FaMoon } from 'react-icons/fa';
import {styles} from './CSSFix.tsx';

const ThemeIcon = () => {
  const [theme, setTheme] = useDarkMode();
  const handleMode = () => setTheme(!theme);

  return (
    <span onClick={handleMode}>
      {theme ? (
        <FaSun className={styles.} />
      ) : (
        <FaMoon className={navbarIconMoon} />
      )}
    </span>
  );
};

export default ThemeIcon;
