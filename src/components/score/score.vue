<template>
<div class="daq-score" :class="'daq-score-' + size" :style="paddingTopBottom ? 'padding:' + (paddingTopBottom / 100) + 'rem 0' : ''">
  <span class="stars-grey" v-if="!isClick">
    <i class="ued-mobile">&#xe679;</i>
    <i class="ued-mobile">&#xe679;</i>
    <i class="ued-mobile">&#xe679;</i>
    <i class="ued-mobile">&#xe679;</i>
    <i class="ued-mobile">&#xe679;</i>
    <span class="stars-yellow" :style="'width:' + width">
      <span>
        <i class="ued-mobile">&#xe679;</i>
        <i class="ued-mobile">&#xe679;</i>
        <i class="ued-mobile">&#xe679;</i>
        <i class="ued-mobile">&#xe679;</i>
        <i class="ued-mobile">&#xe679;</i>
      </span>
    </span>
  </span>
  <span class="stars-grey" v-if="isClick">
    <i class="ued-mobile" v-for="(item, index) in list" :key="index" :class="item ? 'on' : ''" @click="scoreHandler(index)">&#xe679;</i>
  </span>
  <span class="value" v-if="!isClick">{{score}}分</span>
</div>
</template>
<script>
export default {
  name: 'daq-score',
  props: {
    // 大小目前只支持18, 32
    size: {
      type: Number,
      validator: (value) => {
        return [18, 32, 44].indexOf(value) !== -1
      },
      default: 32
    },
    // 分数默认为5
    score: {
      type: Number,
      default: 5
    },
    // 总分数默认为5
    total: {
      type: Number,
      default: 5
    },
    // 上下padding值
    paddingTopBottom: {
      type: Number
    },
    // 是否可点击
    isClick: Boolean
  },
  data () {
    return {
      list: []
    }
  },
  computed: {
    width () {
      return this.isClick ? '100%' : this.score / this.total * 100 + '%'
    }
  },
  created () {
    for (let i = 0; i < this.total; i++) {
      if (i < this.score) {
        this.list.push(true)
      } else {
        this.list.push(false)
      }
    }
  },
  methods: {
    scoreHandler (index) {
      for (let i = 0; i < this.total; i++) {
        if (i <= index) {
          this.list.splice(i, 1, true)
        } else {
          this.list.splice(i, 1, false)
        }
      }
      this.$emit('score', index + 1)
    }
  }
}
</script>
<style lang="scss" scoped>
.daq-score{
  font-size: 0;
  line-height:1;
  .ued-mobile{
    font-size:$f32;
    height:.32rem;
    line-height:.32rem;
    margin:0 .05rem;
  }
  .value{
    vertical-align:top;
    font-size: $f32;
    color:#ff9c00;
  }
  .stars-grey{
    position:relative;
    display:inline-block;
    overflow:hidden;
    i{
      vertical-align:top;
      color:$bor05;
    }
    .on{
      color:#ff9c00;
    }
  }
  .stars-yellow{
    position:absolute;
    left:0;
    top:0;
    display:inline-block;
    text-align:left;
    background:$bg04;
    overflow:hidden;
    span{
      display:inline-block;
      width:4rem;
    }
    i{
      vertical-align:top;
      color:#ff9c00;
    }
  }
}
.daq-score-18{
  .ued-mobile{
    font-size:$f20;
    height:.18rem;
    line-height:$f20;
    margin:0 .02rem;
  }
  .value{
    font-size:$f20;
  }
}
.daq-score-44{
  text-align:center;
  .ued-mobile{
    font-size:.44rem;
    height:.44rem;
    line-height:.44rem;
    margin:0 .1rem;
  }
}
</style>
