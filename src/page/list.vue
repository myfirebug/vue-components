<template>
  <div class="home">
    <!--头部start-->
    <daq-header>
      <div class="btn-back" slot="left" @click="returnPrev">
        <span class="ued-mobile">&#xe6b2;</span>返回
      </div>
      <span slot="title">列表</span>
    </daq-header>
    <!--头部end-->
    <!--单行列表-->
    <daq-cells title="单行列表">
      <daq-cells-item title="单行列表" url="home"></daq-cells-item>
    </daq-cells>
    <!--单行列表-常用大头像居左-->
    <daq-cells title="单行列表-常用大头像居左">
      <daq-cells-item title="单行列表" icon url="home">
        <div slot="icon" class="user-photo"></div>
        <div slot="bd">
          <h2 class="title">头像名称</h2>
          <p class="auxiliary">辅助信息</p>
        </div>
      </daq-cells-item>
    </daq-cells>
    <!--单行列表-头像居右-->
    <daq-cells title="单行列表-头像居右">
      <daq-cells-item title="头像名称" @jump="jumpHandle">
        <div slot="ft" class="user-photo"></div>
      </daq-cells-item>
    </daq-cells>
    <!--单行列表-带图标-->
    <daq-cells title="单行列表-带图标">
      <daq-cells-item title="头像名称" icon value="提示信息" url="home">
        <div slot="icon" class="ued-mobile">&#xe6b7;</div>
      </daq-cells-item>
    </daq-cells>
    <!--双行列表-->
    <daq-cells title="双行列表">
      <daq-cells-item url="home">
        <div slot="bd">
          <h2 class="title">双行列表标题</h2>
          <p class="auxiliary">补充信息</p>
        </div>
      </daq-cells-item>
    </daq-cells>
    <!--双行列表-含头像等大图标-->
    <daq-cells title="双行列表-含头像等大图标">
      <daq-cells-item url="home" icon>
        <div slot="icon" class="user-photo"></div>
        <div slot="bd">
          <h2 class="title">双行列表标题</h2>
          <p class="auxiliary">补充信息</p>
        </div>
      </daq-cells-item>
    </daq-cells>
    <!--多行列表-->
    <daq-cells title="多行列表">
      <daq-cells-item title="多行列表" value="提示信息" url="home"></daq-cells-item>
      <daq-cells-item title="多行列表" url="home">
        <div slot="ft">
          <span class="">提示信息</span>
          <daq-badge size="small" v-if="count" >{{count}}</daq-badge>
        </div>
      </daq-cells-item>
      <daq-cells-item url="home" icon>
        <div slot="icon">
          <span class="">多行列表</span>
          <daq-badge size="large" v-if="count" >{{count}}</daq-badge>
        </div>
      </daq-cells-item>
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
    },
    jumpHandle () {
      alert('你点击了我')
    }
  }
}
</script>
<style></style>
