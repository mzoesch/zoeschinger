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
  private static readonly ALPHA_GOAL: number = 2;

  public static readonly DEFAULT_HEIGHT_FOR_SNAKE_GRID_CONTAINER: number = 640;

  private static readonly TIMEOUT_AFTER_CHECKING_ONE_NEIGHBOR: number = 100;
  private static readonly TIMEOUT_AFTER_EACH_SPREAD_CYCLE_FOR_VIABLE_HAM_IF_IT_CAN_REACH_ALL_UNHAMED_TILES: number = 5;
  private static readonly TIMEOUT_AFTER_CHECKING_IF_ALL_UNHAMED_TILES_ARE_NOT_LEADING_TO_AN_UNREACHABLE_HAM_CYCLE_FOR_CURRENT_PROGRESSED_HAM: number = 200;
  private static readonly TIMEOUT_AFTER_A_NOT_GOOD_TILE_WAS_FOUND: number = 150;
  private static readonly TIMEOUT_AFTER_EACH_SPREAD_CYCLE_FOR_TWO_NEIGHBORS_VIABLE_CHECK: number = 20;
  private static readonly TIMEOUT_AFTER_EACH_SPREAD_CYCLE_FOR_SUCCEEDED_HAM: number = 50;
  private static readonly TIMEOUT_AFTER_EACH_SPREAD_CYCLE_FOR_SUCCEEDED_HAM_BACK_TO_NORMAL: number = 1000;

  private static readonly ANIMATE_TIMEOUT_AFTER_CHECKING_ONE_NEIGHBOR: boolean =
    true;
  private static readonly ANIMATE_TIMEOUT_AFTER_EACH_SPREAD_CYCLE_FOR_VIABLE_HAM_IF_IT_CAN_REACH_ALL_UNHAMED_TILES: boolean =
    true;
  private static readonly ANIMATE_TIMEOUT_AFTER_CHECKING_IF_ALL_UNHAMED_TILES_ARE_NOT_LEADING_TO_AN_UNREACHABLE_HAM_CYCLE_FOR_CURRENT_PROGRESSED_HAM: boolean =
    true;
  private static readonly ANIMATE_TIMEOUT_AFTER_A_NOT_GOOD_TILE_WAS_FOUND: boolean =
    true;
  private static readonly ANIMATE_TIMEOUT_AFTER_EACH_SPREAD_CYCLE_FOR_TWO_NEIGHBORS_VIABLE_CHECK: boolean =
    true;
  private static readonly ANIMATE_TIMEOUT_AFTER_EACH_SPREAD_CYCLE_FOR_SUCCEEDED_HAM: boolean =
    true;

  private _timeoutAfterCheckingOneNeighbor: number;
  private _timeoutAfterEachSpreadCycleForViableHamIfItCanReachAllUnhamedTiles: number;
  private _timeoutAfterCheckingIfAllUnhamedTilesAreNotLeadingToAnUnreachableHamCycleForCurrentProgressedHam: number;
  private _timeoutAfterANotGoodTileWasFound: number;
  private _timeoutAfterEachSpreadCycleForTwoNeighborsViableCheck: number;
  private _timeoutAfterEachSpreadCycleForSucceededHam: number;
  private _timeoutAfterEachSpreadCycleForSucceededHamBackToNormal: number;

  private _animateTimeoutAfterCheckingOneNeighbor: boolean;
  private _animateTimeoutAfterEachSpreadCycleForViableHamIfItCanReachAllUnhamedTiles: boolean;
  private _animateTimeoutAfterCheckingIfAllUnhamedTilesAreNotLeadingToAnUnreachableHamCycleForCurrentProgressedHam: boolean;
  private _animateTimeoutAfterANotGoodTileWasFound: boolean;
  private _animateTimeoutAfterEachSpreadCycleForTwoNeighborsViableCheck: boolean;
  private _animateTimeoutAfterEachSpreadCycleForSucceededHam: boolean;

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

    this._hamCycleIsVisible = SnakeAIDemo_HamiltonianCycle.HAM_CYCLE_IS_VISIBLE;
    this._indicesAreVisible = SnakeAIDemo_HamiltonianCycle.INDICES_ARE_VISIBLE;

    this._columns = 0;
    this._rows = 0;
    this._tiles = [];

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

                // Tile is relevant
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
      this._hamiltonianCycle.forEach((element) => {
        element.element.style.setProperty(
          Tile.TILE_COLOR_VAR,
          Tile.COLOR_SUCCESS
        );
      });

      return;
    }

    console.error('FATAL ERROR: No Hamiltonian Cycle found!');
    alert('FATAL ERROR: No Hamiltonian Cycle found!');

    return;
  }

  public calculateANewHamiltonianCycle(): void {
    this.calculateAHamiltonianCycle();

    return;
  }

  private reset(): void {
    this._columns = 0;
    this._rows = 0;
    this._hamiltonianCycle = [];

    this._hamCycleIsVisible = SnakeAIDemo_HamiltonianCycle.HAM_CYCLE_IS_VISIBLE;
    this._indicesAreVisible = SnakeAIDemo_HamiltonianCycle.INDICES_ARE_VISIBLE;

    return;
  }

  public resetTilesWithRecalculation(preHam?: PreHam): void {
    if (preHam !== undefined) {
      this.generateGridFromPreHam(preHam);
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

  public toggleIndices(): void {
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

    if (this._indicesAreVisible === true) {
      clearIndicesFromInnerHTML();
      this._indicesAreVisible = false;
      return;
    }

    writeIndicesToInnerHTML();
    this._indicesAreVisible = true;

    return;
  }

  public toggleHamiltonianCycle(): void {
    const showHamiltonianCycle = (): void => {
      for (let i = 0; i < this._hamiltonianCycle.length; i++) {
        const previousIndex: number =
          i <= 0 ? this._hamiltonianCycle.length - 1 : i - 1;
        const previousElement = this._hamiltonianCycle[previousIndex];
        const P = this._hamiltonianCycle[previousIndex];

        const currentElement = this._hamiltonianCycle[i];
        const C = this._hamiltonianCycle[i];

        const nextIndex: number =
          i >= this._hamiltonianCycle.length - 1 ? 0 : i + 1;
        const nextElement = this._hamiltonianCycle[nextIndex];
        const N = this._hamiltonianCycle[nextIndex];

        if (previousElement.x === nextElement.x) {
          currentElement.showHamiltonianCycle(Tile.HAM_TYPE_HORIZONTAL_LINE);
          continue;
        }

        if (previousElement.y === nextElement.y) {
          currentElement.showHamiltonianCycle(Tile.HAM_TYPE_VERTICAL_LINE);
          continue;
        }

        if (
          (C.x === P.x && C.y > P.y && C.x < N.x && C.y === N.y) ||
          (C.x < P.x && C.y === P.y && C.x === N.x && C.y > N.y)
        ) {
          currentElement.showHamiltonianCycle(Tile.HAM_TYPE_CORNER_TOP_RIGHT);
          continue;
        }

        if (
          (C.x === P.x && C.y > P.y && C.x > N.x && C.y === N.y) ||
          (C.x > P.x && C.y === P.y && C.x === N.x && C.y > N.y)
        ) {
          currentElement.showHamiltonianCycle(Tile.HAM_TYPE_CORNER_TOP_LEFT);
          continue;
        }

        if (
          (C.x < P.x && C.y === P.y && C.x === N.x && C.y < N.y) ||
          (C.x === P.x && C.y < P.y && C.x < N.x && C.y === N.y)
        ) {
          currentElement.showHamiltonianCycle(
            Tile.HAM_TYPE_CORNER_BOTTOM_RIGHT
          );
          continue;
        }

        if (
          (C.x > P.x && C.y === P.y && C.x === N.x && C.y < N.y) ||
          (C.x === P.x && C.y < P.y && C.x > N.x && C.y === N.y)
        ) {
          currentElement.showHamiltonianCycle(Tile.HAM_TYPE_CORNER_BOTTOM_LEFT);
          continue;
        }

        currentElement.showHamiltonianCycle('not supported');
        continue;
      }
    };
    const hideHamiltonianCycle = (): void => {
      this._hamiltonianCycle.forEach((element: Tile) => {
        element.hideHamiltonianCycle();
      });
    };

    if (this._hamiltonianCycle.length <= 1) {
      console.error('FATAL ERROR: No Hamiltonian Cycle found!');
      alert('FATAL ERROR: No Hamiltonian Cycle found!');

      this._hamCycleIsVisible = false;
      return;
    }

    if (this._hamCycleIsVisible === true) {
      hideHamiltonianCycle();
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

  private async animationForAnSucceededHamiltonianCycle(): Promise<void> {
    for (let i = 0; i < this._hamiltonianCycle.length; i++) {
      this._hamiltonianCycle[i].element.style.setProperty(
        Tile.TILE_COLOR_VAR,
        Tile.COLOR_SUCCESS
      );

      const colorToNormal = async (): Promise<void> => {
        return new Promise((r) => {
          setTimeout(() => {
            this._hamiltonianCycle[i].element.style.setProperty(
              Tile.TILE_COLOR_VAR,
              Tile.STD_COLOR
            );
          }, this._timeoutAfterEachSpreadCycleForSucceededHamBackToNormal);
        });
      };

      colorToNormal();

      await new Promise((resolve) =>
        setTimeout(resolve, this._timeoutAfterEachSpreadCycleForSucceededHam)
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
    animateHamiltonianCycle: boolean = true
  ): void {
    this.reset();

    this.fillGrid(null, preHam.rows, preHam.columns);
    this.generateHamiltonianCycleFromIndices(preHam.hamiltonianCycle);

    if (animateHamiltonianCycle === true)
      this.animationForAnSucceededHamiltonianCycle();

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

export const ratios: Ratio[] = [
  new Ratio('auto'),
  new Ratio('4:3'),
  new Ratio('16:9'),
];

export const preHams: PreHam[] = [
  new PreHam(Ratio.AUTO, undefined, undefined, undefined, 'auto'),
  new PreHam(Ratio.FOUR_TO_THREE, 6, 8, [0]),
  new PreHam(Ratio.FOUR_TO_THREE, 9, 12, [0]),
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
  new PreHam(Ratio.SIXTEEN_TO_NINE, 9, 16, [0]),
  new PreHam(Ratio.SIXTEEN_TO_NINE, 12, 20, [0]),
  new PreHam(Ratio.SIXTEEN_TO_NINE, 18, 32, [0]),
  new PreHam(Ratio.SIXTEEN_TO_NINE, 36, 64, [0]),
];

export { Ratio };
export { PreHam };
export { SnakeAIDemo_HamiltonianCycle };
