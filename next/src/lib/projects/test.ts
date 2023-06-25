// if (validNeighbors.length === 2) {
//   const checkIfTileIsReachable = async (
//     validNeighbors: Tile[],
//     tileToCalculateFrom: Tile
//   ): Promise<boolean> => {
//     let reachedLastTileOfHamOrGoal: boolean = false;

//     const checkForOneNeighbor = async (
//       validNeighbor: Tile,
//       tileToCalculateFrom: Tile
//     ): Promise<void> => {
//       const checkedTiles: Tile[] = [];
//       const outerRing: Tile[] = [];
//       outerRing.push(validNeighbor);

//       while (true) {
//         const removeFromOuterRing: Tile[] = [];
//         outerRing.forEach((element) => {
//           element.getNeighbors().forEach((element: number) => {
//             const neighbor: Tile = this.getTileByIndex(element);
//             if (neighbor.index === hamGoal.index)
//               reachedLastTileOfHamOrGoal = true;
//             if (neighbor.index === hamGoal.index)
//               reachedLastTileOfHamOrGoal = true;
//           });

//           checkedTiles.push(element);
//           removeFromOuterRing.push(element);
//         });

//         outerRing.forEach((element) => {
//           const neighbors: Tile[] = getValidNeighbors(element);
//           neighbors.forEach((element) => {
//             if (checkedTiles.includes(element)) return;
//             if (this._hamiltonianCycle.includes(element)) return;
//             if (outerRing.includes(element)) return;
//             if (tileToCalculateFrom.index === element.index) return;

//             outerRing.push(element);
//             return;
//           });
//         });

//         removeFromOuterRing.forEach((element) => {
//           outerRing.splice(outerRing.indexOf(element), 1);
//         });

//         this.clearAllColors();
//         this.colorHamiltonianCycle();
//         this.colorNeighbors(outerRing);
//         this.colorTileChecking(checkedTiles);

//         await new Promise((resolve) => setTimeout(resolve, 1000));

//         if (outerRing.length === 0) return;
//       }

//       return;
//     };

//     while (validNeighbors.length > 0) {
//       const validNeighbor: Tile = validNeighbors[0];
//       validNeighbors.splice(0, 1);

//       await checkForOneNeighbor(validNeighbor, tileToCalculateFrom);
//       if (reachedLastTileOfHamOrGoal === false) return false;

//       continue;
//     }

//     return true;
//   };

//   const isReachable: boolean = await checkIfTileIsReachable(
//     validNeighbors,
//     tile
//   );

//   return isReachable;
// }

