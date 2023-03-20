// Fisher-Yates-Algorithm, see link for more information
// https://bost.ocks.org/mike/shuffle/

class ShuffleSteps {
  #indices;
  #values;

  constructor(indices, values) {
    this.#indices = indices;
    this.#values = values;
    return;
  }

  toJSON() {
    return {
      indices: this.#indices,
      values: this.#values,
    };
  }
}

function shuffle(arr) {
  const shuffleSteps = [];

  let currentIndex = arr.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    shuffleSteps.push(
      new ShuffleSteps(
        [currentIndex, randomIndex],
        [arr[randomIndex], arr[currentIndex]]
      ).toJSON()
    );

    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex],
      arr[currentIndex],
    ];
  }

  return shuffleSteps;
}

export { shuffle };
export { ShuffleSteps };
