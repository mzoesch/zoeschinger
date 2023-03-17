import { shuffle as fisherYatesShuffle } from '@l/fisher_yates';
import { SAlgo as Model } from '@m/SAlgo';

const DEFAULT_ARRAY_SIZE = 64;
const DEFAULT_DELAY = 100;

// Following the norm of ~view.dio
const WRITE_TO_MAIN_ARRAY = 'write_main_arr';
const WRITE_TO_AUXILIARY_ARRAY = 'write_aux_arr';
const COMPARISON = 'comparison';

class ArrayIndex {
  id;
  value;

  constructor(value) {
    this.id = Math.random().toString(36).substring(7);
    this.value = value;
  }
}

class ReturnOfReplicateStep {
  arrayChanged;
  typeOfChange;

  constructor(arrayChanged, typeOfChange) {
    this.arrayChanged = arrayChanged;
    this.typeOfChange = typeOfChange;
  }
}

class SortingAlgorithm {
  #size;
  #array;
  #sortingType;
  #sortedSteps;

  #delay;

  boundariesX;
  boundariesY;

  animateShuffle = true;
  animateSorting = true;
  animateReplication = false;

  #arrayWrites = 0;
  #auxiliaryArrayWrites = 0;
  #comparisons = 0;

  #skippedFrames = 0;

  constructor(size = DEFAULT_ARRAY_SIZE, delay = DEFAULT_DELAY) {
    this.#size = size;
    this.#delay = delay;
  }

  get arrayWrites() {
    return this.#arrayWrites;
  }

  get auxiliaryArrayWrites() {
    return this.#auxiliaryArrayWrites;
  }

  get comparison() {
    return this.#comparisons;
  }

  get skippedFrames() {
    return this.#skippedFrames;
  }

  set skippedFrames(n) {
    this.#skippedFrames = n;
    return;
  }

  get array() {
    return this.#array;
  }

  get size() {
    return this.#size;
  }

  set size(n) {
    this.#size = n;
    return;
  }

  get delay() {
    return this.#delay;
  }

  set delay(n) {
    this.#delay = n;
    return;
  }

  set sortingType(type) {
    this.#sortingType = type;
    return;
  }

  get sortingType() {
    return this.#sortingType;
  }

  get sortingSteps() {
    return this.#sortedSteps;
  }

  generateArrayFromSize() {
    this.#array = Array.from({ length: this.#size }, (_, i) => i + 1);

    return;
  }

  shuffle() {
    fisherYatesShuffle(this.#array);
    return;
  }

  // Returns if the array was changed in this step
  replicateStep(step) {
    const stepType = this.#sortedSteps[step].step_type;

    if (stepType == WRITE_TO_MAIN_ARRAY) {
      this.#arrayWrites += 1;

      const valueBefore = this.#array[this.#sortedSteps[step].indices[0]];
      this.#array[this.#sortedSteps[step].indices[0]] =
        this.#sortedSteps[step].values[0];

      if (valueBefore === this.#sortedSteps[step].values[0])
        return new ReturnOfReplicateStep(false, WRITE_TO_MAIN_ARRAY);
      return new ReturnOfReplicateStep(true, WRITE_TO_MAIN_ARRAY);
    }

    if (stepType == COMPARISON) {
      this.#comparisons += 1;
      return new ReturnOfReplicateStep(false, COMPARISON);
    }

    if (stepType == WRITE_TO_AUXILIARY_ARRAY) {
      this.#auxiliaryArrayWrites += this.#sortedSteps[step].values[0];
      return new ReturnOfReplicateStep(false, WRITE_TO_AUXILIARY_ARRAY);
    }

    return ReturnOfReplicateStep(false, 'none');
  }

  async execute() {
    const model = new Model(this.#sortingType, this.#array);
    const res = await model.sendReq();

    this.#sortedSteps = res.sortedSteps;

    return;
  }
}

export { SortingAlgorithm };
export { ArrayIndex };
export { ReturnOfReplicateStep };
export { DEFAULT_ARRAY_SIZE };
