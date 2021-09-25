class Enemy {
  constructor(x, y, width, height, image, speed) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.image = image
    this.speed = speed
  }

  draw(ctx) {
    if (this.x > MAX_WIDTH - this.x) {
      this.x = MAX_WIDTH - this.x
    }
    ctx.drawImage(this.image, this.x, this.y)
  }
  move() {
    this.y += this.speed
  }
}