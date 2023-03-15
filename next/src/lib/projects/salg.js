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

  // Only temp?
  get sortedSteps() {
    return this.#sortedSteps;
  }

  async execute() {
    const model = new Model(this.#sortingType, this.#array);
    const res = await model.sendReq();

    this.#sortedSteps = res.sortedSteps;

    return res;
  }
}
