/*
 * @Author: UEDHE
 * @Date:   2017-10-09 15:40:21
 * @Last Modified by:   UEDHE
 * @Last Modified time: 2018-07-27 16:24:58
 */
import snow from '../../../assets/image/snow.png'
import rain from '../../../assets/image/rain.png'

window.requestAnimFrame = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 30)
  }
let can
let ctx
let w
let h
let num
let pic = new Image()
let arr = []
let lastTime
let weatherType
let deltaTime

function Weather (config) {
  if (typeof config.id !== 'string') {
    alert('必须传入ID')
  }
  num = config.num ? config.num : 100
  this.id = config.id ? config.id : ''
  weatherType = config.weatherType ? config.weatherType : 'rain'
  this.fullScreen = config.fullScreen ? config.fullScreen : true
  this.speed = config.speed ? config.speed : [0, 1]

  this.init()
}
Weather.prototype = {
  init: function () {
    can = document.getElementById(this.id)
    if (!can || !can.getContext) {
      return
    }
    // 判断是否是全屏
    if (this.fullScreen) {
      can.width = document.documentElement.clientWidth
      can.height = document.documentElement.clientHeight
    }
    ctx = can.getContext('2d')
    w = can.width
    h = can.height

    pic.src = weatherType === 'snow' ? snow : rain
    lastTime = Date.now()
    for (var i = 0; i < num; i++) {
      var obj = new Drop()
      arr.push(obj)
      arr[i].init()
    }
    gameLoop()
  }
}

// 循环
function gameLoop () {
  ctx.clearRect(0, 0, w, h)
  var now = Date.now()
  deltaTime = now - lastTime
  lastTime = now
  draw()
  requestAnimFrame(gameLoop)
}
// 绘制
function draw () {
  for (var i = 0; i < num; i++) {
    arr[i].update()
    arr[i].draw()
  }
}

var Vector = function (x, y) {
  // 私有属性  横向速度x ,纵向速度y
  this.x = x || 0
  this.y = y || 0
}
// 公有方法- add : 速度改变函数,根据参数对速度进行增加
// 由于业务需求，考虑的都是下落加速的情况，故没有减速的，后期可拓展
/*
 * @param v  object || string
 */
Vector.prototype.add = function (v) {
  if (v.x != null && v.y != null) {
    this.x += v.x
    this.y += v.y
  } else {
    this.x += v
    this.y += v
  }
  return this
}
// 公有方法- copy : 复制一个vector，来用作保存之前速度节点的记录
Vector.prototype.copy = function () {
  // 返回一个同等速度属性的Vector实例
  return new Vector(this.x, this.y)
}

function Drop () {
  /* this.x
  this.y
  this.xSpd
  this.ySpd */
}
Drop.prototype = {
  init: function () {
    switch (weatherType) {
      case 'rain':
        this.xSpd = 0
        this.ySpd = 1
        this.x = Math.random() * w
        this.y = -(Math.random() * h + 100)
        break
      case 'snow':
        this.x = Math.random() * w - 500
        this.y = -(Math.random() * h + 100)
        this.xSpd = Math.random() * 0.3
        this.ySpd = Math.random() * 0.5
        this.distance = Math.floor(Math.random() * 10) * 50
        break
    }
  },
  draw: function () {
    ctx.save()
    switch (weatherType) {
      case 'rain':
        this.xSpd = 0
        this.ySpd = 3
        ctx.drawImage(pic, 0, 0, 50, 50, this.x, this.y, 50, 50)
        break
      case 'snow':
        ctx.drawImage(pic, this.distance, 0, 50, 50, this.x, this.y, 50, 50)
        break
    }
    ctx.restore()
  },
  update: function () {
    this.x += this.xSpd * deltaTime
    this.y += this.ySpd * deltaTime * 0.3
    if (this.x <= -1447 || this.x >= w) {
      this.init()
      return false
    }
    if (this.y <= -100 || this.y >= h) {
      this.init()
      return false
    }
  }
}

export default Weather
