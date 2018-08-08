<template>
  <daq-popUp :show="show" dir="bottom" @hide="hideHandle">
      <div class="actionSheet-item" v-for="item in actionSheetList" :key="item.value" @click="getItem(item)">{{item.name}}</div>
    </daq-popUp>
</template>
<script>
export default {
  name: 'daq-actionSheet',
  data () {
    return {
      show: true,
      actionSheetList: [],
      callBack: null
    }
  },
  methods: {
    hideHandle () {
      this.show = false
    },
    getItem (item) {
      typeof this.callBack === 'function' && this.callBack(item)
      this.hideHandle()
    }
  }
}
</script>
<style lang="scss" scoped>
  .actionSheet-item{
    line-height: .96rem;
    text-align: center;
    font-size:$f32;
    border-bottom:1px solid $bor05;
    &:active{
      background:$bg03;
    }
  }
</style>
