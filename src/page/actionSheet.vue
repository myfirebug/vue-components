<template>
  <div class="home">
    <!--头部start-->
    <daq-header>
      <div class="btn-back" slot="left" @click="returnPrev">
        <span class="ued-mobile">&#xe6b2;</span>返回
      </div>
      <span slot="title">选择</span>
    </daq-header>
    <daq-cells title="actionSheet组件">
      <li style="padding:.2rem .3rem">
        <daq-button type="default" @change="show">actionSheet1</daq-button>
        <daq-button type="default" @change="show1">actionSheet2</daq-button>
      </li>
    </daq-cells>
    <!--头部end-->
    <daq-ewm></daq-ewm>
  </div>
</template>
<script>
import ActionSheet from '../components/actionSheet'
export default {
  methods: {
    returnPrev () {
      this.$router.go(-1)
    },
    show () {
      ActionSheet({
        show: true,
        actionSheetList: [
          {
            name: '列表一',
            value: 'a'
          },
          {
            name: '列表二',
            value: 'b'
          },
          {
            name: '列表三',
            value: 'c'
          },
          {
            name: '列表四',
            value: 'd'
          }
        ],
        callBack (item) {
          console.log(item.name, item.value)
        }
      })
    },
    show1 () {
      ActionSheet({
        show: true,
        actionSheetList: [
          {
            name: 'this is 1',
            value: 'a'
          },
          {
            name: 'this is 2',
            value: 'b'
          },
          {
            name: 'this is 3',
            value: 'c'
          },
          {
            name: 'this is 4',
            value: 'd'
          }
        ],
        callBack (item) {
          console.log(item.name, item.value)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .daq-button{
    margin:.1rem 0;
  }
</style>
