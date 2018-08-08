<template>
  <div class="home">
    <!--基础搜索框-位于白底导航栏灰底搜索框-->
    <daq-cells title="基础搜索框-位于白底导航栏灰底搜索框">
      <li>
        <daq-search @search="returnPrev"></daq-search>
      </li>
    </daq-cells>
    <!--位于导航栏白色底搜索框-->
    <daq-cells title="位于导航栏白色底搜索框">
      <li>
        <daq-search :searchWrapStyles="'background:#00ceb9'" @search="returnPrev"></daq-search>
      </li>
    </daq-cells>
    <!--位于导航栏含透明度搜索框-->
    <daq-cells title="位于导航栏含透明度搜索框">
      <li>
        <daq-search :searchWrapStyles="'background:#00ceb9'" :searchStyles="'background:rgba(255,255,255,.3);color:#fff'" @search="returnPrev"></daq-search>
      </li>
    </daq-cells>
    <!--位于banner图黑色透明度搜索框-->
    <daq-cells title="位于banner图黑色透明度搜索框">
      <li style="height:3.74rem;position:relative;">
        <img src="../assets/bg.jpg" alt="">
        <daq-search :searchWrapStyles="'position:absolute;top:.3rem;background:none'" :searchStyles="'background:rgba(0,0,0,.3);color:#fff;border:1px solid rgba(255,255,255,.3);border-radius:.06rem'" @search="returnPrev"></daq-search>
      </li>
    </daq-cells>
    <!--位于banner图含阴影白底搜索框-->
    <daq-cells title="位于banner图含阴影白底搜索框">
      <li style="height:3.74rem;position:relative;">
        <img src="../assets/bg.jpg" alt="">
        <daq-search :searchWrapStyles="'position:absolute;top:.3rem;background:none'" :searchStyles="'background:#fff;border-radius:.06rem'" @search="returnPrev"></daq-search>
      </li>
    </daq-cells>
    <daq-ewm></daq-ewm>
  </div>
</template>
<script>
export default {
  methods: {
    returnPrev () {
      alert('这里是跳转路由哦')
      this.$router.go(-1)
    }
  }
}
</script>
<style></style>
