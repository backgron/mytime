class Rect {
  constructor(x, y, border, color) {
    this.x = x
    this.y = y
    this.border = border
    this.color = color
  }

  rDraw() {
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
  constructor(head = null, body = [], target = 39) {
    this.head = head
    this.body = body
    this.target = target
  }

  sDrow() {
    //画蛇头
    this.head.rDraw()

    //画蛇身
    for (let i = 0; i < this.body.length; i++) {
      this.body[i].rDraw()
    }
  }

  addHead(x, y) {
    this.head = new Rect(x, y, block, 'red')
  }
  addBody() {
    this.head.color = '#12b7f5'
    this.body.unshift(this.head)
  }
  removeBody() {
    this.body.pop()
  }

  sMoveTo() {
    let x = this.head.x
    let y = this.head.y
    switch (this.target) {
      case 37:
        x -= block
        break;
      case 38:
        y -= block
        break;
      case 39:
        x += block
        break;
      case 40:
        y += block
        break;
    }
    this.addBody()
    this.addHead(x, y)
    if (!Util.isRectHit(food.food, snake.head)) {
      this.removeBody()
    } else {
      food = new Food()
      food.createFood()
      //  防止食物刷身体里  但是会卡屏一下
      // for (let i = 0; i < snake.body.length; i++) {
      //   if (isRectHit(food.food, snake.body[i])) {
      //     food.createFood()
      //     break
      //   }
      // }
      score++
    }
  }
}

class Food {
  constructor(food = null) {
    this.food = food
  }
  createFood() {
    let x = Util.getRadom(canvas.width - 40) * block
    let y = Util.getRadom(canvas.height - 40) * block
    this.food = new Rect(x, y, block, '#cbcb5a')
  }
  fDraw() {
    this.food.rDraw()
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
    return Math.round((Math.random() * max) / block)
  }

  static getTarget(key) {
    return key
  }
  // PE端
  static eventListenerPE(snake) {
    //监听键盘事件
    window.onkeydown = function (e) {
      if (keyFlag === true) {
        if (snake.target - e.keyCode !== -2 && snake.target - e.keyCode !== 2) {
          snake.target = e.keyCode
          keyFlag = false
        }
      }

    }
  }
  //PC 端
  static eventListenerPC() {
    let left = document.querySelector('#left')
    let up = document.querySelector('#up')
    let right = document.querySelector('#right')
    let down = document.querySelector('#down')

    left.addEventListener('click', function () {
      if (keyFlag === true) {
        if (snake.target != 39) {
          snake.target = 37
          keyFlag = false
        }
      }
    })

    up.addEventListener('click', function () {
      if (keyFlag === true) {
        if (snake.target != 40) {
          snake.target = 38
          keyFlag = false
        }
      }
    })

    right.addEventListener('click', function () {
      if (keyFlag === true) {
        if (snake.target != 37) {
          snake.target = 39
          keyFlag = false
        }
      }
    })

    down.addEventListener('click', function () {
      if (keyFlag === true) {
        if (snake.target != 38) {
          snake.target = 40
          keyFlag = false
        }
      }
    })

  }
  static animation() {
    return setInterval(function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      snake.sMoveTo()
      snake.sDrow()
      food.fDraw()
      Util.gameOver(timeId)
      keyFlag = true
    }, 200)
    // window.requestAnimationFrame(Util.animation)
  }

  static gameOver(timeId) {
    if (snake.head.x > canvas.width || snake.head.y > canvas.height || snake.head.x < 0 || snake.head.y < 0) {
      clearInterval(timeId)
      alert('gameOver,得分为' + score + ';确认重新开始')
      init()
      return true
    }
    for (let i = 1; i < snake.body.length; i++) {
      if (Util.isRectHit(snake.head, snake.body[i])) {
        clearInterval(timeId)
        alert('gameOver,得分为' + score + ';确认重新开始')
        init()
        return true
      }
    }

  }
}

let block = 20
let ctx = null
let snake = null
let food = null
let timeId = null
let keyFlag = true
let score = 0
let canvas = null
let maxWidth = 0
let maxheight = 0
let head = null

function init() {

  //初始化 
  block = 20
  ctx = null
  snake = null
  food = null
  timeId = null
  keyFlag = true
  score = 0
  canvas = null
  maxWidth = 0
  maxheight = 0
  head = null

  //赋值
  canvas = document.querySelector('#canvas') // 获取canvas画布
  maxWidth = window.innerWidth - 40 // 最大宽度
  maxheight = window.innerHeight - 240 //最大高度
  //设置画布画笔
  canvas.width = maxWidth
  canvas.height = maxheight
  if (canvas.getContext) {
    ctx = canvas.getContext('2d')
  }
  ctx.clearRect(0, 0, maxWidth, maxheight)
  //初始化蛇
  head = new Rect(80, 80, block, 'red')
  snake = new Snake(head, [], 0)

  //初始化食物
  food = new Food();
  food.createFood()

  //初始化场景
  snake.sDrow()
  food.fDraw()

  //监听事件
  Util.eventListenerPE(snake)
  Util.eventListenerPC()

  //动画
  timeId = Util.animation(snake)

}

init()