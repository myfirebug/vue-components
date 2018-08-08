/*
* @Author: hejianping
* @Date:   2018-06-06 18:00:05
* @Last Modified by:   hejianping
* @Last Modified time: 2018-06-12 17:58:51
*/
// import $ from 'zepto-webpack'

function Slide (ele, config) {
  this.element = ele
  this.config = {
    wrapper: '',
    direction: 'vertical'
  }
  // 配置文件
  this.config = Object.assign({...this.config}, config)
  // 滚动区域
  console.log(this.element.querySelector(this.config.wrapper))
  this.wrapper = this.element.querySelector(this.config.wrapper)
  // 方向
  this.direction = this.config.direction
  // 开始移动的距离
  this.start = 0
  // 保存的偏移
  this.translate = 0
  // 手脂坐标
  this.startFinger = 0
  // 按下的时间
  this.lastTime = 0
  // 最大值
  this.max = 0

  this.init()
}

Slide.prototype = {
  init () {
    // 初始化max值
    if (this.direction === 'horizontal') {
      this.max = this.wrapper.offsetWidth - this.element.offsetWidth
    } else if (this.direction === 'vertical') {
      this.max = this.wrapper.offsetHeight - this.element.offsetHeight
    }
    // 开始滑动
    this.touchstart()
    this.touchmove()
    this.touchend()
  },
  touchstart () {
    let _this = this
    _this.element.addEventListener('touchstart', function (e) {
      let ev = e.originalEvent ? e.originalEvent.changedTouches[0] : e.changedTouches[0]
      // 根据传入的方向设置手脂坐标
      if (_this.direction === 'horizontal') {
        _this.startFinger = ev.pageX ? ev.pageX : ev.clientX
      } else if (_this.direction === 'vertical') {
        _this.startFinger = ev.pageY ? ev.pageY : ev.clientY
      }
      // 清空动画样式
      _this.wrapper.style.transition = ''
      // 设置开始移动的距离
      _this.start = _this.translate
      // 获取时间
      _this.lastTime = new Date()
    })
  },
  touchmove () {
    let _this = this
    _this.element.addEventListener('touchmove', function (e) {
      e.preventDefault()
      let ev = e.originalEvent ? e.originalEvent.changedTouches[0] : e.changedTouches[0]
      // 初始化现在的手指坐标
      let nowFinger = 0
      // 根据传入的方向设置手现在的脂坐标
      if (_this.direction === 'horizontal') {
        nowFinger = ev.pageX ? ev.pageX : ev.clientX
      } else if (_this.direction === 'vertical') {
        nowFinger = ev.pageY ? ev.pageY : ev.clientY
      }
      // 设置移动的距离
      let distance = nowFinger - _this.startFinger
      // 保存偏移量
      _this.translate = distance + _this.start
      // 惯性
      if (_this.translate > 0) {
        _this.translate *= 0.3
      } else if (_this.translate < -_this.max) {
        _this.translate = distance * 0.3 + _this.start
      }
      // 设置移动的距离
      _this.shift(_this.translate)
    })
  },
  touchend () {
    let _this = this
    _this.element.addEventListener('touchend', function (e) {
      let ev = e.originalEvent ? e.originalEvent.changedTouches[0] : e.changedTouches[0]
      // 初始化手指坐标
      let nowFinger = 0
      // 根据传入的方向设置手现在的脂坐标
      if (_this.direction === 'horizontal') {
        nowFinger = ev.pageX ? ev.pageX : ev.clientX
      } else if (_this.direction === 'vertical') {
        nowFinger = ev.pageY ? ev.pageY : ev.clientY
      }
      // 设置移动的距离
      let distance = nowFinger - _this.startFinger
      // 获取时间差
      let timeDis = Date.now() - _this.lastTime
      // 获取速度
      let speed = (distance / timeDis) * 100
      _this.translate += speed
      // 判断边界值
      if (_this.translate > 0) {
        _this.translate = 0
      } else if (_this.translate < -_this.max) {
        _this.translate = -_this.max
      }
      // 设置动画
      _this.wrapper.style.transition = 'all .6s cubic-bezier(0.12, 0.52, 0.58, 0.88) 0s'
      _this.shift(_this.translate)
    })
  },
  shift (value) {
    if (this.direction === 'horizontal') {
      this.wrapper.style.transform = 'translateX(' + value + 'px)'
    } else if (this.direction === 'vertical') {
      this.wrapper.style.transform = 'translateY(' + value + 'px)'
    }
  }
}
export default Slide
