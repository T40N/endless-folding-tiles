/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland. */

class Player extends GameObject {
  /* Each gameObject MUST have a constructor() and a render() method.        */
  /* If the object animates, then it must also have an updateState() method. */

  constructor(startingPositionX, fallSpeed) {
    super(
      5
    ); /* as this class extends from GameObject, you must always call super() */

    /* These variables depend on the object */
    this.fallSpeed = fallSpeed;
    this.interval = setInterval(() => {
      this.fallSpeed += 0.2;
    }, 10000);

    this.standImage = playerStand;
    this.jumpLeft = playerJumpLeft;
    this.jumpRight = playerJumpRight;
    this.walkLeft = playerWalkLeft;
    this.walkRight = playerWalkRight;
    this.width = 100;
    this.height = 100;
    this.centreX = startingPositionX;
    this.centreY = canvas.height - 60;
    this.pos = 0;
    this.jumpIndicator = 0;
    this.isFall = false;
    this.isStanding = false;
    this.isOnIsland;
    //5 - jumpApp
    //0 - stand,
    //1 - walkRight,
    //2 - walkLeft,
    //3 - jumpRight,
    //4 - jumpLeft
  }

  updateState() {
    if (this.isOnIsland) {
      console.log(this.isOnIsland);
      this.centreY += this.fallSpeed;
      isInAir = false;
      this.isFall = false;
      this.jumpIndicator = 0;
      isJumpClicked = false;

      switch (this.pos) {
        case 1:
          this.centreX++;
          break;
        case 2:
          this.centreX--;
          break;
        case 3:
          // if (!isInAir) {
          this.centreX += 2;
          this.centreY -= 2;
          this.jumpIndicator++;
          this.isOnIsland = false;
          // }
          break;
        case 4:
          // if (!isInAir) {
          this.centreX -= 2;
          this.centreY -= 2;
          this.isOnIsland = false;
          this.jumpIndicator++;
          // }
          break;
      }
      return;
    }

    if (this.jumpIndicator === Math.floor(canvas.height / 3))
      this.isFall = true;

    if (this.isFall) {
      if (this.jumpIndicator === 0) {
        this.isFall = false;
        return;
      }
      isInAir = true;
      this.jumpIndicator--;
      this.centreY += 2;

      switch (this.pos) {
        case 1:
          this.centreX++;
          break;
        case 2:
          this.centreX--;
          break;
        case 3:
          this.centreX += 2;
          break;
        case 4:
          this.centreX -= 2;
          break;
      }
      return;
    }

    switch (this.pos) {
      case 0: {
        this.centreY = this.centreY;
        this.centreX = this.centreX;
        break;
      }
      case 1:
        this.centreX++;
        break;
      case 2:
        this.centreX--;
        break;
      case 3:
        this.centreX += 2;
        this.centreY--;
        this.jumpIndicator++;
        this.isOnIsland = false;

        break;
      case 4:
        this.centreX -= 2;
        this.centreY--;
        this.jumpIndicator++;
        this.isOnIsland = false;
        break;
    }
  }

  render() {
    ctx.save();
    switch (this.pos) {
      case -1:
        ctx.drawImage(
          this.standImage,
          this.centreX - this.width / 2,
          this.centreY - this.width / 2,
          this.width,
          this.height
        );
        break;
      case 0:
        ctx.drawImage(
          this.standImage,
          this.centreX - this.width / 2,
          this.centreY - this.width / 2,
          this.width,
          this.height
        );
        break;
      case 1:
        ctx.drawImage(
          this.walkRight,
          this.centreX - this.width / 2,
          this.centreY - this.width / 2,
          this.width,
          this.height
        );
        break;
      case 2:
        console.log(this.pos);
        ctx.drawImage(
          this.walkLeft,
          this.centreX - this.width / 2,
          this.centreY - this.width / 2,
          this.width,
          this.height
        );
        break;
      case 3:
        ctx.drawImage(
          this.jumpRight,
          this.centreX - this.width / 2,
          this.centreY - this.width / 2,
          this.width,
          this.height
        );
        break;
      case 4:
        ctx.drawImage(
          this.jumpLeft,
          this.centreX - this.width / 2,
          this.centreY - this.width / 2,
          this.width,
          this.height
        );
        break;
    }
    ctx.restore();
  }

  stopInterval() {
    clearInterval(this.interval);
  }

  pointIsInsideBoundingRectangle(pointX, pointY) {
    if (pointX < this.centreX - this.width / 2) return false;

    if (pointX > this.centreX + this.width / 2) return false;

    if (pointY < this.centreY - this.height / 2) return false;

    if (pointY > this.centreY + this.height / 2) return false;

    return true;
  }

  getCentreX() {
    return this.centreX;
  }

  getCentreY() {
    return this.centreY;
  }

  stop() {
    super.stop();
    this.stopInterval();
  }
}
