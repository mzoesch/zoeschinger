import {
  shuffle as fisherYatesShuffle,
  ShuffleSteps as fisherYatesShuffleSteps,
} from '@l/fisher_yates';
import { SAlgo as Model } from '@m/SAlgo';

const DEFAULT_ARRAY_SIZE = 64;
const DEFAULT_DELAY = 100;

// Following the norm of ~view.dio
const WRITE_TO_MAIN_ARRAY = 'write_main_arr';
const WRITE_TO_AUXILIARY_ARRAY = 'write_aux_arr';
const ARRAY_SWAP = 'swap';
const COMPARISON = 'comparison';

let uniqueId = 0;

class ArrayIndex {
  id;
  value;
  changed;
  comparison;

  constructor(value, changed = false, comparison = false) {
    this.id = uniqueId++;
    this.value = value;
    this.changed = changed;
    this.comparison = comparison;
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

class ReturnOfReplicateShuffleStep {
  indices;

  constructor(indices) {
    this.indices = indices;
  }
}

class SortingAlgorithm {
  #size;
  #array;
  #sortingType;

  #sortedSteps;
  #shuffleSteps;

  #delay;

  boundariesX;
  boundariesY;

  #MAX_FREQUENCY = 1000;
  #MIN_FREQUENCY = 100;

  soundEnabled = true;
  animateShuffle = true;
  animateSorting = true;
  animateReplication = false;
  animateComparison = false;

  #arrayWrites = 0;
  #auxiliaryArrayWrites = 0;
  #arraySwaps = 0;
  #comparisons = 0;

  #skippedFrames = 0;

  currentlyShuffling = false;
  currentlySorting = false;

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

  get arraySwaps() {
    return this.#arraySwaps;
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

  get shuffleSteps() {
    return this.#shuffleSteps;
  }

  generateArrayFromSize() {
    this.#array = Array.from({ length: this.#size }, (_, i) => i + 1);
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

    if (stepType == ARRAY_SWAP) {
      this.#arraySwaps += 1;

      this.#array[this.#sortedSteps[step].indices[0]] =
        this.#sortedSteps[step].values[0];
      this.#array[this.#sortedSteps[step].indices[1]] =
        this.#sortedSteps[step].values[1];

      return new ReturnOfReplicateStep(true, ARRAY_SWAP);
    }

    if (stepType == COMPARISON) {
      this.#comparisons += 1;
      return new ReturnOfReplicateStep(false, COMPARISON);
    }

    if (stepType == WRITE_TO_AUXILIARY_ARRAY) {
      this.#auxiliaryArrayWrites += this.#sortedSteps[step].values[0];
      return new ReturnOfReplicateStep(false, WRITE_TO_AUXILIARY_ARRAY);
    }

    return new ReturnOfReplicateStep(false, 'none');
  }

  replicateShuffleStep(step) {
    // Only one type of step: ARRAY_SWAP
    this.#arraySwaps += 1;

    this.#array[this.#shuffleSteps[step].indices[0]] =
      this.#shuffleSteps[step].values[0];
    this.#array[this.#shuffleSteps[step].indices[1]] =
      this.#shuffleSteps[step].values[1];

    return new ReturnOfReplicateShuffleStep(this.#shuffleSteps[step].indices);
  }

  resetNumbers() {
    this.#arrayWrites = 0;
    this.#auxiliaryArrayWrites = 0;
    this.#arraySwaps = 0;
    this.#comparisons = 0;
    this.#skippedFrames = 0;
  }

  shuffle() {
    this.resetNumbers();

    this.#shuffleSteps = fisherYatesShuffle(this.#array.slice());
    return;
  }

  async execute() {
    this.resetNumbers();

    const model = new Model(this.#sortingType, this.#array);
    const res = await model.sendReq();

    this.#sortedSteps = res.sortedSteps;

    return;
  }

  async playSound(percentage) {
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    const frequency =
      (percentage / 100) * (this.#MAX_FREQUENCY - this.#MIN_FREQUENCY) +
      this.#MIN_FREQUENCY;

    oscillator.connect(gain);
    oscillator.frequency.value = frequency;
    oscillator.type = 'triangle';

    gain.connect(context.destination);
    gain.gain.value = 0.000001; // volume
    oscillator.start(0);

    gain.gain.exponentialRampToValueAtTime(0.1, context.currentTime + 0.04);

    await new Promise((resolve) => setTimeout(resolve, 100));

    context.close();

    return;
  }
}

export { SortingAlgorithm };
export { ArrayIndex };
export { ReturnOfReplicateStep };
export { ReturnOfReplicateShuffleStep };
export { DEFAULT_ARRAY_SIZE };
