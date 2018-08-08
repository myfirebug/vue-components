<template>
  <div class="home">
    <!--头部start-->
    <daq-header>
      <div class="btn-back" slot="left" @click="returnPrev">
        <span class="ued-mobile">&#xe6b2;</span>返回
      </div>
      <span slot="title">价格滑动</span>
    </daq-header>
    <daq-cells title="价格range">
      <li style="padding:2rem .7rem .5rem .7rem">
        <daq-price-range :graduate="graduate" :min="min" :max="max" :defaultMinValue="defaultMinValue" :defaultMaxValue="defaultMaxValue" :step="step" @changeValue ="changeValueHandle"></daq-price-range>
      </li>
    </daq-cells>
    <daq-ewm></daq-ewm>
  </div>
</template>
<script>
export default {
  data () {
    return {
      graduate: [0, 100, 200, 300, 400, 500, '不限'],
      min: 0,
      max: 600,
      defaultMinValue: 1,
      defaultMaxValue: 2,
      step: 100
    }
  },
  methods: {
    returnPrev () {
      this.$router.go(-1)
    },
    changeValueHandle (min, max) {
      this.defaultMinValue = min
      this.defaultMaxValue = max
    }
  }
}
</script>

<style lang="scss"></style>
