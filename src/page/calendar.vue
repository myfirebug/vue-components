<template>
  <div class="home">
    <!--头部start-->
    <daq-header>
      <div class="btn-back" slot="left" @click="returnPrev">
        <span class="ued-mobile">&#xe6b2;</span>返回
      </div>
      <span slot="title">日历</span>
    </daq-header>
    <daq-cells title="日历组件">
      <li style="padding:.2rem .3rem">
        <daq-calendar :show="show" :number="number" :start="start" :end="end" @cancel="cancelHandler" @confirm="confirmHandler"></daq-calendar>
        <daq-button @change="showHandle">选择日期</daq-button>
      </li>
    </daq-cells>
    <!--头部end-->
    <daq-ewm></daq-ewm>
  </div>
</template>
<script>
import Toast from '../components/toast'
import Dates from '../util/date.js'
export default {
  data () {
    return {
      show: false,
      number: 6,
      start: Dates.getYear() + '-' + Dates.getMonth() + '-' + Dates.getDay(),
      end: Dates.getNextDate(this.start)
    }
  },
  methods: {
    returnPrev () {
      this.$router.go(-1)
    },
    showHandle () {
      this.show = true
    },
    cancelHandler () {
      this.show = false
    },
    confirmHandler (start, end) {
      Toast({
        message: '开始日期：' + start + '结束日期：' + end
      })
      this.start = start
      this.end = end
    }
  }
}
</script>

<style lang="scss"></style>
