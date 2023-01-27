class Menu extends GameObject {
  constructor() {
    super();

    this.height = canvas.height / 2;
    this.width = canvas.width / 2;
    this.positionX = canvas.width / 2;
    this.positionY = canvas.height / 2 + canvas.height / 6;

    this.isVisible = true;

    this.logo = new StaticText(
      "Folding Tiles",
      canvas.width / 2,
      this.positionY - this.height / 2 - 14,
      50,
      "#FFF",
      0
    );

    this.authorLabel = new StaticText(
      "Creator: Bartosz Ratajczyk",
      20,
      25,
      12,
      "#000000b4"
    );

    this.startButton = new Button(this.positionY - 50, "START");
    this.scoreButton = new Button(this.positionY, "SCORES");

    window.addEventListener("touchstart", (event) => {
      let clientX = event.touches[0].clientX;
      let clientY = event.touches[0].clientY;

      if (isPlaying) return;

      if (
        this.startButton.pointIsInsideBoundingRectangle(clientX, clientY) &&
        menuOpen
      ) {
        console.log("start");
        this.startButton.isClicked = true;
        return;
      }
      if (
        this.scoreButton.pointIsInsideBoundingRectangle(clientX, clientY) &&
        menuOpen
      ) {
        this.scoreButton.isClicked = true;
        return;
      }
    });

    window.addEventListener("touchmove", (event) => {
      let clientX = event.touches[0].clientX;
      let clientY = event.touches[0].clientY;

      if (isPlaying) return;

      if (
        this.startButton.isClicked &&
        !this.startButton.pointIsInsideBoundingRectangle(clientX, clientY)
      ) {
        this.startButton.isClicked = false;
        return;
      }
      if (
        this.scoreButton.isClicked &&
        !this.scoreButton.pointIsInsideBoundingRectangle(clientX, clientY)
      ) {
        this.scoreButton.isClicked = false;
        return;
      }
    });

    window.addEventListener("touchend", () => {
      if (isPlaying) return;

      if (this.startButton.isClicked) {
        console.log("start");
        this.startButton.isClicked = false;
        playGame();
        return;
      }
      if (this.scoreButton.isClicked) {
        this.scoreButton.isClicked = false;
        showHighScore();
        return;
      }
    });
  }

  render() {
    if (isPlaying) return;

    this.logo.render();
    this.authorLabel.render();
    this.startButton.render();
    this.scoreButton.render();
  }
}
