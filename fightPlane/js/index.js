let bgCanvas = document.querySelector('#bgcanvas')
const WIDTH = 480
const HEIGHT = 700
const MAX_WIDTH = window.innerWidth
const MAX_HEIGHT = window.innerHeight


console.log(MAX_WIDTH, MAX_HEIGHT);
let ctx = null

function gameInit() {
  createBackground()
}

function createBackground() {
  bgCanvas.width = MAX_WIDTH
  bgCanvas.height = MAX_HEIGHT

  if (bgCanvas.getContext) {
    ctx = bgCanvas.getContext('2d')
  }
  let image = new Image(MAX_WIDTH, MAX_HEIGHT)
  image.src = 'images/background.png'
  let bg = new BackgroundCanvas(0, 0, MAX_WIDTH, MAX_HEIGHT, image, 3)
  bg.draw(ctx)
}


gameInit()