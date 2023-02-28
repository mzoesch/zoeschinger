import { navigation } from '@l/navbarLinks';
import styles from '@s/navbar/navbarLinks.module.scss';
import { Parser } from '@l/windowHelper';

function DisplayCurrentToLink() {
  navigation.forEach((element) => {
    if (element.href === window.location.pathname) element.current = true;
    else element.current = false;
  });
}

const LinksDesktop = () => {
  Parser(DisplayCurrentToLink);

  return (
    <>
      <div className={styles.all_links}>
        {navigation.map((element) => {
          return (
            <div key={element.name}>
              <a
                href={element.href}
                className={
                  element.current
                    ? styles.link_selected
                    : styles.link_unselected
                }
              >
                {element.name}
              </a>
            </div>
          );
        })}
      </div>
    </>
  );
};

export { LinksDesktop };
