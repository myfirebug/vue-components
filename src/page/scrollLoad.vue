<template>
  <div class="home">
    <!--头部start-->
    <daq-header>
      <div class="btn-back" slot="left" @click="returnPrev">
        <span class="ued-mobile">&#xe6b2;</span>返回
      </div>
      <span slot="title">滚动</span>
    </daq-header>
    <!--头部end-->
    <daq-scroll-load classname="default" requestName="getList" :limit="4" :params="params" @list = "getList" :list="list">
      <ul slot="list" v-show="list && list.length > 0">
        <li v-for="item in list" :key="item.id">
          <div class="pic-wrap"><img :src="item.picture" :alt="item.title" /></div>
          <h1>{{item.name}}</h1>
        </li>
      </ul>
    </daq-scroll-load>
    <daq-ewm></daq-ewm>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: [],
      params: {
        siteCode: 'qdnzxw',
        lang: 'cn',
        page: 1
      }
    }
  },
  methods: {
    returnPrev () {
      this.$router.go(-1)
    },
    getList (value) {
      this.list = this.list.concat(value)
    }
  }
}
</script>
<style lang="scss" scoped>
.pic-wrap{
  width:100%;
  height:3.5rem;
  overflow:hidden;
  img{
    width:100%;
  }
}
li{
  padding:.2rem .3rem;
  border-bottom:1px solid #ddd
}
</style>
