import styles from '@s/dashboard/main.module.scss';
import text_styles from '@s/text/main.module.scss';

export interface IProps {
  desktop: boolean;
}

const Content = (props: IProps) => {
  return (
    <>
      <div
        style={
          props.desktop
            ? { color: 'white' }
            : { color: 'rgb(var(--primary-negativ) / 100%)' }
        }
      >
        <div className={text_styles.paragraph}>content tbd</div>
        <div className={text_styles.paragraph}></div>
      </div>
    </>
  );
};

export default Content;
