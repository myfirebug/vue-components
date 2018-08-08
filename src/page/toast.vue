<template>
  <div class="home">
    <!--头部start-->
    <daq-header>
      <div class="btn-back" slot="left" @click="returnPrev">
        <span class="ued-mobile">&#xe6b2;</span>返回
      </div>
      <span slot="title">提示</span>
    </daq-header>
    <daq-cells title="toast组件">
      <li style="padding:.2rem .3rem">
        <daq-button type="default" @change="showError">错误提示</daq-button>
        <daq-button type="default" @change="showSucess">成功提示</daq-button>
        <daq-button type="default" @change="showLoading">加载提示</daq-button>
        <daq-button type="default" @change="showHtml">一般提示</daq-button>
      </li>
    </daq-cells>
    <!--头部end-->
    <daq-ewm></daq-ewm>
  </div>
</template>
<script>
import Toast from '../components/toast'
export default {
  methods: {
    returnPrev () {
      this.$router.go(-1)
    },
    showError () {
      Toast({
        type: 'error',
        duration: 3000,
        message: '出错了'
      })
    },
    showSucess () {
      Toast({
        type: 'sucess',
        duration: 3000,
        message: '加载成功'
      })
    },
    showLoading () {
      Toast({
        type: 'loading',
        duration: 3000
      })
    },
    showHtml () {
      Toast({
        type: 'html',
        duration: 3000,
        message: '你输入的用户名不对！'
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
