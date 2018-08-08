<template>
  <div class="daq-cells" :class="classname">
    <div class="daq-cells-title" v-if="title">{{title}}</div>
    <ul class="daq-cells-wrap">
      <slot />
    </ul>
  </div>
</template>
<script>
export default {
  name: 'daq-cells',
  props: {
    title: String,
    classname: String
  }
}
</script>
<style lang="scss" scoped>
  .daq-cells{
    border-bottom:1px solid $bor05;
    background:$bg04;
    &-title{
      height:.9rem;
      padding:.4rem 0 0 .3rem;
      line-height:1;
      font-size:$f28;
      color:$fc08;
      background:$bg02;
      border-bottom:1px solid $bor05;
    }
  }
</style>
