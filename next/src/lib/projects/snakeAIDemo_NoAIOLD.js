const TILE_COLOR_VAR = '--snake-grid-tile-color';
const STD_COLOR = '#35383F';
const COLOR_HEAD = '#FF0000';
const COLOR_BODY = '#00FF00';
const COLOR_FOOD = '#0000FF';

class coord {
  #x;
  #y;

  constructor({ x, y }) {
    this.#x = x;
    this.#y = y;
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  get id() {
    return `${this.#x}-${this.#y}`;
  }
}

class tile {
  #id;
  #coord;
  #isHead;
  #isBody;
  #isFood;

  constructor({ coord }) {
    this.#coord = coord;
    this.#id = `${this.#coord.x}-${this.#coord.y}`;

    this.#isHead = false;
    this.#isBody = false;
    this.#isFood = false;
  }

  get id() {
    return this.#id;
  }
}

class divTile {
  #tile;
  #div;

  constructor({ tile }) {
    this.#tile = tile;
    this.#div = document.createElement('div');
    this.#div.id = this.#tile.id;
    this.#div.className = 'snake-grid-tile';
    this.#div.style.setProperty(TILE_COLOR_VAR, STD_COLOR);
  }
}

class snakeAIDemo_NoAI {
  #_tileSize = 50;
  #tileSize;

  #cursor;
  #divTiles;
  #columns;
  #rows;

  #snake;

  constructor() {
    this.#tileSize = this.#_tileSize;
    this.#divTiles = [];
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
    this.#cursor = new coord({ x: 0, y: 0 });

    return;
  }

  createSnake() {
    this.#snake = new snake(this.getMiddleTile());
    return;
  }

  getMiddleTile() {
    return new coord({
      x: Math.floor(this.#columns / 2),
      y: Math.floor(this.#rows / 2),
    });
  }

  get divTiles() {
    return this.#divTiles;
  }

  appendTile(div) {
    this.#divTiles.push(div);
    return;
  }

  getTileByCoord(coord) {
    return this.#divTiles.find((tile) => tile.id === coord.id);
  }
}

class snake {
  #head = {};
  #body = [];

  constructor(head) {
    this.#head = head;
  }
}

export { snakeAIDemo_NoAI };
export { tile };
export { TILE_COLOR_VAR };
export { STD_COLOR };
export { COLOR_HEAD };
export { COLOR_BODY };
export { COLOR_FOOD };
