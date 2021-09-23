class Rect {
  constructor(x, y, border, color) {
    this.x = x
    this.y = y
    this.border = border
    this.color = color
  }

  rDraw() {
    console.log('rDraw');
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.border, this.border)
    ctx.strokeRect(this.x, this.y, this.border, this.border)
    ctx.closePath()
  }

  rMove() {

  }

}

class Snake {
  constructor(head, body, target) {
    this.head = head
    this.body = body
    this.target = target || 'right'
  }

  sDrow() {
    //画蛇头
    this.head.rDraw()

    //画蛇身
    this.body.forEach(item => {
      item.rDraw()
    })
  }

  sMove() {

  }
}

class Food {
  constructor(food) {
    this.food = food
  }
}

class Util {
  static isRectHit(rect1, rect2) {
    let minX = Math.max(rect1.x, rect2.x)
    let maxX = Math.min(rect1.x + rect1.border, rect2.x + rect2.border)

    let minY = Math.max(rect1.y, rect2.y)
    let maxY = Math.min(rect1.y + rect1.border, rect2.y + rect2.border)

    if (minX < maxX && minY < maxY) {
      return true
    }
    return false
  }

  static getRadom(max) {
    return Math.round((Math.random() * max) / 40)
  }

  static getTarget(key) {
    switch (key) {
      case '37':
        return 'left';
      case '38':
        return 'top';
      case '39':
        return 'right';
      case '40':
        return 'down';
    }
  }
}

window.onkeydown = function (e) {
  console.log(e);
}


let canvas
let maxWidth
let maxheight
let head
let ctx = null

function init() {
  canvas = document.querySelector('#canvas') // 获取canvas画布
  maxWidth = window.innerWidth - 40 // 最大宽度
  maxheight = window.innerHeight - 40 //最大高度
  //设置画布画笔
  canvas.width = maxWidth
  canvas.height = maxheight
  if (canvas.getContext) {
    ctx = canvas.getContext('2d')
  }
  ctx.clearRect(0, 0, maxWidth, maxheight)
  //初始化蛇
  let head = new Rect(80, 80, 40, 'red')
  let snake = new Snake(head, [])

  //初始化场景
  snake.sDrow()
}
init()