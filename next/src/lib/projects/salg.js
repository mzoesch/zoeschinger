import { shuffle as fisherYatesShuffle } from '@l/fisher_yates';

export const DEFAULT_ARRAY_SIZE = 20;

export class SortingAlgorithm {
  #size;
  #sortingType;
  boundariesX;
  boundariesY;

  #array;

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
}
