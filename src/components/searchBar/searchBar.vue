<template>
  <div class="daq-search" :style="searchWrapStyles">
    <div class="daq-search-left"><slot name="left" /></div>
    <div class="daq-search-wrap" :style="searchStyles" @click="search"><i class="ued-mobile ic-search">&#xe6ae;</i>{{text}}</div>
    <div class="daq-search-right"><slot name="right" /></div>
  </div>
</template>
<script>

export default {
  name: 'daq-search',
  props: {
    searchWrapStyles: String,
    searchStyles: String,
    text: {
      type: String,
      default: '请输入关键字进行搜索'
    }
  },
  methods: {
    search () {
      this.$emit('search')
    }
  }
}
</script>
<style lang="scss" scoped>
  .daq-search{
    display:flex;
    align-items: center;
    left:0;
    top:0;
    width:100%;
    height: .88rem;
    line-height:.88rem;
    background:$bg02;
    padding:0 .3rem;
    &-wrap{
      flex:1;
      height:.6rem;
      text-align:center;
      line-height:.6rem;
      border-radius:.3rem;
      font-size:.28rem;
      color:$fc08;
      background:$bg04;
      .ic-search{
        vertical-align: middle;
        padding-right:.1rem;
      }
      &:active{
        opacity:.9
      }
    }
  }
</style>
