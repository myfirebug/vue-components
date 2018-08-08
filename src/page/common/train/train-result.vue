<template>
    <div class="daq-train-result">
        <div class="search m-b-16 js_header">
            <a href="javascript:;" class="pre js_pre" @click="minusDay">
                <i class="ued-mobile">&#xe6b2;</i>前一天
            </a>
            <a href="javascript:;" class="middle ui-border-radius js_date" @click="chooseDate">
                <p class="date ui-border-r js_date-txt">{{nowStr}} {{weekArr[day]}}</p>
                <i class="ued-mobile">&#xe6c1;</i>
            </a>
            <a href="javascript:;" class="next js_next" @click="addDay">
                后一天<i class="ued-mobile">&#xe6b1;</i>
            </a>
        </div>
        <ul class="train-list js_list" v-if="!noData">
            <li v-for="item in trainInfoList" :key="item.id" class="train-card m-b-16">
                <router-link :to="{path: 'train-detail', query: {deptDate: item.deptDate, trainNum: item.trainCode, deptStationCode: item.deptStationCode, arrStationCode: item.arrStationCode}}" class="card-wrapper js_link">
                    <div class="top ui-border-b">
                        <div class="start">
                            <p class="time">{{item.deptTime}}</p>
                            <p class="addr">{{item.deptStationName}}</p>
                        </div>
                        <div class="mid">
                            <p class="trains">{{item.trainCode}}</p>
                            <p class="length">{{item.runTime}}小时</p>
                        </div>
                        <div class="end">
                            <p class="time">{{item.arrTime}}</p>
                            <p class="addr">{{item.arrStationName}}</p>
                        </div>
                        <p class="price"><i class="unit">¥</i> <i class="money">{{item.minPrice}}</i> <i class="gray">起</i></p></div>
                    <div class="bottom">
                        <i v-for="s in item.seatList" :key="s.id" class="txt">{{s.seatName}}：{{s.seatNum}}张</i>
                    </div>
                </router-link>
            </li>
        </ul>
        <div class="daq-no-data" v-if="noData"></div>
    </div>
</template>

