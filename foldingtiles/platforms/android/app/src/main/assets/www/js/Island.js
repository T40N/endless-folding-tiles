/* Author: Derek O Reilly, Dundalk Institute of Technology, Ireland. */

class Island extends GameObject {
  /* Each gameObject MUST have a constructor() and a render() method.        */
  /* If the object animates, then it must also have an updateState() method. */

  constructor(startingPositionX, multiplayer) {
    super(
      5
    ); /* as this class extends from GameObject, you must always call super() */

    /* These variables depend on the object */
    this.image = islandImage;

    this.centreX = startingPositionX + 50;
    this.width = 100;
    this.height = 100;
    this.centreY = 0;
    this.multiplayer = multiplayer;

    this.stepSize = -1;
    this.rotation = 0;
  }

  updateState() {
    this.centreY += this.multiplayer;
  }

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
