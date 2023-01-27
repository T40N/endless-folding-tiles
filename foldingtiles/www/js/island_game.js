/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland.             */
/* There should always be a javaScript file with the same name as the html file. */
/* This file always holds the playGame function().                               */
/* It also holds game specific code, which will be different for each game       */

/******************** Declare game specific global data and functions *****************/
/* images must be declared as global, so that they will load before the game starts  */
let backgroundImage = new Image();
backgroundImage.src = "img/sky.jpg";

let islandImage = new Image();
islandImage.src = "img/island.png";

let playerStand = new Image();
playerStand.src = "img/player/stand.png";
let playerWalkLeft = new Image();
playerWalkLeft.src = "img/player/walkLeft.png";
let playerWalkRight = new Image();
playerWalkRight.src = "img/player/walkRight.png";
let playerJumpLeft = new Image();
playerJumpLeft.src = "img/player/jumpLeft.png";
let playerJumpRight = new Image();
playerJumpRight.src = "img/player/jumpRight.png";

const BACKGROUND = 0;
const PLAYER = 2;
const GROUND = 1;
const DIALOGS = 3;

let isDevicePositionSet = false;
let deviceZPosition;
let deviceXPosition;
let direction = "";
let isJumpClicked = false;
let isInAir = false;
let score = 0;
let endGame = false;
let isPlaying = false;
let menuOpen = false;

let menu = null;
let endGameMessage = null;

/* Instead of using gameObject[], we can declare our own gameObject variables */

let islands = [];
/******************* END OF Declare game specific data and functions *****************/

/* Always have a playGame() function                                     */
/* However, the content of this function will be different for each game */

function clearObjects() {
  gameObjects[BACKGROUND] = new GameObject();
  gameObjects[GROUND] = new GameObject();
  gameObjects[PLAYER] = new GameObject();
  gameObjects[DIALOGS] = new GameObject();
  islands = [];
}

function showMenu() {
  menuOpen = true;
  isPlaying = false;
  highScoreDialogVisible = false;
  clearObjects();
  console.log(deviceId);
  getHighScore();

  gameObjects[BACKGROUND] = new StaticImage(
    backgroundImage,
    0,
    0,
    canvas.width,
    canvas.height
  );
  gameObjects[BACKGROUND].render();
  gameObjects[DIALOGS] = new Menu();
  gameObjects[DIALOGS].render();
}

function showHighScore() {
  menuOpen = false;
  isPlaying = false;
  highScoreDialogVisible = true;
  clearObjects();

  gameObjects[BACKGROUND] = new StaticImage(
    backgroundImage,
    0,
    0,
    canvas.width,
    canvas.height
  );
  gameObjects[BACKGROUND].render();
  gameObjects[DIALOGS] = new HighScoreDialog();
  gameObjects[DIALOGS].render();
}

function gameOver() {
  menuOpen = false;
  highScoreDialogVisible = true;
  isPlaying = false;
  endGame = true;
  window.navigator.vibrate(1000);
  clearObjects();
  console.log("end");
  console.log(gameObjects);
  console.log("highiestscore", highestScore);
  console.log("score", score);
  if (score > highestScore && score > 0) {
    setHighScore(score);
    console.log(score);
  }
  // gameObjects[GROUND] = new GameObject();
  // gameObjects[PLAYER] = new GameObject();
  // gameObjects[BACKGROUND] = new StaticImage(
  //   backgroundImage,
  //   0,
  //   0,
  //   canvas.width,
  //   canvas.height
  // );
  // gameObjects[BACKGROUND].render();
  // gameObjects[MENU] = new Menu();
  // gameObjects[MENU].render();
  gameObjects[DIALOGS] = new MessageDialog();
  gameObjects[DIALOGS].render();
}

function playGame() {
  /* We need to initialise the game objects outside of the Game class */
  /* This function does this initialisation.                          */
  /* Specifically, this function will:                                */
  /* 1. initialise the canvas and associated variables                */
  /* 2. create the various game gameObjects,                   */
  /* 3. store the gameObjects in an array                      */
  /* 4. create a new Game to display the gameObjects           */
  /* 5. start the Game                                                */

  /* Create the various gameObjects for this game. */
  /* This is game specific code. It will be different for each game, as each game will have it own gameObjects */
  menuOpen = false;
  endGame = false;
  highScoreDialogVisible = false;
  gameObjects[DIALOGS] = new GameObject();
  gameObjects[BACKGROUND] = new StaticImage(
    backgroundImage,
    0,
    0,
    canvas.width,
    canvas.height
  );
  highestScore = getHighScore();

  gameObjects[PLAYER] = new Player(canvas.width / 2, 1);
  gameObjects[GROUND] = new Ground(canvas.width / 2, canvas.height - 20);
  /* END OF game specific code. */

  /* Always create a game that uses the gameObject array */
  let game = new IslandGame();

  game.createIslands(500, 1);

  /* Always play the game */
  game.start();
  isPlaying = true;

  /* If they are needed, then include any game-specific mouse and keyboard listners */

  window.addEventListener("touchstart", () => {
    if (isPlaying) {
      v;
    }
  });

  window.addEventListener("deviceorientation", (event) => {
    if (isPlaying) {
      if (event.alpha > 4 && event.alpha < 200) direction = "right";
      if (event.alpha > 200) direction = "left";

      if (event.beta < 90) {
        isJumpClicked = true;
      }

      console.log(isJumpClicked);
      if (isJumpClicked) {
        switch (direction) {
          case "right":
            console.log("jump right");
            gameObjects[PLAYER].pos = 3;
            gameObjects[GROUND].stop();
            gameObjects[GROUND] = new GameObject();
            break;
          case "left":
            console.log("jump left");
            gameObjects[PLAYER].pos = 4;
            gameObjects[GROUND].stop();
            gameObjects[GROUND] = new GameObject();
            break;
        }
      } else {
        switch (direction) {
          case "right":
            gameObjects[PLAYER].pos = 1;
            break;
          case "left":
            gameObjects[PLAYER].pos = 2;
            break;
        }
      }
    }
  });

  window.addEventListener("keydown", (event) => {
    if (isPlaying) {
      if (event.keyCode == "38") {
        isJumpClicked = true;
        gameObjects[GROUND].stop();
        gameObjects[GROUND] = new GameObject();
      } else if (event.keyCode == "37") {
        direction = "left";
      } else if (event.keyCode == "39") {
        direction = "right";
      }

      if (isJumpClicked) {
        switch (direction) {
          case "right":
            gameObjects[PLAYER].pos = 3;
            break;
          case "left":
            gameObjects[PLAYER].pos = 4;
            break;
        }
      } else {
        switch (direction) {
          case "right":
            gameObjects[PLAYER].pos = 1;
            break;
          case "left":
            gameObjects[PLAYER].pos = 2;
            break;
        }
      }
    }
  });
}
