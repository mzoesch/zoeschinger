import styles from '@s/projects/snakeai/main.module.scss';

class Coordinate {
  private _x: number;
  private _y: number;

  constructor({ x, y }: { x: number; y: number }) {
    this._x = x;
    this._y = y;
  }

  public get id(): string {
    return `${this._x}-${this._y}`;
  }

  public get x(): number {
    return this._x;
  }

  public get y(): number {
    return this._y;
  }
}

class PlainTile {
  private _coordinate: Coordinate;

  private _head: boolean;
  private _body: boolean;
  private _food: boolean;

  constructor({ coordinate }: { coordinate: Coordinate }) {
    this._coordinate = coordinate;

    this._head = false;
    this._body = false;
    this._food = false;
  }

  public get coordinate(): Coordinate {
    return this._coordinate;
  }

  public get x(): number {
    return this._coordinate.x;
  }

  public get y(): number {
    return this._coordinate.y;
  }
}

class Tile {
  private static cursor: number = 0;

  public static readonly TILE_COLOR_VAR: string = '--snake-grid-tile-color';
  public static readonly STD_COLOR: string = '#35383F';
  public static readonly COLOR_HEAD: string = '#FF0000';
  public static readonly COLOR_BODY: string = '#00FF00';
  public static readonly COLOR_FOOD: string = '#0000FF';

  private _index: number;
  private _tile: PlainTile;
  private _element: HTMLDivElement;

  constructor({
    element,
    columns,
    changeCursor = true,
    id = '',
  }: {
    element: HTMLDivElement;
    columns: number;
    changeCursor?: boolean;
    id?: string;
  }) {
    this._tile = new PlainTile({
      coordinate: new Coordinate({
        x: Tile.cursor % columns,
        y: Math.floor(Tile.cursor / columns),
      }),
    });
    this._element = element;
    this._index = Tile.cursor;

    if (!changeCursor) {
      this._element.id = id;
      return;
    }

    Tile.cursor++;
    this._element.id = this._tile.coordinate.id;

    return;
  }

  public get id(): string {
    return this._tile.coordinate.id;
  }

  public get x(): number {
    return this._tile.coordinate.x;
  }

  public get y(): number {
    return this._tile.coordinate.y;
  }

  public get element(): HTMLDivElement {
    return this._element;
  }

  public static clearCursor(): void {
    Tile.cursor = 0;
    return;
  }

  public get index(): number {
    return this._index;
  }
}

class SnakeAIDemo_NoAI {
  private static readonly TILE_SIZE: number = 50;
  private _tileSize: number;

  private static readonly DEFAULT_LENGTH: number = 1;
  private static readonly DEFAULT_DIRECTION: number = 0;

  private static readonly INTERNAL_MOVE_UP: number = 0;
  private static readonly INTERNAL_MOVE_LEFT: number = 1;
  private static readonly INTERNAL_MOVE_DOWN: number = 2;
  private static readonly INTERNAL_MOVE_RIGHT: number = 3;

  private _tiles: Tile[];
  private _columns: number;
  private _rows: number;

  private _snakeGridContainer!: HTMLDivElement;
  private _setRunSnake: (runSnake: boolean) => void;

  private _setScore: (score: number) => void;

  private _timeAlive: number;
  private _timer: NodeJS.Timeout | null;
  private _handleTimeAliveUpdate: (timeAlive: number) => void;

  private _setHighScore: (highScore: number) => void;

  private _wantToDirection: number;
  private _direction: number;
  private _length: number;

  private _body: Tile[];
  private _food!: Tile;
  private _toClear!: Tile;

  private _head!: Tile;

  private _score: number;

  constructor(
    setRunSnake: (runSnake: boolean) => void,
    setScore: (score: number) => void,
    handleTimeAliveUpdate: (timeAlive: number) => void,
    setHighScore: (highScore: number) => void
  ) {
    this._tileSize = SnakeAIDemo_NoAI.TILE_SIZE;

    this._tiles = [];
    this._columns = 0;
    this._rows = 0;

    this._wantToDirection = 0;
    this._direction = SnakeAIDemo_NoAI.DEFAULT_DIRECTION;
    this._length = SnakeAIDemo_NoAI.DEFAULT_LENGTH;

    this._score = 0;

    this._body = [];

    this._setRunSnake = setRunSnake;
    this._setScore = setScore;

    this._setHighScore = setHighScore;

    this._timeAlive = 0;
    this._timer = null;
    this._handleTimeAliveUpdate = handleTimeAliveUpdate;

    if (typeof window !== undefined) return;
    this._snakeGridContainer = window.document.createElement('div');

    return;
  }

