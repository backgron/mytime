let map = []
const app = document.querySelector('#app')
let block = null

function init() {
  //清空地图数据
  clearMap()
  //绘制地图
  drawMap()
  //生成block
  block = createBlock()
  drawMap()
}

//绘制地图
function drawMap() {
  app.innerHTML = ''
  for (let i = 0; i < map.length; i++) {
    let col = document.createElement('div')
    col.className = 'row'
    app.appendChild(col)
    for (let j = 0; j < map[i].length; j++) {
      let item = document.createElement('div')
      if (map[i][j] === 0) {
        item.className = 'item1'
      } else {
        item.className = 'item2'
      }

      col.appendChild(item)
    }
  }
}

//清空地图数据
function clearMap() {
  map = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]
}

//生成block并加入地图
function createBlock() {
  let block = new Block()
  block.init()
  block.joinToMap()
  return block
}

init()