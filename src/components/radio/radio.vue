<template>
  <div class="daq-radio">
    <div class="daq-radio-title" v-html="title"></div>
    <div class="daq-radio-list">
      <label class="daq-radio-item" v-for="option in options" :key="option.value" :for="option.value  + random"><span class="name">{{option.name}}</span>
        <input class="value" type="radio" :id="option.value  + random" :value="option.value" v-model="currentValue">
        <i class="checked ued-mobile">&#xe6b6;</i>
      </label>
    </div>
  </div>
</template>
<script>
export default {
  name: 'daq-radio',
  props: {
    title: String,
    options: {
      type: Array,
      required: true
    },
    value: {}
  },
  data () {
    return {
      currentValue: this.value,
      random: parseInt(Math.random() * 1000000)
    }
  },
  watch: {
    currentValue (value) {
      this.$emit('change', value)
    }
  }
}
</script>
<style lang="scss" scoped>
  .daq-radio{
    border-bottom:1px solid $bor05;
    &-title{
      height:.9rem;
      padding:.4rem 0 0 .3rem;
      line-height:1;
      font-size:$f28;
      color:$fc08;
      background:$bg02;
      border-bottom:1px solid $bor05;
    }
    &-list{
      padding-left:.3rem;
    }
    &-item{
      display:flex;
      height:.96rem;
      padding-right: .3rem;
      line-height:.96rem;
      border-bottom:1px solid $bor05;
      &:last-child{
        border:none;
      }
    }
    .name{
      flex:1;
      font-size:$f32;
    }
    .value{
      opacity:0;
    }
    .checked{
      font-size:0;
      color:$fc01;
      transition:all .25s ease 0s;
    }
    .value:checked ~ .checked {
      font-size:$f32;
    }
  }
</style>
