<template>
  <div class="home">
    <!--头部start-->
    <daq-header>
      <div class="btn-back" slot="left" @click="returnPrev">
        <span class="ued-mobile">&#xe6b2;</span>返回
      </div>
      <span slot="title">查看图片</span>
      <div slot="right">
        <span class="ued-mobile">&#xe6b3;</span>
      </div>
    </daq-header>
    <ul class="photo-list">
      <li v-for="(item, index) in list" :key="index" @click="showCheckPhoto(index)">
        <img :src="item.value" :alt="item.name">
      </li>
    </ul>
    <daq-check-photo :show="show" :list="list" @hide="hideHandler" :initialSlide="initialSlide"></daq-check-photo>
    <!--头部end-->
    <daq-ewm></daq-ewm>
  </div>
</template>
<script>
export default {
  data () {
    return {
      initialSlide: 0,
      show: false,
      list: [
        {
          name: '小猪短租-邀请好友注册各获500元,在395多座城拥有超30万套真实房源让您的旅程不再单调,更充分感受住宿之美,人情之暖,分享之乐.',
          value: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1533112418583&di=b1ac93408f55595b76e17f1d02a7931e&imgtype=0&src=http%3A%2F%2Fpic9.photophoto.cn%2F20081128%2F0033033999061521_b.jpg'
        },
        {
          name: '景点图片[veer]提供正版高品质的图片素材,下载即用,让设计师更快提升工作效率专业设计作品交易的平台,让所有网页设计师轻松找到自己想要的素材!',
          value: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1533112418583&di=c2efb9f10390a79d689df06a21e0e8ee&imgtype=0&src=http%3A%2F%2Fpic23.photophoto.cn%2F20120503%2F0034034456597026_b.jpg'
        },
        {
          name: '千库网为您提供500万精品PNG图片库免费下载,200万海报背景素材,700万精品模板素材图片库免费下载电商素材,平面素材,APP/UI素材,H5素材.海报背景Banner素材',
          value: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1533112418582&di=c0960b24d0bc2f245f511fa0e6fad3fa&imgtype=0&src=http%3A%2F%2Fpic34.photophoto.cn%2F20150112%2F0034034439579927_b.jpg'
        },
        {
          name: '点击查看源网页',
          value: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1533112418582&di=3f8f02e2e593d45ba3341d4613e6efda&imgtype=0&src=http%3A%2F%2Fpic21.photophoto.cn%2F20111106%2F0020032891433708_b.jpg'
        }
      ]
    }
  },
  methods: {
    returnPrev () {
      this.$router.go(-1)
    },
    // 显示
    showCheckPhoto (index) {
      this.initialSlide = index
      this.show = true
    },
    // 隐藏
    hideHandler () {
      this.show = false
    }
  }
}
</script>

<style lang="scss">
  .photo-list{
    padding:.2rem .2rem 0 .2rem;
    li{
      width:50%;
      height:2.4rem;
      overflow:hidden;
      display:inline-block;
      padding:.1rem;
    }
  }
</style>
