/*
* @Author: UEDHE
* @Date:   2018-05-16 18:54:47
* @Last Modified by:   UEDHE
* @Last Modified time: 2018-06-25 13:35:20
*/
import $ from 'zepto-webpack'

function Swiper (element, config) {
  this.element = element
  this.config = {
    wrapper: '',
    slide: '',
    speed: 3000, // 速度
    autoPlay: false, // 是否自动播放
    initialSlide: 0, // 设定初始化时slide的索引
    direction: 'horizontal', // 可选值（horizontal，vertical）默认：horizontal
    pagination: '',
    startFn: null,
    endFn: null,
    isTouch: true
  }
  // 配置文件
  this.config = Object.assign({...this.config}, config)
  // 外层盒元素
  this.container = $(this.element)
  // 滚动的元素
  this.wrapper = this.config.wrapper ? this.container.find(this.config.wrapper) : this.container.find('.daq-swiper-wrapper')
  // 滚动的内容元素
  this.slide = this.config.slide ? this.wrapper.find(this.config.slide) : this.container.find('.daq-swiper-slide')
  // 点
  this.pagination = this.config.pagination ? this.container.find(this.config.pagination) : ''
  // 滚动方向
  this.direction = this.config.direction
  // 默认滚动到第几页
  this.initialSlide = this.config.initialSlide
  // 判断是横向还是纵向
  if (this.direction === 'horizontal') {
    this.container.addClass('daq-swiper-horizontal')
  } else if (this.direction === 'vertical') {
    this.container.addClass('daq-swiper-vertical')
  }
  // 步长
  this.step = this.direction === 'horizontal' ? this.slide.width() : this.slide.height()
  // 总条数
  this.len = this.slide.length
  // 滚动的距离
  this.translate = 0
  // 变化的距离
  this.translateChange = 0
  // x坐标
  this.startX = 0
  // y坐标
  this.startY = 0
  // 是否可滚动
  this.flag = false
  // timer
  this.timer = null
  // 是否自动滚动
  this.autoplay = this.config.autoPlay ? this.config.autoPlay : false
  // 滚动的下标
  this.num = 0
  // 初始时长
  this.startTime = 0
  // 滚动的方向
  this.dir = 0
  this.init()
}

