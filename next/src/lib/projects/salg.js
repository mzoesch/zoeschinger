import { shuffle as fisherYatesShuffle } from '@l/fisher_yates';
import { SAlgo as Model } from '@m/SAlgo';

export const DEFAULT_ARRAY_SIZE = 20;

export class SortingAlgorithm {
  #size;
  #sortingType;
  boundariesX;
  boundariesY;

  #array;
  #sortedSteps;

  constructor(size = DEFAULT_ARRAY_SIZE) {
    this.#size = size;

    return;
  }

  get size() {
    return this.#size;
  }

  set size(n) {
    this.#size = n;
    return false;
  }

  get array() {
    return this.#array;
  }

  setArrayOnSize() {
    this.#array = Array.from({ length: this.#size }, (_, i) => i + 1);
  }

  shuffle() {
    fisherYatesShuffle(this.#array);
  }

  set sortingType(type) {
    this.#sortingType = type;
  }

  temp() {
    console.log(this.#sortedSteps[0]);
  }

  async execute() {
    const apiEndpoint = process.env.PRIVATE_API_ENDPOINT + 'projects/salgo';

    const model = new Model(this.#sortingType, this.#array);

    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(model.toJSON()),
    });
    const json = await response.json();

    this.#sortedSteps = json.sortedSteps;

    return json;
  }
}
