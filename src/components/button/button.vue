<template>
  <button class="daq-button" :class="['daq-button-' + type,'daq-button-' + size, disabled ? 'daq-button-disabled' : '',isRound ? 'daq-button-round' : '' ]" @click="change">
    <slot>{{title}}</slot>
  </button>
</template>
<script>

export default {
  name: 'daq-button',
  props: {
    title: String,
    type: {
      type: String, // default / primary / danger
      default: 'default'
    },
    size: {
      type: String, // large / medium / small
      default: 'large'
    },
    disabled: Boolean,
    isRound: Boolean
  },
  methods: {
    change () {
      this.$emit('change')
    }
  }

}
</script>
<style lang="scss" scoped>
  .daq-button{
    box-sizing:border-box;
    transition:all .25s ease 0s;
    &-default{
      border:1px solid $bor05;
      background:$bg04;
      &:active{
        color:$fc01;
      }
      &.daq-button-disabled{
        color:$fc09;
      }
    }
    &-primary{
      color:$fc10;
      background:$btn01;
      &:active{
        background:$btn01hover;
      }
      &.daq-button-disabled{
        background:$btn01disable;
      }
    }
    &-danger{
      color:$fc10;
      background:$btn04;
      &:active{
        background:$btn04hover;
      }
      &.daq-button-disabled{
        background:$btn04disable;
      }
    }
    &-large{
      width:100%;
      height: .88rem;
      font-size:$f34;
      border-radius:.1rem;
      &.daq-button-round{
        border-radius: .44rem;
      }
    }
    &-medium{
      width:100%;
      height: .72rem;
      font-size:$f32;
      border-radius:.1rem;
      &.daq-button-round{
        border-radius: .36rem;
      }
    }
    &-small{
      min-width: 1.28rem;
      height: .6rem;
      padding:0 .24rem;
      font-size:$f26;
      border-radius:.05rem;
      &.daq-button-round{
        border-radius: .3rem;
      }
    }
  }
</style>
