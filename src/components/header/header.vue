<template>
  <div class="daq-header" :style="fixed ? 'position:fixed' : ''">
    <div class="daq-header-left"><slot name="left" /></div>
    <h1 class="daq-header-title"><slot name="title" /></h1>
    <div class="daq-header-right"><slot name="right" /></div>
  </div>
</template>
<script>

export default {
  name: 'daq-header',
  props: {
    fixed: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>
  .daq-header{
    display:flex;
    align-items: center;
    left:0;
    top:0;
    z-index:10;
    width:100%;
    height: .88rem;
    line-height:.88rem;
    border-bottom:1px solid $bor05;
    background:$bg04;
    &-left{
      min-width:1.5rem;
      font-size:$f30;
      .ued-mobile{
        padding-left:.2rem;
      }
      .btn-back:active{
        color:$fc01;
      }
    }
    &-title{
      flex:1;
      font-size:$f36;
      text-align: center;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    &-right{
      display:flex;
      justify-content:flex-end;
      padding-right:.3rem;
      min-width:1.5rem;
      .ued-mobile{
        padding-left:.2rem;
      }
    }
    //功能文字
    .feature{
      color:$fc01;
    }
    //头像
    .user-photo{
      width:.5rem;
      height: .5rem;
      border-radius:.5rem;
      background:url('../../assets/logo.png') no-repeat;
      background-size:100% 100%;
      background-color:#ccf5f1;
    }
  }
</style>
