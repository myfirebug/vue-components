<template>
  <i class="daq-badge" :class="'daq-badge-' + size">
    <slot />
  </i>
</template>
<script>

export default {
  name: 'daq-badge',
  props: {
    size: {
      type: String, // large / medium / small / mini
      default: 'large'
    }
  }
}
</script>
<style lang="scss" scoped>
  .daq-badge{
    margin:0 .1rem;
    display:inline-block;
    color:$fc10;
    font-style: normal;
    background:$assist04;
    &-large{
      height:.36rem;
      min-width:.36rem;
      padding:0 .13rem;
      line-height:.36rem;
      font-size:$f26;
      border-radius:.2rem;
    }
    &-medium{
      height:.28rem;
      min-width:.28rem;
      padding:0 .08rem;
      line-height:.28rem;
      font-size:$f20;
      border-radius:.14rem;
    }
    &-small{
      font-size:0;
      height:.2rem;
      width:.2rem;
      border-radius:.1rem;
      vertical-align:middle;
    }
    &-mini{
      font-size:0;
      height:.12rem;
      min-width:.12rem;
      border-radius:.06rem;
      vertical-align:middle;
    }
  }
</style>
