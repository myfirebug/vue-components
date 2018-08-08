<template>
  <div class="daq-range">
    <div class="daq-range-wrap" ref = "rangeWrap" @touchend="changeValue">
      <div class="daq-range-graduate">
        <span class="text" v-for="(item, index) in graduate" :key="item" :style="'left:' + 1 / (graduate.length - 1) * index * 100 + '%'">{{item}}</span>
      </div>
      <div class="daq-range-hand hand-left ued-mobile" id = "hand-left" :style="handLeftStyle" @touchstart = "touchstart" @touchend = "touchend" @touchmove = "touchmove"></div>
      <div class="daq-range-hand hand-right ued-mobile" id = "hand-right" :style="handRightStyle" @touchstart = "touchstart" @touchend = "touchend" @touchmove = "touchmove"></div>
      <div class="daq-range-progress" :style="progressStyle"></div>
    </div>
  </div>
</template>
<script>
import $ from 'zepto-webpack'
export default {
  name: 'daq-price-range',
  props: {
    graduate: {
      type: Array
    },
    min: Number,
    max: Number,
    step: Number,
    defaultMinValue: Number,
    defaultMaxValue: Number
  },
  data () {
    return {
      width: 0,
      flag: false,
      offset: 0,
      stepValue: 0,
      diffMinValue: 0,
      diffMaxValue: 0,
      minValue: this.defaultMinValue,
      maxValue: this.defaultMaxValue
    }
  },
  computed: {
    handLeftStyle () {
      return {
        left: this.diffMinValue + 'px'
      }
    },
    handRightStyle () {
      return {
        left: this.diffMaxValue + 'px'
      }
    },
    progressStyle () {
      return {
        left: this.diffMinValue + 'px',
        width: (this.diffMaxValue - this.diffMinValue) + 'px'
      }
    }
  },
  methods: {
    changeValue () {
      this.$emit('changeValue', this.minValue, this.maxValue)
    },
    touchstart (e) {
      this.flag = true
    },
    touchmove (e) {
      if (this.flag) {
        e.stopPropagation()
        e.preventDefault()
        let ev = e.originalEvent ? e.originalEvent.changedTouches[0] : e.changedTouches[0]
        this.endX = ev.pageX ? ev.pageX : ev.clientX
        let move = this.endX - this.$refs.rangeWrap.offsetLeft
        move = Math.max(0, move)
        move = Math.min(move, this.width)
        // 获取DOM
        let el = e.srcElement || e.target
        if (el.id === 'hand-left') {
          this.minValue = Math.round(move / this.stepValue)
          if (this.minValue > this.maxValue - 1) {
            this.minValue = this.maxValue - 1
          }
          this.diffMinValue = this.minValue * this.stepValue
        } else {
          this.maxValue = Math.round(move / this.stepValue)
          if (this.maxValue < this.minValue + 1) {
            this.maxValue = this.minValue + 1
          }
          this.diffMaxValue = this.maxValue * this.stepValue
        }
      }
    },
    touchend (e) {
      let $item = $(this.$refs.rangeWrap).find('.text')
      $item.removeClass('on')
      for (let i = this.minValue; i <= this.maxValue; i++) {
        $item.eq(i).addClass('on')
      }
      if (this.flag) {
        this.flag = false
      }
    }
  },
  mounted () {
    this.width = $(this.$refs.rangeWrap).width()
    this.stepValue = this.width / (this.max - this.min) * this.step
    this.diffMinValue = this.stepValue * this.minValue
    this.diffMaxValue = this.stepValue * this.maxValue

    let $item = $(this.$refs.rangeWrap).find('.text')
    for (let i = this.minValue; i <= this.maxValue; i++) {
      $item.eq(i).addClass('on')
    }
  }
}
</script>
<style lang="scss" scoped>
  .daq-range{
    &-wrap{
      position:relative;
      height: .08rem;
      width:100%;
      background:$bor07;
      border-radius:.04rem;
    }
    &-hand{
      position:absolute;
      top:50%;
      z-index: 2;
      margin:-.38rem 0 0 -.4rem;
      width:.8rem;
      height:.8rem;
      transition:all .25s linear 0s;
      &:after{
        content: '';
        position:absolute;
        left:50%;
        top:50%;
        margin: -.24rem 0 0 -.24rem;
        width:.48rem;
        height:.48rem;
        border-radius:100%;
        border:.03rem solid $bor01;
        background:$bg04;
        box-sizing:border-box;
      }
    }
    &-progress{
      position:absolute;
      left:0;
      top:0;
      z-index:1;
      height: .08rem;
      background:$bor01;
      border-radius:.04rem;
      transition:all .25s linear 0s;
    }
    &-graduate{
      position:absolute;
      left:0;
      top:-.8rem;
      right:0;
      font-size:$f26;
      display:flex;
      justify-content:space-between;
      span{
        position: absolute;
        width:.6rem;
        text-align:center;
        margin-left:-.3rem;
        color:$fc08;
        &:before{
          content: '';
          position:absolute;
          left:50%;
          margin-left:-.03rem;
          top:.4rem;
          width:.06rem;
          height:.06rem;
          border-radius:50%;
          background:$fc08;
        }
        &.on{
          color:$fc06;
          &:before{
            background:$fc06;
          }
        }
      }
    }
  }
</style>
