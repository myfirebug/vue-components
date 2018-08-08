<template>
  <div class="home">
    <!--头部start-->
    <daq-header>
      <div class="btn-back" slot="left" @click="returnPrev">
        <span class="ued-mobile">&#xe6b2;</span>返回
      </div>
      <span slot="title">角标</span>
      <div slot="right">
        <span class="ued-mobile">&#xe6b3;</span>
      </div>
    </daq-header>
    <!--头部end-->
    <!--大型角标-用于导航栏、菜单栏等重要信息提示-->
    <daq-cells title="大型角标-用于导航栏、菜单栏等重要信息提示">
      <li style="padding:.3rem .2rem">
        <daq-badge size="large">8</daq-badge>
        <daq-badge size="large">9</daq-badge>
        <daq-badge size="large">99+</daq-badge>
        <daq-badge size="large">New</daq-badge>
        <daq-badge size="large">Hot</daq-badge>
        <daq-badge size="large">More</daq-badge>
      </li>
    </daq-cells>
    <!--中型角标-->
    <daq-cells title="中型角标">
      <li style="padding:.3rem .2rem">
        <daq-badge size="medium">8</daq-badge>
        <daq-badge size="medium">9</daq-badge>
        <daq-badge size="medium">99+</daq-badge>
        <daq-badge size="medium">New</daq-badge>
        <daq-badge size="medium">Hot</daq-badge>
        <daq-badge size="medium">More</daq-badge>
      </li>
    </daq-cells>
    <!--小型角标-用于图标或者文字进行微提示-->
    <daq-cells title="小型角标-用于图标或者文字进行微提示">
      <li style="padding:.3rem .2rem">
        <daq-badge size="small">8</daq-badge>
      </li>
    </daq-cells>
    <!--迷你型角标-用于消息未读提示-->
    <daq-cells title="迷你型角标-用于消息未读提示">
      <li style="padding:.3rem .2rem">
        <daq-badge size="mini">8</daq-badge>
      </li>
    </daq-cells>
    <daq-ewm></daq-ewm>
  </div>
</template>
<script>
export default {
  methods: {
    returnPrev () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss"></style>
