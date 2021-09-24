class MeCanvas {
  constructor(x, y, width, height, image, speed) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.image = image
    this.speed = speed
  }

  draw(ctx) {
    ctx.clearRect(this.x, this.y, 102, 126)
    ctx.drawImage(this.image, this.x, this.y, 102, 126)
  }

  move() {

  }
}