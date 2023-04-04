import anime from 'animejs';

const triggerAnim = (effect, index, main) => {
  effect.toggled
    ? main.current?.style.setProperty(
        '--time',
        `${effect.BACKGROUND_PAN_LENGTH_TOGGLED}s`
      )
    : main.current?.style.setProperty(
        '--time',
        `${effect.BACKGROUND_PAN_LENGTH_UNTOGGLED}s`
      );

  anime({
    targets: `.${effect.CLASS_LIST_ELEMENT_TILE}`,
    opacity: effect.toggled ? 0 : 1,
    delay: anime.stagger(40, {
      grid: [effect.columns, effect.rows],
      from: index,
    }),

    complete: () => {
      effect.canPlayAgain = true;
    },
  });
};

export default triggerAnim;
