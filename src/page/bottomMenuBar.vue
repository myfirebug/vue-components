<template>
  <div class="home">
    <!--头部start-->
    <daq-header>
      <div class="btn-back" slot="left" @click="returnPrev">
        <span class="ued-mobile">&#xe6b2;</span>返回
      </div>
      <span slot="title">尾部菜单</span>
      <div slot="right">
        <span class="ued-mobile">&#xe6b3;</span>
      </div>
    </daq-header>
    <!--头部end-->
    <!--基础菜单栏一-菜单个数不超过五个-->
    <daq-cells title="基础菜单栏一-菜单个数不超过五个">
      <li>
      <daq-tabbar :fixed="true">
      <daq-tabbar-item url="home" text="首页" defaultIcon="&#xe6ea;" activeIcon="&#xe6ec;">
        <daq-badge size="large" style="position:absolute;left:0;top:-.1rem;margin-left:.3rem">12</daq-badge>
      </daq-tabbar-item>
      <daq-tabbar-item url="bottomMenuBar" text="菜单" defaultIcon="&#xe6ea;" activeIcon="&#xe6ec;"></daq-tabbar-item>
      <daq-tabbar-item url="list" text="列表" defaultIcon="&#xe6ea;" activeIcon="&#xe6ec;"></daq-tabbar-item>
      <daq-tabbar-item url="button" text="按钮" defaultIcon="&#xe6ea;" activeIcon="&#xe6ec;"></daq-tabbar-item>
      <daq-tabbar-item url="badge" text="角标" defaultIcon="&#xe6ea;" activeIcon="&#xe6ec;"></daq-tabbar-item>
    </daq-tabbar>
      </li>
    </daq-cells>
    <!--纯图标菜单栏-->
    <daq-cells title="纯图标菜单栏">
      <li>
      <daq-tabbar :fixed="true">
      <daq-tabbar-item type="showIcon" url="home" defaultIcon="&#xe6ea;" activeIcon="&#xe6ec;">
        <daq-badge size="large" style="position:absolute;left:0;top:-.1rem;margin-left:.3rem">12</daq-badge>
      </daq-tabbar-item>
      <daq-tabbar-item type="showIcon" url="bottomMenuBar" defaultIcon="&#xe6ea;" activeIcon="&#xe6ec;"></daq-tabbar-item>
      <daq-tabbar-item type="showIcon" url="list" defaultIcon="&#xe6ea;" activeIcon="&#xe6ec;"></daq-tabbar-item>
      <daq-tabbar-item type="showIcon" url="button" defaultIcon="&#xe6ea;" activeIcon="&#xe6ec;"></daq-tabbar-item>
      <daq-tabbar-item type="showIcon" url="badge" defaultIcon="&#xe6ea;" activeIcon="&#xe6ec;"></daq-tabbar-item>
    </daq-tabbar>
      </li>
    </daq-cells>
    <!--纯文字菜单栏-->
    <daq-cells title="纯文字菜单栏">
      <li>
      <daq-tabbar :fixed="true">
      <daq-tabbar-item type="showText" text="首页" url="home" defaultIcon="&#xe6ea;" activeIcon="&#xe6ec;">
        <daq-badge size="large" style="position:absolute;left:0;top:-.1rem;margin-left:.3rem">12</daq-badge>
      </daq-tabbar-item>
      <daq-tabbar-item type="showText" text="菜单" url="bottomMenuBar" defaultIcon="&#xe6ea;" activeIcon="&#xe6ec;"></daq-tabbar-item>
      <daq-tabbar-item type="showText" text="列表" url="list" defaultIcon="&#xe6ea;" activeIcon="&#xe6ec;"></daq-tabbar-item>
      <daq-tabbar-item type="showText" text="按钮" url="button" defaultIcon="&#xe6ea;" activeIcon="&#xe6ec;"></daq-tabbar-item>
      <daq-tabbar-item type="showText" text="角标" url="badge" defaultIcon="&#xe6ea;" activeIcon="&#xe6ec;"></daq-tabbar-item>
    </daq-tabbar>
      </li>
    </daq-cells>
    <!--特殊的菜单栏-->
    <daq-cells title="特殊的菜单栏">
      <li>
      <daq-tabbar :fixed="false">
      <daq-tabbar-item text="首页" url="home" defaultIcon="&#xe6ea;" activeIcon="&#xe6ec;">
        <daq-badge size="large" style="position:absolute;left:0;top:-.1rem;margin-left:.3rem">12</daq-badge>
      </daq-tabbar-item>
      <daq-tabbar-item text="菜单" url="bottomMenuBar" defaultIcon="&#xe6ea;" activeIcon="&#xe6ec;"></daq-tabbar-item>
      <daq-tabbar-item type="special" text="列表" url="list" defaultIcon="&#xe6ea;" activeIcon="&#xe6ec;"></daq-tabbar-item>
      <daq-tabbar-item text="按钮" url="button" defaultIcon="&#xe6ea;" activeIcon="&#xe6ec;"></daq-tabbar-item>
      <daq-tabbar-item text="角标" url="badge" defaultIcon="&#xe6ea;" activeIcon="&#xe6ec;"></daq-tabbar-item>
    </daq-tabbar>
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

<style lang="scss"></style>
