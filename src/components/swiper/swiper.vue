<template>
  <div class="daq-swiper" :style="style" ref="swiperWrap">
    <div class="daq-swiper-wrapper">
      <slot/>
    </div>
    <div class="daq-swiper-pagination"></div>
  </div>
</template>
<script>
import Swiper from '../../util/touch.js'
export default {
  name: 'daq-swiper',
  props: {
    width: [Number, String],
    height: [Number, String],
    loop: Boolean,
    autoPlay: Boolean,
    speed: {
      type: Number,
      default: 3000
    },
    initialSlide: {
      type: Number,
      default: 0
    },
    direction: {
      type: String,
      default: 'horizontal',
      validator: (value) => {
        return ['horizontal', 'vertical'].indexOf(value) !== -1
      }
    }
  },
  computed: {
    style () {
      let dw = ''
      let dh = ''

      if (typeof this.width === 'number') {
        dw = this.width / 100 + 'rem'
      } else {
        dw = this.width
      }

      if (typeof this.height === 'number') {
        dh = this.height / 100 + 'rem'
      } else {
        dh = this.height
      }

      return {
        width: dw,
        height: dh
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      /* eslint-disable no-new */
      this.scroll = new Swiper(this.$refs.swiperWrap, {
        speed: this.speed,
        autoPlay: this.autoPlay,
        direction: this.direction,
        loop: this.loop,
        initialSlide: this.initialSlide,
        pagination: '.daq-swiper-pagination'
      })
    })
  }
}
</script>
<style lang="scss">
  .daq-swiper{
    position: relative;
    width: 100%;
    text-align:center;
    line-height:3rem;
    color:#fff;
    overflow: hidden;
    &-horizontal{
      .daq-swiper-wrapper{
        box-sizing: border-box;
        display: flex;
        min-width: 100%;
        height:100%;
      }
      .daq-swiper-slide{
        flex-shrink: 0;
        width:100%;
        height:100%;
        background:$bor01
      }
      .daq-swiper-pagination{
        position:absolute;
        left:0;
        bottom:.2rem;
        right:0;
        z-index: 10;
        text-align: center;
        font-size:0;
        line-height:1;
        span{
          margin:0 .05rem;
          display:inline-block;
          width:.12rem;
          height:.12rem;
          background:rgba(0,0,0,.2);
          border-radius:.06rem;
          &.swiper-pagination-bullet-active{
            background:#fff;
          }
        }
      }
    }
    &-vertical{
      .daq-swiper-wrapper{
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        min-width: 100%;
        height:100%;
      }
      .daq-swiper-slide{
        flex-shrink: 0;
        width:100%;
        height:100%;
        background:$bor01
      }
      .daq-swiper-pagination{
        display:flex;
        flex-direction:column;
        align-items: center;
        justify-content: center;
        position:absolute;
        top:0;
        bottom:0;
        right:.2rem;
        z-index: 10;
        width:.12rem;
        text-align: center;
        font-size:0;
        line-height:1;
        span{
          margin:.05rem 0;
          display:inline-block;
          width:.12rem;
          height:.12rem;
          background:rgba(0,0,0,.2);
          border-radius:.06rem;
          &.swiper-pagination-bullet-active{
            background:#fff;
          }
        }
      }
    }
  }
</style>
