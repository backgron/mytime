let bgCanvas = document.querySelector('#bgcanvas')
let meCanvas = document.querySelector('#mecanvas')
let blCanvas = document.querySelector('#blcanvas')
let enCanvas = document.querySelector('#encanvas')
const WIDTH = 480
const HEIGHT = 700
const MAX_WIDTH = window.innerWidth
const MAX_HEIGHT = window.innerHeight


let timeId = []
let raf = []
let enemys = []
let blArr = []
let me = null
let score = 0


function gameInit() {


  timeId = []
  raf = []
  enemys = []
  blArr = []
  me = null
  score = 0


  //startGame
  document.querySelector('#gamestart').onclick = function () {
    console.log('click');
    document.querySelector('#start').style.display = 'none'
    gameInit()
  }

  createBackground()
  createMe()
  createEnemy()
}

//背景图片
function createBackground() {
  bgCanvas.width = MAX_WIDTH
  bgCanvas.height = MAX_HEIGHT
  let ctx = null
  if (bgCanvas.getContext) {
    ctx = bgCanvas.getContext('2d')
  }
  console.log(ctx);
  let image = getImage('images/background.png')
  // let image = new Image(MAX_WIDTH, MAX_HEIGHT)
  // image.src = 'images/background.png'

  // image.onload = function () {
  let bg = new BackgroundCanvas(0, 0, MAX_WIDTH, MAX_HEIGHT, image, 3, ctx)
  bg.draw()

  let bgAnimation = () => {
    ctx.clearRect(0, 0, MAX_WIDTH, MAX_HEIGHT)
    ctx.save()
    bg.move()
    bg.draw()
    ctx.restore()
  }
  timeId.push(setInterval(bgAnimation, 20))
  bgAnimation()
}

//}

//主角飞机
function createMe() {
  meCanvas.width = MAX_WIDTH
  meCanvas.height = MAX_HEIGHT
  let ctx = null
  if (meCanvas.getContext) {
    ctx = meCanvas.getContext('2d')
  }
  let width = meCanvas.width
  let height = meCanvas.height
  let image1 = new Image(width, height)
  image1.src = 'images/me1.png'

  image1.onload = function () {
    let image2 = new Image(width, height)
    image2.src = 'images/me2.png'
    image2.onload = function () {
      me = new MeCanvas(MAX_HEIGHT / 2 - width / 2, height - 126 - 20, 102, 126, [image1, image2], 3)
      timeId.push(setInterval(function () {
        me.draw(ctx)
      }, 7))
      me.moveByKey()
      me.moveByClick()
      me.moveByTouch()
      timeId.push(setInterval(() => {

        if (me.left) me.x -= 3
        if (me.right) me.x += 3
        if (me.up) me.y -= 3
        if (me.down) me.y += 3
        if (me.x <= 0) {
          me.x = 0
        }
        if (me.x >= width - 102) {
          me.x = width - 102
        }
        if (me.y <= 0) {
          me.y = 0
        }
        if (me.y >= height - 126) {
          me.y = height - 126
        }
      }, 5))
      //创建子弹
      createBullet(me)
    }
  }


}
//创建子弹
function createBullet(me) {
  blCanvas.width = MAX_WIDTH
  blCanvas.height = MAX_HEIGHT
  let ctx = null
  if (blCanvas.getContext) {
    ctx = blCanvas.getContext('2d')
  }
  let image = new Image()
  image.src = 'images/bullet2.png'
  image.onload = function () {


    timeId.push(setInterval(function () {
      blArr.push(new BulletCanvas(me.x + 50, me.y - 11, image))
    }, 100))

    timeId.push(setInterval(function () {
      ctx.clearRect(0, 0, MAX_WIDTH, MAX_HEIGHT)
      for (let i = 0; i < blArr.length; i++) {
        if (blArr[i].y < 0) {
          blArr.splice(i, 1)
        }
        if (blArr[i]) {
          blArr[i].move(ctx)
          blArr[i].draw(ctx)
        }
        for (let j = 0; j < enemys.length; j++) {
          if (enemys[j] && blArr[i]) {
            if (rectIsHit(enemys[j], blArr[i])) {
              if (enemys[j].hp === 0) {
                enemys[j].die(enemys, j)
              } else {
                enemys[j].hp--
              }
              blArr.splice(i, 1)
              score++
            }
          }
        }
      }
    }, 20))

  }
}

//创建敌机
function createEnemy() {
  enCanvas.width = MAX_WIDTH
  enCanvas.height = MAX_HEIGHT
  let ctx = null
  if (enCanvas.getContext) {
    ctx = enCanvas.getContext('2d')
  }
  //添加敌机的定时器
  timeId.push(setInterval(function () {
    let type = Math.floor(Math.random() * 10)
    let x = Math.floor(Math.random() * MAX_WIDTH)
    switch (type) {
      case 0:
        enemys.push(new Enemy(x, -260, 169, 258, getImage('images/enemy3.png'), 1, 9, 3, ctx));
        break;
      case 1:
      case 2:
      case 3:
        enemys.push(new Enemy(x, -100, 69, 99, getImage('images/enemy2.png'), 3, 3, 2, ctx));
        break;
      default:
        enemys.push(new Enemy(x, -50, 57, 43, getImage('images/enemy1.png'), 5, 1, 1, ctx))
    }
  }, 500))
  //画敌机的定时器
  timeId.push(setInterval(function () {
    ctx.clearRect(0, 0, MAX_WIDTH, MAX_HEIGHT)
    for (let i = 0; i < enemys.length; i++) {
      if (enemys[i]) {
        enemys[i].draw(ctx)
      }
    }
  }, 20))
  //移动敌机的定时器
  let ref = null

  function toMove() {
    for (let i = 0; i < enemys.length; i++) {
      if (enemys[i]) {
        enemys[i].move()
      }
      if (enemys[i].y > MAX_HEIGHT) {
        enemys.splice(i, 1)
      }
      if (rectIsHit(enemys[i], me)) {
        for (let j = 0; j < timeId.length; j++) {
          clearInterval(timeId[j])
        }
        gameEnd()
        return false

      }
    }
    if (ref) {
      window.cancelAnimationFrame(ref)
    }

    ref = window.requestAnimationFrame(toMove)
  }
  toMove()
}

//碰撞检测
function rectIsHit(obj1, obj2) {
  let minX = Math.max(obj1.x, obj2.x)
  let minY = Math.max(obj1.y, obj2.y)
  let maxX = Math.min(obj1.x + obj1.width, obj2.x + obj2.width)
  let maxY = Math.min(obj1.y + obj1.height, obj2.y + obj2.height)

  if (minX < maxX && minY < maxY) {
    return true
  } else {
    return false
  }
}

//创建Image对象
function getImage(src) {
  let image = new Image()
  image.src = src
  return image
}

gameInit()

function gameEnd() {
  document.querySelector('#gamestart').innerHTML = `得分为：${score},点击重新开始`
  document.querySelector('#start').style.display = 'block'
}