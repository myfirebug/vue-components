<template>
  <div class="home">
    <daq-header :fixed ="true">
      <div class="btn-back" slot="left" @click="returnPrev">
        <span class="ued-mobile">&#xe6b2;</span>
      </div>
      <span slot="title">下拉刷新</span>
    </daq-header>
    <daq-pullRefresh requestName="getList" :params="params" @pull="getPullData">
      <ul>
        <li v-for="item in list" :key="item.id">
          <div class="pic-wrap"><img :src="item.picture" :alt="item.title" /></div>
          <h1>{{item.name}}</h1>
        </li>
      </ul>
    </daq-pullRefresh>
    <daq-ewm></daq-ewm>
  </div>
</template>
<script>
  import Ajax from '../service'
  export default {
    data () {
      return {
        list: [],
        params: {
          siteCode: 'qdnzxw',
          lang: 'cn',
          page: 1,
          limitPage: 3
        }
      }
    },
    created () {
      Ajax.getList(this.params)
        .then((data) => {
          let d = data.datas || data.data
          this.list = d
        })
    },
    methods: {
      returnPrev () {
        this.$router.go(-1)
      },
      getPullData (value) {
        this.list = value
      }
    }
  }
</script>

<style lang="scss" scoped>
  .daq-button{
    margin:.1rem 0;
  }
</style>
