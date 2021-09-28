class Enemy {
  constructor(x, y, width, height, image, speed, hp, type, ctx) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.image = image
    this.speed = speed
    this.hp = hp
    this.type = type
    this.ctx = ctx
  }

  draw() {
    if (this.image.onload === null) {
      this.image.onload = () => {
        if (this.x > MAX_WIDTH - this.width) {
          this.x = MAX_WIDTH - this.width
        }
        this.ctx.drawImage(this.image, this.x, this.y)
      }

    } else {
      if (this.x > MAX_WIDTH - this.width) {
        this.x = MAX_WIDTH - this.width
      }
      this.ctx.drawImage(this.image, this.x, this.y)
    }



  }
  move() {
    this.y += this.speed
  }
  die(enemys, j) {
    let i = 1
    let timer = setInterval(() => {
      this.image.src = `images/enemy${this.type}_down${i}.png`
      i++
      this.draw()
      if (i === 4) {
        clearInterval(timer)
      }
    }, 50)
    enemys.splice(j, 1)
  }
}