class snakeAIDemo_NoAI {
  #_tileSize = 50;
  #tileSize;

  #columns;
  #rows;

  constructor() {
    this.#tileSize = this.#_tileSize;
  }

  get columns() {
    return this.#columns;
  }

  get rows() {
    return this.#rows;
  }

  fillGrid({ width, height }) {
    this.#columns = Math.floor(width / this.#tileSize);
    this.#rows = Math.floor(height / this.#tileSize);

    console.log('width: ', width);
    console.log('height: ', height);
    console.log(
      'Math.floor(width / this.#tileSize): ',
      Math.floor(width / this.#tileSize)
    );
    console.log(
      'Math.floor(height / this.#tileSize): ',
      Math.floor(height / this.#tileSize)
    );

    return;
  }
}

export default snakeAIDemo_NoAI;
