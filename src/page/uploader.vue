<template>
  <div class="home">
    <!--头部start-->
    <daq-header>
      <div class="btn-back" slot="left" @click="returnPrev">
        <span class="ued-mobile">&#xe6b2;</span>返回
      </div>
      <span slot="title">图片上传</span>
    </daq-header>
    <!--头部end-->
    <daq-textarea-limit title="我要评论" placeholder="请输入评论内容" :limit="100" :isRequire="true" @change="changeHandler"></daq-textarea-limit>
    <daq-uploader :limit="9" @getPicList="getPicListHandler"></daq-uploader>
    <daq-ewm></daq-ewm>
  </div>
</template>
<script>
export default {
  data () {
    return {
      picList: [],
      value: ''
    }
  },
  methods: {
    returnPrev () {
      this.$router.go(-1)
    },
    changeHandler (value) {
      this.value = value
    },
    getPicListHandler (s) {
      this.picList = s
    }
  }
}
</script>
<style lang="scss"></style>
