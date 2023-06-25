import styles from '@s/projects/snakeai/ham.module.scss';

class Tile {
  // id : <tile-index>

  private static _cursor: number = 0;

  public static readonly TILE_COLOR_VAR: string = '--snake-grid-tile-color';
  public static readonly STD_COLOR: string = '#35383F';
  public static readonly COLOR_HAM: string = '#FF0000';
  public static readonly COLOR_SUCCESS: string = '#00FF00';
  public static readonly COLOR_NEIGHBOR: string = '#0000FF';
  public static readonly COLOR_DEBUG: string = '#FFFFFF';
  public static readonly COLOR_TILE_CHECKING: string = '#FFFFFF';
  public static readonly COLOR_TILE_VIABLE: string = '#FFFF00';

  public static readonly COLOR_SNAKE_HEAD: string = '#FF0000';
  public static readonly COLOR_SNAKE_TAIL: string = '#00FF00';
  public static readonly COLOR_SNAKE_FOOD: string = '#0000FF';

  public static readonly COLOR_OUTER_RING: string = '#0000FF';
  public static readonly COLOR_NOT_GOOD_TILE: string = '#000000';
  public static readonly COLOR_TILE_TWO_NEIGHBORS_CHECK_FROM_TILE: string =
    '#FFAAFF';
  public static readonly COLOR_TILE_TWO_NEIGHBORS_CHECK_FROM_CHECKED_NEIGHBORS: string =
    '#AAFFAA';

  public static readonly HAM_TYPE_HORIZONTAL_LINE: string = 'horizontal-line';
  public static readonly HAM_TYPE_VERTICAL_LINE: string = 'vertical-line';
  public static readonly HAM_TYPE_CORNER_TOP_RIGHT: string = 'corner-top-right';
  public static readonly HAM_TYPE_CORNER_TOP_LEFT: string = 'corner-top-left';
  public static readonly HAM_TYPE_CORNER_BOTTOM_RIGHT: string =
    'corner-bottom-right';
  public static readonly HAM_TYPE_CORNER_BOTTOM_LEFT: string =
    'corner-bottom-left';

  private _index: number;
  private _element: HTMLDivElement;
  private _columns: number;
  private _rows: number;

  private _hamiltonianCycleDiv: HTMLDivElement | null = null;
  private _potentialLineOneDiv: HTMLDivElement | null = null;
  private _potentialLineTwoDiv: HTMLDivElement | null = null;
  private _indexDiv: HTMLDivElement | null = null;

  public constructor({
    element,
    columns = 0,
    rows = 0,
    changeCursor = true,
    id = '',
  }: {
    element: HTMLDivElement;
    columns: number;
    rows?: number;
    changeCursor?: boolean;
    id?: string;
  }) {
    this._element = element;
    this._columns = columns;
    this._rows = rows;

    this._index = Tile.cursor;
    if (changeCursor) Tile._cursor++;

    this._element.id = id ? id : `tile-${this._index}`;

    return;
  }

  public static get cursor(): number {
    return Tile._cursor;
  }

  public static clearCursor(): void {
    Tile._cursor = 0;
    return;
  }

  public clearIndexFromInnerHtml(): void {
    if (this._indexDiv === null) return;

    this._element.removeChild(this._indexDiv);
    this._indexDiv = null;

    return;
  }

  public writeIndexToInnerHtml(): void {
    this._indexDiv = document.createElement('div');
    this._indexDiv.innerHTML = `${this._index}`;
    this._indexDiv.style.fontSize = '0.3rem';

    this._element.appendChild(this._indexDiv);
    return;
  }

  public showHamiltonianCycle(type: string): void {
    this._hamiltonianCycleDiv = document.createElement('div');

    switch (type) {
      case Tile.HAM_TYPE_HORIZONTAL_LINE:
        this._hamiltonianCycleDiv.className =
          styles.hamiltonian_path_horizontal_line;
        break;

      case Tile.HAM_TYPE_VERTICAL_LINE:
        this._hamiltonianCycleDiv.className =
          styles.hamiltonian_path_vertical_line;
        break;

      case Tile.HAM_TYPE_CORNER_TOP_RIGHT:
        this._hamiltonianCycleDiv.className =
          styles.hamiltonian_path_corner_top_right;

        this._potentialLineOneDiv = document.createElement('div');
        this._potentialLineOneDiv.className =
          styles.hamiltonian_path_corner_top_line;

        this._potentialLineTwoDiv = document.createElement('div');
        this._potentialLineTwoDiv.className =
          styles.hamiltonian_path_corner_right_line;

        break;

      case Tile.HAM_TYPE_CORNER_TOP_LEFT:
        this._hamiltonianCycleDiv.className =
          styles.hamiltonian_path_corner_top_left;

        this._potentialLineOneDiv = document.createElement('div');
        this._potentialLineOneDiv.className =
          styles.hamiltonian_path_corner_top_line;

        this._potentialLineTwoDiv = document.createElement('div');
        this._potentialLineTwoDiv.className =
          styles.hamiltonian_path_corner_left_line;

        break;

      case Tile.HAM_TYPE_CORNER_BOTTOM_RIGHT:
        this._hamiltonianCycleDiv.className =
          styles.hamiltonian_path_corner_bottom_right;

        this._potentialLineOneDiv = document.createElement('div');
        this._potentialLineOneDiv.className =
          styles.hamiltonian_path_corner_bottom_line;

        this._potentialLineTwoDiv = document.createElement('div');
        this._potentialLineTwoDiv.className =
          styles.hamiltonian_path_corner_right_line;

        break;

      case Tile.HAM_TYPE_CORNER_BOTTOM_LEFT:
        this._hamiltonianCycleDiv.className =
          styles.hamiltonian_path_corner_bottom_left;

        this._potentialLineOneDiv = document.createElement('div');
        this._potentialLineOneDiv.className =
          styles.hamiltonian_path_corner_bottom_line;

        this._potentialLineTwoDiv = document.createElement('div');
        this._potentialLineTwoDiv.className =
          styles.hamiltonian_path_corner_left_line;

        break;

      default:
        this._hamiltonianCycleDiv.innerHTML = ``;
        break;
    }

    if (this._potentialLineTwoDiv !== null)
      this._element.prepend(this._potentialLineTwoDiv);
    this._element.prepend(this._hamiltonianCycleDiv);
    if (this._potentialLineOneDiv !== null)
      this._element.prepend(this._potentialLineOneDiv);

    return;
  }

  public hideHamiltonianCycle(): void {
    if (this._potentialLineTwoDiv !== null) {
      this._element.removeChild(this._potentialLineTwoDiv);
      this._potentialLineTwoDiv = null;
    }

    if (this._hamiltonianCycleDiv !== null) {
      this._element.removeChild(this._hamiltonianCycleDiv);
      this._hamiltonianCycleDiv = null;
    }

    if (this._potentialLineOneDiv !== null) {
      this._element.removeChild(this._potentialLineOneDiv);
      this._potentialLineOneDiv = null;
    }

    return;
  }

  public get index(): number {
    return this._index;
  }

  public getNeighbors(): number[] {
    const neighbors: number[] = [];

    const U: number = this._index - this._columns;
    const L: number = this._index - 1;
    const D: number = this._index + this._columns;
    const R: number = this._index + 1;

    if (U >= 0 && U < this._columns * this._rows) neighbors.push(U);
    if (
      L >= 0 &&
      L < this._columns * this._rows &&
      Math.floor(L / this._columns) === Math.floor(this._index / this._columns)
    )
      neighbors.push(L);
    if (D >= 0 && D < this._columns * this._rows) neighbors.push(D);
    if (
      R >= 0 &&
      R < this._columns * this._rows &&
      Math.floor(R / this._columns) === Math.floor(this._index / this._columns)
    )
      neighbors.push(R);

    return neighbors;
  }

  public get element(): HTMLDivElement {
    return this._element;
  }

  public get x(): number {
    return this._index % this._columns;
  }

  public get y(): number {
    return Math.floor(this._index / this._columns);
  }
}

class SnakeAIDemo_HamiltonianCycle {
  private static readonly DO_NOT_CALCULATE_HAMILTONIAN: number = 3;
  private static readonly ALPHA: number = 4;
  private static readonly ALPHA_GOAL: number = 1;
  private static readonly BETA: number = 2;

  public static readonly DEFAULT_HEIGHT_FOR_SNAKE_GRID_CONTAINER: number = 640;

  private static readonly STARTING_SIZE_OF_SNAKE: number = 2;

  private static readonly TIMEOUT_AFTER_CHECKING_ONE_NEIGHBOR: number = 100;
  private static readonly TIMEOUT_AFTER_EACH_SPREAD_CYCLE_FOR_VIABLE_HAM_IF_IT_CAN_REACH_ALL_UNHAMED_TILES: number = 20;
  private static readonly TIMEOUT_AFTER_CHECKING_IF_ALL_UNHAMED_TILES_ARE_NOT_LEADING_TO_AN_UNREACHABLE_HAM_CYCLE_FOR_CURRENT_PROGRESSED_HAM: number = 200;
  private static readonly TIMEOUT_AFTER_A_NOT_GOOD_TILE_WAS_FOUND: number = 150;
  private static readonly TIMEOUT_AFTER_EACH_SPREAD_CYCLE_FOR_TWO_NEIGHBORS_VIABLE_CHECK: number = 20;
  private static readonly TIMEOUT_AFTER_EACH_SPREAD_CYCLE_FOR_SUCCEEDED_HAM: number = 50;
  private static readonly TIMEOUT_AFTER_EACH_SPREAD_CYCLE_FOR_SUCCEEDED_HAM_BACK_TO_NORMAL: number = 1000;
  private static readonly TOTAL_TIME_FOR_THE_ANIMATION_OF_A_SUCCEEDED_HAM: number = 3000;
  private static readonly BLINK_TIMEOUT_AFTER_SUCCEEDED_HAM: number = 200;

  private static readonly TIMEOUT_AFTER_SNAKE_MOVE: number = 50;
  private static readonly MOVES_PER_FRAME: number = 1;
  private static readonly BLINK_TIMEOUT_AFTER_SUCCEEDED_SNAKE: number = 200;
  private static readonly TOTAL_TIME_FOR_THE_ANIMATION_OF_A_SUCCEEDED_SNAKE: number = 3000;
  private static readonly TIMEOUT_AFTER_EACH_SPREAD_CYCLE_FOR_SUCCEEDED_SNAKE_BACK_TO_NORMAL: number = 1000;
  private static readonly ANIMATE_SUCCEEDED_SNAKE: boolean = true;

  private static readonly ANIMATE_TIMEOUT_AFTER_CHECKING_ONE_NEIGHBOR: boolean =
    true;
  private static readonly ANIMATE_TIMEOUT_AFTER_EACH_SPREAD_CYCLE_FOR_VIABLE_HAM_IF_IT_CAN_REACH_ALL_UNHAMED_TILES: boolean =
    true;
  private static readonly ANIMATE_TIMEOUT_AFTER_CHECKING_IF_ALL_UNHAMED_TILES_ARE_NOT_LEADING_TO_AN_UNREACHABLE_HAM_CYCLE_FOR_CURRENT_PROGRESSED_HAM: boolean =
    false;
  private static readonly ANIMATE_TIMEOUT_AFTER_A_NOT_GOOD_TILE_WAS_FOUND: boolean =
    true;
  private static readonly ANIMATE_TIMEOUT_AFTER_EACH_SPREAD_CYCLE_FOR_TWO_NEIGHBORS_VIABLE_CHECK: boolean =
    true;
  private static readonly ANIMATE_TIMEOUT_AFTER_EACH_SPREAD_CYCLE_FOR_SUCCEEDED_HAM: boolean =
    true;
  private static readonly ANIMATE_SUCCEEDED_HAM = true;

  private static readonly DO_YOU_WANT_TO_SEE_THE_SNAKE_SUFFER: boolean = true;

  private _timeoutAfterCheckingOneNeighbor: number;
  private _timeoutAfterEachSpreadCycleForViableHamIfItCanReachAllUnhamedTiles: number;
  private _timeoutAfterCheckingIfAllUnhamedTilesAreNotLeadingToAnUnreachableHamCycleForCurrentProgressedHam: number;
  private _timeoutAfterANotGoodTileWasFound: number;
  private _timeoutAfterEachSpreadCycleForTwoNeighborsViableCheck: number;
  private _timeoutAfterEachSpreadCycleForSucceededHam: number;
  private _timeoutAfterEachSpreadCycleForSucceededHamBackToNormal: number;
  private _blinkTimeoutAfterSucceededHam: number;

  private _timeoutAfterSnakeMove: number;
  private _movesPerFrame: number;
  private _currentMove: number;
  private _blinkTimeoutAfterSucceededSnake: number;
  private _timeoutAfterEachSpreadCycleForSucceededSnakeBackToNormal: number;
  private _animateSucceededSnake: boolean;

  private _animateTimeoutAfterCheckingOneNeighbor: boolean;
  private _animateTimeoutAfterEachSpreadCycleForViableHamIfItCanReachAllUnhamedTiles: boolean;
  private _animateTimeoutAfterCheckingIfAllUnhamedTilesAreNotLeadingToAnUnreachableHamCycleForCurrentProgressedHam: boolean;
  private _animateTimeoutAfterANotGoodTileWasFound: boolean;
  private _animateTimeoutAfterEachSpreadCycleForTwoNeighborsViableCheck: boolean;
  private _animateTimeoutAfterEachSpreadCycleForSucceededHam: boolean;
  private _animateSucceededHam: boolean;

