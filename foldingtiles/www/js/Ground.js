class Ground extends GameObject {
  /* Each gameObject MUST have a constructor() and a render() method.        */
  /* If the object animates, then it must also have an updateState() method. */

  constructor(startingPositionX, startingPositionY) {
    super(
      5
    ); /* as this class extends from GameObject, you must always call super() */

    /* These variables depend on the object */
    this.image = islandImage;

    this.centreX = startingPositionX;
    this.centreY = startingPositionY + 140;
    this.width = 300;
    this.height = 100;

    this.stepSize = -1;
    this.rotation = 0;
  }

  updateState() {}

  pointIsInsideBoundingRectangle(pointX, pointY) {
    if (pointX < this.centreX - this.width / 2) return false;

    if (pointX > this.centreX + this.width / 2) return false;

    if (pointY < this.centreY - this.height / 2) return false;

    if (pointY > this.centreY + this.height / 2) return false;

    return true;
  }

  render() {
    ctx.save();

    ctx.drawImage(
      this.image,
      this.centreX - this.width / 2,
      this.centreY - this.width / 2,
      this.width,
      this.height
    );
    ctx.restore();
  }

  getCentreX() {
    return this.centreX;
  }

  getCentreY() {
    return this.centreY;
  }
}
