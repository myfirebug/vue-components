<template>
<div>
  <daq-cells title="大评分">
    <daq-score :size="44" :score="score" :paddingTopBottom="40"  :total="5" :isClick="true" @score="scoreHandler"></daq-score>
  </daq-cells>
  <daq-cells title="中评分">
    <daq-score :score="3" :total="5" :paddingTopBottom="30"></daq-score>
  </daq-cells>
  <daq-cells title="小评分">
    <daq-score :size="18" :score="4.2" :paddingTopBottom="40"></daq-score>
  </daq-cells>
  <daq-ewm></daq-ewm>
</div>
</template>
<script>
export default {
  data () {
    return {
      score: 5
    }
  },
  methods: {
    scoreHandler (a) {
      this.score = a
    }
  }
}
</script>

<style lang="scss"></style>
