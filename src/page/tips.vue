<template>
  <div class="home">
    <!--头部start-->
    <daq-header>
      <div class="btn-back" slot="left" @click="returnPrev">
        <span class="ued-mobile">&#xe6b2;</span>返回
      </div>
      <span slot="title">提示</span>
    </daq-header>
    <daq-cells title="tips组件">
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
import Tips from '../components/tips'
export default {
  methods: {
    returnPrev () {
      this.$router.go(-1)
    },
    showError () {
      Tips({
        message: '你输入的用户名不对！',
        icon: '&#xe645;',
        styles: 'background-color:red',
        duration: 3000
      })
    },
    showSucess () {
      Tips({
        message: '输入正确',
        icon: '&#xe6b6;',
        styles: 'background-color:#00ceb9',
        duration: 3000
      })
    },
    showLoading () {
      Tips({
        message: '加载中',
        icon: '&#xe659;',
        styles: 'background-color:#00ceb9',
        duration: 3000
      })
    },
    showHtml () {
      Tips({
        message: '消息提示',
        duration: 3000
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
