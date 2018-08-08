<template>
  <transition enter-active-class="animation-translate-top-in" leave-active-class="animation-translate-top-out">
  <div class="daq-tips" v-if="show">
    <div class="daq-tips-mask"></div>
    <div class="daq-tips-wrap" :style="styles">
      <span class="icon ued-mobile" v-if="icon" v-html="icon"></span>
      <span class="text" v-html="message"></span>
    </div>
  </div>
  </transition>
</template>
<script>
export default {
  name: 'daq-tips',
  props: {
    show: Boolean,
    icon: String,
    styles: String,
    message: String
  }
}
</script>
<style lang="scss" scoped>
  .daq-tips{
    position:fixed;
    left:0;
    right:0;
    bottom:0;
    top:0;
    transform: translateY(-100%)
    &-mask{
      position:absolute;
      left:0;
      right:0;
      bottom:0;
      top:0;
      z-index:1;
    }
    &-wrap{
      position:relative;
      z-index:2;
      padding:0 .3rem;
      width:100%;
      height:.6rem;
      line-heihgt:.6rem;
      background:rgba(0,0,0,.7);
      color:$fc10;
      overflow:hidden;
    }
    .text{
      display:inline-block;
      font-size:$f28;
      line-height:.6rem;
    }
    .ued-mobile{
      font-size:.32rem;
    }
  }
</style>
