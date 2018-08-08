<template>
  <transition name="fade">
    <div class="daq-check-photo" v-show="show" @click="hide">
      <div class="bd">
        <div class="daq-swiper" ref="swiperWrap">
          <div class="daq-swiper-wrapper">
            <div class="daq-swiper-slide" v-for="(item, index) in list" :key="index">
              <img :src="item.value" :alt="item.name">
            </div>
          </div>
        </div>
      </div>
      <div class="ft">{{index}}/{{list && list.length > 0 ? list.length : 0}}</div>
    </div>
  </transition>
</template>
<script>
import Swiper from '../../util/touch.js'
export default {
  name: 'daq-check-photo',
  props: {
    // 是否显示
    show: Boolean,
    // 图片列表
    list: Array,
    // 当前选中第几项
    initialSlide: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      index: this.initialSlide + 1
    }
  },
  methods: {
    hide () {
      this.$emit('hide')
    }
  },
  watch: {
    show () {
      let _this = this
      this.$nextTick(() => {
        /* eslint-disable no-new */
        this.scroll = new Swiper(this.$refs.swiperWrap, {
          initialSlide: this.initialSlide,
          endFn (index) {
            _this.index = index + 1
          }
        })
      })
    },
    initialSlide (value) {
      this.index = value + 1
    }
  }
}
</script>
<style lang="scss">
  .daq-check-photo{
    display:flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    left:0;
    top:0;
    bottom:0;
    right:0;
    z-index: 1000;
    background: #000;
    .bd{
      width: 100%;
    }
    .ft{
      position:fixed;
      left:0;
      right:0;
      bottom:0;
      padding-bottom:.3rem;
      text-align:center;
      font-size:$f30;
      color:$fc10;
    }
  }
  .daq-swiper {
    position: relative;
    width: 100%;
    text-align: center;
    line-height: 3rem;
    color: #fff;
    overflow: hidden;
    &-horizontal {
      .daq-swiper-wrapper {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        min-width: 100%;
        height: 100%;
      }
      .daq-swiper-slide {
        flex-shrink: 0;
        width: 100%;
        height: 100%;
        background: $bor01
      }
      .daq-swiper-pagination {
        position: absolute;
        left: 0;
        bottom: .2rem;
        right: 0;
        z-index: 10;
        text-align: center;
        font-size: 0;
        line-height: 1;
        span {
          margin: 0 .05rem;
          display: inline-block;
          width: .12rem;
          height: .12rem;
          background: rgba(0, 0, 0, .2);
          border-radius: .06rem;
          &.swiper-pagination-bullet-active {
            background: #fff;
          }
        }
      }
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
