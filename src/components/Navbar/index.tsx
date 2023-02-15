import { FaMoon, FaSun } from 'react-icons/fa';
import useDarkMode from '@/hooks/useDarkMode';
import styles from '@s/navbar.module.css';

const navbar: string = `${styles.navbar}
bg-gray-100
dark:bg-gray-700
`;
const navbarIcon: string = `${styles.navbar_icon}`;

const Navbar = () => {
  return (
    <div className={navbar}>
      <SearchBar />
      <ThemeIcon />
    </div>
  );
};

const SearchBar = () => {
  return (
    <div>
      <input type='text' placeholder='Quick search...' />
    </div>
  );
};

const ThemeIcon = () => {
  const [theme, setTheme] = useDarkMode();
  const handleMode = () => setTheme(!theme);

  return (
    <span onClick={handleMode}>
      {theme ? (
        <FaSun className={navbarIcon} />
      ) : (
        <FaMoon className={navbarIcon} />
      )}
    </span>
  );
};

export default Navbar;
