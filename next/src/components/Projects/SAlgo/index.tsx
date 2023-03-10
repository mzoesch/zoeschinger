import styles from '@s/projects/salgo/main.module.scss';
import btn_styles from '@s/buttons/main.module.scss';

const SAlgo = () => {
  const handledrag = () => {
    console.log('drag');
  };

  return (
    <>
      <div className={styles.main}>
        <h1 className={styles.title}>Sorting Algorithms</h1>
        <div className={styles.text}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum,
          inventore quia accusamus explicabo cumque est quaerat cupiditate enim
          repellat veniam perferendis. Est impedit aperiam quo id at nemo autem,
          accusamus minima veritatis, error facilis et harum itaque recusandae
          ea. Placeat iste distinctio officiis optio amet voluptatum deserunt
          quas hic aperiam! Placeat harum cupiditate fugit porro optio, eos in
          id eveniet magnam iure aliquid maxime eum excepturi commodi labore.
          Consectetur eveniet reprehenderit, natus, doloremque voluptatum quos
          fuga quae quibusdam exercitationem tempore sit fugiat minima optio
          nesciunt quia nam perspiciatis magnam quasi? Fugiat nostrum pariatur
          architecto obcaecati quia adipisci magnam explicabo vel!
        </div>
        <div className={styles.alg_master}>
          <div className={styles.nav}>
            <div className={styles.nav_section}>
              <div className={btn_styles.secondary}>generate new array</div>
              <div className={btn_styles.danger_outline}>reset</div>
            </div>
            <div>sep</div>
            <div className={styles.nav_section}>
              <div>
                <form>
                  <label for='roll'>Roll number</label>
                </form>
                <input type='range' min='0' max='100' />
              </div>
              <div>
                <input
                  type={'number'}
                  placeholder={'Enter number here'}
                ></input>
              </div>
            </div>
            <div>Select algorithm</div>
            <div>sep</div>
            <div className={btn_styles.primary}>execute</div>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default SAlgo;
