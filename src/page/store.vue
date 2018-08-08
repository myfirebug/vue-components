<template>
  <transition :name="$root.transitionName">
    <div class="home">
      <daq-header>
        <div class="btn-back" slot="left" @click="returnPrev">
          <span class="ued-mobile">&#xe6b2;</span>返回
        </div>
        <span slot="title">状态管理</span>
      </daq-header>
      <p>mutations加10：{{count.count}}</p>
      <p>{{newCount}}</p>
      <daq-button type="primary" :disabled="false" @change="$store.commit('updateCount',10)">mutations加10</daq-button>
      <daq-button type="primary" :disabled="false" @change="$store.dispatch('updateCountAsync')">action加5</daq-button>
      <daq-ewm></daq-ewm>
    </div>
  </transition>
</template>
<script>
import {
  mapState,
  mapMutations,
  mapActions,
  mapGetters
} from 'vuex'

export default {
  computed: {
    ...mapState(['count']),
    ...mapGetters(['newCount']),
    newCount () {
      return this.$store.getters.newCount
    }
  },
  methods: {
    ...mapMutations(['updateCount']),
    ...mapActions(['updateCountAsync']),
    returnPrev () {
      this.$router.go(-1)
    }
  }
}
</script>

<style></style>
