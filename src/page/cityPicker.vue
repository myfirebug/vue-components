<template>
  <div class="home">
    <!--头部start-->
    <daq-header>
      <div class="btn-back" slot="left" @click="returnPrev">
        <span class="ued-mobile">&#xe6b2;</span>返回
      </div>
      <span slot="title">地址联动</span>
    </daq-header>
    <daq-cells title="日历组件">
      <li style="padding:.2rem .3rem">
        <daq-button @change="showCityPicker">请选择</daq-button>
      </li>
    </daq-cells>
    <daq-ewm></daq-ewm>
  </div>
</template>
<script>
import CityPicker from '../components/cityPicker'
import Toast from '../components/toast'
export default {
  data () {
    return {
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
      }
    }
  },
  methods: {
    returnPrev () {
      this.$router.go(-1)
    },
    showCityPicker () {
      let _this = this
      CityPicker({
        show: true,
        value: _this.value,
        callback (d) {
          _this.value = d
          let str = d.provinceName
          str += d.cityRegin ? '-' + d.cityName : ''
          str += d.cityRegin ? '-' + d.areaName : ''

          Toast({
            message: str
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .daq-button{
    margin:.1rem 0;
  }
</style>