  private _doYouWantToSeeTheSnakeSuffer: boolean;

  private static readonly HAM_CYCLE_IS_VISIBLE: boolean = false;
  private static readonly INDICES_ARE_VISIBLE: boolean = false;
  private static readonly TILE_SIZE: number = 50;

  private _hamCycleIsVisible: boolean;
  private _indicesAreVisible: boolean;
  private _tileSize: number;

  private _columns: number;
  private _rows: number;
  private _tiles: Tile[];
  private _snakeGridContainer!: HTMLDivElement;

  private _snake: Tile[] = [];
  private _snakeLength: number;
  private _snakeFood: Tile | null = null;
  private _snakeMoves: number;

  private _hamiltonianCycle: Tile[] = [];

  public constructor(snakeGridContainer: HTMLDivElement | null) {
    this._tileSize = SnakeAIDemo_HamiltonianCycle.TILE_SIZE;

    this._timeoutAfterCheckingOneNeighbor =
      SnakeAIDemo_HamiltonianCycle.TIMEOUT_AFTER_CHECKING_ONE_NEIGHBOR;
    this._timeoutAfterEachSpreadCycleForViableHamIfItCanReachAllUnhamedTiles =
      SnakeAIDemo_HamiltonianCycle.TIMEOUT_AFTER_EACH_SPREAD_CYCLE_FOR_VIABLE_HAM_IF_IT_CAN_REACH_ALL_UNHAMED_TILES;
    this._timeoutAfterCheckingIfAllUnhamedTilesAreNotLeadingToAnUnreachableHamCycleForCurrentProgressedHam =
      SnakeAIDemo_HamiltonianCycle.TIMEOUT_AFTER_CHECKING_IF_ALL_UNHAMED_TILES_ARE_NOT_LEADING_TO_AN_UNREACHABLE_HAM_CYCLE_FOR_CURRENT_PROGRESSED_HAM;
    this._timeoutAfterANotGoodTileWasFound =
      SnakeAIDemo_HamiltonianCycle.TIMEOUT_AFTER_A_NOT_GOOD_TILE_WAS_FOUND;
    this._timeoutAfterEachSpreadCycleForTwoNeighborsViableCheck =
      SnakeAIDemo_HamiltonianCycle.TIMEOUT_AFTER_EACH_SPREAD_CYCLE_FOR_TWO_NEIGHBORS_VIABLE_CHECK;
    this._timeoutAfterEachSpreadCycleForSucceededHam =
      SnakeAIDemo_HamiltonianCycle.TIMEOUT_AFTER_EACH_SPREAD_CYCLE_FOR_SUCCEEDED_HAM;
    this._timeoutAfterEachSpreadCycleForSucceededHamBackToNormal =
      SnakeAIDemo_HamiltonianCycle.TIMEOUT_AFTER_EACH_SPREAD_CYCLE_FOR_SUCCEEDED_HAM_BACK_TO_NORMAL;
    this._blinkTimeoutAfterSucceededHam =
      SnakeAIDemo_HamiltonianCycle.BLINK_TIMEOUT_AFTER_SUCCEEDED_HAM;

    this._timeoutAfterSnakeMove =
      SnakeAIDemo_HamiltonianCycle.TIMEOUT_AFTER_SNAKE_MOVE;
    this._movesPerFrame = SnakeAIDemo_HamiltonianCycle.MOVES_PER_FRAME;
    this._currentMove = 0;
    this._blinkTimeoutAfterSucceededSnake =
      SnakeAIDemo_HamiltonianCycle.BLINK_TIMEOUT_AFTER_SUCCEEDED_SNAKE;
    this._timeoutAfterEachSpreadCycleForSucceededSnakeBackToNormal =
      SnakeAIDemo_HamiltonianCycle.TIMEOUT_AFTER_EACH_SPREAD_CYCLE_FOR_SUCCEEDED_SNAKE_BACK_TO_NORMAL;
    this._animateSucceededSnake =
      SnakeAIDemo_HamiltonianCycle.ANIMATE_SUCCEEDED_SNAKE;

    this._animateTimeoutAfterCheckingOneNeighbor =
      SnakeAIDemo_HamiltonianCycle.ANIMATE_TIMEOUT_AFTER_CHECKING_ONE_NEIGHBOR;
    this._animateTimeoutAfterEachSpreadCycleForViableHamIfItCanReachAllUnhamedTiles =
      SnakeAIDemo_HamiltonianCycle.ANIMATE_TIMEOUT_AFTER_EACH_SPREAD_CYCLE_FOR_VIABLE_HAM_IF_IT_CAN_REACH_ALL_UNHAMED_TILES;
    this._animateTimeoutAfterCheckingIfAllUnhamedTilesAreNotLeadingToAnUnreachableHamCycleForCurrentProgressedHam =
      SnakeAIDemo_HamiltonianCycle.ANIMATE_TIMEOUT_AFTER_CHECKING_IF_ALL_UNHAMED_TILES_ARE_NOT_LEADING_TO_AN_UNREACHABLE_HAM_CYCLE_FOR_CURRENT_PROGRESSED_HAM;
    this._animateTimeoutAfterANotGoodTileWasFound =
      SnakeAIDemo_HamiltonianCycle.ANIMATE_TIMEOUT_AFTER_A_NOT_GOOD_TILE_WAS_FOUND;
    this._animateTimeoutAfterEachSpreadCycleForTwoNeighborsViableCheck =
      SnakeAIDemo_HamiltonianCycle.ANIMATE_TIMEOUT_AFTER_EACH_SPREAD_CYCLE_FOR_TWO_NEIGHBORS_VIABLE_CHECK;
    this._animateTimeoutAfterEachSpreadCycleForSucceededHam =
      SnakeAIDemo_HamiltonianCycle.ANIMATE_TIMEOUT_AFTER_EACH_SPREAD_CYCLE_FOR_SUCCEEDED_HAM;
    this._animateSucceededHam =
      SnakeAIDemo_HamiltonianCycle.ANIMATE_SUCCEEDED_HAM;

    this._doYouWantToSeeTheSnakeSuffer =
      SnakeAIDemo_HamiltonianCycle.DO_YOU_WANT_TO_SEE_THE_SNAKE_SUFFER;

    this._hamCycleIsVisible = SnakeAIDemo_HamiltonianCycle.HAM_CYCLE_IS_VISIBLE;
    this._indicesAreVisible = SnakeAIDemo_HamiltonianCycle.INDICES_ARE_VISIBLE;

    this._columns = 0;
    this._rows = 0;
    this._tiles = [];

    this._snake = [];
    this._snakeLength = SnakeAIDemo_HamiltonianCycle.STARTING_SIZE_OF_SNAKE;
    this._snakeMoves = 0;

    if (typeof window !== undefined) return;
    this._snakeGridContainer =
      snakeGridContainer ?? window.document.createElement('div');
  }

  private appendTile(tile: HTMLDivElement): void {
    this._tiles.push(
      new Tile({
        element: tile,
        columns: this._columns,
        rows: this._rows,
      })
    );

    return;
  }

