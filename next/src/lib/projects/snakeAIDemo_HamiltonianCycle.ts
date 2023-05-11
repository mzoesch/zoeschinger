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
  private static readonly TIMEOUT_AFTER_EACH_SPREAD_CYCLE_FOR_VIABLE_HAM_IF_IT_CAN_REACH_ALL_UNHAMED_TILES: number = 5;
  private static readonly TIMEOUT_AFTER_CHECKING_IF_ALL_UNHAMED_TILES_ARE_NOT_LEADING_TO_AN_UNREACHABLE_HAM_CYCLE_FOR_CURRENT_PROGRESSED_HAM: number = 200;
  private static readonly TIMEOUT_AFTER_A_NOT_GOOD_TILE_WAS_FOUND: number = 150;
  private static readonly TIMEOUT_AFTER_EACH_SPREAD_CYCLE_FOR_TWO_NEIGHBORS_VIABLE_CHECK: number = 20;
  private static readonly TIMEOUT_AFTER_EACH_SPREAD_CYCLE_FOR_SUCCEEDED_HAM: number = 50;
  private static readonly TIMEOUT_AFTER_EACH_SPREAD_CYCLE_FOR_SUCCEEDED_HAM_BACK_TO_NORMAL: number = 1000;
  private static readonly TOTAL_TIME_FOR_THE_ANIMATION_OF_A_SUCCEEDED_HAM: number = 3000;
  private static readonly BLINK_TIMEOUT_AFTER_SUCCEEDED_HAM: number = 200;

  private static readonly TIMEOUT_AFTER_SNAKE_MOVE: number = 50;
  private static readonly BLINK_TIMEOUT_AFTER_SUCCEEDED_SNAKE: number = 200;
  private static readonly TOTAL_TIME_FOR_THE_ANIMATION_OF_A_SUCCEEDED_SNAKE: number = 3000;
  private static readonly TIMEOUT_AFTER_EACH_SPREAD_CYCLE_FOR_SUCCEEDED_SNAKE_BACK_TO_NORMAL: number = 1000;
  private static readonly ANIMATE_SUCCEEDED_SNAKE: boolean = true;

  private static readonly ANIMATE_TIMEOUT_AFTER_CHECKING_ONE_NEIGHBOR: boolean =
    true;
  private static readonly ANIMATE_TIMEOUT_AFTER_EACH_SPREAD_CYCLE_FOR_VIABLE_HAM_IF_IT_CAN_REACH_ALL_UNHAMED_TILES: boolean =
    false;
  private static readonly ANIMATE_TIMEOUT_AFTER_CHECKING_IF_ALL_UNHAMED_TILES_ARE_NOT_LEADING_TO_AN_UNREACHABLE_HAM_CYCLE_FOR_CURRENT_PROGRESSED_HAM: boolean =
    false;
  private static readonly ANIMATE_TIMEOUT_AFTER_A_NOT_GOOD_TILE_WAS_FOUND: boolean =
    false;
  private static readonly ANIMATE_TIMEOUT_AFTER_EACH_SPREAD_CYCLE_FOR_TWO_NEIGHBORS_VIABLE_CHECK: boolean =
    false;
  private static readonly ANIMATE_TIMEOUT_AFTER_EACH_SPREAD_CYCLE_FOR_SUCCEEDED_HAM: boolean =
    true;
  private static readonly ANIMATE_SUCCEEDED_HAM = true;

  private _timeoutAfterCheckingOneNeighbor: number;
  private _timeoutAfterEachSpreadCycleForViableHamIfItCanReachAllUnhamedTiles: number;
  private _timeoutAfterCheckingIfAllUnhamedTilesAreNotLeadingToAnUnreachableHamCycleForCurrentProgressedHam: number;
  private _timeoutAfterANotGoodTileWasFound: number;
  private _timeoutAfterEachSpreadCycleForTwoNeighborsViableCheck: number;
  private _timeoutAfterEachSpreadCycleForSucceededHam: number;
  private _timeoutAfterEachSpreadCycleForSucceededHamBackToNormal: number;
  private _blinkTimeoutAfterSucceededHam: number;

  private _timeoutAfterSnakeMove: number;
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

    // TODO: this._tiles should also always be rested outside this method. So there is no
    // TODO: need to call the specific reset / toggle functions for the variables below.
    // TODO: WARNING: Future changes to this class may break this
    // TODO: WARnING: assumption. This is unsafe. Please fix.
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
    const getNewHead = (head: Tile): Tile | null => {
      let newHead: Tile | null = null;

      for (let i = 0; i < this._hamiltonianCycle.length; i++) {
        if (this._hamiltonianCycle[i].index !== head.index) continue;

        if (direction > 0) {
          if (i + 1 < this._hamiltonianCycle.length) {
            newHead = this._hamiltonianCycle[i + 1];
            break;
          }

          newHead = this._hamiltonianCycle[0];
          break;
        }

        if (direction < 0) {
          if (i - 1 >= 0) {
            newHead = this._hamiltonianCycle[i - 1];
            break;
          }

          newHead = this._hamiltonianCycle[this._hamiltonianCycle.length - 1];
          break;
        }

        console.error('FATAL ERROR: Invalid direction!');
        alert('FATAL ERROR: Invalid direction!');
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
        'FATAL ERROR: Snake failed to finish. An unknown error occurred.'
      );
      alert('FATAL ERROR: Snake failed to finish. An unknown error occurred.');

      return;
    };

    this._snakeMoves += 1;

    const head = this._snake[0];
    const newHead: Tile | null = getNewHead(head);
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
  new PreHam(Ratio.FOUR_TO_THREE, 16, 24, [0]),
  new PreHam(Ratio.FOUR_TO_THREE, 32, 48, [0]),
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
  new PreHam(Ratio.SIXTEEN_TO_NINE, 18, 32, [0]),
  new PreHam(Ratio.SIXTEEN_TO_NINE, 36, 64, [0]),
];

export const calculationMethodsForNewHams: CalculationMethodForNewHams[] = [
  new CalculationMethodForNewHams('absolute random new ham cycle', 'O(n^3)'),
];

export { Ratio };
export { PreHam };
export { CalculationMethodForNewHams };
export { SnakeAIDemo_HamiltonianCycle };
