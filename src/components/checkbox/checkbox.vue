<template>
  <div class="daq-checkbox">
    <div class="daq-checkbox-title" v-html="title"></div>
    <div class="daq-checkbox-list">
      <label class="daq-checkbox-item" v-for="option in options" :key="option.value" :for="option.value  + random"><span class="name">{{option.name}}</span>
        <input class="value" type="checkbox" :id="option.value  + random" :value="option.value" v-model="currentValue">
        <i class="checked ued-mobile">&#xe6b6;</i>
      </label>
    </div>
  </div>
</template>
<script>
export default {
  name: 'daq-checkbox',
  props: {
    title: String,
    options: {
      type: Array,
      required: true
    },
    value: Array
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
  .daq-checkbox{
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
      align-items:center;
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
      display:inline-block;
      width:.44rem;
      height:.44rem;
      line-height:.44rem;
      text-align:center;
      color:$fc10;
      border:.02rem solid  $bor05;
      border-radius:50%;
      font-size:0;
      transition:all .25s ease 0s;
    }
    .value:checked ~ .checked {
      opacity:1;
      color:$fc10;
      font-size:$f24;
      background:$fc01;
      border-color:$fc01;
    }
  }
</style>
