// Following the norm of ~view.dio
// Class should only used to communicate with the ReST-api

export class SAlgo {
  #type;
  #arrayToSort;

  constructor(type, arrayToSort) {
    this.#type = type;
    this.#arrayToSort = arrayToSort;
  }

  toJSON() {
    return {
      type: this.#type,
      arrayToSort: this.#arrayToSort,
    };
  }
}
