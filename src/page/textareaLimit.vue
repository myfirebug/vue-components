<template>
  <div class="home">
    <!--头部start-->
    <daq-header>
      <div class="btn-back" slot="left" @click="returnPrev">
        <span class="ued-mobile">&#xe6b2;</span>返回
      </div>
      <span slot="title">限制文本输入框</span>
    </daq-header>
    <!--头部end-->
    <daq-textarea-limit :isBottomBorder="true" title="留言标题" placeholder="请输入留言内容" :limit="200" :height="300" :isRequire="true" @change="changeHandler"></daq-textarea-limit>
    <daq-ewm></daq-ewm>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    returnPrev () {
      this.$router.go(-1)
    },
    changeHandler (value) {
      this.value = value
    }
  }
}
</script>

<style lang="scss"></style>
