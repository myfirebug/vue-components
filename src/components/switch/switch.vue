<template>
  <div class="daq-switch">
    <div class="daq-switch-title" v-html="title"></div>
    <div class="daq-switch-list">
      <label class="daq-switch-item" v-for="option in options" :key="option.value" :for="option.value  + random"><span class="name">{{option.name}}</span>
        <input class="value" type="checkbox" :id="option.value  + random" :value="option.value" v-model="currentValue">
        <i class="checked"></i>
      </label>
    </div>
  </div>
</template>
<script>
export default {
  name: 'daq-switch',
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
  .daq-switch{
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
      position:relative;
      display:inline-block;
      width:1.04rem;
      height:.6rem;
      border-radius:.32rem;
      background:$btn01;
      transition:all .25s ease 0s;
      &:after,
      &:before{
        content: '';
        position: absolute;
      }
      &:after{
        left:0;
        top:-1px;
        width: 100%;
        height: .62rem;
        border-radius: .31rem;
        background:$bor05;
        transition:.35s cubic-bezier(.45,1,.4,1);
      }
      &:before{
        top:.03rem;
        left:.03rem;
        z-index:1;
        width: .54rem;
        height: .54rem;
        background:#fff;
        border-radius:50%;
        transition:.35s cubic-bezier(.4,.4,.25,1.35);
      }
    }
    .value:checked ~ .checked {
        &:before{
          transform: translateX(.43rem);
        }
        &:after{
          transform: scale(0);
        }
    }
  }
</style>
