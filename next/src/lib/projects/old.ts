import styles from '@s/projects/snakeai/main.module.scss';

class Tile {
  // id : <tile-index>

  private static _cursor: number = 0;

  public static readonly TILE_COLOR_VAR: string = '--snake-grid-tile-color';
  public static readonly STD_COLOR: string = '#35383F';
  public static readonly COLOR_HEAD: string = '#FF0000';
  public static readonly COLOR_BODY: string = '#00FF00';
  public static readonly COLOR_FOOD: string = '#0000FF';

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
}

class SnakeAIDemo_HamiltonianCycle {
  private static readonly IGNORE_CAN_FIND_HOME: number = 5;

  private static readonly TILE_SIZE: number = 50;
  private _tileSize: number;

  private _columns: number;
  private _rows: number;
  private _tiles: Tile[];
  private _snakeGridContainer!: HTMLDivElement;

  private _hamiltonianCycle: Tile[] = [];

  public constructor(snakeGridContainer: HTMLDivElement | null) {
    this._tileSize = SnakeAIDemo_HamiltonianCycle.TILE_SIZE;

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

    this._columns = Math.floor(
      this._snakeGridContainer.clientWidth / this._tileSize
    );
    this._rows = Math.floor(
      this._snakeGridContainer.clientHeight / this._tileSize
    );

    clearGrid();
    Tile.clearCursor();

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

  private async calculateAnHamiltonianCycle(): Promise<void> {
    this._hamiltonianCycle = [];

    let uncheckedTiles: number = this._tiles.length;

    const recursiveHam = async (uncheckedTiles: number): Promise<boolean> => {
      if (uncheckedTiles === 0) return true;

      const lastTile: Tile =
        this._hamiltonianCycle[this._hamiltonianCycle.length - 1];
      const neighbors: number[] = lastTile.getNeighbors();
      if (neighbors.length === 0) return false;

      const validateNeighbors = (neighbors: number[]): Tile[] => {
        const validNeighbors: Tile[] = [];

        for (let i = 0; i < neighbors.length; i++) {
          const neighbor: Tile = this.getTileByIndex(neighbors[i]);
          if (this._hamiltonianCycle.includes(neighbor)) continue;
          validNeighbors.push(neighbor);
          continue;
        }

        return validNeighbors;
      };
      const validNeighbors: Tile[] = validateNeighbors(neighbors);

      // console.log('validNeighbors', validNeighbors);

      while (true) {
        if (validNeighbors.length === 0) return false;

        const randomIndex: number = Math.floor(
          Math.random() * validNeighbors.length
        );
        const randomNeighbor: Tile = validNeighbors[randomIndex];

        this._hamiltonianCycle.push(randomNeighbor);
        uncheckedTiles--;

        const clearColorOfDivs = (): void => {
          this._tiles.forEach((element: Tile) => {
            element.element.style.setProperty(
              Tile.TILE_COLOR_VAR,
              Tile.STD_COLOR
            );
          });
        };

        const colorHamiltonianCycle = (): void => {
          this._hamiltonianCycle.forEach((tile: Tile) => {
            tile.element.style.setProperty(
              Tile.TILE_COLOR_VAR,
              Tile.COLOR_HEAD
            );
          });
        };

        const colorValidNeighbors = (): void => {
          validNeighbors.forEach((element: Tile) => {
            element.element.style.setProperty(
              Tile.TILE_COLOR_VAR,
              Tile.COLOR_FOOD
            );
          });
        };

        clearColorOfDivs();
        colorHamiltonianCycle();
        colorValidNeighbors();

        await new Promise((resolve) => setTimeout(resolve, 200));

        const canFindHome = async (): Promise<boolean> => {
          if (
            this._hamiltonianCycle.length <
            SnakeAIDemo_HamiltonianCycle.IGNORE_CAN_FIND_HOME
          )
            return true;

          const colorPathToGoal = (): void => {
            path.forEach((element: Tile) => {
              element.element.style.setProperty(
                Tile.TILE_COLOR_VAR,
                Tile.COLOR_BODY
              );
            });
          };

          const goal: Tile = this._hamiltonianCycle[0];
          const start: Tile =
            this._hamiltonianCycle[this._hamiltonianCycle.length - 1];
          const path: Tile[] = [];

          const recursivePathToGoal = (temporarilyTile: Tile): boolean => {
            if (temporarilyTile === goal) return true;

            const neighbors: number[] = temporarilyTile.getNeighbors();
            if (neighbors.length === 0) return false;

            const validateNeighbors = (neighbors: number[]): Tile[] => {
              const validNeighbors: Tile[] = [];

              for (let i = 0; i < neighbors.length; i++) {
                const neighbor: Tile = this.getTileByIndex(neighbors[i]);
                if (this._hamiltonianCycle.includes(neighbor)) continue;
                validNeighbors.push(neighbor);
                continue;
              }

              return validNeighbors;
            };
            const validNeighbors: Tile[] = validateNeighbors(neighbors);
            if (validNeighbors.length === 0) return false;

            validNeighbors.forEach(async (element: Tile) => {
              path.push(element);

              clearColorOfDivs();
              colorHamiltonianCycle();
              colorPathToGoal();

              await new Promise((resolve) => setTimeout(resolve, 2000));

              if (recursivePathToGoal(element)) return true;

              path.pop();
            });

            return false;
          };

          if (!recursivePathToGoal(start)) return false;

          colorPathToGoal();

          return true;
        };

        if (await !canFindHome()) {
          this._hamiltonianCycle.pop();
          uncheckedTiles++;
          validNeighbors.splice(randomIndex, 1);
          continue;
        }

        await new Promise((resolve) => setTimeout(resolve, 2000));

        if (await recursiveHam(uncheckedTiles)) return true;
        this._hamiltonianCycle.pop();

        uncheckedTiles++;
        validNeighbors.splice(randomIndex, 1);

        continue;
      }

      return false;
    };

    this._hamiltonianCycle.push(this._tiles[0]);
    uncheckedTiles--;

    if ((await recursiveHam(uncheckedTiles)) === false) {
      console.log("Couldn't find a Hamiltonian Cycle");
      return;
    }

    const colorHamiltonianCycle = (): void => {
      this._hamiltonianCycle.forEach((element: Tile) => {
        element.element.style.setProperty(Tile.TILE_COLOR_VAR, '#00ff00');
      });
    };

    console.log('ham', this._hamiltonianCycle);
    colorHamiltonianCycle();
    return;
  }

  public toggleHamiltonianCycle(): void {
    this.calculateAnHamiltonianCycle();

    return;
  }

  public reset(): void {
    this._columns = 0;
    this._rows = 0;

    return;
  }

  public resetTilesWithRecalculation(): void {
    this.reset();
    this.fillGrid(null);

    return;
  }

  public devToolWriteIndicesToInnerHTML(): void {
    this._tiles.forEach((element) => {
      element.writeIndexToInnerHtml();
    });

    return;
  }
}

export { SnakeAIDemo_HamiltonianCycle };

/*
This is efficient because our goal will always be at 0-0. This method 
will always return the direction as the following: up, left, down, right.
*/
