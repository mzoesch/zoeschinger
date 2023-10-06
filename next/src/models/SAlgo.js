// Following the norm of ~view.dio
// Class should only be used to communicate with the ReST-api

export class SAlgo {
  #type;
  #arrayToSort;

  constructor(type, arrayToSort) {
    this.#type = type;
    this.#arrayToSort = arrayToSort;
    return;
  }

  toJSON() {
    return {
      type: this.#type,
      arrayToSort: this.#arrayToSort,
    };
  }

  async sendReq() {
    const apiEndpoint = process.env.PRIVATE_API_ENDPOINT + 'projects/salgo';

    const res = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.toJSON()),
    });

    return await res.json();
  }
}
