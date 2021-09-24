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
    ctx.drawImage(this.image, 0, 0, this.width, this.height)
    ctx.drawImage(this.image, 0, -this.height, this.width, this.height)
  }
  move(ctx) {
    ctx.translate(0, this.y += this.speed)
    if (this.y >= bgCanvas.height) {
      this.y = 0
    }
  }
}