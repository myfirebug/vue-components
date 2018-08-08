<template>
  <daq-popUp :show="show" @hide="cancel" class="daq-cityPicker">
    <div class="datePicker-hd">
      <span class="cancel" @click="cancel">取消</span>
      <span class="confirm" @click='confirm'>确定</span>
    </div>
    <div class="datePicker-bd">

      <div class="daq-datePicker" :class="value.provinceTouch ? '' : 'daq-banslide'" ref="province">
        <div class="daq-datePicker-list">
          <div class="daq-datePicker-item" v-for="(item, index) in province" :key="index" :data-region="item.region">{{item.name}}</div>
        </div>
      </div>
      <div class="daq-datePicker" ref="city" :class="value.cityTouch ? '' : 'daq-banslide'">
        <div class="daq-datePicker-list">
          <div class="daq-datePicker-item" v-for="(item, index) in city" :key="index" :data-region="item.region">{{item.name}}</div>
        </div>
      </div>
      <div class="daq-datePicker" ref="area" :class="value.areaTouch ? '' : 'daq-banslide'">
        <div class="daq-datePicker-list">
          <div class="daq-datePicker-item" v-for="(item, index) in area" :key="index" :data-region="item.region">{{item.name}}</div>
        </div>
      </div>
    </div>
  </daq-popUp>
</template>
<script>
import Swiper from '../../util/touch.js'
import $ from 'zepto-webpack'
import cityJson from './city.js'
export default {
  name: 'daq-cityPicker',
  data () {
    return {
      show: false,
      province: cityJson,
      city: [],
      area: [],
      step: 0,
      value: {
        provinceName: '',
        provinceRegin: '',
        provinceTouch: true,
        cityName: '',
        cityRegin: '',
        cityTouch: true,
        areaName: '',
        areaRegin: '',
        areaTouch: true
      },
      provinceIndex: 0,
      cityIndex: 0,
      areaIndex: 0,
      provinceScroll: null,
      cityScroll: null,
      areaScroll: null,
      callback: null,
      timmer: null
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      for (let i = 0; i < this.province.length; i++) {
        if (this.value.provinceRegin === this.province[i].region) {
          this.provinceIndex = i
          this.city = this.province[i].child ? this.province[i].sub : []
        }
      }
      for (let i = 0; i < this.city.length; i++) {
        if (this.value.cityRegin === this.city[i].region) {
          this.cityIndex = i
          this.area = this.city[i].child ? this.city[i].sub : []
        }
      }
      for (let i = 0; i < this.area.length; i++) {
        if (this.value.areaRegin === this.area[i].region) {
          this.areaIndex = i
        }
      }
    },
    cancel () {
      this.show = false
      setTimeout(() => {
        $('.daq-cityPicker').remove()
      }, 500)
    },
    confirm () {
      typeof this.callback === 'function' && this.callback(this.value)
      this.cancel()
    }
  },
  mounted () {
    clearTimeout(this.timmer)
    this.timmer = setTimeout(() => {
      this.step = $('.daq-datePicker-item').height()
      this.step = $('.daq-datePicker-item').eq(0).height()
      let _this = this
      this.provinceScroll = new Swiper(this.$refs.province, {
        autoPlay: false,
        initialSlide: _this.provinceIndex,
        wrapper: '.daq-datePicker-list',
        direction: 'vertical',
        slide: '.daq-datePicker-item',
        isTouch: _this.value.provinceTouch,
        endFn (num, dom) {
          _this.value.provinceName = _this.province[num].name
          _this.value.provinceRegin = _this.province[num].region
          if (_this.provinceIndex !== num) {
            _this.provinceIndex = num
            if (_this.province[num].child) {
              _this.city = _this.province[num].sub
              _this.value.cityName = _this.city[0].name
              _this.value.cityRegin = _this.city[0].region
              _this.cityIndex = 0
              if (_this.city[0].child) {
                _this.area = _this.city[0].sub
                _this.value.areaName = _this.area[0].name
                _this.value.areaRegin = _this.area[0].region
                _this.areaIndex = 0
              } else {
                _this.value.areaName = ''
                _this.value.areaRegin = ''
                _this.area = []
              }
            } else {
              _this.city = []
              _this.area = []
            }
            _this.$nextTick(() => {
              _this.cityScroll.len = _this.city.length
              _this.cityScroll.step = _this.step
              _this.cityScroll.slide = $(_this.$refs.city).find('.daq-datePicker-item')
              _this.cityScroll._initialSlide(0)
            })
          }
        }
      })

      this.cityScroll = new Swiper(this.$refs.city, {
        autoPlay: false,
        initialSlide: _this.cityIndex,
        wrapper: '.daq-datePicker-list',
        direction: 'vertical',
        slide: '.daq-datePicker-item',
        isTouch: _this.value.cityTouch,
        endFn (num, dom) {
          _this.value.cityName = _this.city[num].name
          _this.value.cityRegin = _this.city[num].region
          if (_this.cityIndex !== num) {
            _this.cityIndex = num
            if (_this.city[num].child) {
              _this.area = _this.city[num].sub
              _this.value.areaName = _this.area[0].name
              _this.value.areaRegin = _this.area[0].region
              _this.areaIndex = 0
            } else {
              _this.area = []
            }
            _this.$nextTick(() => {
              _this.areaScroll.len = _this.area.length
              _this.areaScroll.step = _this.step
              _this.areaScroll.slide = $(_this.$refs.area).find('.daq-datePicker-item')
              _this.areaScroll._initialSlide(0)
            })
          }
        }
      })
      this.areaScroll = new Swiper(this.$refs.area, {
        autoPlay: false,
        initialSlide: _this.areaIndex,
        wrapper: '.daq-datePicker-list',
        direction: 'vertical',
        slide: '.daq-datePicker-item',
        isTouch: _this.value.areaTouch,
        endFn (num, dom) {
          _this.value.areaName = _this.area[num].name
          _this.value.areaRegin = _this.area[num].region
        }
      })
    }, 100)
  },
  watch: {
    value () {
      this.init()
    }
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
    position:relative;
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
    color:$fc08;
    @include ellipsis

  }
  .daq-banslide{
    .daq-datePicker-item{
      visibility:hidden;
    }
    .swiper-slide-active{
      visibility:visible;
    }
  }
</style>
