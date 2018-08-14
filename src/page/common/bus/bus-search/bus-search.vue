<template>
    <div class="bus-box">
        <div class="map-container" id="containerMap" slot="ft"
             style="width:1rem;height:1rem;display:none;"></div>
        <div class="bus-searchtopbox">
            <div class="sbus-topbox">
                <div class="daq-search-wrap bus-inmypo">
                    <daq-badge size="mini"></daq-badge>
                    <input style="background: none; border-radius: 0.06rem;" v-model="start.name" placeholder="我的位置"
                           id="js_start" ref="start"></div>
                <div class="daq-search-wrap bus-inend">
                    <daq-badge size="mini"></daq-badge>
                    <input style="background: none; border-radius: 0.06rem;" placeholder="输入终点..."
                           v-model="end.name"  id="js_end" ref="end"></div>
            </div>
            <div class="bus-searchbtn"><i class="icon-bus-transformation ued-mobile" @click="exchange">&#xe6c3;</i><span @click="search">搜索</span></div>
        </div>
        <ul class="bus-linelist">
            <li  v-for="(item, index) in recordList" :key="index">
                <router-link  class="linelist-box" tag="div" :to="{path:'/bus-result',query: {
                    origin: item.start.lng + ',' + item.start.lat,
                    city: item.start.adcode,
                    start: item.start.name,
                    destination: item.end.lng + ',' + item.end.lat,
                    cityd: item.end.adcode,
                    end: item.end.name
                }}">
                    <i class="ued-mobile"></i> {{item.start.name}} → {{item.end.name}}
                </router-link>
            </li>
        </ul>
        <div class="clearlist" v-if="recordList && recordList.length > 0" @click="clearBusQueryRecord">清除历史记录</div>
        <router-link  class="fixbtn-box" tag="div" :to="{path:'/near-bus',query: {
                    location: my.lng + ',' + my.lat
                }}">
            <i class="ued-mobile"></i>
            <p>附近</p>
        </router-link>
        <div id="select"></div>
    </div>
</template>
<script>
  import Toast from '../../../../components/toast'
  import Dialog from '../../../../components/dialog'