  public fillGrid(
    snakeGridContainer: HTMLDivElement | null,
    rows?: number,
    columns?: number
  ): void {
    const clearGrid = (): void => {
      const clearLocalTiles = (): void => {
        this._tiles = [];
        return;
      };

      const clearDivs = (): void => {
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

    this._snakeGridContainer =
      snakeGridContainer ??
      this._snakeGridContainer ??
      window.document.createElement('div');

    const createTile = (index: number): HTMLDivElement => {
      const tile = window.document.createElement('div');
      tile.className = styles.snakeGridTile;
      tile.style.setProperty(Tile.TILE_COLOR_VAR, Tile.STD_COLOR);

      return tile;
    };

    clearGrid();
    Tile.clearCursor();

    this._columns =
      columns ??
      Math.floor(this._snakeGridContainer.clientWidth / this._tileSize);

    this._rows =
      rows ??
      Math.floor(this._snakeGridContainer.clientHeight / this._tileSize);

    const isAHamPossible = (): boolean => {
      return !(this._columns % 2 === 1 && this._rows % 2 === 1);
    };
    if (isAHamPossible() === false) this._rows = this._rows + 1;

    Array.from(Array(this._columns * this._rows)).map((_, index) => {
      const tile = createTile(index);

      this.appendTile(tile);
      this._snakeGridContainer.appendChild(tile);
    });

    this._snakeGridContainer.style.setProperty('--columns', `${this._columns}`);
    this._snakeGridContainer.style.setProperty('--rows', `${this._rows}`);

    return;
  }

  private getTileByIndex(index: number): Tile {
    return this._tiles[index];
  }

  private getTileByRowAndColumn(row: number, column: number): Tile {
    return this.getTileByIndex(row * this._columns + column);
  }

  private getTileByXY(x: number, y: number): Tile {
    return this.getTileByIndex(y * this._columns + x);
  }

  //#region colors

  private clearAllColors(): void {
    this._tiles.forEach((element) => {
      element.element.style.setProperty(Tile.TILE_COLOR_VAR, Tile.STD_COLOR);
    });

    return;
  }

  private colorHamiltonianCycle(): void {
    this._hamiltonianCycle.forEach((element) => {
      element.element.style.setProperty(Tile.TILE_COLOR_VAR, Tile.COLOR_HAM);
    });

    return;
  }

  private colorNeighbors(neighbors: Tile[]): void {
    neighbors.forEach((element) => {
      element.element.style.setProperty(
        Tile.TILE_COLOR_VAR,
        Tile.COLOR_NEIGHBOR
      );
    });

    return;
  }

  private colorTileChecking(tiles: Tile[]): void {
    tiles.forEach((element) => {
      element.element.style.setProperty(
        Tile.TILE_COLOR_VAR,
        Tile.COLOR_TILE_CHECKING
      );
    });

    return;
  }

  private colorTileViable(tiles: Tile[]): void {
    tiles.forEach((element) => {
      element.element.style.setProperty(
        Tile.TILE_COLOR_VAR,
        Tile.COLOR_TILE_VIABLE
      );
    });

    return;
  }

  private colorOuterRing(outerRing: Tile[]): void {
    outerRing.forEach((element) => {
      element.element.style.setProperty(
        Tile.TILE_COLOR_VAR,
        Tile.COLOR_OUTER_RING
      );
    });

    return;
  }

  private colorTileTwoNeighborsFromTile(tile: Tile): void {
    tile.element.style.setProperty(
      Tile.TILE_COLOR_VAR,
      Tile.COLOR_TILE_TWO_NEIGHBORS_CHECK_FROM_TILE
    );
  }

  private colorTileTwoNeighborsCheckedTiles(tile: Tile[]): void {
    tile.forEach((element) => {
      element.element.style.setProperty(
        Tile.TILE_COLOR_VAR,
        Tile.COLOR_TILE_TWO_NEIGHBORS_CHECK_FROM_CHECKED_NEIGHBORS
      );
    });

    return;
  }

  private colorSnakeTail(): void {
    this._snake.forEach((element) => {
      element.element.style.setProperty(
        Tile.TILE_COLOR_VAR,
        Tile.COLOR_SNAKE_TAIL
      );
    });

    return;
  }

  private colorSnakeHead(): void {
    this._snake[0].element.style.setProperty(
      Tile.TILE_COLOR_VAR,
      Tile.COLOR_SNAKE_HEAD
    );

    return;
  }

  private colorEverythingOfTheSnake(): void {
    this.colorSnakeTail();
    this.colorSnakeHead();

    return;
  }

  private colorSnakeFood(): void {
    this._snakeFood?.element.style.setProperty(
      Tile.TILE_COLOR_VAR,
      Tile.COLOR_SNAKE_FOOD
    );

    return;
  }

  //#endregion colors

  //#region setters and getters

  private get hamlen(): number {
    return this._hamiltonianCycle.length;
  }

  public get rows(): number {
    return this._rows;
  }

  public get columns(): number {
    return this._columns;
  }

  public get timeoutAfterCheckingOneNeighbor(): number {
    return this._timeoutAfterCheckingOneNeighbor;
  }

  public set timeoutAfterCheckingOneNeighbor(value: number) {
    this._timeoutAfterCheckingOneNeighbor = value;
    return;
  }

  public get timeoutAfterEachSpreadCycleForViableHamIfItCanReachAllUnhamedTiles(): number {
    return this
      ._timeoutAfterEachSpreadCycleForViableHamIfItCanReachAllUnhamedTiles;
  }

  public set timeoutAfterEachSpreadCycleForViableHamIfItCanReachAllUnhamedTiles(
    value: number
  ) {
    this._timeoutAfterEachSpreadCycleForViableHamIfItCanReachAllUnhamedTiles =
      value;
    return;
  }

  public get timeoutAfterCheckingIfAllUnhamedTilesAreNotLeadingToAnUnreachableHamCycleForCurrentProgressedHam(): number {
    return this
      ._timeoutAfterCheckingIfAllUnhamedTilesAreNotLeadingToAnUnreachableHamCycleForCurrentProgressedHam;
  }

  public set timeoutAfterCheckingIfAllUnhamedTilesAreNotLeadingToAnUnreachableHamCycleForCurrentProgressedHam(
    value: number
  ) {
    this._timeoutAfterCheckingIfAllUnhamedTilesAreNotLeadingToAnUnreachableHamCycleForCurrentProgressedHam =
      value;
    return;
  }

  public get timeoutAfterANotGoodTileWasFound(): number {
    return this._timeoutAfterANotGoodTileWasFound;
  }

  public set timeoutAfterANotGoodTileWasFound(value: number) {
    this._timeoutAfterANotGoodTileWasFound = value;
    return;
  }

  public get timeoutAfterEachSpreadCycleForTwoNeighborsViableCheck(): number {
    return this._timeoutAfterEachSpreadCycleForTwoNeighborsViableCheck;
  }

  public set timeoutAfterEachSpreadCycleForTwoNeighborsViableCheck(
    value: number
  ) {
    this._timeoutAfterEachSpreadCycleForTwoNeighborsViableCheck = value;
    return;
  }

  public get timeoutAfterEachSpreadCycleForSucceededHam(): number {
    return this._timeoutAfterEachSpreadCycleForSucceededHam;
  }

  public set timeoutAfterEachSpreadCycleForSucceededHam(value: number) {
    this._timeoutAfterEachSpreadCycleForSucceededHam = value;
    return;
  }

  public get timeoutAfterEachSpreadCycleForSucceededHamBackToNormal(): number {
    return this._timeoutAfterEachSpreadCycleForSucceededHamBackToNormal;
  }

  public set timeoutAfterEachSpreadCycleForSucceededHamBackToNormal(
    value: number
  ) {
    this._timeoutAfterEachSpreadCycleForSucceededHamBackToNormal = value;
    return;
  }

  public get timeoutAfterSnakeMove(): number {
    return this._timeoutAfterSnakeMove;
  }

  public set timeoutAfterSnakeMove(value: number) {
    this._timeoutAfterSnakeMove = value;
    return;
  }

  public get movesPerFrame(): number {
    return this._movesPerFrame;
  }

  public set movesPerFrame(value: number) {
    if (value < 1 || Number.isNaN(value)) {
      this._movesPerFrame = 1;
      return;
    }
    this._movesPerFrame = value;
    return;
  }

  public get currentMove(): number {
    return this._currentMove;
  }

  public set currentMove(value: number) {
    this._currentMove = value;
    return;
  }

  public get animateTimeoutAfterCheckingOneNeighbor(): boolean {
    return this._animateTimeoutAfterCheckingOneNeighbor;
  }

  public set animateTimeoutAfterCheckingOneNeighbor(value: boolean) {
    this._animateTimeoutAfterCheckingOneNeighbor = value;
    return;
  }

  public get animateTimeoutAfterEachSpreadCycleForViableHamIfItCanReachAllUnhamedTiles(): boolean {
    return this
      ._animateTimeoutAfterEachSpreadCycleForViableHamIfItCanReachAllUnhamedTiles;
  }

  public set animateTimeoutAfterEachSpreadCycleForViableHamIfItCanReachAllUnhamedTiles(
    value: boolean
  ) {
    this._animateTimeoutAfterEachSpreadCycleForViableHamIfItCanReachAllUnhamedTiles =
      value;
    return;
  }

  public get animateTimeoutAfterCheckingIfAllUnhamedTilesAreNotLeadingToAnUnreachableHamCycleForCurrentProgressedHam(): boolean {
    return this
      ._animateTimeoutAfterCheckingIfAllUnhamedTilesAreNotLeadingToAnUnreachableHamCycleForCurrentProgressedHam;
  }

  public set animateTimeoutAfterCheckingIfAllUnhamedTilesAreNotLeadingToAnUnreachableHamCycleForCurrentProgressedHam(
    value: boolean
  ) {
    this._animateTimeoutAfterCheckingIfAllUnhamedTilesAreNotLeadingToAnUnreachableHamCycleForCurrentProgressedHam =
      value;
    return;
  }

  public get animateTimeoutAfterANotGoodTileWasFound(): boolean {
    return this._animateTimeoutAfterANotGoodTileWasFound;
  }

  public set animateTimeoutAfterANotGoodTileWasFound(value: boolean) {
    this._animateTimeoutAfterANotGoodTileWasFound = value;
    return;
  }

  public get animateTimeoutAfterEachSpreadCycleForTwoNeighborsViableCheck(): boolean {
    return this._animateTimeoutAfterEachSpreadCycleForTwoNeighborsViableCheck;
  }

  public set animateTimeoutAfterEachSpreadCycleForTwoNeighborsViableCheck(
    value: boolean
  ) {
    this._animateTimeoutAfterEachSpreadCycleForTwoNeighborsViableCheck = value;
    return;
  }

  public get animateTimeoutAfterEachSpreadCycleForSucceededHam(): boolean {
    return this._animateTimeoutAfterEachSpreadCycleForSucceededHam;
  }

  public set animateTimeoutAfterEachSpreadCycleForSucceededHam(value: boolean) {
    this._animateTimeoutAfterEachSpreadCycleForSucceededHam = value;
    return;
  }

  public get animateSucceededHam(): boolean {
    return this._animateSucceededHam;
  }

  public set animateSucceededHam(value: boolean) {
    this._animateSucceededHam = value;
    return;
  }

  public get doYouWantToSeeTheSnakeSuffer(): boolean {
    return this._doYouWantToSeeTheSnakeSuffer;
  }

  public set doYouWantToSeeTheSnakeSuffer(value: boolean) {
    this._doYouWantToSeeTheSnakeSuffer = value;
    return;
  }

  public get snakeMoves(): number {
    return this._snakeMoves;
  }

  //#endregion setters and getters

  private async calculateAHamiltonianCycle(): Promise<void> {
    this._hamiltonianCycle = [];
    let uncheckedTiles: number = this._tiles.length;
    this._hamiltonianCycle.push(this._tiles[0]);
    uncheckedTiles = uncheckedTiles - 1;
    const hamGoal: Tile = this._hamiltonianCycle[0];

    const findHam = async (uncheckedTiles: number): Promise<boolean> => {
      const getValidNeighbors = (tile: Tile): Tile[] => {
        const neighborsIndices: number[] = tile.getNeighbors();
        const neighbors: Tile[] = [];

        neighborsIndices.forEach((element) => {
          const neighbor: Tile = this.getTileByIndex(element);
          if (this._hamiltonianCycle.includes(neighbor)) return;

          neighbors.push(neighbor);
          return;
        });

        return neighbors;
      };

      const getRandomIndexWithRules = (
        neighborsToChooseFrom: Tile[]
      ): number => {
        if (
          this._hamiltonianCycle.length <
          SnakeAIDemo_HamiltonianCycle.DO_NOT_CALCULATE_HAMILTONIAN
        )
          return 0;

        return Math.floor(Math.random() * neighborsToChooseFrom.length);
      };

      const currentHamIsViable = async (): Promise<boolean> => {
        if (
          this._hamiltonianCycle.length <
          SnakeAIDemo_HamiltonianCycle.DO_NOT_CALCULATE_HAMILTONIAN
        )
          return true;

        let foundGoal: boolean = false;
        const totalNumberOfTiles: number = this._tiles.length;
        const totalNumberOfNonHamTiles: number =
          totalNumberOfTiles - this._hamiltonianCycle.length;
        const nonHamTilesChecked: Tile[] = [];
        const outerRing: Tile[] = [];

        const viableCursor: Tile =
          this._hamiltonianCycle[this._hamiltonianCycle.length - 1];
        const initializeOuterRing = (outerRing: Tile[], start: Tile): void => {
          const neighbors: Tile[] = getValidNeighbors(start);
          neighbors.forEach((element) => {
            outerRing.push(element);
          });

          return;
        };
        initializeOuterRing(outerRing, viableCursor);

        while (true) {
          const removeFromOuterRing: Tile[] = [];
          outerRing.forEach((element) => {
            element.getNeighbors().forEach((element: number) => {
              const neighbor: Tile = this.getTileByIndex(element);
              if (neighbor.index === hamGoal.index) foundGoal = true;
            });

            nonHamTilesChecked.push(element);
            removeFromOuterRing.push(element);
          });

          outerRing.forEach((element) => {
            const neighbors: Tile[] = getValidNeighbors(element);
            neighbors.forEach((element) => {
              if (nonHamTilesChecked.includes(element)) return;
              if (this._hamiltonianCycle.includes(element)) return;
              if (outerRing.includes(element)) return;

              outerRing.push(element);
              return;
            });

            return;
          });

          removeFromOuterRing.forEach((element) => {
            outerRing.splice(outerRing.indexOf(element), 1);
          });

          if (
            this
              ._animateTimeoutAfterEachSpreadCycleForViableHamIfItCanReachAllUnhamedTiles ===
            true
          ) {
            this.clearAllColors();
            this.colorHamiltonianCycle();
            this.colorNeighbors(outerRing);
            this.colorTileChecking(nonHamTilesChecked);

            await new Promise((resolve) =>
              setTimeout(
                resolve,
                this
                  ._timeoutAfterEachSpreadCycleForViableHamIfItCanReachAllUnhamedTiles
              )
            );
          }

          if (
            nonHamTilesChecked.length >= totalNumberOfNonHamTiles &&
            foundGoal
          )
            return true;

          if (outerRing.length === 0) break;
          continue;
        }

        return false;
      };

      const currentTilesAreViable = async (): Promise<boolean> => {
        if (
          this._hamiltonianCycle.length <
          SnakeAIDemo_HamiltonianCycle.DO_NOT_CALCULATE_HAMILTONIAN
        )
          return true;

        const allTilesToCheck: Tile[] = [];
        this._tiles.forEach((element) => {
          if (this._hamiltonianCycle.includes(element)) return;
          allTilesToCheck.push(element);
        });

        this.colorTileViable(allTilesToCheck);
        if (
          this
            ._animateTimeoutAfterCheckingIfAllUnhamedTilesAreNotLeadingToAnUnreachableHamCycleForCurrentProgressedHam ===
          true
        ) {
          await new Promise((resolve) =>
            setTimeout(
              resolve,
              this
                ._timeoutAfterCheckingIfAllUnhamedTilesAreNotLeadingToAnUnreachableHamCycleForCurrentProgressedHam
            )
          );
        }

        while (allTilesToCheck.length > 0) {
          const validateTile = async (tile: Tile): Promise<boolean> => {
            const validNeighbors: Tile[] = getValidNeighbors(tile);
            if (validNeighbors.length > 2) return true;

            if (validNeighbors.length === 2) {
              const checkIfTileIsRelevant = async (
                tile: Tile
              ): Promise<boolean> => {
                const neighborsIndices: number[] = tile.getNeighbors();
                let isRelevant: boolean = false;
                neighborsIndices.forEach((element) => {
                  const neighbor: Tile = this.getTileByIndex(element);
                  if (this._hamiltonianCycle.includes(neighbor))
                    isRelevant = true;
                  return;
                });

                if (isRelevant === false) return false;

                const ifHeadOrTailIsANeighborThanItIsNotRelevant = (
                  tile: Tile
                ): boolean => {
                  let headOrTailNearby: boolean = false;

                  const neighborsIndices: number[] = tile.getNeighbors();
                  neighborsIndices.forEach((element) => {
                    const neighbor: Tile = this.getTileByIndex(element);
                    if (neighbor.index === hamGoal.index)
                      headOrTailNearby = true;
                    if (
                      neighbor.index ===
                      this._hamiltonianCycle[this._hamiltonianCycle.length - 1]
                        .index
                    )
                      headOrTailNearby = true;

                    return;
                  });

                  return headOrTailNearby;
                };

                const headOrTailIsANeighbor: boolean =
                  ifHeadOrTailIsANeighborThanItIsNotRelevant(tile);

                if (headOrTailIsANeighbor === true) return false;

                const ifTheTwoNeighborsAreNotVerticallyOrHorizontallyAlignedThanItIsNotRelevant =
                  (tile: Tile): boolean => {
                    let tileIsRelevant: boolean = false;

                    const neighbors: Tile[] = getValidNeighbors(tile);
                    if (neighbors.length !== 2) {
                      console.error(
                        'FATAL ERROR: Expected 2 neighbors, but got ' +
                          neighbors.length +
                          '.'
                      );
                      alert(
                        'FATAL ERROR: Expected 2 neighbors, but got ' +
                          neighbors.length +
                          '.'
                      );
                      return true;
                    }

                    const firstNeighbor: Tile = this.getTileByIndex(
                      neighbors[0].index
                    );
                    const secondNeighbor: Tile = this.getTileByIndex(
                      neighbors[1].index
                    );

                    if (firstNeighbor.x === secondNeighbor.x)
                      tileIsRelevant = true;
                    if (firstNeighbor.y === secondNeighbor.y)
                      tileIsRelevant = true;

                    return tileIsRelevant;
                  };

                const theTwoNeighborsAreAligned: boolean =
                  ifTheTwoNeighborsAreNotVerticallyOrHorizontallyAlignedThanItIsNotRelevant(
                    tile
                  );

                if (theTwoNeighborsAreAligned === false) return false;

                return true;
              };

              if ((await checkIfTileIsRelevant(tile)) === false) return true;

              tile.element.style.setProperty(
                Tile.TILE_COLOR_VAR,
                Tile.COLOR_TILE_TWO_NEIGHBORS_CHECK_FROM_TILE
              );
              if (
                this
                  ._animateTimeoutAfterEachSpreadCycleForTwoNeighborsViableCheck ===
                true
              ) {
                await new Promise((resolve) =>
                  setTimeout(
                    resolve,
                    this._timeoutAfterEachSpreadCycleForTwoNeighborsViableCheck
                  )
                );
              }

              const theTwoNeighborsToCheck: Tile[] = getValidNeighbors(tile);
              const firstNeighborToCheck: Tile = theTwoNeighborsToCheck[0];
              let firstNeighborCanReachHeadOrTail: boolean = false;
              const secondNeighborToCheck: Tile = theTwoNeighborsToCheck[1];
              let secondNeighborCanReachHeadOrTail: boolean = false;

              const checkIfNeighborCanReachHeadOrTail = async (
                fromNeighbor: Tile,
                neighbor: Tile
              ): Promise<boolean> => {
                let neighborCanReachHeadOrTail: boolean = false;
                const checkedTiles: Tile[] = [];
                const outerRing: Tile[] = [];
                outerRing.push(neighbor);

                while (neighborCanReachHeadOrTail === false) {
                  const removeLaterFromOuterRing: Tile[] = [];
                  outerRing.forEach((element: Tile) => {
                    removeLaterFromOuterRing.push(element);
                  });

                  outerRing.forEach((element: Tile) => {
                    checkedTiles.push(element);

                    const neighborsIndices: number[] = element.getNeighbors();
                    neighborsIndices.forEach((element: number) => {
                      const tileToCheck: Tile = this.getTileByIndex(element);

                      if (tileToCheck.index === hamGoal.index)
                        neighborCanReachHeadOrTail = true;
                      if (
                        tileToCheck.index ===
                        this._hamiltonianCycle[
                          this._hamiltonianCycle.length - 1
                        ].index
                      )
                        neighborCanReachHeadOrTail = true;

                      if (this._hamiltonianCycle.includes(tileToCheck)) return;
                      if (checkedTiles.includes(tileToCheck)) return;
                      if (outerRing.includes(tileToCheck)) return;
                      if (tileToCheck.index === fromNeighbor.index) return;

                      outerRing.push(tileToCheck);
                      return;
                    });
                  });

                  removeLaterFromOuterRing.forEach((element: Tile) => {
                    outerRing.splice(outerRing.indexOf(element), 1);
                  });

                  if (
                    this
                      ._animateTimeoutAfterEachSpreadCycleForTwoNeighborsViableCheck ===
                    true
                  ) {
                    this.clearAllColors();
                    this.colorHamiltonianCycle();
                    this.colorTileTwoNeighborsFromTile(fromNeighbor);
                    this.colorTileTwoNeighborsCheckedTiles(checkedTiles);
                    this.colorOuterRing(outerRing);

                    await new Promise((resolve) =>
                      setTimeout(
                        resolve,
                        this
                          ._timeoutAfterEachSpreadCycleForTwoNeighborsViableCheck
                      )
                    );
                  }

                  if (outerRing.length === 0) break;
                  continue;
                }

                return neighborCanReachHeadOrTail;
              };

              firstNeighborCanReachHeadOrTail =
                await checkIfNeighborCanReachHeadOrTail(
                  tile,
                  firstNeighborToCheck
                );
              if (firstNeighborCanReachHeadOrTail === false) return false;

              secondNeighborCanReachHeadOrTail =
                await checkIfNeighborCanReachHeadOrTail(
                  tile,
                  secondNeighborToCheck
                );
              if (secondNeighborCanReachHeadOrTail === false) return false;

              // Is tile valid; false = calculate new hamiltonian cycle
              return true;
            }

            const allNeighborsIndices: number[] = tile.getNeighbors();
            const allNeighbors: Tile[] = [];
            allNeighborsIndices.forEach((element) => {
              const neighbor: Tile = this.getTileByIndex(element);
              allNeighbors.push(neighbor);
              return;
            });

            if (allNeighbors.includes(hamGoal) === true) return true;
            if (
              allNeighbors.includes(
                this._hamiltonianCycle[this._hamiltonianCycle.length - 1]
              )
            )
              return true;

            return false;
          };

          const tile: Tile = allTilesToCheck[0];
          const isValid: boolean = await validateTile(tile);

          if (isValid === false) {
            tile.element.style.setProperty(
              Tile.TILE_COLOR_VAR,
              Tile.COLOR_NOT_GOOD_TILE
            );
            if (this._animateTimeoutAfterANotGoodTileWasFound === true) {
              await new Promise((resolve) =>
                setTimeout(resolve, this._timeoutAfterANotGoodTileWasFound)
              );
            }

            return false;
          }

          allTilesToCheck.splice(0, 1);
          continue;
        }

        return true;
      };

      const hamCursor: Tile =
        this._hamiltonianCycle[this._hamiltonianCycle.length - 1];

      const algorithmSucceeded = (): boolean => {
        if (this._hamiltonianCycle.length < SnakeAIDemo_HamiltonianCycle.ALPHA)
          return false;

        const potentialGoalsIndices: number[] = hamCursor.getNeighbors();
        const potentialGoals: Tile[] = [];
        potentialGoalsIndices.forEach((element) => {
          const neighbor: Tile = this.getTileByIndex(element);
          potentialGoals.push(neighbor);
        });

        if (potentialGoals.includes(hamGoal) === false) return false;
        if (
          this._hamiltonianCycle.length +
            SnakeAIDemo_HamiltonianCycle.ALPHA_GOAL <
          this._rows * this._columns
        )
          return false;

        return true;
      };

      const isSucceeded: boolean = algorithmSucceeded();
      if (isSucceeded === true) return true;

      const areCurrentTilesViable: boolean = await currentTilesAreViable();
      if (areCurrentTilesViable === false) return false;

      const isCurrentHamViable: boolean = await currentHamIsViable();
      if (isCurrentHamViable === false) return false;

      const validNeighbors: Tile[] = getValidNeighbors(hamCursor);
      let uncheckedNeighbors: number = validNeighbors.length;
      if (uncheckedNeighbors === 0) return false;

      while (uncheckedNeighbors > 0) {
        if (this.animateTimeoutAfterCheckingOneNeighbor === true) {
          this.clearAllColors();
          this.colorHamiltonianCycle();
          this.colorNeighbors(validNeighbors);

          await new Promise((resolve) =>
            setTimeout(resolve, this._timeoutAfterCheckingOneNeighbor)
          );
        }

        const randomIndex: number = getRandomIndexWithRules(validNeighbors);
        const randomNeighbor: Tile = validNeighbors[randomIndex];

        this._hamiltonianCycle.push(randomNeighbor);
        uncheckedTiles = uncheckedTiles - 1;

        const hamFound: boolean = await findHam(uncheckedTiles);
        if (hamFound === true) return true;

        this._hamiltonianCycle.pop();
        uncheckedTiles = uncheckedTiles + 1;
        validNeighbors.splice(randomIndex, 1);

        uncheckedNeighbors = validNeighbors.length;
        continue;
      }

      return false;
    };

    const success = await findHam(uncheckedTiles);

    if (success) {
      if (this._animateSucceededHam === true) {
        this.clearAllColors();
        await new Promise((resolve) =>
          setTimeout(resolve, this._blinkTimeoutAfterSucceededHam)
        );

        this.colorHamiltonianCycle();
        await new Promise((resolve) =>
          setTimeout(resolve, this._blinkTimeoutAfterSucceededHam)
        );

        this.clearAllColors();
        await new Promise((resolve) =>
          setTimeout(resolve, this._blinkTimeoutAfterSucceededHam)
        );

        this.colorHamiltonianCycle();
        await new Promise((resolve) =>
          setTimeout(resolve, this._blinkTimeoutAfterSucceededHam)
        );

        this.clearAllColors();
        await new Promise((resolve) =>
          setTimeout(resolve, this._blinkTimeoutAfterSucceededHam)
        );

        this.colorHamiltonianCycle();
        await new Promise((resolve) =>
          setTimeout(resolve, this._blinkTimeoutAfterSucceededHam)
        );

        this.clearAllColors();
        this.animationForASucceededHamiltonianCycle();

        return;
      }

      this.clearAllColors();
      return;
    }

    console.error('FATAL ERROR: No Hamiltonian Cycle found!');
    alert('FATAL ERROR: No Hamiltonian Cycle found!');

    return;
  }

  public async calculateANewHamiltonianCycle(): Promise<boolean> {
    await this.calculateAHamiltonianCycle();

    return true;
  }

  private reset(resetVisuals: boolean = true): void {
    this._columns = 0;
    this._rows = 0;
    this._hamiltonianCycle = [];

    // TODO: this._tiles should also always be reseted outside this method. So there is no
    // TODO: need to call the specific reset / toggle functions for the variables below.
    // TODO: WARNING: Future changes to this class may break this
    // TODO: WARNING: assumption. This is unsafe. Please fix.
    if (resetVisuals === false) return;
    this._hamCycleIsVisible = SnakeAIDemo_HamiltonianCycle.HAM_CYCLE_IS_VISIBLE;
    this._indicesAreVisible = SnakeAIDemo_HamiltonianCycle.INDICES_ARE_VISIBLE;

    return;
  }

  public resetTilesWithRecalculation(preHam?: PreHam): void {
    if (preHam !== undefined) {
      this.generateGridFromPreHam(preHam, false, true);
      return;
    }

    this.reset();
    this.fillGrid(null);

    return;
  }

  public resetTimingSettings(): void {
    this._timeoutAfterCheckingOneNeighbor =
      SnakeAIDemo_HamiltonianCycle.TIMEOUT_AFTER_CHECKING_ONE_NEIGHBOR;
    this._timeoutAfterEachSpreadCycleForViableHamIfItCanReachAllUnhamedTiles =
      SnakeAIDemo_HamiltonianCycle.TIMEOUT_AFTER_EACH_SPREAD_CYCLE_FOR_VIABLE_HAM_IF_IT_CAN_REACH_ALL_UNHAMED_TILES;
    this._timeoutAfterCheckingIfAllUnhamedTilesAreNotLeadingToAnUnreachableHamCycleForCurrentProgressedHam =
      SnakeAIDemo_HamiltonianCycle.TIMEOUT_AFTER_CHECKING_IF_ALL_UNHAMED_TILES_ARE_NOT_LEADING_TO_AN_UNREACHABLE_HAM_CYCLE_FOR_CURRENT_PROGRESSED_HAM;
    this._timeoutAfterANotGoodTileWasFound =
      SnakeAIDemo_HamiltonianCycle.TIMEOUT_AFTER_A_NOT_GOOD_TILE_WAS_FOUND;
    this._timeoutAfterEachSpreadCycleForTwoNeighborsViableCheck =
      SnakeAIDemo_HamiltonianCycle.TIMEOUT_AFTER_EACH_SPREAD_CYCLE_FOR_TWO_NEIGHBORS_VIABLE_CHECK;
    this._timeoutAfterEachSpreadCycleForSucceededHam =
      SnakeAIDemo_HamiltonianCycle.TIMEOUT_AFTER_EACH_SPREAD_CYCLE_FOR_SUCCEEDED_HAM;
    this._timeoutAfterEachSpreadCycleForSucceededHamBackToNormal =
      SnakeAIDemo_HamiltonianCycle.TIMEOUT_AFTER_EACH_SPREAD_CYCLE_FOR_SUCCEEDED_HAM_BACK_TO_NORMAL;

    this._animateTimeoutAfterCheckingOneNeighbor =
      SnakeAIDemo_HamiltonianCycle.ANIMATE_TIMEOUT_AFTER_CHECKING_ONE_NEIGHBOR;
    this._animateTimeoutAfterEachSpreadCycleForViableHamIfItCanReachAllUnhamedTiles =
      SnakeAIDemo_HamiltonianCycle.ANIMATE_TIMEOUT_AFTER_EACH_SPREAD_CYCLE_FOR_VIABLE_HAM_IF_IT_CAN_REACH_ALL_UNHAMED_TILES;
    this._animateTimeoutAfterCheckingIfAllUnhamedTilesAreNotLeadingToAnUnreachableHamCycleForCurrentProgressedHam =
      SnakeAIDemo_HamiltonianCycle.ANIMATE_TIMEOUT_AFTER_CHECKING_IF_ALL_UNHAMED_TILES_ARE_NOT_LEADING_TO_AN_UNREACHABLE_HAM_CYCLE_FOR_CURRENT_PROGRESSED_HAM;
    this._animateTimeoutAfterANotGoodTileWasFound =
      SnakeAIDemo_HamiltonianCycle.ANIMATE_TIMEOUT_AFTER_A_NOT_GOOD_TILE_WAS_FOUND;
    this._animateTimeoutAfterEachSpreadCycleForTwoNeighborsViableCheck =
      SnakeAIDemo_HamiltonianCycle.ANIMATE_TIMEOUT_AFTER_EACH_SPREAD_CYCLE_FOR_TWO_NEIGHBORS_VIABLE_CHECK;
    this._animateTimeoutAfterEachSpreadCycleForSucceededHam =
      SnakeAIDemo_HamiltonianCycle.ANIMATE_TIMEOUT_AFTER_EACH_SPREAD_CYCLE_FOR_SUCCEEDED_HAM;

    return;
  }

  public toggleIndices(onlyUpdateTheTiles: boolean = false): void {
    const writeIndicesToInnerHTML = (): void => {
      this._tiles.forEach((element: Tile) => {
        element.writeIndexToInnerHtml();
      });
    };

    const clearIndicesFromInnerHTML = (): void => {
      this._tiles.forEach((element: Tile) => {
        element.clearIndexFromInnerHtml();
      });
    };

    if (onlyUpdateTheTiles === true) {
      if (this._indicesAreVisible === true) {
        writeIndicesToInnerHTML();

        return;
      }

      clearIndicesFromInnerHTML();
      return;
    }

    if (this._indicesAreVisible === true) {
      clearIndicesFromInnerHTML();
      this._indicesAreVisible = false;
      return;
    }

    writeIndicesToInnerHTML();
    this._indicesAreVisible = true;

    return;
  }

  public get hamiltonianCycleLength(): number {
    return this._hamiltonianCycle.length;
  }

  public toggleHamiltonianCycle(onlyUpdateTheTiles: boolean = false): void {
    const showHamiltonianCycle = (): void => {
      const isVerticallyAligned = (
        previousElement: Tile,
        nextElement: Tile
      ): boolean => {
        return previousElement.x === nextElement.x;
      };

      const isHorizontallyAligned = (
        previousElement: Tile,
        nextElement: Tile
      ): boolean => {
        return previousElement.y === nextElement.y;
      };

      const isCornerTopRight = (
        previousElement: Tile,
        currentElement: Tile,
        nextElement: Tile
      ): boolean => {
        return (
          (currentElement.x === previousElement.x &&
            currentElement.y > previousElement.y &&
            currentElement.x < nextElement.x &&
            currentElement.y === nextElement.y) ||
          (currentElement.x < previousElement.x &&
            currentElement.y === previousElement.y &&
            currentElement.x === nextElement.x &&
            currentElement.y > nextElement.y)
        );
      };

      const isCornerTopLeft = (
        previousElement: Tile,
        currentElement: Tile,
        nextElement: Tile
      ): boolean => {
        return (
          (currentElement.x === previousElement.x &&
            currentElement.y > previousElement.y &&
            currentElement.x > nextElement.x &&
            currentElement.y === nextElement.y) ||
          (currentElement.x > previousElement.x &&
            currentElement.y === previousElement.y &&
            currentElement.x === nextElement.x &&
            currentElement.y > nextElement.y)
        );
      };

      const isCornerBottomRight = (
        previousElement: Tile,
        currentElement: Tile,
        nextElement: Tile
      ): boolean => {
        return (
          (currentElement.x < previousElement.x &&
            currentElement.y === previousElement.y &&
            currentElement.x === nextElement.x &&
            currentElement.y < nextElement.y) ||
          (currentElement.x === previousElement.x &&
            currentElement.y < previousElement.y &&
            currentElement.x < nextElement.x &&
            currentElement.y === nextElement.y)
        );
      };

      const isCornerBottomLeft = (
        previousElement: Tile,
        currentElement: Tile,
        nextElement: Tile
      ): boolean => {
        return (
          (currentElement.x > previousElement.x &&
            currentElement.y === previousElement.y &&
            currentElement.x === nextElement.x &&
            currentElement.y < nextElement.y) ||
          (currentElement.x === previousElement.x &&
            currentElement.y < previousElement.y &&
            currentElement.x > nextElement.x &&
            currentElement.y === nextElement.y)
        );
      };

      for (let i = 0; i < this._hamiltonianCycle.length; i++) {
        const previousIndex: number =
          i <= 0 ? this._hamiltonianCycle.length - 1 : i - 1;
        const nextIndex: number =
          i >= this._hamiltonianCycle.length - 1 ? 0 : i + 1;

        const P = this._hamiltonianCycle[previousIndex];
        const C = this._hamiltonianCycle[i];
        const N = this._hamiltonianCycle[nextIndex];

        if (isVerticallyAligned(P, N)) {
          C.showHamiltonianCycle(Tile.HAM_TYPE_HORIZONTAL_LINE);
          continue;
        }

        if (isHorizontallyAligned(P, N)) {
          C.showHamiltonianCycle(Tile.HAM_TYPE_VERTICAL_LINE);
          continue;
        }

        if (isCornerTopRight(P, C, N)) {
          C.showHamiltonianCycle(Tile.HAM_TYPE_CORNER_TOP_RIGHT);
          continue;
        }

        if (isCornerTopLeft(P, C, N)) {
          C.showHamiltonianCycle(Tile.HAM_TYPE_CORNER_TOP_LEFT);
          continue;
        }

        if (isCornerBottomRight(P, C, N)) {
          C.showHamiltonianCycle(Tile.HAM_TYPE_CORNER_BOTTOM_RIGHT);
          continue;
        }

        if (isCornerBottomLeft(P, C, N)) {
          C.showHamiltonianCycle(Tile.HAM_TYPE_CORNER_BOTTOM_LEFT);
          continue;
        }

        C.showHamiltonianCycle('not supported');
        continue;
      }
    };
    const clearHamiltonianCycle = (): void => {
      this._hamiltonianCycle.forEach((element: Tile) => {
        element.hideHamiltonianCycle();
      });
    };

    if (this._hamiltonianCycle.length <= 1) {
      if (this._hamCycleIsVisible === false && onlyUpdateTheTiles === false)
        alert("You don't have a Hamiltonian Cycle calculated / selected yet!");

      this._hamCycleIsVisible = false;
      return;
    }

    if (onlyUpdateTheTiles === true) {
      if (this._hamCycleIsVisible === true) {
        showHamiltonianCycle();
        return;
      }

      clearHamiltonianCycle();
      return;
    }

    if (this._hamCycleIsVisible === true) {
      clearHamiltonianCycle();
      this._hamCycleIsVisible = false;
      return;
    }

    showHamiltonianCycle();
    this._hamCycleIsVisible = true;

    return;
  }

  private generateHamiltonianCycleFromIndices(
    hamiltonianCycleIndices: number[]
  ): void {
    hamiltonianCycleIndices.forEach((element: number) => {
      if (element < 0 || element >= hamiltonianCycleIndices.length) {
        console.error('FATAL ERROR: Invalid Hamiltonian Cycle indices!');
        alert('FATAL ERROR: Invalid Hamiltonian Cycle indices!');

        return;
      }

      this._hamiltonianCycle.push(this.getTileByIndex(element));
    });

    return;
  }

  private async animationForASucceededHamiltonianCycle(): Promise<void> {
    if (this._hamiltonianCycle.length <= SnakeAIDemo_HamiltonianCycle.BETA)
      return;

    let framesSkipped: number = 0;
    const length = this._hamiltonianCycle.length;
    const timeoutAfterEachSpread = Math.floor(
      SnakeAIDemo_HamiltonianCycle.TOTAL_TIME_FOR_THE_ANIMATION_OF_A_SUCCEEDED_HAM /
        length
    );

    for (let i = 0; i < this._hamiltonianCycle.length; i++) {
      this._hamiltonianCycle[i].element.style.setProperty(
        Tile.TILE_COLOR_VAR,
        Tile.COLOR_SUCCESS
      );

      const colorToNormal = async (): Promise<void> => {
        return new Promise((resolve) => {
          setTimeout(() => {
            this._hamiltonianCycle[i].element.style.setProperty(
              Tile.TILE_COLOR_VAR,
              Tile.STD_COLOR
            );
          }, this._timeoutAfterEachSpreadCycleForSucceededHamBackToNormal);
        });
      };
      colorToNormal();
      if (this._animateSucceededHam === false) return;

      // To fix some unknown latency issues
      if (timeoutAfterEachSpread < 6) {
        if (framesSkipped >= 3 && timeoutAfterEachSpread > 2) {
          framesSkipped = 0;
          await new Promise((resolve) => setTimeout(resolve, 1));
          continue;
        }

        if (framesSkipped >= 7) {
          framesSkipped = 0;
          await new Promise((resolve) => setTimeout(resolve, 1));
          continue;
        }

        framesSkipped = framesSkipped + 1;
        continue;
      }
      await new Promise((resolve) =>
        setTimeout(resolve, timeoutAfterEachSpread)
      );
    }

    const colorToNormalForFirstTile = async (): Promise<void> => {
      return new Promise((r) => {
        setTimeout(() => {
          this._hamiltonianCycle[0].element.style.setProperty(
            Tile.TILE_COLOR_VAR,
            Tile.STD_COLOR
          );
        }, this._timeoutAfterEachSpreadCycleForSucceededHamBackToNormal);
      });
    };
    this._hamiltonianCycle[0].element.style.setProperty(
      Tile.TILE_COLOR_VAR,
      Tile.COLOR_SUCCESS
    );
    colorToNormalForFirstTile();
    await new Promise((resolve) =>
      setTimeout(resolve, this._timeoutAfterEachSpreadCycleForSucceededHam)
    );

    return;
  }

  public generateGridFromPreHam(
    preHam: PreHam,
    animateHamiltonianCycle: boolean = true,
    resetVisuals: boolean = false
  ): void {
    this.reset(resetVisuals);

    this.fillGrid(null, preHam.rows, preHam.columns);
    this.generateHamiltonianCycleFromIndices(preHam.hamiltonianCycle);

    if (animateHamiltonianCycle === true)
      this.animationForASucceededHamiltonianCycle();

    this.toggleIndices(true);
    this.toggleHamiltonianCycle(true);

    return;
  }

  public async snakeLoopCallThisFunctionInALoop(
    direction: number
  ): Promise<boolean> {
    const getNewHead = async (head: Tile): Promise<Tile | null> => {
      let newHead: Tile | null = null;

      // TODO: Kinda pointless. FIX: Save current index in var.
      for (let i = 0; i < this._hamiltonianCycle.length; i++) {
        if (this._hamiltonianCycle[i].index !== head.index) continue;

        const tilesAreAligned = (
          previousTile: Tile,
          nextTile: Tile
        ): boolean => {
          if (previousTile.index === nextTile.index) return false;
          if (previousTile.x === nextTile.x) return true;
          if (previousTile.y === nextTile.y) return true;

          return false;
        };

        const P: Tile =
          i - 1 >= 0
            ? this._hamiltonianCycle[i - 1]
            : this._hamiltonianCycle[this._hamiltonianCycle.length - 1];
        const C: Tile = this._hamiltonianCycle[i];
        const N: Tile =
          i + 1 < this._hamiltonianCycle.length
            ? this._hamiltonianCycle[i + 1]
            : this._hamiltonianCycle[0];

        if (this._doYouWantToSeeTheSnakeSuffer === false) {
          newHead = N;
          break;
        }

        if (tilesAreAligned(P, N) === true) {
          newHead = N;
          break;
        }

        const getPotentialNewHeadByShortCutHamCycle = (
          P: Tile,
          C: Tile
        ): Tile | null => {
          if (P.x === C.x) {
            if (P.y < C.y) {
              const newY = C.y + 1 >= this._rows ? -1 : C.y + 1;
              if (newY === -1) return null;
              const pNH: Tile = this.getTileByXY(C.x, newY);
              return pNH;
            }

            if (P.y > C.y) {
              const newY = C.y - 1 < 0 ? -1 : C.y - 1;
              if (newY === -1) return null;
              const pNH: Tile = this.getTileByXY(C.x, newY);
              return pNH;
            }

            return null;
          }

          if (P.y === C.y) {
            if (P.x < C.x) {
              const newX = C.x + 1 >= this._columns ? -1 : C.x + 1;
              if (newX === -1) return null;
              const pNH: Tile = this.getTileByXY(newX, C.y);
              return pNH;
            }

            if (P.x > C.x) {
              const newX = C.x - 1 < 0 ? -1 : C.x - 1;
              if (newX === -1) return null;
              const pNH: Tile = this.getTileByXY(newX, C.y);
              return pNH;
            }

            return null;
          }

          return null;
        };

        const pNH = getPotentialNewHeadByShortCutHamCycle(P, C);
        if (pNH === null) {
          newHead = N;
          break;
        }

        let indexOfPNH: number = -1;
        const indexOfC: number = i;
        for (let j = 0; j < this._hamiltonianCycle.length; j++) {
          if (this._hamiltonianCycle[j].index !== pNH.index) continue;
          indexOfPNH = j;
          break;
        }
        if (indexOfPNH === -1) {
          newHead = N;
          break;
        }

        let cursor: number = indexOfC;
        while (true) {
          cursor = cursor + 1 >= this._hamiltonianCycle.length ? 0 : cursor + 1;
          if (cursor === indexOfPNH) break;
          const tile: Tile = this._hamiltonianCycle[cursor];

          if (this._snake.includes(tile) === true) {
            newHead = N;
            return newHead;
          }

          if (this._snakeFood != null && tile.index === this._snakeFood.index) {
            newHead = N;
            return newHead;
          }

          continue;
        }

        // pNH can be the last tile of the snake.
        if (this._snake.includes(pNH) === true) {
          newHead = N;
          break;
        }

        newHead = pNH;
        break;
      }

      return newHead;
    };

    const validateHead = (head: Tile): boolean => {
      if (this._snake.includes(head) === true) return false;

      return true;
    };

    const isSnakeOnFood = (): boolean => {
      const head = this._snake[0];
      if (this._snakeFood === null) return false;
      if (head.index === this._snakeFood.index) return true;

      return false;
    };

    const spawnFoodIfPossible = (): void => {
      if (this._snakeFood !== null) return;

      const usableTiles = this._tiles.filter((tile: Tile): Tile | null => {
        if (this._snake.includes(tile) === true) return null;
        return tile;
      });

      this._snakeFood =
        usableTiles[Math.floor(Math.random() * usableTiles.length)];

      return;
    };

    const handleColoring = (): void => {
      this.clearAllColors();
      this.colorEverythingOfTheSnake();
      this.colorSnakeFood();

      return;
    };

    const error = (): void => {
      console.error(
        `\
FATAL ERROR: Snake wanted to move, but lost its head in the process. This should never happen.\n
Is there a current hamiltonian cycle? If so, please report this bug to the developer.\n
Current hamiltonian cycle length: ${
          this._hamiltonianCycle === undefined
            ? 'undefined'
            : this.hamiltonianCycleLength
        }.
`
      );
      alert(`\
FATAL ERROR: Snake wanted to move, but lost its head in the process. This should never happen.\n
Is there a current hamiltonian cycle? If so, please report this bug to the developer.\n
Current hamiltonian cycle length: ${
        this._hamiltonianCycle === undefined
          ? 'undefined'
          : this.hamiltonianCycleLength
      }.
`);

      return;
    };

    this._snakeMoves += 1;

    const head = this._snake[0];
    const newHead: Tile | null = await getNewHead(head);
    if (newHead === null) {
      error();
      return false;
    }
    if (validateHead(newHead) === false) return false;
    this._snake.unshift(newHead);
    if (this._snake.length > this._snakeLength) this._snake.pop();

    const onFood: boolean = isSnakeOnFood();
    if (onFood === true) {
      this._snakeLength++;
      this._snakeFood = null;
    }
    spawnFoodIfPossible();

    handleColoring();

    if (this._snake.length >= this._tiles.length) {
      if (this._snake.length > this._tiles.length) {
        error();
        return false;
      }

      return false;
    }

    return true;
  }

  public get snakeLength(): number {
    return this._snake.length;
  }

  public prepareSnakeLoop(): number {
    const getMiddleTile = (): Tile => {
      const middleRow = Math.floor(this._rows / 2);
      const middleColumn = Math.floor(this._columns / 2);

      return this.getTileByRowAndColumn(middleRow, middleColumn);
    };

    const calculateRandomDirection = (): number => {
      return Math.random() < 0.5 ? -1 : 1;
    };

    const middleTile: Tile = getMiddleTile();
    const direction: number = calculateRandomDirection();

    this._snake = [];
    this._snake.push(middleTile);
    this._snakeLength = SnakeAIDemo_HamiltonianCycle.STARTING_SIZE_OF_SNAKE;
    this._snakeFood = null;
    this._snakeMoves = 0;
    this._currentMove = 0;

    return direction;
  }

  public async blinkingSuccessAnimationAfterSnakeSucceeded(): Promise<void> {
    this.clearAllColors();
    await new Promise((resolve) =>
      setTimeout(resolve, this._blinkTimeoutAfterSucceededSnake)
    );

    this.colorSnakeTail();
    await new Promise((resolve) =>
      setTimeout(resolve, this._blinkTimeoutAfterSucceededSnake)
    );

    this.clearAllColors();
    await new Promise((resolve) =>
      setTimeout(resolve, this._blinkTimeoutAfterSucceededSnake)
    );

    this.colorSnakeTail();
    await new Promise((resolve) =>
      setTimeout(resolve, this._blinkTimeoutAfterSucceededSnake)
    );

    this.clearAllColors();
    await new Promise((resolve) =>
      setTimeout(resolve, this._blinkTimeoutAfterSucceededSnake)
    );

    this.colorSnakeTail();
    await new Promise((resolve) =>
      setTimeout(resolve, this._blinkTimeoutAfterSucceededSnake)
    );

    this.clearAllColors();
    const animationForASucceededSnake = async (): Promise<void> => {
      const timeoutAfterEachSpread = Math.floor(
        SnakeAIDemo_HamiltonianCycle.TOTAL_TIME_FOR_THE_ANIMATION_OF_A_SUCCEEDED_SNAKE /
          this._snake.length
      );

      for (let i = 0; i < this._snake.length; i++) {
        this._snake[i].element.style.setProperty(
          Tile.TILE_COLOR_VAR,
          Tile.COLOR_SUCCESS
        );

        const colorToNormal = async (): Promise<void> => {
          return new Promise((resolve) => {
            setTimeout(() => {
              this._snake[i].element.style.setProperty(
                Tile.TILE_COLOR_VAR,
                Tile.STD_COLOR
              );
            }, this._timeoutAfterEachSpreadCycleForSucceededSnakeBackToNormal);
          });
        };
        colorToNormal();

        if (this._animateSucceededSnake === false) return;
        await new Promise((resolve) =>
          setTimeout(resolve, timeoutAfterEachSpread)
        );
      }

      await new Promise((resolve) =>
        setTimeout(resolve, this._blinkTimeoutAfterSucceededSnake)
      );

      return;
    };
    await animationForASucceededSnake();

    return;
  }
}

class PreHam {
  public static readonly COLOR_UNSELECTED: string = '#525151';
  public static readonly COLOR_SELECTED: string = '#6e6e6e';

  private _ratio: string;
  private _rows: number | undefined;
  private _columns: number | undefined;
  private _label: string | undefined;
  private _hamiltonianCycle: number[];

  constructor(
    ratio: string,
    rows: number | undefined,
    columns: number | undefined,
    hamiltonianCycle?: number[],
    label?: string
  ) {
    this._ratio = ratio;

    if (rows === undefined || columns === undefined) {
      this._label = label;
      this._hamiltonianCycle = [];
      return;
    }

    this._rows = rows;
    this._columns = columns;
    this._hamiltonianCycle = hamiltonianCycle ?? [];
    this._label = `${columns}x${rows}`;
  }

  public get ratio(): string {
    return this._ratio;
  }

  public get rows(): number | undefined {
    return this._rows;
  }

  public get columns(): number | undefined {
    return this._columns;
  }

  public get label(): string {
    return this._label ?? '';
  }

  public get hamiltonianCycle(): number[] {
    return this._hamiltonianCycle;
  }
}

class Ratio {
  public static readonly AUTO_INDEX: number = 0;
  public static readonly DEFAULT_RATIO_INDEX: number = 2;

  public static readonly AUTO: string = 'auto';
  public static readonly FOUR_TO_THREE: string = '4:3';
  public static readonly SIXTEEN_TO_NINE: string = '16:9';

  private _ratio: string;

  constructor(ratio: string) {
    this._ratio = ratio;
  }

  public get ratio(): string {
    return this._ratio;
  }

  public asNumber(): number {
    if (this._ratio === 'auto') {
      return 0;
    }

    const ratioSplit: string[] = this._ratio.split(':');
    const ratioAsNumber: number =
      parseInt(ratioSplit[0]) / parseInt(ratioSplit[1]);

    return ratioAsNumber;
  }
}

class CalculationMethodForNewHams {
  public static readonly DEFAULT_CALCULATION_METHOD_INDEX: number = 0;

  private _method: string;
  private _complexity: string;

  constructor(method: string, complexity: string) {
    this._method = method;
    this._complexity = complexity;

    return;
  }

  public get method(): string {
    return this._method;
  }

  public get complexity(): string {
    return this._complexity;
  }
}

export const ratios: Ratio[] = [
  new Ratio('auto'),
  new Ratio('4:3'),
  new Ratio('16:9'),
];

export const preHams: PreHam[] = [
  new PreHam(Ratio.AUTO, undefined, undefined, undefined, 'auto'),
  new PreHam(
    Ratio.FOUR_TO_THREE,
    6,
    8,
    [
      0, 8, 16, 24, 32, 40, 41, 42, 43, 44, 36, 35, 27, 19, 20, 28, 29, 37, 45,
      46, 47, 39, 38, 30, 31, 23, 22, 21, 13, 14, 15, 7, 6, 5, 4, 12, 11, 3, 2,
      10, 18, 26, 34, 33, 25, 17, 9, 1,
    ]
  ),
  new PreHam(
    Ratio.FOUR_TO_THREE,
    9,
    12,
    [
      0, 12, 13, 14, 15, 16, 17, 18, 30, 42, 43, 31, 19, 20, 32, 44, 45, 46, 58,
      70, 82, 94, 93, 81, 69, 57, 56, 55, 54, 53, 52, 64, 76, 88, 87, 86, 85,
      73, 61, 49, 37, 38, 50, 62, 74, 75, 63, 51, 39, 40, 41, 29, 28, 27, 26,
      25, 24, 36, 48, 60, 72, 84, 96, 97, 98, 99, 100, 101, 102, 103, 91, 79,
      78, 90, 89, 77, 65, 66, 67, 68, 80, 92, 104, 105, 106, 107, 95, 83, 71,
      59, 47, 35, 23, 11, 10, 22, 34, 33, 21, 9, 8, 7, 6, 5, 4, 3, 2, 1,
    ]
  ),
  new PreHam(
    Ratio.FOUR_TO_THREE,
    16,
    24,
    [
      0, 24, 48, 72, 96, 120, 144, 168, 169, 170, 171, 172, 173, 174, 175, 151,
      150, 149, 125, 126, 127, 128, 152, 176, 177, 153, 129, 105, 104, 103, 102,
      78, 79, 80, 81, 82, 106, 130, 131, 132, 156, 155, 154, 178, 202, 201, 200,
      199, 198, 197, 196, 195, 194, 193, 192, 216, 240, 264, 288, 312, 313, 314,
      315, 291, 290, 289, 265, 266, 267, 268, 292, 316, 340, 339, 338, 337, 336,
      360, 361, 362, 363, 364, 365, 366, 367, 368, 369, 345, 344, 343, 342, 341,
      317, 318, 319, 320, 296, 295, 294, 293, 269, 245, 244, 243, 242, 241, 217,
      218, 219, 220, 221, 222, 223, 247, 246, 270, 271, 272, 248, 224, 225, 249,
      273, 297, 321, 322, 346, 370, 371, 372, 373, 374, 375, 351, 327, 303, 302,
      326, 350, 349, 348, 347, 323, 324, 325, 301, 300, 299, 298, 274, 275, 276,
      277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 310, 309, 308, 307, 306,
      305, 304, 328, 352, 376, 377, 378, 354, 353, 329, 330, 331, 355, 379, 380,
      381, 382, 383, 359, 358, 357, 356, 332, 333, 334, 335, 311, 287, 263, 262,
      261, 260, 259, 258, 257, 256, 232, 208, 209, 233, 234, 210, 186, 185, 184,
      183, 207, 231, 255, 254, 253, 252, 251, 250, 226, 227, 228, 229, 230, 206,
      205, 204, 203, 179, 180, 181, 182, 158, 157, 133, 134, 135, 159, 160, 136,
      137, 161, 162, 163, 187, 211, 235, 236, 237, 238, 239, 215, 214, 213, 212,
      188, 189, 190, 191, 167, 166, 165, 164, 140, 141, 142, 143, 119, 95, 71,
      70, 69, 68, 92, 93, 94, 118, 117, 116, 115, 139, 138, 114, 90, 91, 67, 66,
      65, 89, 113, 112, 88, 64, 63, 87, 111, 110, 109, 108, 107, 83, 84, 85, 86,
      62, 61, 60, 59, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 23,
      22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 34, 58, 57, 33, 9, 8,
      32, 56, 55, 31, 7, 6, 30, 54, 53, 77, 101, 100, 124, 148, 147, 146, 145,
      121, 122, 123, 99, 98, 97, 73, 74, 75, 76, 52, 51, 50, 49, 25, 26, 27, 28,
      29, 5, 4, 3, 2, 1,
    ]
  ),
  // new PreHam(Ratio.FOUR_TO_THREE, 32, 48, [0]),
  new PreHam(
    Ratio.SIXTEEN_TO_NINE,
    5,
    8,
    [
      0, 8, 16, 17, 18, 26, 25, 24, 32, 33, 34, 35, 36, 37, 38, 39, 31, 23, 15,
      7, 6, 14, 22, 30, 29, 28, 27, 19, 11, 12, 20, 21, 13, 5, 4, 3, 2, 10, 9,
      1,
    ]
  ),
  new PreHam(
    Ratio.SIXTEEN_TO_NINE,
    9,
    16,
    [
      0, 16, 32, 48, 49, 50, 51, 52, 68, 67, 66, 65, 64, 80, 81, 82, 98, 99, 83,
      84, 100, 101, 102, 103, 104, 105, 121, 120, 119, 118, 117, 116, 115, 114,
      113, 97, 96, 112, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138,
      122, 106, 90, 89, 88, 87, 86, 85, 69, 70, 71, 72, 73, 74, 75, 91, 107,
      108, 109, 93, 92, 76, 77, 61, 60, 59, 58, 57, 56, 55, 54, 53, 37, 36, 35,
      19, 20, 21, 22, 38, 39, 23, 24, 40, 41, 42, 43, 27, 28, 44, 45, 29, 30,
      46, 62, 78, 94, 110, 126, 125, 124, 123, 139, 140, 141, 142, 143, 127,
      111, 95, 79, 63, 47, 31, 15, 14, 13, 12, 11, 10, 26, 25, 9, 8, 7, 6, 5, 4,
      3, 2, 18, 34, 33, 17, 1,
    ]
  ),
  new PreHam(
    Ratio.SIXTEEN_TO_NINE,
    12,
    20,
    [
      0, 20, 40, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 90, 89, 88, 87, 86,
      106, 126, 146, 145, 165, 166, 167, 147, 148, 168, 188, 189, 190, 191, 192,
      193, 173, 153, 154, 155, 156, 157, 137, 136, 135, 134, 133, 132, 152, 172,
      171, 170, 169, 149, 129, 128, 127, 107, 108, 109, 110, 130, 150, 151, 131,
      111, 91, 71, 51, 31, 32, 52, 72, 92, 112, 113, 93, 73, 53, 33, 34, 35, 36,
      37, 38, 58, 57, 56, 55, 54, 74, 94, 114, 115, 95, 75, 76, 96, 116, 117,
      118, 138, 158, 178, 198, 218, 217, 216, 215, 195, 196, 197, 177, 176, 175,
      174, 194, 214, 213, 212, 211, 210, 209, 208, 207, 187, 186, 206, 205, 185,
      184, 204, 203, 183, 163, 164, 144, 143, 123, 124, 125, 105, 85, 84, 104,
      103, 83, 82, 81, 80, 100, 120, 140, 160, 161, 141, 121, 101, 102, 122,
      142, 162, 182, 181, 180, 200, 220, 221, 201, 202, 222, 223, 224, 225, 226,
      227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 219, 199,
      179, 159, 139, 119, 99, 98, 97, 77, 78, 79, 59, 39, 19, 18, 17, 16, 15,
      14, 13, 12, 11, 10, 30, 50, 49, 29, 9, 8, 7, 6, 5, 25, 26, 27, 28, 48, 47,
      46, 45, 44, 43, 23, 24, 4, 3, 2, 22, 42, 41, 21, 1,
    ]
  ),
  new PreHam(
    Ratio.SIXTEEN_TO_NINE,
    18,
    32,
    [
      0, 32, 64, 96, 128, 160, 161, 162, 163, 164, 165, 197, 229, 261, 260, 259,
      291, 323, 355, 356, 357, 358, 359, 360, 392, 424, 425, 426, 427, 428, 429,
      430, 431, 399, 400, 401, 369, 337, 305, 273, 272, 271, 270, 269, 268, 267,
      266, 265, 233, 201, 169, 170, 202, 234, 235, 236, 204, 203, 171, 172, 173,
      174, 175, 176, 144, 112, 111, 143, 142, 141, 109, 110, 78, 79, 80, 48, 49,
      50, 51, 52, 53, 85, 117, 149, 148, 147, 179, 180, 181, 213, 245, 246, 247,
      248, 249, 281, 282, 283, 315, 316, 348, 380, 412, 444, 443, 442, 441, 440,
      439, 438, 437, 436, 468, 469, 470, 502, 534, 533, 501, 500, 532, 531, 530,
      529, 528, 527, 526, 525, 524, 523, 522, 521, 520, 519, 487, 488, 489, 490,
      491, 492, 493, 494, 495, 496, 497, 465, 466, 498, 499, 467, 435, 403, 404,
      405, 373, 374, 406, 407, 375, 376, 408, 409, 377, 378, 410, 411, 379, 347,
      346, 314, 313, 345, 344, 343, 342, 341, 309, 310, 311, 312, 280, 279, 278,
      277, 276, 308, 340, 372, 371, 339, 307, 275, 243, 244, 212, 211, 210, 178,
      146, 114, 115, 116, 84, 83, 82, 81, 113, 145, 177, 209, 208, 207, 206,
      205, 237, 238, 239, 240, 241, 242, 274, 306, 338, 370, 402, 434, 433, 432,
      464, 463, 462, 461, 460, 459, 458, 457, 456, 455, 423, 391, 390, 389, 388,
      387, 386, 385, 353, 354, 322, 321, 289, 290, 258, 257, 225, 226, 227, 228,
      196, 195, 194, 193, 192, 224, 256, 288, 320, 352, 384, 416, 417, 418, 450,
      449, 448, 480, 481, 482, 483, 484, 485, 453, 452, 451, 419, 420, 421, 422,
      454, 486, 518, 517, 516, 515, 514, 513, 512, 544, 545, 546, 547, 548, 549,
      550, 551, 552, 553, 554, 555, 556, 557, 558, 559, 560, 561, 562, 563, 564,
      565, 566, 567, 568, 569, 537, 536, 535, 503, 471, 472, 504, 505, 473, 474,
      506, 538, 570, 571, 572, 573, 541, 540, 539, 507, 475, 476, 508, 509, 510,
      542, 574, 575, 543, 511, 479, 478, 477, 445, 446, 447, 415, 414, 413, 381,
      382, 383, 351, 350, 349, 317, 318, 319, 287, 286, 285, 284, 252, 251, 250,
      218, 219, 220, 221, 253, 254, 255, 223, 222, 190, 191, 159, 158, 157, 189,
      188, 156, 155, 187, 186, 185, 217, 216, 215, 214, 182, 150, 151, 183, 184,
      152, 153, 154, 122, 123, 124, 92, 60, 61, 93, 125, 126, 127, 95, 94, 62,
      63, 31, 30, 29, 28, 27, 59, 91, 90, 58, 26, 25, 57, 89, 121, 120, 119,
      118, 86, 87, 88, 56, 24, 23, 55, 54, 22, 21, 20, 19, 18, 17, 16, 15, 47,
      46, 14, 13, 45, 77, 76, 44, 12, 11, 10, 9, 8, 7, 39, 40, 72, 104, 105, 73,
      41, 42, 43, 75, 74, 106, 107, 108, 140, 139, 138, 137, 136, 168, 200, 232,
      264, 296, 297, 298, 330, 331, 299, 300, 332, 333, 301, 302, 334, 335, 303,
      304, 336, 368, 367, 366, 398, 397, 365, 364, 396, 395, 363, 362, 394, 393,
      361, 329, 328, 327, 326, 325, 324, 292, 293, 294, 295, 263, 262, 230, 231,
      199, 198, 166, 167, 135, 134, 102, 103, 71, 70, 38, 6, 5, 4, 3, 2, 34, 35,
      36, 37, 69, 68, 67, 66, 98, 99, 100, 101, 133, 132, 131, 130, 129, 97, 65,
      33, 1,
    ]
  ),
  new PreHam(
    Ratio.SIXTEEN_TO_NINE,
    36,
    64,
    [
      0, 64, 128, 129, 65, 66, 130, 194, 193, 192, 256, 257, 258, 322, 386, 387,
      388, 389, 390, 391, 327, 328, 392, 456, 455, 454, 518, 519, 583, 582, 581,
      517, 453, 452, 451, 450, 514, 578, 642, 706, 770, 771, 772, 773, 774, 710,
      709, 708, 707, 643, 579, 515, 516, 580, 644, 645, 646, 647, 648, 649, 713,
      777, 778, 714, 715, 779, 780, 716, 717, 718, 719, 720, 784, 848, 847, 783,
      782, 781, 845, 846, 910, 909, 973, 974, 975, 911, 912, 976, 1040, 1104,
      1105, 1106, 1107, 1108, 1044, 1043, 1042, 1041, 977, 978, 979, 980, 916,
      915, 914, 913, 849, 850, 851, 852, 853, 917, 981, 1045, 1109, 1110, 1046,
      982, 918, 854, 855, 856, 857, 858, 859, 923, 987, 1051, 1050, 986, 922,
      921, 920, 919, 983, 984, 985, 1049, 1048, 1047, 1111, 1112, 1113, 1177,
      1178, 1114, 1115, 1179, 1243, 1244, 1180, 1116, 1117, 1118, 1119, 1120,
      1184, 1183, 1182, 1181, 1245, 1309, 1308, 1307, 1306, 1242, 1241, 1240,
      1176, 1175, 1174, 1238, 1239, 1303, 1302, 1301, 1365, 1364, 1363, 1362,
      1298, 1299, 1300, 1236, 1237, 1173, 1172, 1171, 1235, 1234, 1170, 1169,
      1168, 1167, 1103, 1039, 1038, 1037, 1036, 972, 971, 1035, 1099, 1100,
      1101, 1102, 1166, 1165, 1164, 1163, 1162, 1098, 1034, 970, 906, 907, 908,
      844, 843, 842, 841, 840, 776, 712, 711, 775, 839, 838, 837, 836, 900, 901,
      902, 903, 904, 905, 969, 968, 967, 1031, 1095, 1159, 1160, 1096, 1032,
      1033, 1097, 1161, 1225, 1289, 1288, 1224, 1223, 1287, 1286, 1222, 1221,
      1285, 1284, 1220, 1219, 1155, 1091, 1092, 1156, 1157, 1158, 1094, 1093,
      1029, 1030, 966, 965, 964, 1028, 1027, 1026, 1025, 961, 962, 963, 899,
      835, 834, 898, 897, 833, 769, 705, 641, 577, 513, 449, 385, 321, 320, 384,
      448, 512, 576, 640, 704, 768, 832, 896, 960, 1024, 1088, 1152, 1153, 1089,
      1090, 1154, 1218, 1217, 1216, 1280, 1281, 1282, 1283, 1347, 1411, 1475,
      1476, 1412, 1348, 1349, 1350, 1414, 1413, 1477, 1478, 1542, 1541, 1540,
      1539, 1538, 1474, 1410, 1346, 1345, 1344, 1408, 1409, 1473, 1472, 1536,
      1537, 1601, 1600, 1664, 1665, 1729, 1728, 1792, 1793, 1794, 1730, 1666,
      1602, 1603, 1667, 1731, 1795, 1859, 1923, 1987, 1986, 1985, 1921, 1922,
      1858, 1857, 1856, 1920, 1984, 2048, 2049, 2050, 2114, 2113, 2112, 2176,
      2240, 2241, 2177, 2178, 2242, 2243, 2179, 2115, 2051, 2052, 1988, 1924,
      1860, 1861, 1797, 1796, 1732, 1733, 1669, 1668, 1604, 1605, 1606, 1670,
      1734, 1735, 1671, 1607, 1543, 1479, 1415, 1351, 1352, 1353, 1354, 1290,
      1226, 1227, 1228, 1229, 1230, 1231, 1232, 1233, 1297, 1361, 1360, 1296,
      1295, 1359, 1358, 1294, 1293, 1357, 1356, 1292, 1291, 1355, 1419, 1418,
      1417, 1416, 1480, 1481, 1482, 1483, 1484, 1420, 1421, 1422, 1423, 1424,
      1425, 1426, 1427, 1428, 1429, 1493, 1492, 1491, 1555, 1556, 1557, 1621,
      1685, 1749, 1748, 1684, 1620, 1619, 1683, 1747, 1746, 1682, 1618, 1554,
      1490, 1489, 1488, 1487, 1486, 1485, 1549, 1548, 1547, 1546, 1545, 1544,
      1608, 1672, 1736, 1737, 1738, 1739, 1740, 1741, 1742, 1743, 1744, 1680,
      1616, 1615, 1679, 1678, 1677, 1676, 1675, 1674, 1673, 1609, 1610, 1611,
      1612, 1613, 1614, 1550, 1551, 1552, 1553, 1617, 1681, 1745, 1809, 1810,
      1811, 1812, 1813, 1814, 1750, 1686, 1622, 1558, 1494, 1430, 1366, 1367,
      1368, 1304, 1305, 1369, 1370, 1371, 1372, 1373, 1437, 1436, 1435, 1434,
      1433, 1432, 1431, 1495, 1559, 1623, 1624, 1560, 1496, 1497, 1498, 1499,
      1500, 1501, 1565, 1564, 1563, 1562, 1561, 1625, 1626, 1627, 1628, 1629,
      1693, 1692, 1691, 1690, 1689, 1688, 1687, 1751, 1815, 1816, 1752, 1753,
      1817, 1818, 1754, 1755, 1819, 1820, 1756, 1757, 1821, 1885, 1949, 2013,
      2012, 1948, 1884, 1883, 1947, 2011, 2010, 2009, 2008, 2007, 2006, 1942,
      1943, 1944, 1945, 1946, 1882, 1881, 1880, 1879, 1878, 1877, 1876, 1875,
      1874, 1873, 1872, 1808, 1807, 1806, 1805, 1804, 1803, 1802, 1801, 1800,
      1799, 1798, 1862, 1863, 1927, 1991, 2055, 2056, 2120, 2184, 2183, 2119,
      2118, 2054, 1990, 1926, 1925, 1989, 2053, 2117, 2116, 2180, 2244, 2245,
      2181, 2182, 2246, 2247, 2248, 2249, 2185, 2121, 2057, 1993, 1992, 1928,
      1864, 1865, 1929, 1930, 1866, 1867, 1868, 1869, 1870, 1871, 1935, 1934,
      1933, 1932, 1931, 1995, 1994, 2058, 2122, 2186, 2250, 2251, 2187, 2123,
      2059, 2060, 1996, 1997, 1998, 1999, 2063, 2127, 2126, 2062, 2061, 2125,
      2124, 2188, 2252, 2253, 2189, 2190, 2254, 2255, 2191, 2192, 2256, 2257,
      2193, 2129, 2128, 2064, 2000, 1936, 1937, 2001, 2065, 2066, 2002, 1938,
      1939, 1940, 1941, 2005, 2004, 2003, 2067, 2131, 2130, 2194, 2258, 2259,
      2195, 2196, 2260, 2261, 2197, 2133, 2132, 2068, 2069, 2070, 2134, 2198,
      2262, 2263, 2199, 2135, 2071, 2072, 2136, 2200, 2264, 2265, 2201, 2137,
      2073, 2074, 2138, 2202, 2266, 2267, 2203, 2139, 2075, 2076, 2140, 2204,
      2268, 2269, 2205, 2141, 2077, 2078, 2142, 2206, 2270, 2271, 2207, 2143,
      2079, 2015, 2014, 1950, 1951, 1887, 1886, 1822, 1758, 1694, 1630, 1566,
      1502, 1503, 1504, 1505, 1506, 1442, 1441, 1440, 1439, 1438, 1374, 1310,
      1246, 1247, 1248, 1249, 1250, 1251, 1252, 1253, 1317, 1381, 1445, 1446,
      1382, 1318, 1254, 1255, 1256, 1257, 1258, 1259, 1260, 1261, 1262, 1326,
      1325, 1324, 1323, 1322, 1321, 1320, 1319, 1383, 1447, 1511, 1575, 1576,
      1512, 1448, 1384, 1385, 1386, 1387, 1388, 1389, 1390, 1391, 1455, 1519,
      1583, 1584, 1648, 1649, 1713, 1712, 1711, 1647, 1646, 1582, 1518, 1454,
      1453, 1517, 1581, 1580, 1516, 1452, 1451, 1450, 1449, 1513, 1514, 1515,
      1579, 1578, 1577, 1641, 1640, 1639, 1703, 1767, 1831, 1895, 1894, 1893,
      1892, 1891, 1827, 1826, 1890, 1954, 1955, 1956, 1957, 1958, 1959, 1960,
      1961, 1897, 1896, 1832, 1768, 1704, 1705, 1769, 1833, 1834, 1770, 1706,
      1642, 1643, 1644, 1645, 1709, 1710, 1774, 1775, 1776, 1777, 1841, 1840,
      1839, 1838, 1837, 1773, 1772, 1708, 1707, 1771, 1835, 1836, 1900, 1901,
      1902, 1903, 1904, 1905, 1969, 1968, 1967, 1966, 1965, 1964, 2028, 2029,
      2030, 2031, 2032, 2033, 2097, 2096, 2095, 2159, 2160, 2161, 2225, 2224,
      2223, 2222, 2158, 2094, 2093, 2092, 2091, 2027, 1963, 1899, 1898, 1962,
      2026, 2090, 2089, 2025, 2024, 2088, 2152, 2216, 2215, 2151, 2087, 2023,
      2022, 2086, 2085, 2021, 2020, 2019, 2018, 2017, 1953, 1889, 1825, 1761,
      1697, 1698, 1762, 1763, 1699, 1700, 1764, 1828, 1829, 1830, 1766, 1765,
      1701, 1702, 1638, 1637, 1573, 1574, 1510, 1509, 1508, 1444, 1380, 1316,
      1315, 1314, 1313, 1312, 1311, 1375, 1376, 1377, 1378, 1379, 1443, 1507,
      1571, 1572, 1636, 1635, 1634, 1570, 1569, 1633, 1632, 1568, 1567, 1631,
      1695, 1696, 1760, 1759, 1823, 1824, 1888, 1952, 2016, 2080, 2144, 2208,
      2272, 2273, 2274, 2275, 2276, 2212, 2211, 2210, 2209, 2145, 2081, 2082,
      2146, 2147, 2083, 2084, 2148, 2149, 2150, 2214, 2213, 2277, 2278, 2279,
      2280, 2281, 2217, 2153, 2154, 2155, 2219, 2218, 2282, 2283, 2284, 2220,
      2156, 2157, 2221, 2285, 2286, 2287, 2288, 2289, 2290, 2226, 2162, 2098,
      2034, 1970, 1971, 2035, 2099, 2163, 2227, 2291, 2292, 2228, 2164, 2100,
      2036, 2037, 2038, 1974, 1975, 2039, 2040, 2104, 2103, 2102, 2101, 2165,
      2166, 2167, 2168, 2169, 2105, 2041, 1977, 1976, 1912, 1913, 1914, 1978,
      2042, 2106, 2170, 2234, 2233, 2232, 2231, 2230, 2229, 2293, 2294, 2295,
      2296, 2297, 2298, 2299, 2300, 2301, 2302, 2303, 2239, 2238, 2237, 2236,
      2235, 2171, 2172, 2173, 2174, 2175, 2111, 2110, 2109, 2108, 2107, 2043,
      2044, 2045, 2046, 2047, 1983, 1919, 1855, 1791, 1727, 1726, 1790, 1854,
      1918, 1982, 1981, 1980, 1979, 1915, 1916, 1917, 1853, 1789, 1725, 1724,
      1788, 1852, 1851, 1787, 1723, 1722, 1786, 1850, 1849, 1785, 1721, 1720,
      1784, 1848, 1847, 1911, 1910, 1909, 1973, 1972, 1908, 1844, 1845, 1846,
      1782, 1783, 1719, 1718, 1717, 1781, 1780, 1716, 1715, 1779, 1843, 1907,
      1906, 1842, 1778, 1714, 1650, 1586, 1585, 1521, 1520, 1456, 1392, 1393,
      1457, 1458, 1522, 1523, 1587, 1651, 1652, 1653, 1654, 1590, 1589, 1588,
      1524, 1525, 1526, 1462, 1461, 1460, 1459, 1395, 1394, 1330, 1329, 1328,
      1327, 1263, 1264, 1265, 1266, 1267, 1331, 1332, 1396, 1397, 1398, 1399,
      1463, 1527, 1591, 1655, 1656, 1657, 1658, 1659, 1595, 1594, 1530, 1531,
      1532, 1596, 1660, 1661, 1662, 1663, 1599, 1598, 1597, 1533, 1534, 1535,
      1471, 1470, 1469, 1468, 1467, 1466, 1465, 1529, 1593, 1592, 1528, 1464,
      1400, 1401, 1402, 1403, 1404, 1405, 1406, 1407, 1343, 1279, 1215, 1214,
      1213, 1212, 1211, 1147, 1148, 1149, 1150, 1151, 1087, 1023, 959, 958, 957,
      956, 955, 954, 953, 952, 1016, 1080, 1144, 1208, 1207, 1143, 1079, 1015,
      951, 950, 1014, 1078, 1142, 1206, 1270, 1271, 1272, 1273, 1209, 1145,
      1081, 1017, 1018, 1019, 1020, 1021, 1022, 1086, 1085, 1084, 1083, 1082,
      1146, 1210, 1274, 1275, 1276, 1277, 1278, 1342, 1341, 1340, 1339, 1338,
      1337, 1336, 1335, 1334, 1333, 1269, 1268, 1204, 1205, 1141, 1077, 1013,
      949, 885, 886, 887, 888, 889, 890, 891, 892, 893, 894, 895, 831, 830, 829,
      828, 827, 826, 825, 824, 823, 822, 821, 820, 884, 948, 1012, 1076, 1140,
      1139, 1203, 1202, 1138, 1137, 1201, 1200, 1136, 1135, 1199, 1198, 1134,
      1133, 1197, 1196, 1132, 1131, 1195, 1194, 1130, 1129, 1193, 1192, 1191,
      1127, 1128, 1064, 1065, 1001, 937, 936, 1000, 999, 1063, 1062, 998, 997,
      1061, 1060, 1059, 995, 996, 932, 933, 934, 935, 871, 872, 873, 809, 808,
      807, 806, 870, 869, 868, 804, 805, 741, 740, 739, 738, 802, 803, 867, 931,
      930, 866, 865, 929, 993, 994, 1058, 1122, 1123, 1124, 1125, 1126, 1190,
      1189, 1188, 1187, 1186, 1185, 1121, 1057, 1056, 1055, 1054, 990, 926, 925,
      989, 1053, 1052, 988, 924, 860, 861, 862, 863, 927, 991, 992, 928, 864,
      800, 801, 737, 736, 735, 799, 798, 734, 670, 671, 672, 673, 674, 675, 676,
      677, 613, 614, 615, 679, 678, 742, 743, 744, 680, 616, 552, 488, 424, 423,
      422, 421, 420, 419, 418, 482, 481, 480, 479, 478, 414, 415, 416, 417, 353,
      354, 355, 356, 357, 358, 359, 360, 361, 297, 298, 362, 426, 425, 489, 553,
      617, 681, 745, 746, 682, 618, 554, 490, 491, 555, 619, 683, 747, 811, 810,
      874, 938, 1002, 1066, 1067, 1068, 1069, 1070, 1071, 1072, 1073, 1074,
      1075, 1011, 947, 883, 819, 818, 817, 816, 815, 814, 813, 877, 878, 879,
      880, 881, 882, 946, 1010, 1009, 945, 944, 1008, 1007, 943, 942, 1006,
      1005, 941, 940, 1004, 1003, 939, 875, 876, 812, 748, 749, 750, 751, 752,
      753, 689, 625, 561, 560, 559, 495, 431, 367, 368, 432, 496, 497, 433, 369,
      370, 434, 498, 562, 626, 690, 754, 755, 756, 757, 758, 759, 760, 761, 762,
      763, 764, 765, 766, 767, 703, 639, 575, 511, 447, 383, 319, 255, 191, 127,
      63, 62, 126, 125, 61, 60, 124, 188, 189, 190, 254, 253, 252, 251, 187,
      186, 185, 184, 248, 312, 376, 375, 311, 247, 183, 182, 181, 180, 244, 308,
      372, 436, 500, 564, 565, 566, 567, 568, 569, 570, 571, 572, 573, 509, 508,
      507, 506, 505, 504, 503, 502, 501, 437, 373, 309, 245, 246, 310, 374, 438,
      439, 440, 441, 377, 313, 249, 250, 314, 378, 442, 443, 379, 315, 316, 317,
      318, 382, 381, 380, 444, 445, 446, 510, 574, 638, 702, 701, 637, 636, 700,
      699, 635, 634, 698, 697, 633, 632, 696, 695, 631, 630, 694, 693, 629, 628,
      692, 691, 627, 563, 499, 435, 371, 307, 243, 179, 115, 116, 117, 118, 119,
      120, 121, 122, 123, 59, 58, 57, 56, 55, 54, 53, 52, 51, 50, 49, 48, 47,
      46, 110, 174, 238, 239, 175, 111, 112, 113, 114, 178, 242, 306, 305, 241,
      177, 176, 240, 304, 303, 302, 366, 430, 494, 558, 622, 623, 624, 688, 687,
      686, 685, 684, 620, 621, 557, 556, 492, 493, 429, 428, 427, 363, 364, 365,
      301, 237, 173, 109, 45, 44, 108, 172, 236, 300, 299, 235, 171, 107, 43,
      42, 106, 170, 234, 233, 232, 296, 295, 231, 230, 294, 293, 229, 228, 292,
      291, 290, 289, 225, 224, 223, 222, 286, 287, 288, 352, 351, 350, 349, 413,
      477, 541, 542, 543, 544, 545, 546, 547, 483, 484, 485, 486, 487, 551, 550,
      549, 548, 612, 611, 610, 609, 608, 607, 606, 605, 669, 733, 797, 796, 795,
      794, 730, 666, 602, 538, 537, 536, 535, 534, 533, 532, 596, 597, 598, 599,
      600, 601, 665, 729, 793, 792, 791, 790, 789, 788, 787, 786, 785, 721, 657,
      656, 655, 654, 653, 652, 651, 650, 586, 585, 584, 520, 521, 522, 523, 587,
      588, 524, 525, 589, 590, 591, 592, 593, 594, 658, 722, 723, 724, 725, 726,
      727, 728, 664, 663, 662, 661, 660, 659, 595, 531, 530, 529, 528, 527, 526,
      462, 461, 460, 459, 458, 457, 393, 394, 395, 396, 397, 398, 399, 463, 464,
      465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 539, 603, 667, 731,
      732, 668, 604, 540, 476, 412, 411, 410, 409, 408, 407, 406, 405, 404, 403,
      402, 401, 400, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347,
      348, 284, 285, 221, 157, 158, 159, 160, 161, 162, 226, 227, 163, 164, 165,
      166, 167, 168, 169, 105, 41, 40, 104, 103, 39, 38, 102, 101, 37, 36, 100,
      99, 35, 34, 98, 97, 33, 32, 96, 95, 31, 30, 94, 93, 29, 28, 92, 156, 220,
      219, 283, 282, 218, 154, 155, 91, 27, 26, 90, 89, 25, 24, 88, 152, 153,
      217, 281, 280, 216, 215, 279, 278, 214, 150, 151, 87, 23, 22, 86, 85, 21,
      20, 84, 148, 149, 213, 277, 276, 212, 211, 275, 274, 210, 146, 147, 83,
      19, 18, 82, 81, 17, 16, 80, 144, 145, 209, 273, 272, 208, 207, 271, 335,
      334, 270, 206, 142, 143, 79, 15, 14, 78, 77, 13, 12, 76, 140, 141, 205,
      204, 268, 269, 333, 332, 331, 330, 329, 265, 266, 267, 203, 139, 75, 11,
      10, 74, 138, 202, 201, 137, 73, 9, 8, 72, 136, 200, 264, 263, 199, 135,
      71, 7, 6, 70, 134, 198, 262, 326, 325, 324, 323, 259, 260, 261, 197, 196,
      195, 131, 132, 133, 69, 5, 4, 68, 67, 3, 2, 1,
    ]
  ),
];

export const calculationMethodsForNewHams: CalculationMethodForNewHams[] = [
  new CalculationMethodForNewHams('absolute random new ham cycle', 'O(n^3)'),
  new CalculationMethodForNewHams('more in development', 'with <O(n^3)'),
];

export { Ratio };
export { PreHam };
export { CalculationMethodForNewHams };
export { SnakeAIDemo_HamiltonianCycle };
