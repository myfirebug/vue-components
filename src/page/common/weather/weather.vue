<template>
<div class="weather-wrapper"  v-show="flag">
  <div class="weather-bg" :class="classes()">
    <canvas class="weather-canvas" id="canvas" v-show="showCanvas"></canvas>
  </div>
  <div class="w-animation lightning" :class="weatherType">
    <div class="lightning01"></div>
    <div class="lightning02"></div>
    <div class="cloud01"></div>
    <div class="cloud02"></div>
    <div class="cloud03"></div>
    <div class="cloud04"></div>
    <div class="cloud05"></div>
    <div class="beam"></div>
    <div class="light"></div>
  </div>
  <div class="weather">
    <!--天气start-->
    <div class="weather-air">
      <div class="title">
        <span class="city" @click="showCityPicker" v-if="regionName">{{regionName}}<i class="ued-mobile">&#xe726;</i></span>
      </div>
      <div class="base">
        <div class="temperature">
          <span class="text">{{hourly_forecast[0] ? hourly_forecast[0].cond.txt : ''}}</span>
          <span class="value">{{hourly_forecast[0] ? hourly_forecast[0].tmp : ''}}°</span>
        </div>
        <div class="tourism-index">
          <span class="text">旅游指数</span>
          <span class="value">{{suggestion.trav ? suggestion.trav.brf : ''}}</span>
        </div>
      </div>
      <p class="info">{{daily_forecast[0] ? daily_forecast[0].week : ''}}，现在{{hourly_forecast[0] ? hourly_forecast[0].cond.txt : ''}}，最高气温{{daily_forecast[0] ? daily_forecast[0].tmp.max : ''}}°，最低气温{{daily_forecast[0] ? daily_forecast[0].tmp.min : ''}}°</p>
    </div>
    <!--天气end-->
    <!--24小时天气start-->
    <div class="weather-hourly-forecast">
      <div class="title">24小时天气预报</div>
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item, index) in hourly_forecast" :key="index">
          <span class="hour">{{item.date.split(' ')[1].split(':')[0]}}时</span>
          <span class="weather-font" v-html="item.cond.unicode"></span>
          <span class="tmp">{{item.tmp}}°</span>
        </swiper-slide>
      </swiper>
    </div>
    <!--24小时天气end-->
    <!--未来七天天气start-->
    <div class="weather-daily-forecast">
      <div class="title">未来一周天气预报</div>
      <ul class="daily-list">
        <li class="daily-item" v-for="(item, index) in daily_forecast" :key="index">
          <span class="week">{{item.week}}</span>
          <span class="weather-font" v-html="item.cond.unicode_d"></span>
          <span class="text">{{item.cond.txt_d}}</span>
          <span class="tmp tmp1">{{item.tmp.min}}° ~ {{item.tmp.max}}°</span>
        </li>
      </ul>
    </div>
    <!--未来七天天气end-->
    <!--生活指数start-->
    <div class="weather-suggestion">
      <div class="title">生活指数</div>
      <ul class="suggestion-list">
        <li class="suggestion-item">
          <span class="ued-mobile">&#xe730;</span>
          <span class="text">紫外线指数</span>
          <span class="api">{{suggestion.uv ? suggestion.uv.brf : ''}}</span>
        </li>
        <li class="suggestion-item">
          <span class="ued-mobile">&#xe72d;</span>
          <span class="text">穿衣指数</span>
          <span class="api">{{suggestion.drsg ? suggestion.drsg.brf : ''}}</span>
        </li>
        <li class="suggestion-item">
          <span class="ued-mobile">&#xe72e;</span>
          <span class="text">感冒指数</span>
          <span class="api">{{suggestion.flu ? suggestion.flu.brf : ''}}</span>
        </li>
        <li class="suggestion-item">
          <span class="ued-mobile">&#xe72f;</span>
          <span class="text">运动指数</span>
          <span class="api">{{suggestion.sport ? suggestion.sport.brf : ''}}</span>
        </li>
        <li class="suggestion-item">
          <span class="ued-mobile">&#xe72a;</span>
          <span class="text">体感舒适指数</span>
          <span class="api">{{suggestion.comf ? suggestion.comf.brf : ''}}</span>
        </li>
        <li class="suggestion-item">
          <span class="ued-mobile">&#xe731;</span>
          <span class="text">风力状况</span>
          <span class="api">{{daily_forecast[0] ? daily_forecast[0].wind.sc : ''}}级</span>
        </li>
        <li class="suggestion-item">
          <span class="ued-mobile">&#xe72c;</span>
          <span class="text">湿度</span>
          <span class="api">{{daily_forecast[0] ? daily_forecast[0].hum : ''}}%</span>
        </li>
        <li class="suggestion-item">
          <span class="ued-mobile">&#xe72b;</span>
          <span class="text">能见度</span>
          <span class="api">{{daily_forecast[0] ? daily_forecast[0].vis : ''}}公里</span>
        </li>
      </ul>
      <div class="aqi-wrapper">
        <div class="aqi-hd">
          <span class="value">{{aqi.aqi}}<i>{{aqi.qlty}}</i></span>
          <span class="text">空气质量指数（AQI）</span>
        </div>
        <ul class="aqi-list">
          <li class="aqi-item"><span class="text">PM2.5</span><span class="value">{{aqi.pm25}}</span></li>
          <li class="aqi-item"><span class="text">PM10</span><span class="value">{{aqi.pm10}}</span></li>
          <li class="aqi-item"><span class="text">NO<sub>2</sub></span><span class="value">{{aqi.no2}}</span></li>
          <li class="aqi-item"><span class="text">CO</span><span class="value">{{aqi.co}}</span></li>
          <li class="aqi-item"><span class="text">SO<sub>2</sub></span><span class="value">{{aqi.so2}}</span></li>
          <li class="aqi-item"><span class="text">O<sub>3</sub></span><span class="value">{{aqi.o3}}</span></li>
        </ul>
      </div>
    </div>
    <!--生活指数end-->
    <!--空气质量指数start-->
    <div class="weather-aqi"></div>
    <!--空气质量指数end-->
  </div>
