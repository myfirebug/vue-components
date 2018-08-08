<template>
  <div class="daq-tabbar" :style="{position:fixed ? '' : 'fixed'}">
    <slot />
  </div>
</template>
<script>
export default {
  name: 'daq-tabbar',
  props: {
    fixed: {
      type: Boolean
    }
  }
}
</script>
<style lang="scss" scoped>
  .daq-tabbar{
    display:flex;
    height:.96rem;
    left:0;
    bottom:0;
    z-index:10;
    width:100%;
    height:.96rem;
    border-top:1px solid $bor05;
    background:$bg04;
  }
</style>
