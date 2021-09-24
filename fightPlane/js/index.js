let bgCanvas = document.querySelector('#bgcanvas')
let meCanvas = document.querySelector('#mecanvas')
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
  let image2 = new Image(width, height)
  image2.src = 'images/me2.png'
  image1.onload = function () {
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
    }
  }


}

gameInit()