if (validNeighbors.length === 2) {
  const checkIfTileCanBeGoneThrough = async (
    tileToCheck: Tile
  ): Promise<boolean> => {
    const checkIfTileIsRelevantForCurrentHamCycle = (
      tileToCheck: Tile
    ): boolean => {
      const adjacentHamTiles: Tile[] = [];
      tileToCheck.getNeighbors().forEach((element: number) => {
        const neighbor: Tile = this.getTileByIndex(element);
        if (hamGoal.index === neighbor.index) return;
        if (
          this._hamiltonianCycle[this._hamiltonianCycle.length - 1].index ===
          neighbor.index
        )
          return;

        if (this._hamiltonianCycle.includes(neighbor))
          adjacentHamTiles.push(neighbor);

        return;
      });

      return adjacentHamTiles.length !== 0;
    };

    const tileIsRelevantForCurrentHamCycle =
      checkIfTileIsRelevantForCurrentHamCycle(tileToCheck);
    if (tileIsRelevantForCurrentHamCycle === false) return true;

    const theTwoNeighborsToCheckIfTheReachGoalOrHead: Tile[] =
      getValidNeighbors(tileToCheck);

    if (theTwoNeighborsToCheckIfTheReachGoalOrHead.length !== 2) {
      console.error(
        "FATAL ERROR: We guessed for two neighbors, but there weren't."
      );
      alert("FATAL ERROR: We guessed for two neighbors, but there weren't.");
      return true;
    }

    const checkedTiles: Tile[] = [];
    const firstNeighborToCheck: Tile =
      theTwoNeighborsToCheckIfTheReachGoalOrHead[0];
    let firstNeighborOk: boolean = false;
    const secondNeighborToCheck: Tile =
      theTwoNeighborsToCheckIfTheReachGoalOrHead[1];
    let secondNeighborOk: boolean = false;

    const areTheTilesHorizontallyOrVerticallyAligned = (
      tile1: Tile,
      tile2: Tile
    ): boolean => {
      if (tile1.x === tile2.x) return true;
      if (tile1.y === tile2.y) return true;

      return false;
    };

    const tilesAreHorizontallyOrVerticallyAligned =
      areTheTilesHorizontallyOrVerticallyAligned(
        firstNeighborToCheck,
        secondNeighborToCheck
      );
    if (tilesAreHorizontallyOrVerticallyAligned === false) return true;

    console.log('tile is relevant', tileToCheck.index);
    console.log('tile1', firstNeighborToCheck.x, firstNeighborToCheck.y);
    console.log('tile2', secondNeighborToCheck.x, secondNeighborToCheck.y);
    tileToCheck.element.style.setProperty(Tile.TILE_COLOR_VAR, '#000000');
    firstNeighborToCheck.element.style.setProperty(
      Tile.TILE_COLOR_VAR,
      '#505050'
    );
    secondNeighborToCheck.element.style.setProperty(
      Tile.TILE_COLOR_VAR,
      '#202020'
    );
    await new Promise((resolve) => setTimeout(resolve, 2_000));

    const outerRing: Tile[] = [];
    const initializeOuterRingForFirstNeighbor = (
      outerRing: Tile[],
      start: Tile
    ): void => {
      const neighborsIndices: number[] = start.getNeighbors();

      neighborsIndices.forEach((element) => {
        const neighbor: Tile = this.getTileByIndex(element);
        if (neighbor.index === hamGoal.index) {
          firstNeighborOk = true;
          return;
        }
        if (
          this._hamiltonianCycle[this._hamiltonianCycle.length - 1].index ===
          neighbor.index
        ) {
          firstNeighborOk = true;
          return;
        }

        if (neighbor.index === start.index) return;
        if (this._hamiltonianCycle.includes(neighbor)) return;

        outerRing.push(neighbor);
      });

      return;
    };
    initializeOuterRingForFirstNeighbor(outerRing, firstNeighborToCheck);

    this.clearAllColors();
    this.colorHamiltonianCycle();
    this.colorNeighbors(outerRing);
    this.colorTileTest(checkedTiles);
    firstNeighborToCheck.element.style.setProperty(
      Tile.TILE_COLOR_VAR,
      '#00FFFF'
    );
    tileToCheck.element.style.setProperty(Tile.TILE_COLOR_VAR, '#FFFFFF');
    await new Promise((resolve) => setTimeout(resolve, 5_000));

    while (true) {
      if (firstNeighborOk) break;

      const removeFromOuterRing: Tile[] = [];
      outerRing.forEach((element) => {
        element.getNeighbors().forEach((element: number) => {
          const neighbor: Tile = this.getTileByIndex(element);
          if (neighbor.index === hamGoal.index) firstNeighborOk = true;
          if (
            neighbor.index ===
            this._hamiltonianCycle[this._hamiltonianCycle.length - 1].index
          )
            firstNeighborOk = true;
        });

        if (element.index !== tileToCheck.index) checkedTiles.push(element);
        removeFromOuterRing.push(element);
        return;
      });

      outerRing.forEach((element) => {
        const neighbors: Tile[] = getValidNeighbors(element);
        neighbors.forEach((element) => {
          if (checkedTiles.includes(element)) return;
          if (this._hamiltonianCycle.includes(element)) return;
          if (outerRing.includes(element)) return;
          if (tileToCheck.index === element.index) return;

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
      this.colorTileTest(checkedTiles);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (outerRing.length === 0) break;
      continue;
    }

    outerRing.splice(0, outerRing.length);
    checkedTiles.splice(0, checkedTiles.length);

    console.log('firstNeighborOk', firstNeighborOk);
    console.log('secondNeighborOk', secondNeighborOk);
    await new Promise((resolve) => setTimeout(resolve, 1_000));

    secondNeighborToCheck.element.style.setProperty(
      Tile.TILE_COLOR_VAR,
      '#00FFFF'
    );
    tileToCheck.element.style.setProperty(Tile.TILE_COLOR_VAR, '#FFFFFF');
    await new Promise((resolve) => setTimeout(resolve, 1_000));

    const initializeOuterRingForSecondNeighbor = (
      outerRing: Tile[],
      start: Tile
    ): void => {
      const neighborsIndices: number[] = start.getNeighbors();

      neighborsIndices.forEach((element) => {
        const neighbor: Tile = this.getTileByIndex(element);
        if (neighbor.index === hamGoal.index) {
          secondNeighborOk = true;
          return;
        }
        if (
          this._hamiltonianCycle[this._hamiltonianCycle.length - 1].index ===
          neighbor.index
        ) {
          secondNeighborOk = true;
          return;
        }

        if (neighbor.index === start.index) return;
        if (this._hamiltonianCycle.includes(neighbor)) return;

        outerRing.push(neighbor);
      });

      return;
    };

    initializeOuterRingForSecondNeighbor(outerRing, secondNeighborToCheck);

    this.clearAllColors();
    this.colorHamiltonianCycle();
    this.colorNeighbors(outerRing);
    this.colorTileTest(checkedTiles);
    secondNeighborToCheck.element.style.setProperty(
      Tile.TILE_COLOR_VAR,
      '#FF00FF'
    );
    tileToCheck.element.style.setProperty(Tile.TILE_COLOR_VAR, '#F0F0F0');
    await new Promise((resolve) => setTimeout(resolve, 10_000));

    while (true) {
      if (secondNeighborOk) break;

      const removeFromOuterRing: Tile[] = [];
      outerRing.forEach((element) => {
        element.getNeighbors().forEach((element: number) => {
          const neighbor: Tile = this.getTileByIndex(element);
          if (neighbor.index === hamGoal.index) secondNeighborOk = true;
          if (
            neighbor.index ===
            this._hamiltonianCycle[this._hamiltonianCycle.length - 1].index
          )
            secondNeighborOk = true;
        });

        if (element.index !== tileToCheck.index) checkedTiles.push(element);
        removeFromOuterRing.push(element);
        return;
      });

      outerRing.forEach((element) => {
        const neighbors: Tile[] = getValidNeighbors(element);
        neighbors.forEach((element) => {
          if (checkedTiles.includes(element)) return;
          if (this._hamiltonianCycle.includes(element)) return;
          if (outerRing.includes(element)) return;
          if (tileToCheck.index === element.index) return;

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
      this.colorTileTest(checkedTiles);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (outerRing.length === 0) break;
      continue;
    }

    outerRing.splice(0, outerRing.length);
    checkedTiles.splice(0, checkedTiles.length);

    console.log('firstNeighborOk', firstNeighborOk);
    console.log('secondNeighborOk', secondNeighborOk);
    await new Promise((resolve) => setTimeout(resolve, 10_000));

    // false: try find an other way; true: ok
    return true;
  };

  const canBeGoneThrough: boolean = await checkIfTileCanBeGoneThrough(tile);

  return canBeGoneThrough;
}
