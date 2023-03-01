import styles from '@s/navbar/themeIcon.module.css';
import useDarkMode from '@h/useDarkMode';

const DarkModeTogglerThingy = () => {
  const [theme, setTheme] = useDarkMode();
  const handleSwitch = () => setTheme(!theme);

  return (
    <div className={styles.mobile_darkmode}>
      <div>Darkmode</div>
      <div>
        <span className='sr-only'>Toggle darktheme on this website</span>
        <div
          onClick={handleSwitch}
          className={theme ? styles.theme_switch_on : styles.theme_switch_off}
        >
          <div
            className={
              theme
                ? styles.theme_toggler_thingy_on
                : styles.theme_toggler_thingy_off
            }
          />
        </div>
      </div>
    </div>
  );
};

export default DarkModeTogglerThingy;
