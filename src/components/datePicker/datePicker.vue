<template>
  <daq-popUp :show="show" dir="bottom" @hide="cancel">
    <div class="datePicker-hd">
      <span class="cancel" @click="cancel">取消</span>
      <span class="confirm" @click="confirm">确定</span>
    </div>
    <div class="datePicker-bd">
      <div class="daq-datePicker" v-if="years.length" ref="year">
        <div class="daq-datePicker-list">
          <div class="daq-datePicker-item" v-for="y in years" :key="y" :data-value="y">{{y}}年</div>
        </div>
      </div>
      <div class="daq-datePicker" v-if="mouths.length" ref="mouth">
        <div class="daq-datePicker-list">
          <div class="daq-datePicker-item" v-for="m in mouths" :key="m" :data-value="m">{{m}}月</div>
        </div>
      </div>
      <div class="daq-datePicker" v-if="days.length" ref="day">
        <div class="daq-datePicker-list">
          <div class="daq-datePicker-item" v-for="d in days" :key="d" :data-value="d">{{d}}日</div>
        </div>
      </div>
    </div>
  </daq-popUp>
</template>
<script>
import Swiper from '../../util/touch.js'
import Toast from '../toast'
import $ from 'zepto-webpack'
export default {
  name: 'daq-datePicker',
  props: {
    date: {
      type: String
    },
    min: String,
    max: String
  },
  data () {
    return {
      show: false,
      today: new Date(),
      value: '',
      years: [],
      mouths: [],
      days: [],
      year: '',
      mouth: '',
      day: '',
      indexY: 0,
      indexM: 0,
      indexD: 0,
      callback: null
    }
  },
  methods: {
    cancel () {
      this.show = false
    },
    confirm () {
      this.value = this.year + (this.mouth ? '-' + this.mouth : '') + (this.day ? '-' + this.day : '')
      typeof this.callback === 'function' && this.callback(this.value)
      this.cancel()
    },
    init () {
      // this.show = false
      // 判断默认值
      if (!this.setDefaultValue()) {
        this.cancel()
        return false
      }
      let minArr = String(this.min).split('-')
      let maxArr = String(this.max).split('-')
      let valueArr = String(this.value).split('-')
      // 判断最小值
      if (!this.judgeDate(minArr, '必填最小日期或格式错误')) {
        this.cancel()
        return false
      }
      // 判断最大值
      if (!this.judgeDate(maxArr, '必填最大日期或格式错误')) {
        this.cancel()
        return false
      }
      // 判断最小值是否大于最大值
      if (parseInt(maxArr.join('')) - parseInt(minArr.join('')) <= 0) {
        Toast({
          type: 'html',
          duration: 2000,
          message: '最小日期大于最大日期'
        })
        this.cancel()
        return false
      }
      // 判断默认值是否小于最小值，大于最大值
      if (parseInt(maxArr.join('')) < parseInt(valueArr.join('')) || parseInt(minArr.join('')) > parseInt(valueArr.join(''))) {
        Toast({
          type: 'html',
          duration: 2000,
          message: '默认日期大于最大日期或者小于最小日期'
        })
        this.cancel()
        return false
      }
      // 判断日期类型
      switch (this.date) {
        case 'date':
          // 获取年数据
          this.getYearsList()
          // 获取月数据
          this.getMouthsList()
          // 获取日
          this.getDaysList()
          break
        case 'year':
          // 获取年数据
          this.getYearsList()
          break
        case 'month':
          // 获取年数据
          this.getYearsList()
          // 获取月数据
          this.getMouthsList()
          break
      }
      // this.show = true
    },
    // 设置默认值
    setDefaultValue () {
      let valueArr = this.value.split('-')
      if (this.date === 'date') {
        if (!this.value) {
          this.value = this.today.getFullYear() + '-' + this.formatNumber(this.today.getMonth() + 1) + '-' + this.formatNumber(this.today.getDate())
          this.year = this.value.split('-')[0]
          this.mouth = this.value.split('-')[1]
          this.day = this.value.split('-')[2]
          return true
        } else if (!this.judgeDate(valueArr, '默认日期有错')) {
          this.cancel()
          return false
        } else if (valueArr.length === 3) {
          this.year = valueArr[0]
          this.mouth = valueArr[1]
          this.day = valueArr[2]
          return true
        }
      } else if (this.date === 'year') {
        if (!this.value) {
          this.value = this.today.getFullYear()
          this.year = this.value
          return true
        } else if (!this.judgeDate(valueArr, '默认日期有错')) {
          this.cancel()
          return false
        } else if (valueArr.length === 1 && valueArr[0].length === 4) {
          this.year = valueArr[0]
          return true
        }
      } else if (this.date === 'month') {
        if (!this.value) {
          this.value = this.today.getFullYear() + '-' + this.formatNumber(this.today.getMonth() + 1)
          this.year = this.value.split('-')[0]
          this.mouth = this.value.split('-')[1]
          return true
        } else if (!this.judgeDate(valueArr, '默认日期有错')) {
          this.cancel()
          return false
        } else if (valueArr.length === 2) {
          this.year = valueArr[0]
          this.mouth = valueArr[1]
          return true
        }
      }
    },
    // 获取年列表
    getYearsList () {
      let minArr = this.min.split('-')
      let maxArr = this.max.split('-')
      this.years = this.initYears(maxArr[0], minArr[0])
      this.indexY = this.getIndex(this.years, this.year) > 0 ? this.getIndex(this.years, this.year) : 0
    },
    // 获取月列表
    getMouthsList () {
      let minArr = this.min.split('-')
      let maxArr = this.max.split('-')
      if (minArr[0] === this.year && maxArr[0] === this.year) {
        let m = []
        for (let i = parseInt(minArr[1]); i <= parseInt(maxArr[1]); i++) {
          m.push(this.formatNumber(i))
        }
        this.mouths = m
      } else if (minArr[0] === this.year && maxArr[0] > this.year) {
        let m = []
        for (let i = parseInt(minArr[1]); i <= 12; i++) {
          m.push(this.formatNumber(i))
        }
        this.mouths = m
      } else if (maxArr[0] === this.year) {
        let m = []
        for (let i = 1; i <= parseInt(maxArr[1]); i++) {
          m.push(this.formatNumber(i))
        }
        this.mouths = m
      } else {
        this.mouths = ('01 02 03 04 05 06 07 08 09 10 11 12').split(' ')
      }
      this.indexM = this.getIndex(this.mouths, this.mouth) > 0 ? this.getIndex(this.mouths, this.mouth) : 0
    },
    // 获取天列表
    getDaysList () {
      let minArr = this.min.split('-')
      let maxArr = this.max.split('-')
      if (minArr[0] === this.year && parseInt(minArr[1]) === parseInt(this.mouth)) {
        let d = []
        for (let i = parseInt(minArr[2]); i <= this.getDaysByMonthAndYear(minArr[0], minArr[1]); i++) {
          d.push(this.formatNumber(i))
        }
        this.days = d
      } else if (maxArr[0] === this.year && parseInt(maxArr[1]) === parseInt(this.mouth)) {
        let d = []
        for (let i = 1; i <= parseInt(maxArr[2]); i++) {
          d.push(this.formatNumber(i))
        }
        this.days = d
      } else if (minArr[0] === maxArr[0] && parseInt(minArr[1]) === parseInt(maxArr[1])) {
        let d = []
        for (let i = parseInt(minArr[2]); i <= parseInt(maxArr[2]); i++) {
          d.push(this.formatNumber(i))
        }
        this.days = d
      } else {
        this.days = this.getDays(this.getDaysByMonthAndYear(this.year, this.mouth))
      }
      this.indexD = this.getIndex(this.days, this.day) > 0 ? this.getIndex(this.days, this.day) : 0
    },
    // 判断date
    judgeDate (arr, text) {
      if (this.date === 'date') {
        if (arr.length !== 3 ||
          arr[0].length !== 4 ||
          arr[1].length !== 2 ||
          (parseInt(arr[1]) < 0 || parseInt(arr[1]) > 12) ||
          arr[2].length !== 2 ||
          (parseInt(arr[2]) < 0 || parseInt(arr[2]) > this.getDaysByMonthAndYear(arr[0], arr[1]))) {
          Toast({
            type: 'html',
            duration: 2000,
            message: text
          })
          return false
        } else {
          return true
        }
      } else if (this.date === 'year') {
        if (arr.length !== 1 || arr[0].length !== 4) {
          Toast({
            type: 'html',
            duration: 2000,
            message: text
          })
          return false
        }
        return true
      } else if (this.date === 'month') {
        if (arr.length !== 2 ||
          arr[0].length !== 4 ||
          arr[1].length !== 2 ||
          (parseInt(arr[1]) < 0 || parseInt(arr[1]) > 12)) {
          Toast({
            type: 'html',
            duration: 2000,
            message: text
          })
          return false
        } else {
          return true
        }
      }
    },
    // 格式化数字
    formatNumber (number) {
      return number < 10 ? '0' + number : number
    },
    // 获取年
    initYears (max, min) {
      let arr = []
      for (let i = (min || 1950); i <= (max || 2030); i++) {
        arr.push(i)
      }
      return arr
    },
    // 获取天
    getDays (max) {
      let days = []
      for (let i = 1; i <= (max || 31); i++) {
        days.push(this.formatNumber(i))
      }
      return days
    },
    // 根据年月获取天数
    getDaysByMonthAndYear (year, month) {
      let d = new Date(year, parseInt(month), 0)
      return d.getDate()
    },
    // 获取下标
    getIndex (arr, value) {
      for (let i = 0; i < arr.length; i++) {
        if (parseInt(arr[i]) === parseInt(value)) {
          return i
        }
      }
      return -1
    }
  },
  mounted () {
    const _this = this
    this.$nextTick(() => {
      this.init()
      this.$nextTick(() => {
        // 年swiper
        if (_this.years.length) {
          /* eslint-disable no-new */
          _this.yearScroll = new Swiper(_this.$refs.year, {
            autoPlay: false,
            initialSlide: _this.indexY,
            wrapper: '.daq-datePicker-list',
            direction: 'vertical',
            slide: '.daq-datePicker-item',
            endFn (num, dom) {
              _this.year = dom.attr('data-value')
              _this.indexY = num
              if (_this.date === 'date' || _this.date === 'month') {
                _this.getMouthsList()
                _this.$nextTick(() => {
                  _this.mouthScroll.len = _this.mouths.length
                  _this.mouthScroll.slide = $(_this.$refs.mouth).find('.daq-datePicker-item')
                  _this.mouthScroll._initialSlide(_this.getIndex(_this.mouths, _this.mouth) > 0 ? _this.getIndex(_this.mouths, _this.mouth) : 0)
                  _this.mouthScroll.config.endFn(_this.mouthScroll.num, _this.mouthScroll.slide.eq(_this.mouthScroll.num))
                })
              }
            }
          })
        }
        // 月swiper
        if (_this.mouths.length) {
          /* eslint-disable no-new */
          _this.mouthScroll = new Swiper(_this.$refs.mouth, {
            autoPlay: false,
            initialSlide: _this.indexM,
            wrapper: '.daq-datePicker-list',
            direction: 'vertical',
            slide: '.daq-datePicker-item',
            endFn (num, dom) {
              _this.mouth = dom.attr('data-value')
              _this.indexM = num
              if (_this.date === 'date') {
                _this.getDaysList()
                _this.$nextTick(() => {
                  _this.dayScroll.len = _this.days.length
                  _this.dayScroll.slide = $(_this.$refs.day).find('.daq-datePicker-item')
                  _this.dayScroll._initialSlide(_this.getIndex(_this.days, _this.day) > 0 ? _this.getIndex(_this.days, _this.day) : 0)
                  _this.dayScroll.config.endFn(_this.dayScroll.num, _this.dayScroll.slide.eq(_this.dayScroll.num))
                })
              }
            }
          })
        }
        // 天swiper
        if (_this.days.length) {
          /* eslint-disable no-new */
          _this.dayScroll = new Swiper(_this.$refs.day, {
            autoPlay: false,
            initialSlide: _this.indexD,
            wrapper: '.daq-datePicker-list',
            direction: 'vertical',
            slide: '.daq-datePicker-item',
            endFn (num, dom) {
              _this.indexD = num
              _this.day = dom.attr('data-value')
            }
          })
        }
      })
    })
  }
}
</script>
<style lang="scss" scoped>
  .datePicker-hd{
    display: flex;
    justify-content:space-between;
    height:.88rem;
    line-heihgt:.88rem;
    border-bottom:1px solid $bor05;
    span{
      padding:0 .3rem;
      line-height: .88rem;
      font-size:$f32;
    }
    .confirm{
      color:$fc01
    }
  }
  .datePicker-bd{
    display:flex;
  }
  .daq-datePicker{
    position:relative;
    padding:1.68rem 0 .2rem 0;
    flex:1;
    height: 4.1rem;
    font-size:.3rem;
    text-align: center;
    overflow:hidden;
    &:after{
      content:'';
      position:absolute;
      left:0;
      top:50%;
      z-index:-1;
      margin-top:-.38rem;
      width:100%;
      height:.74rem;
      border-top:1px solid $bor05;
      border-bottom:1px solid $bor05;
    }
  }
  .swiper-slide-active{
    color:$fc06!important
  }
  .daq-datePicker-list{
    position:relative;
    z-index:1;
  }
  .daq-datePicker-item{
    height:.74rem;
    line-height:.74rem;
    color:$fc08
  }
</style>
