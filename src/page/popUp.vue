<template>
  <div class="home">
    <!--头部start-->
    <daq-header>
      <div class="btn-back" slot="left" @click="returnPrev">
        <span class="ued-mobile">&#xe6b2;</span>返回
      </div>
      <span slot="title">左右上下滑动</span>
    </daq-header>
    <daq-cells title="popUp组件">
      <li style="padding:.2rem .3rem">
      <daq-button size="large" @change="changeHandle1">向上弹起</daq-button>
      <daq-popUp :show="show1" dir="bottom" @hide="hideHandle1">
        <p>我是内容哦</p>
        <p>我是内容哦</p>
        <p>我是内容哦</p>
        <p>我是内容哦</p>
        <p>我是内容哦</p>
        <p>我是内容哦</p>
        <p>我是内容哦</p>
        <p>我是内容哦</p>
      </daq-popUp>

      <daq-button size="large" @change="changeHandle2">向下弹起</daq-button>
      <daq-popUp :show="show2" dir="top" @hide="hideHandle2" :distance="88">
        <p>我是内容哦</p>
        <p>我是内容哦</p>
        <p>我是内容哦</p>
        <p>我是内容哦</p>
        <p>我是内容哦</p>
        <p>我是内容哦</p>
        <p>我是内容哦</p>
        <p>我是内容哦</p>
      </daq-popUp>

      <daq-button size="large" @change="changeHandle3">向右弹起</daq-button>
      <daq-popUp :show="show3" dir="left" @hide="hideHandle3" width="80%" height="100%">
        <p>我是内容哦</p>
        <p>我是内容哦</p>
        <p>我是内容哦</p>
        <p>我是内容哦</p>
        <p>我是内容哦</p>
        <p>我是内容哦</p>
        <p>我是内容哦</p>
        <p>我是内容哦</p>
      </daq-popUp>

      <daq-button size="large" @change="changeHandle4">向左弹起</daq-button>
      <daq-popUp :show="show4" dir="right" @hide="hideHandle4" width="80%" height="100%">
        <p>我是内容哦</p>
        <p>我是内容哦</p>
        <p>我是内容哦</p>
        <p>我是内容哦</p>
        <p>我是内容哦</p>
        <p>我是内容哦</p>
        <p>我是内容哦</p>
        <p>我是内容哦</p>
      </daq-popUp>
      </li>
    </daq-cells>
    <daq-ewm></daq-ewm>
  </div>
</template>
<script>
export default {
  data () {
    return {
      show1: false,
      show2: false,
      show3: false,
      show4: false
    }
  },
  methods: {
    returnPrev () {
      this.$router.go(-1)
    },
    changeHandle1 () {
      this.show1 = true
    },
    changeHandle2 () {
      this.show2 = true
    },
    changeHandle3 () {
      this.show3 = true
    },
    changeHandle4 () {
      this.show4 = true
    },
    hideHandle1 () {
      this.show1 = false
    },
    hideHandle2 () {
      this.show2 = false
    },
    hideHandle3 () {
      this.show3 = false
    },
    hideHandle4 () {
      this.show4 = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .daq-button{
    margin:.1rem 0;
  }
</style>
