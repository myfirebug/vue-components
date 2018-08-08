<template>
  <div class="home">
    <!--头部start-->
    <daq-header>
      <div class="btn-back" slot="left" @click="returnPrev">
        <span class="ued-mobile">&#xe6b2;</span>返回
      </div>
      <span slot="title">日期</span>
    </daq-header>
    <!--头部end-->
    <daq-cells title="水平方向滚动">
      <li style="padding:.3rem">
        <daq-button @change="changeHandle1">年月日日期选择</daq-button>
        <daq-button @change="changeHandle2">年月日期选择</daq-button>
        <daq-button @change="changeHandle3">年日期选择</daq-button>
      </li>
    </daq-cells>
    <daq-ewm></daq-ewm>
  </div>
</template>
<script>
import DatePicker from '../components/datePicker'
import Toast from '../components/toast'
export default {
  data () {
    return {
      date: '2018-01-03'
    }
  },
  methods: {
    returnPrev () {
      this.$router.go(-1)
    },
    changeHandle1 () {
      let _this = this
      /* eslint-disable no-new */
      new DatePicker({
        show: true,
        date: 'date',
        min: '2007-10-01',
        max: '2018-10-30',
        value: this.date,
        callback (value) {
          _this.date = value
          Toast({
            duration: 2000,
            message: '您选择的日期是：' + value
          })
        }
      })
    },
    changeHandle2 () {
      /* eslint-disable no-new */
      new DatePicker({
        show: true,
        date: 'month',
        min: '2007-10',
        max: '2018-10',
        callback (value) {
          Toast({
            duration: 2000,
            message: '您选择的日期是：' + value
          })
        }
      })
    },
    changeHandle3 () {
      /* eslint-disable no-new */
      new DatePicker({
        show: true,
        date: 'year',
        min: '2007',
        max: '2018',
        callback (value) {
          Toast({
            duration: 2000,
            message: '您选择的日期是：' + value
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