  private appendTile(tile: HTMLDivElement): void {
    this._tiles.push(new Tile({ element: tile, columns: this.columns }));

    return;
  }

  public fillGrid({
    width,
    height,
    snakeGridContainer,
  }: {
    width: number;
    height: number;
    snakeGridContainer: HTMLDivElement | null;
  }): void {
    const clearGrid = (): void => {
      const clearLocalTiles = (): void => {
        this._tiles = [];
        return;
      };

      const clearDivs = (): void => {
        if (!this._snakeGridContainer) return;

        while (this._snakeGridContainer.firstChild) {
          this._snakeGridContainer.removeChild(
            this._snakeGridContainer.firstChild
          );
        }

        return;
      };

      clearLocalTiles();
      clearDivs();

      return;
    };

    const createTile = (index: number): HTMLDivElement => {
      const tile = window.document.createElement('div');
      tile.className = styles.snakeGridTile;

      tile.style.setProperty(Tile.TILE_COLOR_VAR, Tile.STD_COLOR);

      return tile;
    };

    this._columns = Math.floor(width / this._tileSize);
    this._rows = Math.floor(height / this._tileSize);

    if (!snakeGridContainer) return;
    this._snakeGridContainer = snakeGridContainer;
    clearGrid();
    Tile.clearCursor();

    Array.from(Array(this._columns * this._rows)).map((_, index) => {
      const tile = createTile(index);

      this.appendTile(tile);
      this._snakeGridContainer.appendChild(tile);
    });

    this._snakeGridContainer.style.setProperty('--columns', `${this.columns}`);
    this._snakeGridContainer.style.setProperty('--rows', `${this.rows}`);

    return;
  }

  private get middleCoordinate(): Coordinate {
    return new Coordinate({
      x: Math.floor(this._columns / 2),
      y: Math.floor(this._rows / 2),
    });
  }

  private tileById(id: string): Tile | undefined {
    return this._tiles.find((tile) => tile.id === id);
  }

  private createIDByXY(x: number, y: number): string {
    return `${x}-${y}`;
  }

  private colorHead(): void {
    const div =
      (this._snakeGridContainer.childNodes[
        this._head.index
      ] as HTMLDivElement) ?? new HTMLDivElement();

    div.style.setProperty(Tile.TILE_COLOR_VAR, Tile.COLOR_HEAD);

    return;
  }

  private changeHead(tile: Tile): void {
    this._head = tile;

    return;
  }

  public spawnSnake(): void {
    const spawn: Tile | undefined = this.tileById(this.middleCoordinate.id);
    if (!spawn) return;

    this.changeHead(spawn);
    this.colorHead();

    this.spawnFood();

    this._timer = setInterval(() => {
      this._timeAlive += 1;
      this._handleTimeAliveUpdate(this._timeAlive);
    }, 1000);

    return;
  }

  public get columns(): number {
    return this._columns;
  }

  public get rows(): number {
    return this._rows;
  }

  public get score(): number {
    return this._score;
  }

  private gameOver(): void {
    this._setRunSnake(false);

    if (this._timer) clearInterval(this._timer);

    this._setHighScore(this._score);

    return;
  }

