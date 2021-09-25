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

  // 键盘移动
  moveByKey() {
    window.onkeydown = (e) => {
      let key = e.keyCode
      switch (key) {
        case 37:
          this.left = true
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
  //鼠标移动
  moveByClick() {
    window.onmousedown = (e) => {
      let offsetX = e.clientX - this.x
      let offsetY = e.clientY - this.y
      if (e.clientX >= this.x && e.clientX <= this.x + 102 && e.clientY <= this.y + 126 && e.clientY >= this.y) {
        window.onmousemove = (e) => {
          let moveX = e.clientX - offsetX
          let moveY = e.clientY - offsetY
          if (moveX <= 0) {
            moveX = 0
          }
          if (moveX >= width - 102) {
            moveX = width - 102
          }
          if (moveY <= 0) {
            moveY = 0
          }
          if (moveY >= height - 126) {
            moveY = height - 126
          }
          this.x = moveX
          this.y = moveY
        }
      }
      window.onmouseup = (e) => {
        window.onmousemove = function () {}
      }
    }
  }
  //触摸移动
  moveByTouch() {
    window.ontouchstart = (e) => {
      let x = e.targetTouches[0].clientX
      let y = e.targetTouches[0].clientY
      let offsetX = x - this.x
      let offsetY = y - this.y
      if (x >= this.x && x <= this.x + 102 && y <= this.y + 126 && y >= this.y) {
        window.ontouchmove = (e) => {
          let moveX = e.targetTouches[0].clientX - offsetX
          let moveY = e.targetTouches[0].clientY - offsetY
          if (moveX <= 0) {
            moveX = 0
          }
          if (moveX >= this.width - 102) {
            moveX = this.width - 102
          }
          if (moveY <= 0) {
            moveY = 0
          }
          if (moveY >= this.height - 126) {
            moveY = this.height - 126
          }
          this.x = moveX
          this.y = moveY
        }
      }
      window.ontouchend = (e) => {
        window.ontouchmove = function () {}
      }
    }
  }

  //发射子弹
  shoot() {

  }
}