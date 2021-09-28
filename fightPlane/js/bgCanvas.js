class BackgroundCanvas {
  constructor(x, y, width, height, image, speed, ctx) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.image = image
    this.speed = speed
    this.ctx = ctx
  }

  draw() {
    if (this.image.onload === null) {
      this.image.onload = () => {
        console.log('onload');
        this.ctx.drawImage(this.image, 0, 0, this.width, this.height)
        this.ctx.drawImage(this.image, 0, -this.height, this.width, this.height)
        console.log('draw');
      }
    } else {
      this.ctx.drawImage(this.image, 0, 0, this.width, this.height)
      this.ctx.drawImage(this.image, 0, -this.height, this.width, this.height)
    }



  }
  move() {
    this.ctx.translate(0, this.y += this.speed)
    if (this.y >= bgCanvas.height) {
      this.y = 0
    }
  }
}