class Block {
  constructor(type, arr, x, y, direction) {
    this.type = type
    this.arr = arr
    this.x = x
    this.y = y
    this.direction = direction
  }
  init() {
    this.getType()
    this.getArr()
    this.getDirection()
    this.getXY()
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
            [1, 0, 0, 0],
            [1, 0, 0, 0],
            [1, 0, 0, 0],
            [1, 0, 0, 0],
          ],
          [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
          ]
        ]
        break
      case 'O':
        this.arr = [
          [
            [1, 1],
            [1, 1]
          ],
        ]
        break
      case 'S':
        this.arr = [
          [
            [0, 1, 1],
            [1, 1, 0]
          ],
          [
            [1, 0],
            [1, 1],
            [0, 1]
          ]
        ]
        break
      case 'Z':
        this.arr = [
          [
            [1, 1, 0],
            [0, 1, 1]
          ],
          [
            [0, 1],
            [1, 1],
            [1, 0]
          ],
        ]
        break
      case 'L':
        this.arr = [
          [
            [1, 0],
            [1, 0],
            [1, 1],
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
        map[i + this.y][j + this.x] = item[i][j]
      }
    }
  }

  //move
  move() {
    this.y--
  }
}