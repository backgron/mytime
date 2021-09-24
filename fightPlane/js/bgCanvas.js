class BackgroundCanvas {
  constructor(x, y, width, height, image, speed) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.image = image
    this.speed = speed
  }

  draw(ctx) {
    this.image.onload = () => {
      console.log(bgCanvas.width, bgCanvas.height);
      ctx.drawImage(this.image, 0, 0, bgCanvas.width, bgCanvas.height, 0, 0, bgCanvas.width, bgCanvas.height)
      console.log('ok');
    }
  }
  move() {

  }
}