import localStorage from '../../../../util/localStorage.js'
let map = new AMap.Map('containerMap')
let t = null
export default {
    data () {
        return {
            my: {
                lat: '',
                lng: '',
                adcode: ''
            },
            start: {
                lat: '',
                lng: '',
                adcode: '',
                name: '我的位置'
            },
            end: {
                lat: '',
                lng: '',
                adcode: '',
                name: ''
            },
            recordList: []
        }
    },
    created () {
        this.getBusQueryRecord()
    },
    methods: {
        // 获取定位
        mapInit () {
            let _this = this
            let geolocation = null
            map.plugin('AMap.Geolocation', function () {
                geolocation = new AMap.Geolocation({
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0,
                    convert: true,
                    showButton: true,
                    buttonPosition: 'LB',
                    buttonOffset: new AMap.Pixel(10, 20),
                    showMarker: true,
                    showCircle: true,
                    panToLocation: true,
                    zoomToAccuracy: true
                })
                map.addControl(geolocation)
                geolocation.getCurrentPosition()
                t = Toast({
                    type: 'loading',
                    message: '加载中...',
                    duration: 10000
                })
                AMap.event.addListener(geolocation, 'complete', _this.onComplete)
                AMap.event.addListener(geolocation, 'error', _this.onError)
            })
        },
        // 成功
        onComplete (data) {
            // 当前位置
            let _this = this
            _this.start.lng = _this.my.lng = data.position.lng
            _this.start.lat = _this.my.lat = data.position.lat
            _this.start.name = data.formattedAddress
            _this.start.adcode = _this.my.adcode = data.addressComponent.adcode
            t.show = false
        },
        // 失败
        onError () {
            Toast({
                type: 'html',
                duration: 3000,
                message: '获取当前位置失败！请设置开启定位服务！'
            })
        },
        // 搜索
        autocomplete (id, name, type) {
            let _this = this
            map.plugin('AMap.Autocomplete', function (a) {
                let autoOptions = {
                    city: '',
                    input: id,
                    output: 'select',
                    datatype: 'bus'
                }
                let autocomplete = new AMap.Autocomplete(autoOptions)
                AMap.event.addListener(autocomplete, 'select', function (data) {
                    _this[type] = {
                        lat: data.poi.location.lat,
                        lng: data.poi.location.lng,
                        adcode: data.poi.adcode,
                        name: data.poi.name
                    }
                })
            })
        },
        // 获取搜索记录
        getBusQueryRecord () {
            this.recordList = localStorage.get('busQueryRecord') ? localStorage.get('busQueryRecord') : ''
        },
        // 保存搜索记录
        setBusQueryRecord () {
          if (!this.start.name) {
            /* eslint-disable no-new */
            new Toast({
              message: '请输入起始位置'
            })
            this.$refs.start.focus()
            return
          }
          if (!this.end.name) {
            /* eslint-disable no-new */
            new Toast({
              message: '请输入终点位置'
            })
            this.$refs.end.focus()
            return
          }
            let arr = localStorage.get('busQueryRecord') ? localStorage.get('busQueryRecord') : []
            let str = JSON.stringify(localStorage.get('busQueryRecord'))
            if (str.indexOf(this.start.name) === -1 || str.indexOf(this.end.name) === -1) {
                arr.push({
                    start: this.start,
                    end: this.end
                })
                localStorage.set('busQueryRecord', arr)
                this.getBusQueryRecord()
            }
            this.$router.push({
                path: 'bus-result',
                query: {
                    origin: this.start.lng + ',' + this.start.lat,
                    city: this.start.adcode,
                    start: this.start.name,
                    destination: this.end.lng + ',' + this.end.lat,
                    cityd: this.end.adcode,
                    end: this.end.name
                }
            })
        },
        // 清空记录
        clearBusQueryRecord () {
          let _this = this
          /* eslint-disable no-new */
            new Dialog({
              title: '温馨提示',
              content: '您确定要清空历史记录吗？',
              comfirmValue: '确认',
              cancelValue: '取消',
              align: 'left',
              comfirmFn () {
                localStorage.set('busQueryRecord', '')
                _this.getBusQueryRecord()
              }
            })
        },
        search () {
            this.setBusQueryRecord()
        },
        exchange () {
            let o = this.start
            this.start = this.end
            this.end = o
        }
    },
    mounted () {
        this.mapInit()
        this.autocomplete('js_start', this.start.address, 'start')
        this.autocomplete('js_end', this.end.address, 'end')
    }
}
</script>
<style lang="scss" scoped>
    .bus-box{
        position: relative;
        width:100%;
        min-height:100%;
        background-color: #f5f5f5;
    }
    .bus-searchtopbox{
        display:flex;

        width:100%;
        height:1.76rem;
        background-color: white;
    }
    .sbus-topbox{
        flex:1;
        height:1.76rem;
        .bus-inmypo{
            display:flex;
            margin-left: .32rem;
            height:.88rem;
            text-align: left;
            line-height:.88rem;
            font-size:.32rem;
            color:#333;
            border-radius: 0;
            border-bottom: .01rem solid #e2e2e2;
            i{
                margin-right: .2rem;
                background-color: #00ceb9;
                vertical-align: middle;
                margin-top:.38rem;
            }
            input{
                width:100%;
                text-align: left;
            }
        }
        .bus-inend{
            display:flex;
            margin-left: .32rem;
            height:.88rem;
            text-align: left;
            line-height:.88rem;
            font-size:.32rem;
            border-radius: 0;
            border-bottom: 1px solid #e2e2e2;
            i{
                margin-right: .2rem;
                margin-top:.38rem;
                background-color: #ff9e05;
                vertical-align: middle;
            }
            input{
                width:100%;
                text-align: left;
            }
        }

    }
    .bus-searchbtn{

        margin-left: .35rem;
        width:1.72rem;
        height:1.76rem;
        .icon-bus-transformation{
            margin-top: .64rem;
            margin-bottom: -.12rem;
            margin-right: .33rem;
            display:inline-block;
            width:.48rem;
            height:.48rem;
            // background: url("images/icon-transformation.png");
            background-size:cover;

        }
        span{
            font-size:.32rem;

        }
    }
    .bus-searchbtn:active{
        .icon-bus-transformation{
            // background: url("images/icon-transformation-active.png");
            background-size:cover;
        }
        span{
            color:#00ceb9;
        }
    }
    .bus-linelist{
        margin-top: .16rem;
        background-color: white;
        width:100%;
        overflow: auto;

        li{
            padding:0 .3rem;
            border-bottom: 1px solid #e2e2e2;
            .linelist-box{
                padding:.15rem 0;
            }
            i{
                font-size:.28rem;
                margin-right: .1rem;
                margin-top: .02rem;
                color:#333;
            }
            span{
                font-size:.28rem;
            }
            .linelist-saddress{
                color:#999;
            }
        }
        li:active{
            background-color: #f5f5f5;
        }
    }
    .clearlist{
        width:100%;
        height:.88rem;
        background-color: white;
        font-size:.28rem;
        line-height:.88rem;
        color:#999;
        text-align: center;
    }
    .fixbtn-box{
        position: fixed;
        bottom:.32rem;
        right:.32rem;
        width:.88rem;
        height:.88rem;
        border-radius: .88rem;
        background-color: #00ceb9;
        text-align: center;
        i{
            color:white;
            font-size:.28rem;
        }
        p{
            color:white;
            font-size:.2rem;
            //line-height: .2rem;
        }
    }
    .fixbtn-box:active{
        background-color:#00b9a6;
    }
</style>
