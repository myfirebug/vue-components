<template>
<div class="daq-textarea" :class="classes">
  <div class="daq-textarea-hd">
    <span class="title">{{title}}<i v-if="isRequire">*</i></span>
    <span class="text">{{changeNumber}}/{{limit}}</span>
  </div>
  <div class="daq-textarea-bd" :style="height ? 'height:' + height / 100 + 'rem' : ''">
    <textarea :placeholder="placeholder" :maxlength="limit" @input="descInput" v-model="value"></textarea>
  </div>
</div>
</template>
<script>
export default {
  name: 'daq-textarea-limit',
  props: {
    // 标题
    title: {
      type: String,
      default: '留言标题'
    },
    // 是否有下边框
    isBottomBorder: Boolean,
    // 是否必填
    isRequire: Boolean,
    // 内容高度
    height: {
      type: Number,
      default: 200
    },
    // 无内容显示的文本
    placeholder: {
      type: String,
      default: '请输入...'
    },
    // 限制输入多少文字
    limit: {
      type: Number,
      default: 100
    }
  },
  data () {
    return {
      value: '',
      changeNumber: 0
    }
  },
  computed: {
    classes () {
      return this.isBottomBorder ? 'daq-border-b' : ''
    }
  },
  methods: {
    descInput () {
      this.changeNumber = this.value.length
      this.$emit('change', this.value)
    }
  }
}
</script>
<style lang="scss" scoped>
  .daq-textarea{
    margin-left:.3rem;
    padding:0 .3rem .3rem 0;
    &.daq-border-b{
      border-bottom: 1px solid $bor06;
    }
    &-hd{
      display:flex;
      line-height:1;
      font-size:$f32;
      padding-top:.3rem;
      .title{
        flex:1;
        i{
          position:relative;
          top:.04rem;
          padding-left:.1rem;
          line-height:1;
          color:red;
          font-style:normal;
        }
      }
      .text{
        color:$fc08;
      }
    }
    &-bd{
      padding-top:.3rem;
      min-height:1rem;
      font-size:$f32;
    }
    textarea{
      width:100%;
      height:100%;
    }
  }
</style>
