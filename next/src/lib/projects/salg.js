import { shuffle as fisherYatesShuffle } from '@l/fisher_yates';
import { SAlgo as Model } from '@m/SAlgo';

export const DEFAULT_ARRAY_SIZE = 20;

export class ArrayIndex {
  constructor(uniqueID, value) {
    this.uniqueID = uniqueID;
    this.value = value;
  }
}

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
    let tmpArr = Array.from({ length: this.#size }, (_, i) => i + 1);

    this.#array = tmpArr.map((value, index) => {
      return new ArrayIndex(index, value);
    });

    console.log('this.#array set', this.#array); // ok
  }

  shuffle() {
    const tmpArr = this.#array.map((value) => value.value);
    fisherYatesShuffle(tmpArr);
    console.log('tempArr', tmpArr); // ok

    this.#array = tmpArr.map((value, index) => {
      return new ArrayIndex(index, value);
    });

    console.log('this.#array', this.#array); // ok
  }

  set sortingType(type) {
    this.#sortingType = type;
  }

  // Only temp?
  get sortedSteps() {
    return this.#sortedSteps;
  }

  async execute() {
    const tempArr = this.#array.map((value) => value.value);
    console.log('tempArr in exec', tempArr);

    const model = new Model(this.#sortingType, tempArr);
    const res = await model.sendReq();
    this.#sortedSteps = res.sortedSteps;
    console.log('this.#sortedSteps', this.#sortedSteps);

    return res;
  }

  *replicate() {
    for (let i = 0; i < this.#sortedSteps.length; i++) {
      console.log('in yield');
      console.log(this.#array[this.#sortedSteps[i].indices[0]]);
      console.log(this.#sortedSteps[i].values[0]);

      this.#array[this.#sortedSteps[i].indices[0]].value =
        this.#sortedSteps[i].values[0];

      yield this.#sortedSteps[i];
    }
  }
}
