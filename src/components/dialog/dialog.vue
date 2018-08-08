<template>
  <transition name="fade">
  <div class="daq-dialog-wrap" v-if="show">
    <div class="daq-dialog-mask" @click="close"></div>
    <div class="daq-dialog">
      <div class="daq-dialog-hd" v-if="title">{{title}}</div>
      <div class="daq-dialog-bd" :style="'text-align:' + align">
        <slot>{{content}}</slot>
      </div>
      <div class="daq-dialog-ft">
        <div class="daq-dialog-cancel" v-if="cancelValue"  @click="close">{{cancelValue}}</div>
        <div class="daq-dialog-comfirm" @click="open">{{comfirmValue}}</div>
      </div>
    </div>
  </div>
  </transition >
</template>
<script>

export default {
  name: 'daq-dialog',
  props: {
    title: String,
    content: {
      type: String,
      default: '我是内容'
    },
    cancelValue: String,
    comfirmValue: String,
    comfirmFn: Function,
    cancelFn: Function,
    align: {
      type: String,
      default: 'left'
    }
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    close () {
      if (!(typeof this.cancelFn === 'function' && this.cancelFn())) {
        this.show = false
      }
    },
    open () {
      if (!(typeof this.comfirmFn === 'function' && this.comfirmFn())) {
        this.show = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .daq-dialog{
    width:5.6rem;
    border-radius:.1rem;
    background:$bg04;
    overflow:hidden;
    &-wrap{
      display:flex;
      justify-content:center;
      align-items:center;
      position:fixed;
      left:0;
      top:0;
      bottom:0;
      right:0;
      z-index:999;
    }
    &-mask{
      position:absolute;
      left:0;
      top:0;
      z-index:-1;
      width:100%;
      height:100%;
      background:$bg01;
    }
    &-hd{
      line-height:1;
      padding-top:.6rem;
      font-size:$f36;
      text-align:center;
    }
    &-bd{
      padding:.25rem .3rem;
      font-size:$f30;
      color:$fc08
    }
    &-ft{
      display:flex;
      height:1rem;
      font-size:$f36;
      line-height:1rem;
      text-align: center;
      border-top:1px solid $bor05;
      > div{
        flex:1;
        border-left:1px solid $bor05;
        transition:all .25s ease 0s;
        &:first-child{
          border:none;
        }
        &:active{
          background:$bg02
        }
      }
    }
    &-comfirm{
      color:$btn01
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
