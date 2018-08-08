<template>
    <!--  页面重构：Mr.Zhang  |  前端开发：Mr.Zhang  |  创建：2018/6/25   -->
    <div class="train-box">

        <!--广告图start-->
        <img src="../../../assets/image/train_banner.jpg" alt="">
        <!-- <swiper :options="bannerSwiperOptions">
            <swiper-slide v-for = "(item, index) in ads" :key="index">
                <img :src="item">
            </swiper-slide>
            <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
        </swiper> -->
        <!--广告图end-->

        <div class="content"><h3 class="title">火车票查询</h3>
            <div class="direction js_direction">
                <div class="start ui-border-b">
                    <input type="text" @click="showLocation(1)" placeholder="出发地" v-model="startCity" class="js_input js_start">
                </div>
                <a href="javascript:;" @click="exchangeCity" class="exchange-btn ued-mobile m-icon-qiehuan-zuoyou js_exchange"></a>
                <div class="end ui-border-b">
                    <input type="text" @click="showLocation(2)" placeholder="到达地" v-model="endCity" class="js_input js_end">
                </div>
            </div>
            <a href="javascript:;" class="date ui-border-b" @click="showDatePicker">
                <span class="date-txt js_date-txt">{{nowStr}}</span>
                <span class="week js_date-week">{{weekday}}</span>
                <i class="ued-mobile m-icon-jiantou-you">&#xe6b1;</i>
            </a>
            <div class="btn-wrapper">
                <daq-button type="primary" class="query-btn" @change="checkFn">查询</daq-button>
            </div>
        </div>
        <div class="train-bottomfont">
            <div class="train-fonttop">
                <i></i>
                <span>温馨提示</span>
                <i></i>
            </div>
            <p>亲爱的游客，目前平台只支持火车票查询功能</p>
            <p>暂未开通购票功能！</p>
        </div>
        <train-location v-if="show" :show="show" :type="type" @getStation="station"></train-location>
    </div>
