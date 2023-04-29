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

  private _index: number;
  private _element: HTMLDivElement;
  private _columns: number;
  private _rows: number;

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
    this._element.innerHTML = '';
    return;
  }

  public writeIndexToInnerHtml(): void {
    this._element.innerHTML = `${this._index}`;
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

  private static readonly TIMEOUT_AFTER_CHECKING_ONE_NEIGHBOR: number = 100;
  private static readonly TIMEOUT_AFTER_EACH_SPREAD_CYCLE_FOR_VIABLE_HAM_IF_IT_CAN_REACH_ALL_UNHAMED_TILES: number = 5;
  private static readonly TIMEOUT_AFTER_CHECKING_IF_ALL_UNHAMED_TILES_ARE_NOT_LEADING_TO_AN_UNREACHABLE_HAM_CYCLE_FOR_CURRENT_PROGRESSED_HAM: number = 200;
  private static readonly TIMEOUT_AFTER_A_NOT_GOOD_TILE_WAS_FOUND: number = 150;
  private static readonly TIMEOUT_AFTER_EACH_SPREAD_CYCLE_FOR_TWO_NEIGHBORS_VIABLE_CHECK: number = 20;

  private _timeoutAfterCheckingOneNeighbor: number;
  private _timeoutAfterEachSpreadCycleForViableHamIfItCanReachAllUnhamedTiles: number;
  private _timeoutAfterCheckingIfAllUnhamedTilesAreNotLeadingToAnUnreachableHamCycleForCurrentProgressedHam: number;
  private _timeoutAfterANotGoodTileWasFound: number;
  private _timeoutAfterEachSpreadCycleForTwoNeighborsViablyCheck: number;

  private static readonly INDICES_ARE_VISIBLE: boolean = false;
  private static readonly TILE_SIZE: number = 50;

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
    this._timeoutAfterEachSpreadCycleForTwoNeighborsViablyCheck =
      SnakeAIDemo_HamiltonianCycle.TIMEOUT_AFTER_EACH_SPREAD_CYCLE_FOR_TWO_NEIGHBORS_VIABLE_CHECK;

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

  public fillGrid(snakeGridContainer: HTMLDivElement | null): void {
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

    this._columns = Math.floor(
      this._snakeGridContainer.clientWidth / this._tileSize
    );
    this._rows = Math.floor(
      this._snakeGridContainer.clientHeight / this._tileSize
    );

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

  //#region setters and getters

  public get timeoutAfterCheckingOneNeighbor(): number {
    return this._timeoutAfterCheckingOneNeighbor;
  }

  public set timeoutAfterCheckingOneNeighbor(value: number) {
    this._timeoutAfterCheckingOneNeighbor = value;
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
  }

  public get timeoutAfterANotGoodTileWasFound(): number {
    return this._timeoutAfterANotGoodTileWasFound;
  }

  public set timeoutAfterANotGoodTileWasFound(value: number) {
    this._timeoutAfterANotGoodTileWasFound = value;
  }

  public get timeoutAfterEachSpreadCycleForTwoNeighborsViablyCheck(): number {
    return this._timeoutAfterEachSpreadCycleForTwoNeighborsViablyCheck;
  }

  public set timeoutAfterEachSpreadCycleForTwoNeighborsViablyCheck(
    value: number
  ) {
    this._timeoutAfterEachSpreadCycleForTwoNeighborsViablyCheck = value;
  }

  //#endregion setters and getters

  private async calculateAnHamiltonianCycle(): Promise<void> {
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
        await new Promise((resolve) =>
          setTimeout(
            resolve,
            this
              ._timeoutAfterCheckingIfAllUnhamedTilesAreNotLeadingToAnUnreachableHamCycleForCurrentProgressedHam
          )
        );

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
              await new Promise((resolve) =>
                setTimeout(
                  resolve,
                  this._timeoutAfterEachSpreadCycleForTwoNeighborsViablyCheck
                )
              );

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

                  this.clearAllColors();
                  this.colorHamiltonianCycle();
                  this.colorTileTwoNeighborsFromTile(fromNeighbor);
                  this.colorTileTwoNeighborsCheckedTiles(checkedTiles);
                  this.colorOuterRing(outerRing);
                  await new Promise((resolve) =>
                    setTimeout(
                      resolve,
                      this
                        ._timeoutAfterEachSpreadCycleForTwoNeighborsViablyCheck
                    )
                  );

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
            await new Promise((resolve) =>
              setTimeout(resolve, this._timeoutAfterANotGoodTileWasFound)
            );

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
        this.clearAllColors();
        this.colorHamiltonianCycle();
        this.colorNeighbors(validNeighbors);

        await new Promise((resolve) =>
          setTimeout(resolve, this._timeoutAfterCheckingOneNeighbor)
        );

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

      console.log('Successfully created an ham:', this._hamiltonianCycle);
      return;
    }

    console.error('FATAL ERROR: No Hamiltonian Cycle found!');
    alert('FATAL ERROR: No Hamiltonian Cycle found!');

    return;
  }

  public calculateANewHamiltonianCycle(): void {
    this.calculateAnHamiltonianCycle();

    return;
  }

  private reset(): void {
    this._columns = 0;
    this._rows = 0;
    this._indicesAreVisible = SnakeAIDemo_HamiltonianCycle.INDICES_ARE_VISIBLE;

    return;
  }

  public resetTilesWithRecalculation(): void {
    this.reset();
    this.fillGrid(null);

    return;
  }

  private writeIndicesToInnerHTML(): void {
    this._tiles.forEach((element: Tile) => {
      element.writeIndexToInnerHtml();
    });
  }

  private clearIndicesFromInnerHTML(): void {
    this._tiles.forEach((element: Tile) => {
      element.clearIndexFromInnerHtml();
    });
  }

  public toggleIndices(): void {
    if (this._indicesAreVisible === true) {
      this.clearIndicesFromInnerHTML();
      this._indicesAreVisible = false;
      return;
    }

    this.writeIndicesToInnerHTML();
    this._indicesAreVisible = true;

    return;
  }
}

export { SnakeAIDemo_HamiltonianCycle };
