<template>
    <!--  页面重构：Mr.Zhang  |  前端开发：Mr.Zhang  |  创建：2018/6/28   -->
    <div class="train-box">
        <div class="header m-b-16 ui-border-b">
            <div class="start"><p class="addr">{{trainDesc.deptStationName}}</p>
                <p class="time">{{trainDesc.deptTime}}</p></div>
            <div class="mid"><p class="trains">{{trainNum}}</p>
                <p class="length">{{trainDesc.runTime}}</p></div>
            <div class="end"><p class="addr">{{trainDesc.arrStationName}}</p>
                <p class="time">{{trainDesc.arrTime}}</p></div>
        </div>
        <dl class="category m-b-16">
            <dt class="category-tit ui-border-b"><i class="name">类别</i> <i class="num">余票</i> <i class="price">价格</i></dt>
            <dd v-for="s in trainDesc.seatList" :key="s.id" class="category-card ui-border-b">
                <i class="name">{{s.seatName}}</i>
                <i class="num">{{s.seatNum}}</i>
                <span class="price"><i class="unit">¥</i>{{s.seatPrice}}</span>
            </dd>
        </dl>
        <div class="moment" v-if="monents.length > 0">
            <div class="moment-tit ui-border-b">{{trainNum}}</div>
            <dl class="moment-list">
                <dt class="momnet-list-tit">
                <p class="col">序号</p>
                <p class="col">车站</p>
                <p class="col">到达时间</p>
                <p class="col">出发时间</p>
                <p class="col">停留时间</p></dt>
                <dd v-for="item in monents" :key="item.id" class="moment-card">
                    <p class="col">{{item.station_no}}</p>
                    <p class="col">{{item.station_name}}</p>
                    <p class="col">{{item.arrive_time}}</p>
                    <p class="col">{{item.start_time}}</p>
                    <p class="col">{{item.stopover_time}}</p>
                </dd>
            </dl>
        </div>
    </div>
</template>

<script>
    import Ajax from '../../../service/index.js'
    export default {
        data () {
            return {
                params: {
                    deptDate: this.$route.query.deptDate,
                    deptStationCode: this.$route.query.deptStationCode,
                    arrStationCode: this.$route.query.arrStationCode,
                    trainNo: '',
                    ignoreSiteCode: 1
                },
                trainNum: this.$route.query.trainNum,
                monents: [],
                trainDesc: {}
            }
        },
        created () {
            this.getTrainList()
            this.getTrainNo()
        },
        methods: {
            // 获取车次编码
            getTrainNo () {
                let _this = this
                Ajax.getTrainNo(this.params).then((data) => {
                    if (data.code === 0) {
                        let dataList = data.datas
                        for (let i = 0; i < dataList.length; i++) {
                            if (dataList[i].trainNum === _this.trainNum) {
                                _this.params.trainNo = dataList[i].trainNo
                            }
                        }
                        _this.getTrainMoment()
                    }
                }).catch((err) => {
                    console.log(err)
                })
            },
            // 获取列车时刻表
            getTrainMoment () {
                let _this = this
                Ajax.getTrainDetail(this.params).then((data) => {
                    _this.monents = data.data.data
                }).catch((err) => {
                    console.log(err)
                })
            },
            // 获取火车列表信息
            getTrainList () {
                let _this = this
                Ajax.getTrainList(this.params).then((data) => {
                    let dataList = data.data.trainInfos
                    for (let i = 0; i < dataList.length; i++) {
                        if (dataList[i].trainCode === this.trainNum) {
                            _this.trainDesc = dataList[i]
                        }
                    }
                }).catch((err) => {
                    console.log(err)
                })
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
    .header{
        position: relative;
        display: flex;
        height: 1.63rem;
        padding: .28rem .32rem;
        align-items: center;
        justify-content: space-between;
        background: $bg04;
        .start,.end{
            padding: 0 .48rem;
            color: $fc06;
            .addr{
                font-size: $f32;
            }
            .time{
                font-size: $f40;
                width: 100%;
                line-height: .54rem;
            }

        }
        .mid{
            font-size: .26rem;
            flex: 1;
            .trains{
                position: relative;
                line-height: .36rem;
                padding-bottom: .1rem;
                text-align: center;
            }
            .trains:after{
                content: "";
                position: absolute;
                left: 50%;
                bottom: 0;
                width: 1.86rem;
                height: .1rem;
                transform: translateX(-50%);
                background: url('../../../assets/image/traininquiry_details_line.png') no-repeat 50%/cover;
            }
            .length{
                text-align: center;
                line-height: .56rem;
            }
        }
    }
    .m-b-16 {
        margin-bottom: .16rem;
    }
    .category{
        background-color:$bg04;
        display:flex;
        flex-wrap:wrap;
        justify-content:flex-end;
    }
    .category-tit{
        width:100%;
        font-size: .28rem;
        color: $fc07;
    }
    .category-card{
        width:7.18rem;
    }
    .category-card,
    .category-tit {
        border-bottom:.01rem solid $bor06;
        height: .88rem;
        background: $bg04;
        padding: 0 .32rem;
        display: flex;
        align-items: center;
        &:last-child {
            border-bottom: none;
        }
    }
    .category-card .name, .category-card .price, .category-tit .name, .category-tit .price {
        flex: 1;
    }
    .category-card .price, .category-tit .price {
        text-align: right;
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
    .category-card{
        font-size: $f32;
        color: $fc06;
        .unit{
            font-size:$f24;
        }
    }
    .category-card .price{
        color: $fc01;
        font-size: $f40;
    }
    .category-card .price, .category-tit .price {
        text-align: right;
    }
    .moment{
        background: #fff;
        .moment-tit{
            display: flex;
            align-items: center;
            height: .88rem;
            padding: 0 .32rem;
            font-size: $f32;
            color: $fc06;
        }
    }
    .ui-border-b, .ui-border-l, .ui-border-r, .ui-border-radius .ui-border-br, .ui-border-t, .ui-border-tb{
        position: relative;
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
    .moment-list {
        border-top: 0.01rem solid #e2e2e2;
        .momnet-list-tit{
            height: .8rem;
            padding-top: .2rem;
            color: $fc08;
            .col{
                flex: 1;
                text-align: center;
                font-size: $f26;
            }
        }
        .moment-card,.momnet-list-tit{
            height: .6rem;
            display: flex;
            align-items: center;
            .col{
                flex: 1;
                text-align: center;
                font-size: $f26;
            }
        }
    }
</style>
