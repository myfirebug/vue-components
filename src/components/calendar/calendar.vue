<template>
  <daq-popUp :show="show" class="daq-calendar-wrap" :class="className" dir="bottom" @hide="cancel">
    <div class="daq-calendar">
      <div class="daq-calendar-hd">
        <span class="ued-mobile close" @click="cancel">&#xe656;</span>
        <h2 class="text">选择日期</h2>
      </div>
      <div class="daq-calendar-bd">
       <div class="month-panel" v-for="(item, index) in list" :key = "index">
         <div class="month-panel-title">{{item.title}}</div>
         <div class="month-panel-hd">
           <span v-for="week in item.thead" :key = "week">{{week}}</span>
         </div>
         <ul class="month-panel-bd">
          <li v-for = "(day, index) in item.days" :key = "index" :data-date = "day.date" :class="day.className">
            <span class="month-num">{{day.value}}</span>
            <span class="text">&nbsp;</span>
          </li>
         </ul>
       </div>
      </div>
      <div class="daq-calendar-ft">
        <daq-button type="primary" size="medium" :disabled="disabled" @change="confirm">确定</daq-button>
      </div>
    </div>
  </daq-popUp>
</template>
<script>
import $ from 'zepto-webpack'
import Dates from '../../util/date.js'
export default {
  name: 'daq-calendar',
  props: {
    show: Boolean,
    number: {
      type: Number,
      default: 6
    },
    className: {
      type: String,
      default: 'daq-calendar-wrap'
    },
    systemDate: {
      type: String,
      default: Dates.getYear() + '-' + Dates.getMonth() + '-' + Dates.getDay()
    },
    start: {
      type: String
    },
    end: {
      type: String
    }
  },
  data () {
    return {
      list: [],
      startDate: this.start,
      endDate: this.end,
      checked: 0,
      disabled: false,
      day: 0
    }
  },
  created () {
    $('.daq-calendar .on').removeClass('on')
    this.init()
  },
  methods: {
    init () {
      // 获取系统时间年
      this.year = parseInt(this.systemDate.split('-')[0])
      // 获取系统时间月
      this.month = parseInt(this.systemDate.split('-')[1])
      // 获取系统时间天
      this.days = parseInt(this.systemDate.split('-')[2])
      for (let i = 0; i < this.number; i++) {
        // 获取未来的年
        let year = this.month + i > 12 ? this.year + 1 : this.year
        // 获取未来的月
        let month = this.month + i > 12 ? '01' : this.formatNumber(this.month + i)
        // 获取未来的周
        let week = this.getWeek(year, month)
        // 获取未来时间月份的天数
        let days = this.getDaysByMonthAndYear(year, month)
        // 获取长度
        let len = Math.ceil((days + week) / 7) * 7
        this.list.push({
          year: year,
          month: month,
          title: year + '年' + month + '日',
          thead: ['日', '一', '二', '三', '四', '五', '六'],
          days: []
        })
        for (let j = 0; j < len; j++) {
          if (j < week) {
            this.list[i].days[j] = {
              value: '',
              className: 'disabled',
              date: ''
            }
          } else {
            let className = ''
            let date = ''
            let startDate = this.startDate.split('-').join('')
            let endDate = this.endDate.split('-').join('')
            if ((this.year === parseInt(year) && this.month === parseInt(month) && j - week + 1 < this.days) || j - week >= days) {
              className = 'disabled'
              date = ''
            } else {
              date = this.list[i].year + '-' + this.list[i].month + '-' + this.formatNumber(j - week + 1)
              let d = date.split('-').join('')
              if (parseInt(startDate) < parseInt(d) && parseInt(endDate) > parseInt(d)) {
                className = 'default simple'
              } else if (parseInt(startDate) === parseInt(d)) {
                className = 'default on'
              } else if (parseInt(endDate) === parseInt(d)) {
                className = 'default on'
              } else {
                className = 'default'
              }
            }
            this.list[i].days[j] = {
              value: j - week >= days ? '' : this.formatNumber(j - week + 1),
              className: className,
              date: date
            }
          }
        }
      }
    },
    // 格式化数字
    formatNumber (number) {
      return number < 10 ? '0' + number : number
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
    },
    // 获取星期几
    getWeek (year, month) {
      return new Date(year, month - 1, '01').getDay()
    },
    // 隐藏
    cancel () {
      this.$emit('cancel')
    },
    // 点击确认按钮
    confirm () {
      if (!this.disabled) {
        this.$emit('confirm', this.startDate, this.endDate, this.day)
        this.cancel()
      }
    }
  },
  mounted () {
    let _this = this
    let $on = $('.daq-calendar .on')
    let $default = $('.daq-calendar .default')
    let start = 0

    let index = {
      init () {
        console.log($on)
        // 默认给选中的添加入住，离开信息
        $on.first().find('.text').html('入住')
        $on.last().find('.text').html('离开')
        this.eventBind()
      },
      eventBind () {
        let self = this
        // 点击事件
        $default.each(function (index, item) {
          $(this).click(function () {
            let $this = $(this)
            if (_this.checked === 2 || !_this.checked) {
              self.first($this, index)
            } else if (_this.checked === 1) {
              if (index < start) {
                self.first($this, index)
                return false
              } else {
                for (let i = 0; i < $default.length; i++) {
                  if (i > start && i < index) {
                    $default.eq(i).addClass('simple')
                  }
                }
                _this.day = index - start
                start = index
                $this.addClass('on').find('.text').html('离开')
                _this.checked = 2
                _this.disabled = false
                _this.endDate = $this.attr('data-date')
              }
            }
          })
        })
      },
      first ($dom, i) {
        start = i
        $('.daq-calendar .on').removeClass('on').find('.text').html('&nbsp;')
        $('.daq-calendar .simple').removeClass('simple')
        $dom.addClass('on').find('.text').html('入住')
        start = i
        _this.checked = 1
        _this.disabled = true
        _this.startDate = $dom.attr('data-date')
      }
    }
    index.init()
  }
}
</script>
<style lang="scss">
  .daq-calendar{
    position:relative;
    height:100%;
    padding-bottom:1rem;
    &-wrap{
      .daq-popUp-content{
        height:85%!important;
        padding-top:.8rem;
      }
    }
    &-hd{
      position:absolute;
      left:0;
      top:-.8rem;
      height:.8rem;
      width:100%;
      line-height:.8rem;
      border-bottom:1px solid $bor05;
      background:$bg04;
      .close{
        position: absolute;
        left:0;
        top:0;
        width:.8rem;
        height:.8rem;
        text-align:center;
        line-height:.8rem;
        color:$fc01
      }
      .text{
        text-align:center;
        font-size:$f32;
      }
    }
    &-bd{
      width:100%;
      height:100%;
      overflow:hidden;
      overflow-y: auto;
    }
    &-ft{
      padding:.14rem .3rem;
      border-top:1px solid $bor05;
      background:$bg02;
      .daq-button{
        margin:0;
      }
    }
    .month-panel{
      &-title{
        text-align:center;
        font-size:$f34;
        line-height:1;
        padding-top:.3rem;
      }
      &-hd{
        display:flex;
        font-size:$f32;
        line-height:1;
        padding:.2rem 0;
        border-bottom:1px solid $bor05;
        span{
          flex:1;
          text-align:center;
          &:first-child,
          &:last-child{
            color:$fc08
          }
        }
      }
      &-bd{
        overflow:hidden;
        font-size:0;
        li{
          display:inline-block;
          padding:.25rem 0;
          width:14.286%;
          height:1.1rem;
          text-align:center;
          font-size:$f30;
          line-height:1;
          border-bottom:1px solid $bor07;
        }
        .on{
          color:$fc10;
          background:$bor01;
        }
        .simple{
          color:$fc01;
          background:$btn06;
        }
        .default{
          &:active{
            background:$bg02
          }
        }
        .disabled{
          color:$fc08
        }
        .month-num,
        .text{
          display:block;
        }
        .month-num{
          height:.32rem;
        }
        .text{
          padding-top:.1rem;
          height:.36rem;
          font-size:$f24
        }
      }
    }
  }
</style>
