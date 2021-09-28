class Block {
  constructor(type, arr, x, y, direction, timeId) {
    this.type = type
    this.arr = arr
    this.x = x
    this.y = y
    this.direction = direction
    this.timeId = timeId
  }
  init() {
    this.getType()
    this.getArr()
    this.getDirection()
    this.getXY()
    // this.autoMove()
    this.joinToMap()
    drawMap()

  }
  //随机生成type
  getType() {
    let arr = 'OISZLJT'
    let r = Math.floor(Math.random() * 7)
    this.type = arr[r]
  }
  //随机生成direction
  getDirection() {
    this.direction = Math.floor(Math.random() * this.arr.length)
  }
  //随机生成 x 坐标 y=0
  getXY() {
    this.x = Math.floor(Math.random() * (10 - this.arr[this.direction][0].length))
    this.y = 0
  }
  //生成数组arr
  getArr() {
    switch (this.type) {
      case 'I':
        this.arr = [
          [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
          ],
          [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
          ]
        ]
        break
      case 'O':
        this.arr = [
          [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
          ],
        ]
        break
      case 'S':
        this.arr = [
          [
            [0, 0, 0, 0],
            [0, 0, 1, 1],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
          ],
          [
            [0, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 0]
          ]
        ]
        break
      case 'Z':
        this.arr = [
          [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 1, 1],
            [0, 0, 0, 0]
          ],
          [
            [0, 0, 0, 1],
            [0, 0, 1, 1],
            [0, 0, 1, 0],
            [0, 0, 0, 0]
          ],
        ]
        break
      case 'L':
        this.arr = [
          [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
          ],
          [
            [0, 0, 1],
            [1, 1, 1],
          ],
          [
            [1, 1],
            [0, 1],
            [0, 1],
          ],
          [
            [1, 1, 1],
            [1, 0, 0],
          ],
        ]
        break
      case 'J':
        this.arr = [
          [
            [1, 1],
            [1, 0],
            [1, 0],
          ],
          [
            [1, 0, 0],
            [1, 1, 1],
          ],
          [
            [0, 1],
            [0, 1],
            [1, 1],
          ],
          [
            [1, 1, 1],
            [0, 0, 1],
          ],
        ]
        break
      case 'T':
        this.arr = [
          [
            [1, 0],
            [1, 1],
            [1, 0],
          ],
          [
            [0, 1, 0],
            [1, 1, 1],
          ],
          [
            [0, 1],
            [1, 1],
            [0, 1],
          ],
          [
            [1, 1, 1],
            [0, 1, 0],
          ],
        ]
        break
    }
  }
  //将生成的block加入地图
  joinToMap() {
    let item = this.arr[this.direction]
    for (let i = 0; i < item.length; i++) {
      for (let j = 0; j < item[i].length; j++) {
        if (map[i + this.y][j + this.x] === 0) {
          map[i + this.y][j + this.x] = item[i][j]
        }
      }
    }
  }
  //删除当前位置的元素
  removeInMap() {
    let item = this.arr[this.direction]
    for (let i = 0; i < item.length; i++) {
      for (let j = 0; j < item[i].length; j++) {
        if (item[i][j] === 1) {
          map[i + this.y][j + this.x] = 0
        }

      }
    }
  }
  //move
  autoMove() {
    this.timeId = setInterval(() => {



      if (this.y < 20 - this.arr[this.direction].length) {
        this.removeInMap()
        this.y++
        if (this.isEdge()) {
          console.log(true);
          clearInterval(this.timeId)
          block = null
        }
        this.joinToMap()
        drawMap()
      } else {
        clearInterval(this.timeId)
        block = null
      }
    }, 100)
  }

  //keyMove
  keyMove(key) {
    this.removeInMap()
    switch (key) {
      case 'ArrowUp':
        this.y--
        break;
      case 'ArrowDown':
        this.y++
        break;
      case 'ArrowLeft':
        this.x--
        break;
      case 'ArrowRight':
        this.x++
        break;
    }
    if (this.x > 10 - this.arr[this.direction][0].length) {
      this.x = 10 - this.arr[this.direction][0].length
    }
    if (this.x < 0) {
      this.x = 0
    }
    if (this.y > 20 - this.arr[this.direction].length) {
      this.y = 20 - this.arr[this.direction].length
      block = null
    }
    if (this.y < 0) {
      this.y = 0
    }
    this.joinToMap()
    drawMap()
  }

  //碰撞检测
  isEdge() {


    // let item = this.arr[this.direction][this.arr[this.direction].length - 1]
    // for (let i = 0; i < row.length; i++) {
    //   if (row[i] === 1) {
    //     if (this.y + this.arr[this.direction].length < 20) {
    //       console.log(this.y + this.arr[this.direction].length);
    //       if (map[this.y + this.arr[this.direction].length][this.x + i] === 1) {
    //         return true
    //       } else {
    //         return false
    //       }
    //     }

    //   }
    // }
  }
}