<template>
  <div class="home">
    <div class="logo"><img src="../assets/mobile_logo.png" alt="极客mobile" /></div>
    <!--列表start-->
    <daq-cells title="JS Components">
      <!-- <daq-cells-item title="store" url="store" value="状态管理"></daq-cells-item> -->
      <daq-cells-item title="Toast" url="toast" value="提示"></daq-cells-item>
      <daq-cells-item title="Tips" url="tips" value="提示"></daq-cells-item>
      <daq-cells-item title="Tabs" url="tabs" value="选项卡"></daq-cells-item>
      <daq-cells-item title="PopUp" url="popUp" value="侧滑"></daq-cells-item>
      <daq-cells-item title="ActionSheet" url="actionSheet" value="操作列表"></daq-cells-item>
      <daq-cells-item title="Swiper" url="swiper" value="图片滚动"></daq-cells-item>
      <daq-cells-item title="DatePicker" url="datePicker" value="日期"></daq-cells-item>
      <daq-cells-item title="Range" url="range" value="滑块"></daq-cells-item>
      <daq-cells-item title="PriceRange" url="priceRange" value="价格滑块"></daq-cells-item>
      <daq-cells-item title="Dialog" url="dialog" value="弹窗"></daq-cells-item>
      <daq-cells-item title="Calendar" url="calendar" value="日历"></daq-cells-item>
      <daq-cells-item title="CityPicker" url="cityPicker" value="地址联动"></daq-cells-item>
      <daq-cells-item title="ScrollLoad" url="scrollLoad" value="滚动加载"></daq-cells-item>
      <daq-cells-item title="Score" url="score" value="评分"></daq-cells-item>
      <daq-cells-item title="CheckPhoto" url="checkPhoto" value="图片预览"></daq-cells-item>
      <daq-cells-item title="PullRefresh" url="pullRefresh" value="下拉刷新"></daq-cells-item>
    </daq-cells>
    <daq-cells title="CSS Components">
      <daq-cells-item title="SearchBar" url="searchBar" value="搜索栏"></daq-cells-item>
      <daq-cells-item title="Navigation" url="navigation" value="导航菜单"></daq-cells-item>
      <daq-cells-item title="List" url="list" value="列表"></daq-cells-item>
      <daq-cells-item title="Badge" url="badge" value="数字角标"></daq-cells-item>
      <daq-cells-item title="BottomMenu" url="bottomMenuBar" value="底部菜单"></daq-cells-item>
    </daq-cells>
    <daq-cells title="FORM Components">
      <daq-cells-item title="Radio" url="radio" value="单选"></daq-cells-item>
      <daq-cells-item title="Checkbox" url="checkbox" value="复选"></daq-cells-item>
      <daq-cells-item title="Switch" url="switch" value="开关"></daq-cells-item>
      <daq-cells-item title="Uploader" url="uploader" value="上传图片"></daq-cells-item>
      <daq-cells-item title="TextareaLimit" url="textareaLimit" value="限制输入文本框"></daq-cells-item>
      <daq-cells-item title="Button" url="button" value="按钮"></daq-cells-item>
    </daq-cells>
    <daq-cells title="COMMON Template">
      <daq-cells-item title="weather" url="weather" value="天气"></daq-cells-item>
      <daq-cells-item title="trainSearch" url="train-search" value="火车查询"></daq-cells-item>
      <daq-cells-item title="busSearch" url="bus-search" value="公交查询"></daq-cells-item>
    </daq-cells>
    <!--列表end-->
    <daq-tabbar>
      <daq-tabbar-item url="home" text="首页" defaultIcon="&#xe6ea;" activeIcon="&#xe6ec;">
        <daq-badge size="large" style="position:absolute;left:0;top:-.1rem;margin-left:.3rem">12</daq-badge>
      </daq-tabbar-item>
      <daq-tabbar-item url="bottomMenuBar" text="菜单" defaultIcon="&#xe6ea;" activeIcon="&#xe6ec;"></daq-tabbar-item>
      <daq-tabbar-item url="list" text="列表" defaultIcon="&#xe6ea;" activeIcon="&#xe6ec;"></daq-tabbar-item>
      <daq-tabbar-item url="button" text="按钮" defaultIcon="&#xe6ea;" activeIcon="&#xe6ec;"></daq-tabbar-item>
      <daq-tabbar-item url="badge" text="角标" defaultIcon="&#xe6ea;" activeIcon="&#xe6ec;"></daq-tabbar-item>
    </daq-tabbar>
    <daq-ewm></daq-ewm>
  </div>
</template>
<script>
export default {}
</script>

<style lang="scss" scoped>
.home{
  padding-bottom:.96rem;
}
.logo{
  padding:1rem 0;
  text-align:center;
  background:#f5f5f5;
  border-bottom:1px solid #d4d4d4;
  img{
    width:2rem;
  }
}
</style>
