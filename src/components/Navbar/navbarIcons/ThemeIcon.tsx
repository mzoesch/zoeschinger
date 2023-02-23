import useDarkMode from '@h/useDarkMode';
import { FaSun, FaMoon } from 'react-icons/fa';
import useLoaded from '@l/FixWarningPropD';

const ThemeIcon = () => {
  const [theme, setTheme] = useDarkMode();
  const handleMode = () => setTheme(!theme);

  const loaded = useLoaded();

  if (!loaded) return <></>;

  return (
    <span onClick={handleMode}>
      {theme ? (
        <FaSun
          className='text-gray-500
        hover:text-pink-400 mr-3 ml-0
        transition duration-300 ease-in-out
        cursor-pointer'
        />
      ) : (
        <FaMoon
          className='mr-3 ml-0
        transition duration-300 ease-in-out
        cursor-pointer text-gray-500
        hover:text-blue-900'
        />
      )}
    </span>
  );
};

export default ThemeIcon;
