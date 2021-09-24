class BulletCanvas {
  constructor(x, y, image) {
    this.x = x
    this.y = y
    this.width = 5
    this.height = 11
    this.image = image
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y)
  }
  move() {
    this.y -= 10
  }
}