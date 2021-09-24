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
  let image = new Image(width, height)
  let s = 1
  setInterval(function () {
    if (s === 1) {
      s = 2
    } else {
      s = 1
    }
    image.src = 'images/me' + s + '.png'
  }, 7)
  image.onload = function () {
    let me = new MeCanvas(0, 0, width, height, image, 3)
    me.draw(ctx)



  }
}

gameInit()