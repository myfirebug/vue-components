<template>
  <div class="home">
    <daq-cells title="基础导航栏">
      <!--头部start-->
      <daq-header>
        <div class="btn-back" slot="left" @click="returnPrev">
          <span class="ued-mobile">&#xe6b2;</span>
        </div>
        <span slot="title">标题长会隐藏后面或轮播后面或轮播</span>
        <div slot="right">
          <span class="ued-mobile">&#xe6b7;</span>
          <span class="ued-mobile">&#xe6b7;</span>
        </div>
      </daq-header>
      <!--头部end-->
    </daq-cells>
    <daq-cells title="导航栏-右边文字">
      <!--头部start-->
      <daq-header>
        <div class="btn-back" slot="left" @click="returnPrev">
          <span class="ued-mobile">&#xe6b2;</span>返回
        </div>
        <span slot="title">页面名称</span>
        <div slot="right" class="feature">
          功能文字
        </div>
      </daq-header>
      <!--头部end-->
    </daq-cells>
    <daq-cells title="导航栏-右边头像">
      <!--头部start-->
      <daq-header>
        <div class="btn-back" slot="left" @click="returnPrev">
          <span class="ued-mobile">&#xe6b2;</span>
        </div>
        <span slot="title">页面名称</span>
        <div slot="right" class="user-photo"></div>
      </daq-header>
      <!--头部end-->
    </daq-cells>
    <daq-cells title="导航栏-含提示信息">
      <!--头部start-->
      <daq-header>
        <div class="btn-back" slot="left" @click="returnPrev">
          <span class="ued-mobile">&#xe6b2;</span>
        </div>
        <span slot="title">页面名称</span>
        <div slot="right" style="position:relative;">
          <daq-badge size="small" v-if="count" style="position:absolute;left:0;top:.1rem;margin-left:.4rem">{{count}}</daq-badge>
          <span class="ued-mobile">&#xe64f;</span>
        </div>
      </daq-header>
      <!--头部end-->
    </daq-cells>
    <daq-ewm></daq-ewm>
  </div>
</template>
<script>
import {
  mapState
} from 'vuex'
export default {
  computed: {
    ...mapState(['count'])
  },
  methods: {
    returnPrev () {
      this.$router.go(-1)
    }
  }
}
</script>
<style></style>
