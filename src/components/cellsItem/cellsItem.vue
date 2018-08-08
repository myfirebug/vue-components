<template>
  <li  class="daq-cells-item" :class="url ? 'daq-cells-links' : ''" @click="jump">
    <div class="daq-cells-item-hd" v-if="icon">
      <slot name="icon"></slot>
    </div>
    <div class="daq-cells-item-bd">
      <slot name="bd">{{title}}</slot>
    </div>
    <div class="daq-cells-item-ft" v-if = "isFoot">
      <slot name="ft">{{value}}</slot>
    </div>
  </li>
</template>
<script>
export default {
  name: 'daq-cells-item',
  props: {
    icon: Boolean,
    isJump: {
      type: Boolean,
      default: true
    },
    url: String,
    title: String,
    value: [String, Number],
    isFoot: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    jump () {
      if (this.isJump) {
        this.$router.push({path: '/' + this.url})
      } else {
        this.$emit('jump')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .daq-cells-item{
    position:relative;
    display:flex;
    align-items:center;
    padding:.24rem .3rem .24rem .3rem;
    border-bottom:1px solid $bor05;
    &:last-child{
      border-bottom: none;
    }
    &-hd{
      padding-right:.24rem;
    }
    .user-photo{
      width:1.2rem;
      height:1.2rem;
      border-radius:50%;
      background:url('../../assets/logo.png') no-repeat;
      background-size:100% 100%;
      background-color:#ccf5f1;
    }
    &-bd{
      flex:1;
      font-size:$f32;
      line-height:.48rem;
      .title{}
      .auxiliary{
       font-size:$f28;
       color: $fc08;
      }
    }
    &-ft{
      padding-left:.24rem;
      font-size:$f26;
      color:$fc08;
    }
    &.daq-cells-links{
      padding-right:.5rem;
      transition:all .25s ease 0s;
      &:active{
        background:$bg02;
      }
      &:after{
        content:'';
        position:absolute;
        right:.3rem;
        top:50%;
        margin-top:-.08rem;
        width:.15rem;
        height:.15rem;
        border-top:.03rem solid $fc08;
        border-left:.03rem solid $fc08;
        transform:rotate(135deg);
        border-radius:.03rem;
      }
    }
  }
</style>
