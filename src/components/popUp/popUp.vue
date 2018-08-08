<template>
  <transition  enter-active-class="animation-fade-in" leave-active-class="animation-fade-out">
  <div class="daq-popUp" v-show="state" :style="styles.parentDistance">
    <div class="mask" @click="hide"></div>
    <transition name="fade" :enter-active-class="enterActiveClass" :leave-active-class="leaveActiveClass">
    <div class="daq-popUp-content" v-show="state" :style="styles.childDistance">
      <slot />
    </div>
    </transition>
  </div>
  </transition>
</template>
<script>
export default {
  name: 'daq-popUp',
  data () {
    return {
      state: this.show
    }
  },
  props: {
    show: Boolean,
    width: String,
    height: String,
    dir: {
      type: String,
      default: 'bottom',
      validator: (value) => {
        return ['bottom', 'top', 'left', 'right'].indexOf(value) !== -1
      }
    },
    distance: {
      type: Number,
      default: 0
    }
  },
  computed: {
    enterActiveClass () {
      return 'animation-translate-' + this.dir + '-in'
    },
    leaveActiveClass () {
      return 'animation-translate-' + this.dir + '-out'
    },
    styles () {
      let str1 = ''
      let str2 = ''
      let width = this.width ? 'width:' + this.width + ';' : ''
      let height = this.height ? 'height:' + this.height + ';' : ''
      switch (this.dir) {
        case 'top':
          str1 = 'top:' + this.distance / 100 + 'rem'
          str2 = 'top:0;' + width + height
          break
        case 'left':
          str1 = 'left:' + this.distance / 100 + 'rem'
          str2 = 'left:0;' + width + height
          break
        case 'right':
          str1 = 'right:' + this.distance / 100 + 'rem'
          str2 = 'right:0;' + width + height
          break
        default:
          str1 = 'bottom:' + this.distance / 100 + 'rem'
          str2 = 'bottom:0;' + width + height
      }
      return {
        parentDistance: str1,
        childDistance: str2
      }
    }
  },
  methods: {
    hide () {
      this.$emit('hide')
    }
  },
  watch: {
    show (value) {
      this.state = value
    }
  }
}
</script>
<style lang="scss">
  .daq-popUp{
    position:fixed;
    left:0;
    right:0;
    bottom:0;
    top:0;
    z-index:100;
    overflow:hidden;
    &-content{
      position:absolute;
      z-index:101;
      width:100%;
      max-height:100%;
      overflow:hidden;
      background:$bg04;
    }
  }
</style>