<script>
    import DatePicker from '../../../components/datePicker'
    import Ajax from '../../../service/index.js'
    let preEle = ''
    let nextEle = ''
    export default {
        data () {
            return {
                noData: false,
                weekArr: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
                date: this.$route.query.date,
                day: this.$route.query.weekday,
                deptStationCode: this.$route.query.deptStationCode,
                arrStationCode: this.$route.query.arrStationCode,
                dateArr: [],
                nowStr: '',
                trainInfoList: [],
                today: '',
                max: ''
            }
        },
        created () {
            this.$nextTick(function () {
                preEle = document.querySelector('.js_pre')
                nextEle = document.querySelector('.js_next')
                this.compareTime()
            })
            this.dateArr = this.date.split('-')
            this.nowStr = this.dateArr[1] + '月' + this.dateArr[2] + '日'
            let todayDate = new Date()
            let year = todayDate.getFullYear()
            let month = todayDate.getMonth() + 1
            let day = todayDate.getDate()
            if (month >= 1 && month <= 9) {
                month = '0' + month
            }
            if (day >= 0 && day <= 9) {
                day = '0' + day
            }
            this.today = year + '-' + month + '-' + day
            this.getTrainList()
        },
        methods: {
            getTrainList () {
                let _this = this
                // 请求火车票信息
                let params = {
                    deptStationCode: this.deptStationCode,
                    arrStationCode: this.arrStationCode,
                    deptDate: this.date,
                    ignoreSiteCode: 1
                }
                _this.noData = false
                Ajax.getTrainList(params).then((data) => {
                    if (data.code === 0) {
                        if (data.data && data.data.trainInfos.length > 0) {
                            let arr = []
                            for (let i = 0, len = data.data.trainInfos.length; i < len; i++) {
                              if (data.data.trainInfos[i].canBuy) {
                                arr.push(data.data.trainInfos[i])
                              }
                            }
                            if (arr.length === 0) {
                              _this.noData = true
                            }
                            _this.trainInfoList = arr
                        } else {
                            _this.noData = true
                        }
                    } else {
                        if (data.message === '没有符合条件的车次信息') {
                            _this.noData = true
                        }
                    }
                }).catch((err) => {
                    console.log(err)
                })
            },
            chooseDate () {
                let _this = this
                let date = new Date()
                let month = date.getMonth() + 1
                let strDate = date.getDate()
                let maxMonth = month + 1
                if (month >= 1 && month <= 9) {
                    month = '0' + month
                }
                if (maxMonth >= 1 && maxMonth <= 9) {
                    maxMonth = '0' + maxMonth
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = '0' + strDate
                }
                let now = date.getFullYear() + '-' + month + '-' + strDate
                this.max = date.getFullYear() + '-' + maxMonth + '-' + strDate
                /* eslint-disable no-new */
                new DatePicker({
                    show: true,
                    date: 'date',
                    min: now,
                    max: _this.max,
                    value: _this.date,
                    callback (value) {
                        let dateArr = value.split('-')
                        let day = new Date(value).getDay()
                        _this.date = value
                        _this.nowStr = dateArr[1] + '月' + dateArr[2] + '日'
                        _this.day = day
                        _this.getTrainList()
                    }
                })
            },
            addDay () {
                this.removeClass(preEle, 'disabled')
                if (this.hasClass(nextEle, 'disabled')) {
                    return
                }
                if (this.day === 6) {
                    this.day = 0
                } else {
                    this.day++
                }
                let d = new Date(this.date)
                d = d.setDate(d.getDate() + 1)
                d = new Date(d)
                let year = d.getFullYear()
                let month = d.getMonth() + 1
                let day = d.getDate()
                if (month >= 1 && month <= 9) {
                    month = '0' + month
                }
                if (day >= 0 && day <= 9) {
                    day = '0' + day
                }
                this.date = year + '-' + month + '-' + day
                this.nowStr = month + '月' + day + '日'
                this.getTrainList()
                this.compareTime()
            },
            minusDay () {
                this.removeClass(nextEle, 'disabled')
                if (this.hasClass(preEle, 'disabled')) {
                    return
                }
                if (this.day === 0) {
                    this.day = 6
                } else {
                    this.day--
                }
                let d = new Date(this.date)
                d = d.setDate(d.getDate() - 1)
                d = new Date(d)
                let year = d.getFullYear()
                let month = d.getMonth() + 1
                let day = d.getDate()
                if (month >= 1 && month <= 9) {
                    month = '0' + month
                }
                if (day >= 0 && day <= 9) {
                    day = '0' + day
                }
                this.date = year + '-' + month + '-' + day
                this.nowStr = month + '月' + day + '日'
                this.getTrainList()
                this.compareTime()
            },
            compareTime () {
                let todyStr = Date.parse(this.today)
                let dateStr = Date.parse(this.date)
                let maxStre = Date.parse(this.max)
                if (dateStr === todyStr) {
                    this.addClass(preEle, 'disabled')
                    return
                }
                if (dateStr === maxStre) {
                    this.addClass(nextEle, 'disabled')
                }
            },
            hasClass (ele, cls) {
                return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
            },
            addClass (ele, cls) {
                if (!this.hasClass(ele, cls)) ele.className += ' ' + cls
            },
            removeClass (ele, cls) {
                if (this.hasClass(ele, cls)) {
                    let reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
                    ele.className = ele.className.replace(reg, ' ')
                }
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .train-box{
        background-color: #f5f5f5;
        width:100%;
        min-height:100%;
    }
    .search{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: .88rem;
        padding: 0 .32rem;
        background: $bg04;
        font-size: $f28;
        color: $fc06;
        .pre,.next{
            i{
                color:$fc08;
                font-size:$f24;
            }
        }
        .disabled {
            color: $fc08;
        }
        .middle{
            position: relative;
            height: .56rem;
            display: flex;
            padding-right: .15rem;
            align-items: center;
            flex-wrap: wrap;
            border: 1px solid #d3d3d3;
            i{
                margin-bottom: .05rem;
            }
            .date{
                border-right:.01rem solid $bor06;
                margin-right: .15rem;
                padding: 0 .16rem;
                height: .32rem;
                line-height: .32rem;

            }
        }
        .middle:active {
            border:.01rem solid #12a2fe;;
            .date{
                color:#12a2fe;
                border-right: .01rem solid #12a2fe;
            }
            i{
                color:#12a2fe;
            }

        }
    }
    .train-list{
        .card-wrapper{
            display: block;
            padding: 0 .32rem;
            background: $bg04;
        }
        .top{
            position: relative;
            display: flex;
            height: 1.35rem;
            align-items: center;
            .start,.end{
                color: $fc06;
            }
            .time{
                width: 100%;
                font-size: $f40;
                line-height: .64rem;
            }
            .addr{
                width: 100%;
                font-size: $f26;
                line-height: .58rem;
            }
            .mid{
                font-size: $f22;
                min-width: 1.82rem;
                margin: 0 .5rem;
                .trains{
                    position: relative;
                    line-height: .56rem;
                    text-align: center;
                }
                .trains:after{
                    content: "";
                    position: absolute;
                    left: 50%;
                    bottom: 0;
                    width: 1.44rem;
                    height: .12rem;
                    transform: translateX(-50%);
                    background: url('../../../assets/image/train-list-img-1.png') no-repeat 50%;
                    background-size: 100% 100%;
                }
                .length{
                    text-align: center;
                    line-height: .44rem;
                }
            }
            .price{
                position: absolute;
                right: 0;
                top: .28rem;
                font-size: 0;
                line-height: .6rem;
                .unit{
                    font-size: .24rem;
                    color: $fc01;
                }
                .money{
                    margin-left: 0.04rem;
                    font-size: .4rem;
                    color: $fc01;
                }
                .gray{
                    margin-left: 0.04rem;
                    font-size: .24rem;
                    color: $fc08;
                }
            }
        }
        .bottom{
            display: flex;
            align-items: center;
            padding: .15rem 0;
            flex-wrap: wrap;
            border-top: .01rem solid $bor06;
            .txt{
                font-size: .22rem;
                color: $fc07;
                margin-right: .32rem;
                line-height: .4rem;
                height: .4rem;
            }
        }
    }
    .ui-border-br:after, .ui-border-l:after, .ui-border-r:after{
        top: 0;
        width: 1px;
        height: 100%;
        transform: scaleX(.33);
        transform-origin: 0 0;
        background: #e8e8e8;
    }
    .ui-border-br:after, .ui-border-r:after{
        right: 0;
    }
    .m-b-16{
        margin-bottom: .16rem;
    }
    .ui-border-b:after, .ui-border-br:before, .ui-border-tb:before{
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        transform: scaleY(.33);
        transform-origin: 0 100%;
        background: #e8e8e8;
    }
</style>