</template>
<script>
    import TrainLocation from './train-location.vue'
    import DatePicker from '../../../components/datePicker'
    import Toast from '../../../components/toast'
    import localStorage from '../../../util/localStorage.js'

    export default {
        components: {
            'train-location': TrainLocation
        },
        data () {
            return {
                show: false,
                type: 1,
                startCity: '',
                endCity: '',
                now: '',
                today: '',
                nowStr: '',
                max: '',
                weekday: '',
                weekArr: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
                params: {},
                ads: '',
                historyItems: localStorage.get('trainHistory') ? localStorage.get('trainHistory') : [],
                bannerSwiperOptions: {
                    loop: true,
                    autoplay: {
                        delay: 2500,
                        disableOnInteraction: false
                    },
                    speed: 1000,
                    pagination: {
                        el: '.swiper-pagination'
                    }
                }
            }
        },
        created () {
            let date = new Date()
            let month = date.getMonth() + 1
            let strDate = date.getDate()
            let minMonth = month
            let maxMonth = month
            if (month >= 1 && month <= 9) {
                month = '0' + month
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = '0' + strDate
            }
            this.now = date.getFullYear() + '-' + month + '-' + strDate
            this.params.date = this.now
            this.today = this.now
            this.nowStr = date.getFullYear() + '年' + month + '月' + strDate + '日'
            let day = date.getDay()
            this.weekday = this.weekArr[day] + '(今天)'
            this.params.weekday = day
            if (minMonth > 2) {
                maxMonth = maxMonth + 2
                if (maxMonth >= 1 && maxMonth <= 9) {
                    maxMonth = '0' + maxMonth
                }
                this.max = date.getFullYear() + '-' + maxMonth + '-' + strDate
            }
        },
        methods: {
            showLocation (type) {
                let inputEle = document.querySelectorAll('input')
                this.show = true
                this.type = type
                for (let i = 0; i < inputEle.length; i++) {
                    inputEle[i].blur()
                }
            },
            station (value, type) {
                this.type = type
                this.show = false
                if (this.type === 1) {
                    this.startCity = value.name
                    this.params.deptStationCode = value.code
                    this.trainStart = value
                } else {
                    this.endCity = value.name
                    this.params.arrStationCode = value.code
                    this.trainEnd = value
                }
            },
            exchangeCity () {
                let tmpCity = this.startCity
                let tmpCityCode = this.params.deptStationCode
                this.startCity = this.endCity
                this.endCity = tmpCity
                this.params.deptStationCode = this.params.arrStationCode
                this.params.arrStationCode = tmpCityCode
            },
            showDatePicker () {
                let _this = this
                /* eslint-disable no-new */
                new DatePicker({
                    show: true,
                    date: 'date',
                    min: _this.now,
                    max: _this.max,
                    value: _this.now,
                    callback (value) {
                        let arr = value.split('-')
                        let day = new Date(value).getDay()
                        _this.params.date = value
                        _this.nowStr = arr[0] + '年' + arr[1] + '月' + arr[2] + '日'
                        _this.weekday = _this.weekArr[day]
                        _this.params.weekday = day
                        if (value === _this.today) {
                            _this.weekday += '(今天)'
                        }
                    }
                })
            },
            checkFn () {
                if (!this.startCity) {
                    Toast({
                        message: '请选择出发地！'
                    })
                    return
                }
                if (!this.endCity) {
                    Toast({
                        message: '请选择到达地！'
                    })
                    return
                }
                // 判断缓存是否有数据
                if (JSON.stringify(this.historyItems).indexOf(this.trainStart.id) === -1) {
                  this.historyItems.push(this.trainStart)
                }
                if (JSON.stringify(this.historyItems).indexOf(this.trainEnd.id) === -1) {
                  this.historyItems.push(this.trainEnd)
                }
                localStorage.set('trainHistory', this.historyItems)
                this.$router.push({path: '/train-result', query: this.params})
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .swiper-pagination-bullets{
        bottom: 1.1rem;
    }
    body, html {
        height: 100%;
    }
    .swiper-container{
        height: 3.75rem;
        width:100%;
        overflow: hidden;
        li{height:100%}
        img{
            width:100%
        }
    }
    .train-box{
        width:100%;
        height:100%;
        background-color: $bg02;
        .content{
            position: relative;
            z-index: 1;
            width: 6.86rem;
            margin: -.8rem auto 0;
            padding-top: .16rem;
            background: $bg04;
            border-radius: .2rem;
            box-shadow: 0 0.08rem 0.15rem 0 rgba(0,0,0,.027);
            .title{
                font-size: $f40;
                color: $fc06;
                text-align: center;
                line-height: 1.18rem;
            }
            .direction{
                position: relative;
                display: flex;
                align-items: center;
                padding: 0 .32rem;
                .start,.end{
                    border-bottom: .01rem solid $bor06;
                    top: 0;
                    display: flex;
                    flex-basis: 2.64rem;
                    align-items: center;
                    height: .76rem;
                    transition: all .25s ease 0s;
                    input {
                        flex: 1;
                        text-align: center;
                        max-width: 2.64rem;
                        color: $fc06;
                        font-size: $f32;
                    }
                }
                .ui-border-b:after, .ui-border-br:before,.ui-border-tb:before{
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    height: 1px;
                    transform: scaleY(.33);
                    transform-origin: 0 100%;
                    background: #e8e8e8;
                }
                .exchange-btn{
                    position: relative;
                    z-index: 1;
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: .44rem;
                    color: $fc08;
                }
                .m-icon-qiehuan-zuoyou:before{
                    content: "\e6c0";
                }
            }
            .date{
                border-bottom: .01rem solid #e2e2e2;
                margin: 0 .32rem;
                height: .95rem;
                display: flex;
                align-items: center;
                .date-txt{
                    margin-right: .16rem;
                    font-size: $f32;
                    color: $fc06;
                }
                .week{
                    flex: 1;
                    font-size: .26rem;
                    color: $fc08;
                }
                .m-icon-jiantou-you{
                    font-size:.24rem;
                    color:$fc08;
                }
            }
            .btn-wrapper{
                padding: .4rem .32rem .56rem;
                display: flex;
                .query-btn{
                    display: block;
                    width: 100%;
                    height: 100%;
                    color: $fc10;
                    line-height: .88rem;
                }
            }
        }
    }
    //底部信息
    .train-bottomfont{
        position: absolute;
        bottom:0;
        left:0.64rem;
        width:6.51rem;
        height:1.8rem;
        .train-fonttop{
            line-height: 0.24rem;
            height:0.5rem;
            display: flex;
            i{
                flex: 1;
                display:inline-block;
                margin-top: 0.12rem;
                width: 2.35rem;
                height:0.01rem;
                background-color: #e2e2e2;
                vertical-align: bottom;
            }
            span{
                color:$fc08;
                font-size:$f32;
                margin-left: 0.24rem;
                margin-right: 0.22rem;
            }

        }
        p{
            text-align: center;
            font-size:$f26;
            line-height:0.34rem;
            color:$fc08;
        }
    }
</style>