Swiper.prototype = {
  init () {
    this._touchStart()
    this._touchMove()
    this._touchEnd()
    this._initialSlide()
    this._pagination()
    this._current(this.num)
    this._autoplay()
    this.resize()
  },
  _initialSlide: function (number, slide) {
    let _this = this
    if (!slide) {
      _this.wrapper.css('transition', 'none')
    }
    if (number || number === 0) {
      _this.num = number
      _this.translate = -_this.num * _this.step
      _this._tarnslate(_this.translate)
    } else if (_this.initialSlide) {
      _this.num = _this.initialSlide
      _this.translate = -_this.num * _this.step
      _this._tarnslate(_this.translate)
    }
    this._current(this.num)
  },
  _tarnslate: function (number) {
    // 水平滚动 / 垂直滚动
    if (this.direction === 'horizontal') {
      this.wrapper.css('transform', 'translate3d(' + number + 'px,0,0)')
    } else if (this.direction === 'vertical') {
      this.wrapper.css('transform', 'translate3d(0,' + number + 'px,0)')
    }
  },
  _pagination: function () {
    let _this = this
    if (_this.pagination) {
      if (_this.pagination.children('*').length) {
        return false
      } else {
        let _html = ''
        for (let i = 0; i < _this.len; i++) {
          _html += '<span class="swiper-pagination-bullet"></span>'
        }
        _this.pagination.html(_html)
      }
    }
  },
  _current: function (number) {
    let _this = this
    if (_this.pagination) {
      _this.pagination.find('.swiper-pagination-bullet').removeClass('swiper-pagination-bullet-active').eq(number).addClass('swiper-pagination-bullet-active')
    }
    this.slide.removeClass('swiper-slide-active').eq(number).addClass('swiper-slide-active')
  },
  _autoplay: function () {
    let _this = this
    if (!_this.autoplay) return false
    _this.timer = setInterval(function () {
      _this._interval(_this)
    }, _this.config.speed)
  },
  _interval: function (_this) {
    _this.num++
    if (_this.num >= _this.len) {
      _this.num = 0
    }
    _this.translate = -_this.num * _this.step
    _this._current(_this.num)
    _this._tarnslate(_this.translate)
    _this.wrapper.css('transition', 'all .6s cubic-bezier(0.12, 0.52, 0.58, 0.88) 0s')
  },
  _touchStart () {
    let _this = this
    this.element.addEventListener('touchstart', function (e) {
      let ev = e.originalEvent ? e.originalEvent.changedTouches[0] : e.changedTouches[0]
      clearInterval(_this.timer)
      _this.startX = ev.pageX ? ev.pageX : ev.clientX
      _this.startY = ev.pageY ? ev.pageY : ev.clientY
      // 鼠标按下的时间戳
      _this.startTime = e.timeStamp
      // 方向
      _this.dir = 0
      // 可滚动
      _this.flag = true
      // 滚动的下标
      _this.num = _this.translate / _this.step
      _this._tarnslate(_this.translate)
      _this.translateChange = _this.translate
      _this.wrapper.css('transition', 'none')
      typeof _this.config.startFn === 'function' && _this.config.startFn(_this.num)
    })
  },
  _touchMove () {
    let _this = this
    this.element.addEventListener('touchmove', function (e) {
      let ev = e.originalEvent ? e.originalEvent.changedTouches[0] : e.changedTouches[0]
      let endX = ev.pageX ? ev.pageX : ev.clientX
      let endY = ev.pageY ? ev.pageY : ev.clientY
      if (_this.flag && _this.config.isTouch) {
        e.preventDefault()
        // 水平/垂直滚动
        if (_this.direction === 'horizontal') {
          // 判断滚动的方向
          if (e.timeStamp - _this.startTime < 80 && e.timeStamp - _this.startTime > 30) {
            _this.dir = endX - _this.startX
          }
          _this.translate = endX - _this.startX + _this.translateChange
        } else if (_this.direction === 'vertical') {
          // 判断滚动的方向
          if (e.timeStamp - _this.startTime < 80 && e.timeStamp - _this.startTime > 30) {
            _this.dir = endY - _this.startY
          }
          _this.translate = endY - _this.startY + _this.translateChange
        }
        _this._tarnslate(_this.translate)
      }
    })
  },
  _touchEnd () {
    let _this = this
    this.element.addEventListener('touchend', function (e) {
      _this.flag = false
      if (_this.config.isTouch) {
        // 判断总滑动的距离是否大小0
        if (_this.translate < 0) {
          // 判断是否是快速划过，且滑过的距离小于步长的一半
          if (_this.dir > 0 && Math.abs(_this.dir) < _this.step / 2) {
            _this.num = Math.abs(Math.ceil(_this.translate / _this.step))
          } else if (_this.dir < 0 && Math.abs(_this.dir) < _this.step / 2) {
            _this.num = Math.abs(Math.floor(_this.translate / _this.step))
          } else {
            _this.num = Math.abs(Math.round(_this.translate / _this.step))
          }
        } else {
          _this.num = 0
        }
        if (_this.num < 0) {
          _this.num = 0
          _this.translate = 0
        } else if (_this.num >= _this.len) {
          _this.num = _this.len - 1
          _this.translate = -_this.num * _this.step
        } else {
          _this.translate = -_this.num * _this.step
        }
        _this.wrapper.css('transition', 'all .6s cubic-bezier(0.12, 0.52, 0.58, 0.88) 0s')
        _this._tarnslate(_this.translate)
        _this._current(_this.num)
        _this._autoplay()
        typeof _this.config.endFn === 'function' && _this.config.endFn(_this.num, _this.slide.eq(_this.num))
      }
    })
  },
  resize () {
    let _this = this
    window.addEventListener('resize', function (e) {
      _this.step = _this.direction === 'horizontal' ? _this.slide.width() : _this.slide.height()
      _this.translate = -_this.num * _this.step
      _this._tarnslate(_this.translate)
    })
  }
}

export default Swiper
