class MeCanvas {
  constructor(x, y, width, height, images, speed) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.images = images
    this.speed = speed
    this.img = 0
    this.left = false
    this.right = false
    this.up = false
    this.down = false
  }

  draw(ctx) {
    if (this.img === 1) {
      this.img = 0
    } else {
      this.img = 1
    }
    ctx.clearRect(0, 0, this.width, this.height)
    ctx.drawImage(this.images[this.img], this.x, this.y, 102, 126)
  }

  moveByKey() {
    window.onkeydown = (e) => {
      let key = e.keyCode
      switch (key) {
        case 37:
          this.left = true
          console.log(this.left);
          break
        case 38:
          this.up = true
          break
        case 39:
          this.right = true
          break
        case 40:
          this.down = true
          break
      }
    }

    window.onkeyup = (e) => {
      let key = e.keyCode
      switch (key) {
        case 37:
          this.left = false
          break
        case 38:
          this.up = false
          break
        case 39:
          this.right = false
          break
        case 40:
          this.down = false
          break
      }
    }


  }

  moveByClick() {
    window.onmousedown = (e) => {
      if (e.clientX >= this.x + 50 && e.clientX <= this.x + 102 && e.clientY <= this.y + 126 && e.clientY >= this.y + 60) {
        window.onmousemove = (e) => {
          this.x = e.clientX - 50
          this.y = e.clientY - 60
        }
      }
      window.onmouseup = (e) => {
        window.onmousemove = function () {}
        console.log(window.onmousemove);
      }
    }
  }

  moveByTouch() {
    window.ontouchstart = (e) => {
      let x = e.targetTouches[0].clientX
      let y = e.targetTouches[0].clientY
      if (x >= this.x + 50 && x <= this.x + 102 && y <= this.y + 126 && y >= this.y + 60) {
        window.ontouchmove = (e) => {
          let x = e.targetTouches[0].clientX
          let y = e.targetTouches[0].clientY
          this.x = x - 50
          this.y = y - 60
        }
      }

      window.ontouchend = (e) => {
        console.log('mouseup');
        window.ontouchmove = function () {}
        console.log(window.onmousemove);
      }
    }
  }
}