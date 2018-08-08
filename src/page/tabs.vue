<template>
  <div class="home">
    <!--头部start-->
    <daq-header>
      <div class="btn-back" slot="left" @click="returnPrev">
        <span class="ued-mobile">&#xe6b2;</span>返回
      </div>
      <span slot="title">选项卡</span>
    </daq-header>
    <daq-tabs :tabIndex="tabIndex" :tabList="tabList" @tabs="tabsHandle">
      <div class="pane">{{content}}</div>
    </daq-tabs>
    <daq-ewm></daq-ewm>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tabIndex: 0,
      tabList: [
        {
          index: 0,
          name: '选项一',
          content: '我是第一项的内容'
        },
        {
          index: 1,
          name: '选项二',
          content: '我是第二项的内容'
        },
        {
          index: 2,
          name: '选项三',
          content: '我是第三项的内容'
        },
        {
          index: 3,
          name: '选项四',
          content: '我是第四项的内容'
        }
      ],
      content: ''
    }
  },
  methods: {
    returnPrev () {
      this.$router.go(-1)
    },
    tabsHandle (v) {
      for (let i = 0; i < this.tabList.length; i++) {
        if (this.tabList[i].index === v) {
          this.tabIndex = v
          this.content = this.tabList[i].content
        }
      }
    }
  },
  mounted () {
    if (this.tabList.length) {
      this.content = this.tabList[0].content
    }
  }
}
</script>

<style lang="scss"></style>
