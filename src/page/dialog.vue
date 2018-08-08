<template>
  <div class="home">
    <!--头部start-->
    <daq-header>
      <div class="btn-back" slot="left" @click="returnPrev">
        <span class="ued-mobile">&#xe6b2;</span>返回
      </div>
      <span slot="title">弹窗</span>
    </daq-header>
    <daq-cells title="dialog组件">
      <li style="padding:.2rem .3rem">
        <!-- <daq-dialog :show="true" title="提示" cancelValue = "取消" comfirmValue = "确认"></daq-dialog> -->
        <daq-button type="default" @change = "showDialog01">普通弹框</daq-button>
        <daq-button type="default" @change = "showDialog02">无标题弹框</daq-button>
        <daq-button type="default" @change = "showDialog03">弹框换行</daq-button>
        <daq-button type="default" @change = "showDialog04">弹框有操作</daq-button>
      </li>
    </daq-cells>
    <!--头部end-->
    <daq-ewm></daq-ewm>
  </div>
</template>
<script>
import Dialog from '../components/dialog/index.js'
import Toast from '../components/toast/index.js'
export default {
  methods: {
    returnPrev () {
      this.$router.go(-1)
    },
    showDialog01 () {
      Dialog({
        title: '普通弹框',
        content: '告知当前状态，信息和解决方法'
      })
    },
    showDialog02 () {
      Dialog({
        content: '告知当前状态，信息和解决办法，文字换行的情况',
        align: 'center'
      })
    },
    showDialog03 () {
      Dialog({
        title: '普通弹框',
        content: '告知当前状态，信息和解决办法，文字换行的情况',
        align: 'center'
      })
    },
    showDialog04 () {
      Dialog({
        title: '普通弹框',
        content: '告知当前状态，信息和解决办法，文字换行的情况',
        align: 'center',
        comfirmValue: '主操作',
        cancelValue: '辅助操作',
        comfirmFn () {
          Toast({
            message: '你点击了主操作'
          })
        },
        cancelFn () {
          Toast({
            message: '你点击了辅助操作'
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
