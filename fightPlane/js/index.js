let bgCanvas = document.querySelector('#bgcanvas')
let meCanvas = document.querySelector('#mecanvas')
let blCanvas = document.querySelector('#blcanvas')
const WIDTH = 480
const HEIGHT = 700
const MAX_WIDTH = window.innerWidth
const MAX_HEIGHT = window.innerHeight


let timeId = []

function gameInit() {
  createBackground()
  createMe()
}

//背景图片
function createBackground() {
  bgCanvas.width = MAX_WIDTH
  bgCanvas.height = MAX_HEIGHT
  let ctx = null
  if (bgCanvas.getContext) {
    ctx = bgCanvas.getContext('2d')
  }
  let image = new Image(MAX_WIDTH, MAX_HEIGHT)
  image.src = 'images/background.png'

  image.onload = function () {
    let bg = new BackgroundCanvas(0, 0, MAX_WIDTH, MAX_HEIGHT, image, 3)
    // bg.draw(ctx)

    let bgAnimation = () => {
      ctx.clearRect(0, 0, MAX_WIDTH, MAX_HEIGHT)
      ctx.save()
      bg.move(ctx)
      bg.draw(ctx)
      ctx.restore()
    }
    timeId.push(setInterval(bgAnimation, 20))
    bgAnimation()
  }

}

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
      me = new MeCanvas(MAX_HEIGHT / 2 - width / 2, height - 126 - 20, width, height, [image1, image2], 3)
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


    let blArr = []
    timeId.push(setInterval(function () {
      blArr.push(new BulletCanvas(me.x + 50, me.y - 11, image))
    }, 100))

    timeId.push(setInterval(function () {
      ctx.clearRect(0, 0, MAX_WIDTH, MAX_HEIGHT)
      for (let i = 0; i < blArr.length; i++) {
        if (blArr[i].y < 0) {
          blArr.shift()
        }
        blArr[i].move(ctx)
        blArr[i].draw(ctx)
      }
    }, 20))

  }
}

gameInit()