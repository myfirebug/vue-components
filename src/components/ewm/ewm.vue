<template>
  <div class="daq-ewm" @click="scaleEwm" :class="show ? 'scale' : ''"><img src="../../assets/ewm.png" alt=""></div>
</template>
<script>
export default {
    name: 'daq-ewm',
    data () {
      return {
          show: false
      }
    },
    methods: {
      scaleEwm () {
        this.show = !this.show
      }
    }
}
</script>
<style lang="scss">
.daq-ewm{
  position:fixed;
  right:.3rem;
  bottom:.3rem;
  z-index:100;
  width:.8rem;
  height:.8rem;
  padding:.05rem;
  background:#fff;
  border:.04rem solid #ddd;
  transition: all .25s ease 0s;
  img{
    vertical-align: top;
  }
  &.scale{
    width:3.5rem;
    height:3.5rem;
  }
}
</style>
