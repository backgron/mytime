let begin = document.querySelector('#begin')
let begin_btn = document.querySelector('#begin_btn')
let begin_span = begin.querySelector('span')
let score = 0
let height = 0
// 添加点击开始初始事件
function beginBtn() {
  //开始点击事件
  begin_btn.addEventListener('click', function () {
    let time = 3
    let main = document.createElement('div')
    main.className = 'main'
    document.body.appendChild(main)
    begin_btn.style.display = 'none'
    begin_span.style.display = 'block'
    begin_span.innerHTML = time--
    //倒数开始
    let timeId = setInterval(function () {
      if (time > 0) {
        begin_span.innerHTML = time--
      } else if (time === 0) {
        begin_span.innerHTML = 'begin'
        time--
      } else {
        begin_span.style.display = 'none'
        begin.style.display = 'none'
        createGame()
        clearInterval(timeId)
      }
    }, 950)
  })
}
beginBtn()

let black
let animationId
// 创建游戏地图
function createGame() {
  let main = document.querySelector('.main')
  let obj_items = []
  for (let i = 0; i < song1.length; i++) {
    black = 0
    let col = document.createElement('div')
    col.setAttribute('black', black)
    col.className = 'col'
    col.innerHTML =
      `
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  `
    let items = col.querySelectorAll('div')

    for (let j = 0; j < 4; j++) {
      if (song1[i][j] === '1') {
        items[j].setAttribute('color', 1)
        col.setAttribute('black', ++black)
        items[j].style.backgroundColor = '#000'
      } else {
        items[j].setAttribute('color', 0)
        items[j].style.backgroundColor = '#fff'
      }
    }
    main.appendChild(col)
    obj_items.push(col)
    clickItem(col)
    loseBlack(col)

  }

  height = -document.body.scrollHeight - document.body.offsetHeight
  main.style.transform = "translateY(" + (height).toString() + "px)"

  function move() {
    console.log('move');
    main.style.transform = "translateY(" + (height += 10) + "px)";
    if (height > 0) {
      gameOver(1)
    }
    animationId = window.requestAnimationFrame(move)
  }
  move()
}


function clickItem(col) {
  col.addEventListener('click', function (e) {
    let item = e.target
    console.log(item.getAttribute('color'));
    if (item.getAttribute('color') === '1') {
      let black = parseInt(col.getAttribute('black'))
      black--
      col.setAttribute('black', black)
      item.style.background = '#787777'
      score++
    } else {
      gameOver(0)
    }
  })
}
let pageHeight = document.body.offsetHeight

function loseBlack(col) {
  let timeId2 = setInterval(function () {
    if (height + col.offsetTop >= pageHeight) { //触底
      if (col.getAttribute('black') > 0) {
        gameOver(0)
      }
      clearInterval(timeId2)
    }
  }, 20)
}

function gameOver(flag) {
  document.body.removeChild(document.querySelector('.main'))
  begin.style.display = 'flex'
  begin_btn.style.display = ''
  if (flag === 0) {
    begin_btn.innerHTML = '游戏失败,得分为:' + score + '（点击重新开始)'
  } else {
    begin_btn.innerHTML = '成功通过得分为:' + score + '（点击重新开始)'
  }
  score = 0
  window.cancelAnimationFrame(animationId)
}