import { FaMoon } from 'react-icons/fa';
import useDarkMode from '@/hooks/useDarkMode';

const Navbar = () => {
  return (
    <div>
      <ThemeIcon />
    </div>
  );
};

const ThemeIcon = () => {
  const [theme, setTheme] = useDarkMode();
  const handleMode = () => setTheme(!theme);

  return (
    <span onClick={handleMode}>
      <FaMoon />
    </span>
  );
};

export default Navbar;
