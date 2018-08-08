<template>
  <div class="daq-tabbar-item" :class="[{'daq-tabbar-active': url == $route.name},'daq-tabbar-' + type]">
    <router-link :to="'/' + url">
    <span class="icon-wrap">
      <span class="ued-mobile" v-html="url == $route.name ? activeIcon : defaultIcon"></span>
      <slot />
    </span>
    <span class="text">{{text}}</span>
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'daq-tabbar-item',
  props: {
    type: {
      type: String,
      default: 'default', // default、showIcon、showText、special
      validator: (value) => {
        return ['default', 'showIcon', 'showText', 'special'].indexOf(value) !== -1
      }
    },
    url: String,
    defaultIcon: String,
    activeIcon: String,
    text: String
  }
}
</script>
<style lang="scss" scoped>
  .daq-tabbar-item{
    position:relative;
    flex:1;
    a{
      position:relative;
      display:block;
      font-size:0;
      text-align:center;
      color:$fc08;
      height:100%;
      transtion:all .25s ease 0s;
    }
    .text{
      display:block;
      font-size:$f22;
    }
    .icon-wrap{
      position:relative;
      padding-top:.1rem;
      display:inline-block;
      width:.46rem;
      height: .56rem;
    }
    .ued-mobile{
      width:.46rem;
      height: .56rem;
      font-size:$f40;
      line-height:.44rem;
      overflow: hidden;
    }
    @keyframes scale
    {
    0% {
      font-size:$f40;
    }
    50% {
      font-size:$f46;
    }
    100% {
      font-size:$f40;
    }
    }
  }
  //选中效果
  .daq-tabbar-active{
    a{
      color:$fc01;
    }
    .ued-mobile{
      animation-name: scale;
      animation-duration: .5s;
      animation-timing-function: ease-in-out;
      animation-iteration-count:1;
    }
  }
  //只显示icon
  .daq-tabbar-showIcon{
    .icon-wrap{
      padding:0;
      margin-top:.21rem;
      width:.54rem;
      height: .54rem;
    }
    .ued-mobile{
      width:.54rem;
      height: .54rem;
      font-size:.5rem;
    }
    .text{
      display:none;
    }
  }
  //只显示文本
  .daq-tabbar-showText{
    .icon-wrap{
      height: 0;
      padding:0;
    }
    .ued-mobile{
      display:none;
    }
    .text{
      margin-top:.26rem;
      line-height:.44rem;
      font-size:$f32;
      color:$fc06;
    }
    &.daq-tabbar-active{
      &:after{
        content:'';
        position:absolute;
        left:0;
        right:0;
        bottom:0;
        border-bottom:.04rem solid $bor01;
      }
      .text{
        color:$fc01;
      }
    }
  }
  //特殊的
  .daq-tabbar-special{
    a{
      position:absolute;
      left:50%;
      top:-.48rem;
      margin-left:-.59rem;
      width:1.18rem;
      height: 1.18rem;
      border-radius:50%;
      &:after,
      &:before{
        position:absolute;
        content:'';
        background:$bg04;
      }
      &:after{
        left:0;
        top:0;
        right:0;
        bottom:0;
        border:1px solid $bor05;
        border-radius:50%;
        z-index:-2;
      }
      &:before{
        left:-.02rem;
        top:.48rem;
        right:-.02rem;
        bottom:-.02rem;
        z-index:-1;
      }
    }
    .icon-wrap{
      margin-top:.09rem;
      padding:0;
      width:1rem;
      height: 1rem;
      line-height:1rem;
      border-radius:50%;
      background:$btn01;
    }
    .ued-mobile{
      line-height:1rem;
      color:$fc10
    }
    .text{
      display:none;
    }
  }
</style>
