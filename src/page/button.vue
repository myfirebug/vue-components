<template>
  <div class="home">
    <daq-header>
      <div class="btn-back" slot="left" @click="returnPrev">
        <span class="ued-mobile">&#xe6b2;</span>
      </div>
      <span slot="title">按钮</span>
    </daq-header>
    <!--基础按钮-左右定宽24px，总宽度不定-->
    <daq-cells title="基础按钮-左右定宽24px，总宽度不定">
      <li style="padding:.2rem .3rem">
        <daq-button type="default" size="small" :disabled="false">多字按钮</daq-button>
        <daq-button type="default" size="small" :disabled="true">多字按钮</daq-button>
        <daq-button type="primary" size="small" :disabled="false">多字按钮</daq-button>
        <daq-button type="primary" size="small" :disabled="true">多字按钮</daq-button>
        <daq-button type="danger" size="small" :disabled="false">多字按钮</daq-button>
        <daq-button type="danger" size="small" :disabled="true">多字按钮</daq-button>
      </li>
      <li style="padding:.2rem .3rem">
        <daq-button type="default" size="small" :isRound="true" :disabled="false">多字按钮</daq-button>
        <daq-button type="default" size="small" :isRound="true" :disabled="true">多字按钮</daq-button>
        <daq-button type="primary" size="small" :isRound="true" :disabled="false">多字按钮</daq-button>
        <daq-button type="primary" size="small" :isRound="true" :disabled="true">多字按钮</daq-button>
        <daq-button type="danger" size="small" :isRound="true" :disabled="false">多字按钮</daq-button>
        <daq-button type="danger" size="small" :isRound="true" :disabled="true">多字按钮</daq-button>
      </li>
    </daq-cells>
    <!--基础按钮-定宽128px（常用于两字按钮）-->
    <daq-cells title="基础按钮-定宽128px（常用于两字按钮）">
      <li style="padding:.2rem .3rem">
        <daq-button type="default" size="small" :disabled="false">按钮</daq-button>
        <daq-button type="default" size="small" :disabled="true">按钮</daq-button>
        <daq-button type="primary" size="small" :disabled="false">按钮</daq-button>
        <daq-button type="primary" size="small" :disabled="true">按钮</daq-button>
        <daq-button type="danger" size="small" :disabled="false">按钮</daq-button>
        <daq-button type="danger" size="small" :disabled="true">按钮</daq-button>
      </li>
      <li style="padding:.2rem .3rem">
        <daq-button type="default" size="small" :isRound="true" :disabled="false">按钮</daq-button>
        <daq-button type="default" size="small" :isRound="true" :disabled="true">按钮</daq-button>
        <daq-button type="primary" size="small" :isRound="true" :disabled="false">按钮</daq-button>
        <daq-button type="primary" size="small" :isRound="true" :disabled="true">按钮</daq-button>
        <daq-button type="danger" size="small" :isRound="true" :disabled="false">按钮</daq-button>
        <daq-button type="danger" size="small" :isRound="true" :disabled="true">按钮</daq-button>
      </li>
    </daq-cells>
    <daq-cells title="基础控件-按钮（定高88px）">
      <li style="padding:.2rem .3rem">
        <daq-button type="default" :disabled="false">主操作按钮 Normal</daq-button>
        <daq-button type="default" :disabled="true">主操作按钮 Disable</daq-button>
        <daq-button type="primary" :disabled="false">主操作按钮 Normal</daq-button>
        <daq-button type="primary" :disabled="true">主操作按钮 Disable</daq-button>
        <daq-button type="danger" :disabled="false">主操作按钮 Normal</daq-button>
        <daq-button type="danger" :disabled="true">主操作按钮 Disable</daq-button>
      </li>
    </daq-cells>

    <daq-cells title="基础控件-按钮（定高72px）">
      <li style="padding:.2rem 1.5rem">
        <daq-button type="default" size="medium" :disabled="false">主操作按钮 Normal</daq-button>
        <daq-button type="default" size="medium" :disabled="true">主操作按钮 Disable</daq-button>
        <daq-button type="primary" size="medium" :disabled="false">主操作按钮 Normal</daq-button>
        <daq-button type="primary" size="medium" :disabled="true">主操作按钮 Disable</daq-button>
        <daq-button type="danger" size="medium" :disabled="false">主操作按钮 Normal</daq-button>
        <daq-button type="danger" size="medium" :disabled="true">主操作按钮 Disable</daq-button>
      </li>
    </daq-cells>
    <daq-ewm></daq-ewm>
  </div>
</template>
<script>
export default {
  methods: {
    returnPrev () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
  .daq-button{
    margin:.1rem 0;
  }
</style>
