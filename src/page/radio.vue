<template>
  <div class="home">
    <!--头部start-->
    <daq-header>
      <div class="btn-back" slot="left" @click="returnPrev">
        <span class="ued-mobile">&#xe6b2;</span>返回
      </div>
      <span slot="title">单选</span>
    </daq-header>
    <!--头部end-->
    <daq-radio title="单选" :options="options" :value="value" @change="changeHandle"></daq-radio>
    <p style="line-height:.8rem;padding-left:.3rem">选中的值：{{value}}</p>
    <daq-ewm></daq-ewm>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value: 'value2',
      options: [
        {
          name: '单选项',
          value: 'value1'
        },
        {
          name: '单选项',
          value: 'value2'
        },
        {
          name: '单选项',
          value: 'value3',
          disabled: true
        }
      ]
    }
  },
  methods: {
    returnPrev () {
      this.$router.go(-1)
    },
    changeHandle (value) {
      this.value = value
    }
  }
}
</script>

<style lang="scss"></style>
