<template>
  <div class="home">
    <!--头部start-->
    <daq-header>
      <div class="btn-back" slot="left" @click="returnPrev">
        <span class="ued-mobile">&#xe6b2;</span>返回
      </div>
      <span slot="title">滑块</span>
    </daq-header>
    <daq-cells title="滑块step有值时">
      <li style="padding:.5rem .5rem">
        <daq-range :min="0" :max="600" :step="100" :defaultValue="2" @changeValue = "changeValueHandle"></daq-range>
      </li>
    </daq-cells>
    <daq-ewm></daq-ewm>
  </div>
</template>
<script>
export default {
  data () {
    return {
      min: 0,
      max: 600,
      defaultValue: 2,
      step: 100
    }
  },
  methods: {
    changeValueHandle (value) {
      this.defaultValue = value
    },
    returnPrev () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss"></style>
