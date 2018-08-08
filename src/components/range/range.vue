<template>
  <div class="daq-range">
    <div class="daq-range-wrap" ref = "rangeWrap" @touchend = "changeValue">
      <div class="daq-range-hand" :style="handStyle" :class="activeClass" ref = "rangeHand" @touchstart = "touchstart" @touchend = "touchend" @touchmove = "touchmove"></div>
      <div class="daq-range-progress" :style="progressStyle"></div>
    </div>
  </div>
</template>
<script>
import $ from 'zepto-webpack'
export default {
  name: 'daq-range',
  props: {
    min: Number,
    max: Number,
    step: Number,
    defaultValue: Number
  },
  data () {
    return {
      width: 0,
      flag: false,
      offset: 0,
      stepValue: 0,
      diffValue: 0,
      value: this.defaultValue
    }
  },
  computed: {
    activeClass () {
      return this.diffValue ? 'active' : ''
    },
    handStyle () {
      return {
        left: this.diffValue + 'px'
      }
    },
    progressStyle () {
      return {
        width: this.diffValue + 'px'
      }
    }
  },
  methods: {
    changeValue () {
      this.$emit('changeValue', this.value)
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
        this.value = Math.round(move / this.stepValue)
        this.diffValue = move
      }
    },
    touchend (e) {
      if (this.step) {
        this.diffValue = this.value * this.stepValue
      }
      if (this.flag) {
        this.flag = false
      }
    }
  },
  mounted () {
    this.width = $(this.$refs.rangeWrap).width()
    if (this.step) {
      this.stepValue = this.width / (this.max - this.min) * this.step
      this.diffValue = this.stepValue * this.value
    } else {
      this.stepValue = this.width / (this.max - this.min)
      this.diffValue = this.stepValue * this.value
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
      margin:-.2rem 0 0 -.24rem;
      width:.48rem;
      height:.48rem;
      border-radius:100%;
      border:.03rem solid $bor07;
      background:$bg04;
      &.active{
        border:.03rem solid $bor01;
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
    }
  }
</style>
