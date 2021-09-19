let container = document.querySelector('#container')
let conWidth = parseInt(getComputedStyle(container).width)
let middle = document.querySelectorAll('.middle')[0]
let middleLeft = middle.offsetLeft

let stars = []

//响应式
window.onresize = function () {
  middleLeft = middle.offsetLeft
}

//点击创建小球
container.addEventListener('click', function (e) {
  console.log('点击');
  let star = createStar(e.pageX, e.pageY)
})

//创建小球
function createStar(x, y) {
  console.log('创建');
  let star = document.createElement('div')
  let time = parseInt(((conWidth - x) / conWidth) * 1000) //定时器速度和transition延迟速度
  star.className = 'star'
  star.style.left = x + 'px'
  star.style.top = y + 'px'
  star.style.transitionDuration = `${time}ms`
  star.touch = 0
  let rgba = `rgba(${parseInt(Math.random() * 255)},${parseInt(Math.random() * 255)},${parseInt(Math.random() * 255)})`
  star.style.backgroundColor = rgba
  container.appendChild(star)

  stars.push(star)

  let timeTr = setTimeout(() => {
    star.style.left = 'calc(100% - 10px)'
    clearTimeout(timeTr)
  }, 0)
  let timeLtr = setTimeout(() => {
    star.className = 'star ltr'
    clearTimeout(timeLtr)
  }, time)

  return star
}

//监听小球位置
setInterval(() => {
  for (let i = 0; i < stars.length; i++) {
    if (middleLeft - 10 <= stars[i].offsetLeft && stars[i].offsetLeft < middleLeft + 10) {
      middle.style.backgroundColor = stars[i].style.backgroundColor
      stars[i].touch++
      console.log(stars[i].style.backgroundColor, stars[i].touch)
    }
  }
}, 20)