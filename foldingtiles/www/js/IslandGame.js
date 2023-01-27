/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland.                                                   */
/* The CanvasGame class is responsible for rendering all of the gameObjects and other game graphics on the canvas.         */
/* If you want to implement collision detection in your game, then you MUST overwrite the collisionDetection() method. */
/* This class will usually not change.                                                                                 */

class IslandGame extends CanvasGame {
  constructor() {
    super();

    this.islandStartingX = [];

    let numerOfIslandLines = canvas.width / 5;
    for (let i = 0; i < numerOfIslandLines; i++) {
      this.islandStartingX.push(100 * i);
    }

    this.multiplayer;
    this.prevIndicator = 1;
    this.prevRand = 0;
  }

  createIslands(interval, startingMultiplayer) {
    let multiplayer = startingMultiplayer;
    this.interval1 = setInterval(() => {
      multiplayer += 0.2;
      this.multiplayer = multiplayer;
    }, 10000);

    this.interval2 = setInterval(() => {
      let randX = Math.floor(Math.random() * 5);
      if (this.prevRand === randX) return;
      this.prevRand = randX;
      islands.push(new Island(this.islandStartingX[randX], multiplayer));
    }, interval);
  }

  start() {
    super.start();
  }

  stopInterval() {
    clearInterval(this.interval1);
    clearInterval(this.interval2);
  }

  collisionDetection() {
    if (endGame) return;

    let leftSidePlayer =
      gameObjects[PLAYER].centreX + gameObjects[PLAYER].width / 2;
    let rightSidePlayer =
      gameObjects[PLAYER].centreX - gameObjects[PLAYER].width / 2;
    let bottomSidePlayer =
      gameObjects[PLAYER].centreY - gameObjects[PLAYER].height / 2;
    let topSidePlayer =
      gameObjects[PLAYER].centreY + gameObjects[PLAYER].height / 2;

    if (
      leftSidePlayer <= 0 ||
      rightSidePlayer >= canvas.width ||
      bottomSidePlayer >= canvas.height ||
      topSidePlayer <= 0
    ) {
      this.stopInterval();
      gameOver();
    }
    islands.forEach((island, index) => {
      if (island.centreY - 50 === canvas.height) {
        island.stop();
        islands.splice(index, 1);
      }
      if (gameObjects[PLAYER].isFall)
        if (
          island.pointIsInsideBoundingRectangle(
            gameObjects[PLAYER].centreX,
            gameObjects[PLAYER].centreY
          )
        ) {
          gameObjects[PLAYER].isOnIsland = true;
          gameObjects[PLAYER].pos = 0;
          score++;
        }
    });
  }

  render() {
    islands.forEach((island) => {
      island.render();
      island.start();
    });
    super.render();
  }
}