  public move(): void {
    const internalMove = (relX: number, relY: number): void => {
      const clearField = (): void => {
        if (!this._toClear) return;

        const div =
          (this._snakeGridContainer.childNodes[
            this._toClear.index
          ] as HTMLDivElement) ?? new HTMLDivElement();

        div.style.setProperty(Tile.TILE_COLOR_VAR, Tile.STD_COLOR);

        return;
      };

      const colorBody = (): void => {
        this._body.forEach((tile) => {
          const div =
            (this._snakeGridContainer.childNodes[
              tile.index
            ] as HTMLDivElement) ?? new HTMLDivElement();

          div.style.setProperty(Tile.TILE_COLOR_VAR, Tile.COLOR_BODY);
        });

        return;
      };

      const outOfBounds = (newHeadTile: Tile | undefined): boolean => {
        return !newHeadTile;
      };

      const isCollided = (): boolean => {
        return this._body &&
          this._body.find((tile) => tile.id === this._head.id)
          ? true
          : false;
      };

      const isOnFood = (): boolean => {
        return this._head.id === this._food.id;
      };

      const newTile: Tile | undefined = this.tileById(
        this.createIDByXY(this._head.x + relX, this._head.y + relY)
      );

      if (outOfBounds(newTile)) {
        this.gameOver();
        return;
      }

      this._body.push(this._head);
      this.changeHead(newTile!);

      if (this._body.length > this._length) {
        this._toClear =
          this._body.shift() ??
          new Tile({
            element: new HTMLDivElement(),
            columns: this.columns,
            changeCursor: false,
            id: 'ERROR',
          });

        clearField();
      }

      colorBody();
      this.colorHead();

      if (isCollided()) {
        this.gameOver();
        return;
      }

      if (isOnFood()) {
        this._length++;

        this._score++;
        this._setScore(this._score);

        this.spawnFood();
      }

      return;
    };

    switch (this._wantToDirection) {
      case SnakeAIDemo_NoAI.INTERNAL_MOVE_UP:
        if (this._direction === SnakeAIDemo_NoAI.INTERNAL_MOVE_DOWN) {
          this._wantToDirection = this._direction;
          internalMove(0, 1);

          break;
        }

        this._direction = this._wantToDirection;
        internalMove(0, -1);
        break;

      case SnakeAIDemo_NoAI.INTERNAL_MOVE_LEFT:
        if (this._direction === SnakeAIDemo_NoAI.INTERNAL_MOVE_RIGHT) {
          this._wantToDirection = this._direction;
          internalMove(1, 0);

          break;
        }

        this._direction = this._wantToDirection;
        internalMove(-1, 0);
        break;

      case SnakeAIDemo_NoAI.INTERNAL_MOVE_DOWN:
        if (this._direction === SnakeAIDemo_NoAI.INTERNAL_MOVE_UP) {
          this._wantToDirection = this._direction;
          internalMove(0, -1);

          break;
        }

        this._direction = this._wantToDirection;
        internalMove(0, 1);
        break;

      case SnakeAIDemo_NoAI.INTERNAL_MOVE_RIGHT:
        if (this._direction === SnakeAIDemo_NoAI.INTERNAL_MOVE_LEFT) {
          this._wantToDirection = this._direction;
          internalMove(-1, 0);

          break;
        }

        this._direction = this._wantToDirection;
        internalMove(1, 0);
        break;

      default:
        break;
    }

    return;
  }

  public handleKeyDown(event: KeyboardEvent): void {
    switch (event.code) {
      case 'KeyW':
        this._wantToDirection = SnakeAIDemo_NoAI.INTERNAL_MOVE_UP;
        break;

      case 'KeyA':
        this._wantToDirection = SnakeAIDemo_NoAI.INTERNAL_MOVE_LEFT;
        break;

      case 'KeyS':
        this._wantToDirection = SnakeAIDemo_NoAI.INTERNAL_MOVE_DOWN;
        break;

      case 'KeyD':
        this._wantToDirection = SnakeAIDemo_NoAI.INTERNAL_MOVE_RIGHT;
        break;
    }

    return;
  }

  public reset(): void {
    this._length = SnakeAIDemo_NoAI.DEFAULT_LENGTH;
    this._body = [];

    this._direction = SnakeAIDemo_NoAI.DEFAULT_DIRECTION;
    this._wantToDirection = SnakeAIDemo_NoAI.DEFAULT_DIRECTION;
    this._setRunSnake(false);

    if (this._timer) clearInterval(this._timer);

    this._score = 0;
    this._setScore(0);
    this._timeAlive = 0;
    this._handleTimeAliveUpdate(0);

    return;
  }

  private spawnFood(): void {
    const getNewFood = (): Tile => {
      const usableTiles = this._tiles.filter(
        (tile) =>
          !this._body.find(
            (bodyTile) => bodyTile.id === tile.id || this._head.id === tile.id
          )
      );

      const food = usableTiles[Math.floor(Math.random() * usableTiles.length)];

      return food;
    };

    const food = getNewFood();

    const div =
      (this._snakeGridContainer.childNodes[food.index] as HTMLDivElement) ??
      new HTMLDivElement();

    div.style.setProperty(Tile.TILE_COLOR_VAR, Tile.COLOR_FOOD);

    this._food = food;

    return;
  }
}

export { SnakeAIDemo_NoAI };
export { Tile };
