<template>
  <div class="home">
    <!--头部start-->
    <daq-header>
      <div class="btn-back" slot="left" @click="returnPrev">
        <span class="ued-mobile">&#xe6b2;</span>返回
      </div>
      <span slot="title">图片滚动</span>
    </daq-header>
    <!--头部end-->
    <daq-cells title="水平方向滚动">
      <daq-swiper width="100%" :height="300" :autoPlay="false">
        <div class="daq-swiper-slide">我是第一张</div>
        <div class="daq-swiper-slide">我是第二张</div>
        <div class="daq-swiper-slide">我是第三张</div>
        <div class="daq-swiper-slide">我是第四张</div>
        <div class="daq-swiper-slide">我是第五张</div>
        <div class="daq-swiper-slide">我是第六张</div>
        <div class="daq-swiper-slide">我是第七张</div>
      </daq-swiper>
    </daq-cells>
    <daq-cells title="垂直方向滚动">
      <daq-swiper width="100%" :height="300" direction="vertical" :autoPlay="true" :speed="5000">
        <div class="daq-swiper-slide">我是第一张</div>
        <div class="daq-swiper-slide">我是第二张</div>
        <div class="daq-swiper-slide">我是第三张</div>
        <div class="daq-swiper-slide">我是第四张</div>
        <div class="daq-swiper-slide">我是第五张</div>
        <div class="daq-swiper-slide">我是第六张</div>
        <div class="daq-swiper-slide">我是第七张</div>
      </daq-swiper>
    </daq-cells>
    <daq-cells title="垂直方向滚动默认选中第三个">
      <daq-swiper width="100%" :height="300" direction="vertical" :autoPlay="true" :speed="5000" :initialSlide="2">
        <div class="daq-swiper-slide">我是第一张</div>
        <div class="daq-swiper-slide">我是第二张</div>
        <div class="daq-swiper-slide">我是第三张</div>
        <div class="daq-swiper-slide">我是第四张</div>
        <div class="daq-swiper-slide">我是第五张</div>
        <div class="daq-swiper-slide">我是第六张</div>
        <div class="daq-swiper-slide">我是第七张</div>
      </daq-swiper>
    </daq-cells>
    <!-- <daq-cells title="垂直不规则滑动">
      <div class="nav">
        <ul class="nav-list">
          <li class="nav-item">1</li>
          <li class="nav-item">2</li>
          <li class="nav-item">3</li>
          <li class="nav-item">4</li>
          <li class="nav-item">5</li>
          <li class="nav-item">6</li>
          <li class="nav-item">7</li>
          <li class="nav-item">8</li>
          <li class="nav-item">9</li>
          <li class="nav-item">10</li>
          <li class="nav-item">11</li>
          <li class="nav-item">12</li>
          <li class="nav-item">13</li>
          <li class="nav-item">14</li>
          <li class="nav-item">1</li>
          <li class="nav-item">2</li>
          <li class="nav-item">3</li>
          <li class="nav-item">4</li>
          <li class="nav-item">5</li>
          <li class="nav-item">6</li>
          <li class="nav-item">7</li>
          <li class="nav-item">8</li>
          <li class="nav-item">9</li>
          <li class="nav-item">10</li>
          <li class="nav-item">11</li>
          <li class="nav-item">12</li>
          <li class="nav-item">13</li>
          <li class="nav-item">14</li>
          <li class="nav-item">1</li>
          <li class="nav-item">2</li>
          <li class="nav-item">3</li>
          <li class="nav-item">4</li>
          <li class="nav-item">5</li>
          <li class="nav-item">6</li>
          <li class="nav-item">7</li>
          <li class="nav-item">8</li>
          <li class="nav-item">9</li>
          <li class="nav-item">10</li>
          <li class="nav-item">11</li>
          <li class="nav-item">12</li>
          <li class="nav-item">13</li>
          <li class="nav-item">14</li>
          <li class="nav-item">1</li>
          <li class="nav-item">2</li>
          <li class="nav-item">3</li>
          <li class="nav-item">4</li>
          <li class="nav-item">5</li>
          <li class="nav-item">6</li>
          <li class="nav-item">7</li>
          <li class="nav-item">8</li>
          <li class="nav-item">9</li>
          <li class="nav-item">10</li>
          <li class="nav-item">11</li>
          <li class="nav-item">12</li>
          <li class="nav-item">13</li>
          <li class="nav-item">14</li>
          <li class="nav-item">1</li>
          <li class="nav-item">2</li>
          <li class="nav-item">3</li>
          <li class="nav-item">4</li>
          <li class="nav-item">5</li>
          <li class="nav-item">6</li>
          <li class="nav-item">7</li>
          <li class="nav-item">8</li>
          <li class="nav-item">9</li>
          <li class="nav-item">10</li>
          <li class="nav-item">11</li>
          <li class="nav-item">12</li>
          <li class="nav-item">13</li>
          <li class="nav-item">14</li>
          <li class="nav-item">1</li>
          <li class="nav-item">2</li>
          <li class="nav-item">3</li>
          <li class="nav-item">4</li>
          <li class="nav-item">5</li>
          <li class="nav-item">6</li>
          <li class="nav-item">7</li>
          <li class="nav-item">8</li>
          <li class="nav-item">9</li>
          <li class="nav-item">10</li>
          <li class="nav-item">11</li>
          <li class="nav-item">12</li>
          <li class="nav-item">13</li>
          <li class="nav-item">14</li>
        </ul>
      </div>
    </daq-cells> -->
    <daq-ewm></daq-ewm>
  </div>
</template>
<script>
/* import Slide from '../util/slide.js' */
export default {
  methods: {
    returnPrev () {
      this.$router.go(-1)
    }
  },
  mounted () {
    /* eslint-disable no-new */
    /* new Slide('.nav', {
      wrapper: '.nav-list',
      direction: 'vertical'
    }) */
  }
}
</script>

<style lang="scss">
  .nav{
    width:100%;
    height:3rem;
    border:5px solid #aaa;
    overflow:hidden;
  }
</style>
