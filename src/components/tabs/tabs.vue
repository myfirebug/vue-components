<template>
  <div class="daq-tabs" :class="'daq-tabs-' + type">
    <div class="tabs-hd">
      <div class="tabs-item" :class="tabIndex === tabItem.index ? 'active' : ''" v-for="tabItem in tabList" :key="tabItem.index" @click="tabs(tabItem.index)">{{tabItem.name}}</div>
    </div>
    <div class="tabs-content">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: 'daq-tabs',
  props: {
    tabList: {
      type: Array,
      require: true
    },
    tabIndex: [String, Number],
    type: {
      type: String,
      default: 'default'
    }
  },
  methods: {
    tabs (value) {
      this.$emit('tabs', value)
    }
  }
}
</script>
<style lang="scss" scoped>
  .daq-tabs{
    width:100%;
    overflow:hidden;
    .tabs-hd{
      display:flex;
      flex-wrap:nowrap;
      height:.96rem;
      line-height:.96rem;
      font-size:$f32;
      border-bottom:1px solid $bor05;
    }
    .tabs-item{
      flex:1;
      text-align: center;
      flex-shrink: 0;
      transition:all .25s ease 0s;
    }
    //默认
    &-default{
      .active{
        position:relative;
        color:$fc01;
        &:after{
          content:'';
          position:absolute;
          left:50%;
          bottom:0;
          margin-left:-.15rem;
          width:.3rem;
          height:.04rem;
          background:$bor01;
        }
      }
    }
  }
</style>