</div>
</template>
<script>
import Ajax from '../../../service'
import CityPicker from '../../../components/cityPicker'
import Toast from '../../../components/toast'
import WeatherCanvas from './canvasDrop.js'
export default {
  data () {
    return {
      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 0
      },
      alarms: [],
      aqi: {},
      basic: {},
      regionName: '',
      daily_forecast: [],
      hourly_forecast: [],
      suggestion: {},
      code: 0,
      region: this.$route.query.region ? this.$route.query.region : 510100,
      flag: false,
      showCanvas: false,
      weatherType: '',
      value: {
        provinceName: '',
        provinceRegin: '',
        provinceTouch: true,
        cityName: '',
        cityRegin: '',
        cityTouch: true,
        areaName: '',
        areaRegin: '',
        areaTouch: true
      }
    }
  },
  created () {
    Ajax.getPrevRegion({
      region: this.region
    })
      .then((d) => {
        let date = d.data
        if (date.pregion === 100000) {
          this.value.provinceRegin = String(date.region)
          this.value.cityRegin = String(this.region)
        } else {
          this.value.provinceRegin = String(date.pregion)
          this.value.cityRegin = String(date.region)
          this.value.areaRegin = String(this.region)
        }
      })
    this.getWeather(this.region)
  },
  methods: {
    getWeather (region) {
      Ajax.getWeather(region)
      .then((d) => {
        if (d.msg === '1') {
          let w = d.weatherInfo
          this.flag = true
          this.alarms = w.alarms
          this.aqi = w.aqi
          this.basic = w.basic

          this.regionName = w.basic.name
          this.value.provinceName = w.basic.province
          this.value.cityName = w.basic.cnty

          this.daily_forecast = w.daily_forecast
          this.hourly_forecast = w.hourly_forecast
          this.suggestion = w.suggestion
          this.code = this.hourly_forecast[0].cond.code
        } else {
          this.flag = false
          Toast({
            message: '非常抱歉，暂无地区天气信息信息'
          })
        }
      })
    },
    showCityPicker () {
      let _this = this
      CityPicker({
        show: true,
        value: _this.value,
        callback (d) {
          console.log(d)
          _this.value = d
          if (d.areaRegin) {
            _this.region = d.areaRegin
            _this.regionName = d.areaName
          } else if (d.cityRegin) {
            _this.region = d.cityRegin
            _this.regionName = d.cityName
          } else if (d.provinceRegin) {
            Toast({
              message: '不能获取省级天气，请重新选择'
            })
          }
        }
      })
    },
    classes () {
      let str = ''
      switch (this.code) {
        // 有风
        case 104:
        case 200:
        case 201:
        case 202:
        case 203:
        case 204:
        case 205:
        case 206:
        case 207:
        case 208:
        case 209:
        case 210:
        case 211:
          str = 'weaterBg05'
          this.weatherType = 'wind'
          this.showCanvas = false
          break
        // 龙卷风
        case 212:
        case 213:
          str = 'weaterBg10'
          this.weatherType = 'tornado'
          this.showCanvas = false
          break
        // 雨
        case 300:
        case 301:
        case 305:
        case 306:
        case 307:
        case 308:
        case 309:
        case 310:
        case 311:
        case 312:
        case 313:
          str = 'weaterBg03'
          /* eslint-disable no-new */
          new WeatherCanvas({
            id: 'canvas',
            weatherType: 'rain',
            num: 100
          })
          this.weatherType = 'rain'
          this.showCanvas = true
          break
        // 冰雹
        case 304:
          str = 'weaterBg09'
          this.weatherType = 'hail'
          this.showCanvas = false
          break
        // 雷阵雨
        case 302:
        case 303:
          str = 'weaterBg06'
          /* eslint-disable no-new */
          new WeatherCanvas({
            id: 'canvas',
            weatherType: 'rain',
            num: 100
          })
          this.weatherType = 'thunder-shower'
          this.showCanvas = true
          break
        // 雪
        case 400:
        case 401:
        case 402:
        case 403:
        case 404:
        case 405:
        case 406:
        case 407:
          str = 'weaterBg02'
          /* eslint-disable no-new */
          new WeatherCanvas({
            id: 'canvas',
            weatherType: 'snow',
            num: 100
          })
          this.weatherType = 'snow'
          this.showCanvas = true
          break
        // 雾
        case 500:
        case 501:
        case 502:
          str = 'weaterBg07'
          this.weatherType = 'fog'
          this.showCanvas = false
          break
        // 沙暴
        case 503:
        case 504:
        case 505:
        case 506:
        case 507:
        case 508:
          str = 'weaterBg08'
          this.weatherType = 'sandstorm'
          this.showCanvas = false
          break
        case 101:
        case 103:
          str = 'weaterBg04'
          this.weatherType = 'cloud'
          this.showCanvas = false
          break
        case 100:
          str = 'weaterBg01'
          this.weatherType = 'sun'
          this.showCanvas = false
          break
      }
      return str
    }
  },
  mounted () {
  },
  watch: {
    region (value) {
      this.getWeather(value)
    }
  }
}
</script>
<style scoped lang="scss">
// 出太阳
.sun{
  .beam{
    display:block;
    transform-origin: top left;
    animation: beam 10s linear 0s infinite;
  }
}
.cloud{
  .light{
    width: 6.72rem;
    height:11.19rem;
    background: url('../../../assets/image/light.png') no-repeat;
    animation: light 5s linear 0s infinite;
  }
}
@keyframes light {
  0% {
    opacity: 0.2;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
}
@keyframes beam {
  0% {
    transform:translate(0, 0);
    opacity: 0;
  }
  50% {
    opacity: 1;
    transform:translate(1rem, 2rem)
  }
  100% {
    opacity: 0;
    transform:translate(2rem, 4rem);
  }
}
// 雷阵雨
.thunder-shower {
  .lightning01,
  .lightning02{
    display: block;
  }
}
// 龙券风
.tornado {
  > div{
    display: none;
  }
}
// 下雪
.snow{
  > div {
    display: none;
  }
}
// 雾
.fog{
  width:200%;
  background:url(../../../assets/image/fog.jpg) no-repeat;
  background-size:100% auto;
  animation: fog 40s ease 0s infinite;
  > div {
    display: none;
  }
}
// 沙暴
.sandstorm{
  > div {
    display:none;
  }
}
// 动画
.w-animation{
  position:fixed;
  left:0;
  right:0;
  bottom:0;
  top:0;
  z-index:2;
  > div{
    position:absolute;
  }
}
.beam{
  display:none;
  position:absolute;
  left:.8rem;
  top:1rem;
  width:2.75rem;
  height:5.07rem;
  background: url('../../../assets/image/beam.png') no-repeat;
}
.lightning01{
  display: none;
  left:2.5rem;
  width:2.49rem;
  height:6.09rem;
  background: url('../../../assets/image/w-lightning-01.png') no-repeat;
  background-size:100% 100%;
  animation: lightning 7s ease-out 0s infinite;
}
.lightning02{
  display: none;
  top:5rem;
  left:0;
  width:6.19rem;
  height:5.39rem;
  background: url('../../../assets/image/w-lightning-02.png') no-repeat;
  background-size:100% 100%;
  animation: lightning 9s ease-out 0s infinite
}

.cloud01{
  top:0;
  width:300%;
  height:2.47rem;
  background: url('../../../assets/image/w-cloud-01.png') top right no-repeat;
  background-size:auto 100%;
  animation: cloud 100s linear 0s infinite;
}
.cloud02{
  top:.5rem;
  width:300%;
  height:1.91rem;
  opacity: .5;
  background: url('../../../assets/image/w-cloud-02.png') top center no-repeat;
  background-size:auto 100%;
  animation: cloud 70s linear 0s infinite;
}
.cloud03{
  top:0;
  left:0;
  width:300%;
  height:1.74rem;
  background: url('../../../assets/image/w-cloud-03.png') top left no-repeat;
  background-size:auto 100%;
  animation: cloud 120s linear 0s infinite;
}
.cloud04{
  top:0;
  width:300%;
  height:2.72rem;
  background: url('../../../assets/image/w-cloud-04.png') top center no-repeat;
  background-size:auto 100%;
  animation: cloud 130s linear 0s infinite;
}
.cloud05{
  top:0;
  width:300%;
  height:4.41rem;
  background: url('../../../assets/image/w-cloud-05.png') top right no-repeat;
  background-size:auto 100%;
  animation: cloud 50s linear infinite;
}
// 雾
@keyframes fog {
  0% {
    left:0;
  }
  50% {
    left: -100%;
  }

  100% {
    left:0;
  }
}
// 云彩
@keyframes cloud {
  0% {
    left: 0;
    opacity: 0;
  }
  10% {
    left: -20%;
    opacity: .5;
  }
  90% {
    left: -180%;
    opacity: .5;
  }
  100% {
    left: -200%;
    opacity: 0;
  }
}
// 闪电动画
@keyframes lightning {
  from { opacity: 0; }
  92% { opacity: 0; }
  93% { opacity: 0.6; }
  94% { opacity: 0.2; }
  96% { opacity: 1; }
  to { opacity: 0; }
}
// 晴
.weaterBg01{
  background:url('../../../assets/image/daq-sun.jpg') no-repeat;
  background-size: 100% 100%;
}
// 下雪
.weaterBg02{
  background:url('../../../assets/image/daq-snow.jpg') no-repeat;
  background-size: 100% 100%;
}
// 下雨
.weaterBg03{
  background:url('../../../assets/image/daq-rain.jpg') no-repeat;
  background-size: 100% 100%;
}
// 多云
.weaterBg04{
  background:url('../../../assets/image/daq-cloud.jpg') no-repeat;
  background-size: 100% 100%;
}
// 有风
.weaterBg05{
  background:url('../../../assets/image/daq-cloudy.jpg') no-repeat;
  background-size: 100% 100%;
}
// 雷阵雨
.weaterBg06{
  background:url('../../../assets/image/daq-shower.jpg') no-repeat;
  background-size: 100% 100%;
}
// 有雾
.weaterBg07{
  background:url('../../../assets/image/daq-fog.jpg') no-repeat;
  background-size: 100% 100%;
}
// 沙暴
.weaterBg08{
  background:url('../../../assets/image/daq-sand.jpg') no-repeat;
  background-size: 100% 100%;
}
// 冰雹
.weaterBg09{
  background:url('../../../assets/image/daq-hail.jpg') no-repeat;
  background-size: 100% 100%;
}
// 龙卷风
.weaterBg10{
  background:url('../../../assets/image/daq-wind.jpg') no-repeat;
  background-size: 100% 100%;
}
.weather{
  position:relative;
  z-index:3;
  padding-top:.3rem;
  color:$fc10;
  &-bg{
    position:fixed;
    left:0;
    top:0;
    bottom:0;
    right:0;
    z-index:1;
    .weather-canvas{
      width:100%;
      height:100%;
    }
  }
  .title{
    height:.88rem;
    line-height:.88rem;
    font-size:$f32;
    text-align:center;
    border-top:1px solid rgba(255,255,255,.2);
    border-bottom:1px solid rgba(255,255,255,.2);
  }
  // 天气
  &-air{
    text-align:center;
    .title{
      height:1.56rem;
      line-height:1.56rem;
      font-size:.56rem;
      border:none;
    }
    .city{
      line-height:1;
      position:relative;
    }
    i{
      margin-left:.1rem;
      position:relative;
      top:-.03rem;
      display:inline-block;
      font-size:$f30;
      vertical-align: middle;
    }
    .base{
      display:flex;
      > div {
         flex:1
      }
      span{
        display:block;
        line-height:1;
      }
      .text{
        font-size:$f28;
      }
      .value{
        padding-top:.26rem;
        font-size:.72rem;
      }
      .tourism-index{
        .value{
          font-size:.65rem;
        }
      }
    }
    .info{
      padding:.3rem 0 .4rem 0;
      font-size:$f28;
    }
  }
  // 24小时天气
  &-hourly-forecast{
    text-align:center;
    line-height:1;
    overflow: hidden;
    .swiper-slide{
      width:14.28%;
      padding: .4rem 0;
    }
    span {
      display:block;
    }
    .hour,
    .tmp{
      font-size:$f28;
    }
    .weather-font{
      padding:.3rem 0;
      font-size:$f40;
    }
  }
  .tmp1{
    display: inline-block;
    width: 1.6rem;
    text-align: right;
  }
  // 未来七天天气
  &-daily-forecast{
    line-height:1;
    font-size:$f28;
    text-align:center;
    .daily-list{
      padding:.2rem 0;
    }
    .weather-font{
      font-size:$f36;
    }
    .daily-item{
      display:flex;
      padding:.2rem .3rem;
    }
    .weather-font,
    .text{
      flex:1;
    }
  }
  // 生活指数
  &-suggestion{
    .suggestion-list{
      padding:.2rem 0;
      font-size: 0;
    }
    .suggestion-item{
      padding:.2rem 0;
      display:inline-block;
      width:25%;
      text-align:center;
    }
    .ued-mobile{
      font-size:$f40;
    }
    .text{
      padding-top:.2rem;
      display:block;
      font-size:$f24;
    }
    .api{
      padding-top:.15rem;
      display:block;
      font-size:$f28;
    }
    .aqi-wrapper{
      line-height:1;
      padding:.1rem .3rem .4rem .3rem;
      display:flex;
      border-top:1px solid rgba(255,255,255,.2);
      .aqi-hd{
        padding-top:.5rem;
        text-align:center;
        .value{
          font-size:1.12rem;
        }
        i{
          font-size:$f32;
        }
        .text{
          padding-top:.1rem;
        }
      }
      .aqi-list{
        font-size:0;
        flex:1;
        width:100%;
      }
      .aqi-item{
        padding-top:.3rem;
        display:inline-block;
        width:50%;
        text-align:right;
        .text{
          padding:0 .2rem 0 0;
          font-size:$f26;
          display:inline-block;
        }
        .value{
          display:inline-block;
          width:1.04rem;
          height:.4rem;
          line-height:.4rem;
          font-size:$f26;
          text-align:center;
          background:rgba(255,255,255,.2);
          border-radius:.2rem;
        }
      }
    }
  }
}
</style>
