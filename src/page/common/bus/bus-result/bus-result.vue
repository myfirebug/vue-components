<template>
    <div class="bus-box">
        <ul class="bus-list">
            <li class="bus-li" v-for="(item, index) in list" :key="index" @click="showDetails(item)">
                <div class="title-box">
                    <span class="bug-time">{{parseInt(item.duration / 60)}}分钟</span>
                    <span class="bux-long">步行{{item.walking_distance.length > 3 ? (item.walking_distance / 1000).toFixed(1) + '公里' : item.walking_distance + '米'}}</span>
                    <i class="ued-mobile"></i>
                </div>
                <ul class="busline-li">
                    <li class="cli" v-for="(busline, i) in item.segments" :key="i" v-if="busline.bus && busline.bus.buslines && busline.bus.buslines.length > 0">
                        <i class="ued-mobile busline-i"></i>{{busline.bus && busline.bus.buslines && busline.bus.buslines.length > 0 ? busline.bus.buslines[0].name.split('(')[0] : ''}}<i class="ued-mobile icon-busline-ir"></i>
                    </li>
                </ul>
            </li>
            <li class="daq-no-data" v-if="list && list.length === 0"></li>
        </ul>
        <!--详情弹层-->
        <transition name="up">
            <div class="bus-pop" v-if="show" @click="hide">
                <div class="close"></div>
                <div class="busld-infobox">
                    <p class="title">{{$route.query.start}} → {{$route.query.end}}</p>
                    <div class="title-box">
                        <span class="bug-time">{{parseInt(details.duration / 60)}}分钟分钟</span>
                        <span class="bux-long">步行{{details.walking_distance.length > 3 ? (details.walking_distance / 1000).toFixed(1) + '公里' : details.walking_distance + '米'}}</span>
                    </div>
                    <ul class="busline-li">
                        <li class="cli"  v-for="(d, i) in details.segments" :key="i" v-if="d.bus && d.bus.buslines && d.bus.buslines.length > 0">
                            <i class="ued-mobile busline-i">&#xe6bc;</i>{{d.bus && d.bus.buslines && d.bus.buslines.length > 0 ? d.bus.buslines[0].name.split('(')[0] : ''}}<i class="ued-mobile icon-busline-ir"></i>
                        </li>
                    </ul>
                </div>
                <div class="detail m-b-16">
                  <p class="start">起点（我的位置）</p>
                    <div  v-for="(a, i) in details.segments" :key="i" v-if="a.bus && a.bus.buslines && a.bus.buslines.length > 0">
                      <p class="walk">步行{{a.walking.distance && a.walking.distance.length > 3 ? (a.walking.distance /
                        1000).toFixed(1) + '公里' : (a.walking.distance ? a.walking.distance : 0) +
                        '米'}}&nbsp;&nbsp;({{a.walking.duration ? parseInt(a.walking.duration / 60) : 0}}分钟)</p>
                        <div class="route"><i class="ued-mobile m-icon-bashi">&#xe6bc;</i>
                            <div class="right"><p class="up"><span>{{a.bus.buslines[0].departure_stop.name}}</span><i class="label ui-border-radius">上</i></p>
                                <p class="road"><i>{{a.bus.buslines[0].name.split('(')[0]}}</i> <span class="direction">{{a.bus.buslines[0].name.split('--')[1].substring(0, a.bus.buslines[0].name.split('--')[1].length - 1)}}</span></p>
                                <p class="way">{{a.bus.buslines[0].via_num}}站<i class="time">（{{parseInt(a.bus.buslines[0].duration / 60)}}分钟）</i></p>
                                <p class="down"><span>{{a.bus.buslines[0].arrival_stop.name}}</span><i class="label ui-border-radius">下</i></p>
                            </div>
                        </div>
                    </div>
                    <div><p class="walk">步行100米&nbsp;&nbsp;(1分钟)</p></div>
                    <p class="end">终点</p>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    import Ajax from '../../../../service'
export default {
    data () {
        return {
            param: {
                origin: this.$route.query.origin,
                city: this.$route.query.city,
                destination: this.$route.query.destination,
                cityd: this.$route.query.cityd,
                ignoreSiteCode: 1
            },
            list: [],
            detials: {},
            show: false
        }
    },
    created () {
        Ajax.busList(this.param)
            .then((data) => {
                if (data.code === 1) {
                    this.list = []
                } else {
                this.list = data.data.transits
                }
            })
    },
    methods: {
        showDetails (item) {
            this.show = true
            this.details = item
        },
        hide () {
            this.show = false
        }
    }
}
</script>
<style lang="scss" scoped>
    .bus-box{
        background-color:#f5f5f5 ;
        .bus-list{
            width:100%;
        }
    }
    .bus-li{
        margin-top:.2rem;
        padding-top: .4rem;
        padding-left: .32rem;
        padding-right: .32rem;
        width:100%;
        font-size:0;
        background-color: white;
        .title-box{
            position: relative;
            width:100%;
            .bug-time{
                display:inline-block;
                margin-right: .16rem;
                padding-right:.16rem;
                border-right: .02rem solid #d4d4d4;
                font-size:.4rem;
                line-height:1;
                font-weight: bold;
            }
            .bux-long{
                font-size:.32rem;
                line-height:1;
            }
            i{
                position: absolute;
                top:0;
                right:0;
                font-size:0.24rem;
                display:inline-block;
                text-align: right;
                width:.13rem;
                height:.14rem;
                color:#999;
            }
            i:active{
                color:#00ceb9;
            }
        }
    }
    .busline-li{
        margin-top: .32rem;
        overflow:auto;
        display:flex;
        flex-wrap:wrap;
        li{
            position: relative;
            padding: 0 .24rem;
            margin-right: .6rem;
            margin-bottom: .24rem;
            height:.6rem;
            background-color: #f5f5f5;
            line-height:.6rem;
            font-size:.26rem;
            border-radius:.05rem;
            &.cli{
                .icon-busline-ir{
                    display:inline-block;
                    position: absolute;
                    font-size:.18rem;
                    top:0;
                    right:-.4rem;
                    color:#cccc;
                }
            }
            &:last-child{
                .icon-busline-ir{
                    display: none;
                }
            }
            .busline-i{
                margin-right: .08rem;
                color:#00ceb9;
                vertical-align:top;
            }
            .icon-busline-ir{
                display:none;
                position: absolute;
                top:0;
                right:-.36rem;
                color:#ccc;
            }
        }
    }
    // 弹层
    .bus-pop{
        position:fixed;
        left:0;
        top:0;
        right:0;
        bottom:0;
        overflow:hidden;
        overflow-y:auto;
        background:$bg02;
        .close{
            position:fixed;
            right:-.8rem;
            top:-.8rem;
            z-index:999;
            width:1.6rem;
            height:1.6rem;
            background:rgba(0,0,0,.5);
            border-radius:50%;
            &:after,
            &:before{
                content:'';
                position:absolute;
                left:.35rem;
                bottom:.4rem;
                width:.3rem;
                height:.04rem;
                background:#fff;
            }
            &:after{
                transform:rotate(45deg)
            }
            &:before{
                transform:rotate(-45deg)
            }
        }
    }
    .busld-infobox{
        padding-top: .4rem;
        padding-left: .32rem;
        background-color: white;
        font-size: 0;
        .title{
            font-size:.4rem;
        }
        .title-box{
            width:100%;
            .bug-time{
                color:#666;
                display:inline-block;
                margin-right: .15rem;
                margin-top: .2rem;
                padding-right: .1rem;
                border-right: .02rem solid #d4d4d4;
                font-size:.26rem;
                line-height:1;
            }
            .bux-long{
                color:#666;
                font-size:.26rem;
                line-height:1;
            }
        }
        .busline-li{
            margin-top: .32rem;
            overflow:auto;
            li{
                position: relative;
                float:left;
                padding: 0 .25rem;
                margin-right: .6rem;
                margin-bottom: .24rem;
                height:.6rem;
                background-color: #f5f5f5;
                line-height:.6rem;
                font-size:.26rem;
                .busline-i{
                    margin-right: .05rem;
                    color:#00ceb9;
                }
                .icon-busline-ir{
                    display:none;
                    position: absolute;
                    top:0;
                    right:-.36rem;
                    color:#d4d4d4;
                }
                &.cli{
                    .icon-busline-ir{
                        display:inline-block;
                        position: absolute;
                        font-size:.18rem;
                        top:0;
                        right:-.36rem;
                        color:#d4d4d4;
                    }
                }
                &:last-child{
                    .icon-busline-ir{
                        display:none;
                    }
                }
            }
        }
    }
    .detail{
        margin-top: .16rem;
        .end,.start{
            position: relative;
            display: flex;
            align-items: center;
            min-height: 1.1rem;
            padding-left: 1.72rem;
            padding-right: .32rem;
            background: #fff;
            color: #333;
            font-size: .32rem;
        }
        .start:before{
            content: "";
            position: absolute;
            left: 1.15rem;
            top: 50%;
            transform: translateY(-50%);
            width: .18rem;
            height: .18rem;
            border: .04rem solid #00ceb9;
            border-radius: 50%;
        }
        .end:before{
            content: "";
            position: absolute;
            left: 1.15rem;
            top: 50%;
            transform: translateY(-50%);
            width: .18rem;
            height: .18rem;
            border: .04rem solid #f12c20;
            border-radius: 50%;
        }
        .walk{
            position: relative;
            display: flex;
            z-index: 1;
            align-items: center;
            height: 1.06rem;
            padding-left: 1.72rem;
            font-size: .26rem;
            color: #666;
        }
        .walk:before{
            content: "";
            position: absolute;
            left: 1.21rem;
            top: -.26rem;
            width: .12rem;
            height: 1.65rem;
            background: url(../../../../assets/image/bus-detail-1.png) no-repeat 50%/cover;

        }
        .route {
            display: flex;
            align-items: center;
            background: #fff;
            .m-icon-bashi {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-basis: 1.16rem;
                font-size: .4rem;
                color: #00ceb9;
            }
            .right{
                position: relative;
                padding-left: .6rem;
                .up{
                    padding-top: .16rem;
                    display: flex;
                    align-items: center;
                    font-size: .32rem;
                    color: #333;
                    span{
                        line-height: .6rem;
                    }
                    .label{
                        position: relative;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: .36rem;
                        height: .32rem;
                        margin-left: .16rem;
                        font-size: .2rem;
                        color: #00ceb9;
                    }
                    .label:after{
                        border-color: #12a2fe;
                        border-radius: .08rem;
                    }
                    .ui-border-radius:after{
                        content: "";
                        position: absolute;
                        box-sizing: border-box;
                        pointer-events: none;
                        left: 0;
                        top: 0;
                        width: 200%;
                        height: 200%;
                        transform: scale(.5);
                        transform-origin: left top;
                        border: 1px solid #00ceb9;
                        border-radius: .06rem;
                    }
                }
                .road{
                    display: flex;
                    align-itmes: center;
                    padding-top: .18rem;
                    i{
                        display: flex;
                        align-items: center;
                        padding: 0 .16rem;
                        height: .48rem;
                        border-radius: .04rem;
                        font-size: .26rem;
                        color: #fff;
                        background: #00ceb9;
                    }
                }
                .direction{
                    line-height: .48rem;
                    padding-left: .16rem;
                    color: #999;
                }
                .way{
                    display: flex;
                    align-items: center;
                    height: .58rem;
                    font-size: .26rem;
                    color: #00ceb9;
                    .time{
                        color: #999;
                    }
                }
                .down{
                    padding-bottom: .16rem;
                    display: flex;
                    align-items: center;
                    font-size: .32rem;
                    color: #333;
                    span{
                        line-height: .6rem;
                    }
                    .label{
                        position: relative;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: .36rem;
                        height: .32rem;
                        margin-left: .16rem;
                        font-size: .2rem;
                        color: #00ceb9;
                    }
                    .label:after{
                        border-color: #12a2fe;
                        border-radius: .08rem;
                    }
                    .ui-border-radius:after{
                        content: "";
                        position: absolute;
                        box-sizing: border-box;
                        pointer-events: none;
                        left: 0;
                        top: 0;
                        width: 200%;
                        height: 200%;
                        transform: scale(.5);
                        transform-origin: left top;
                        border: 1px solid #00ceb9;
                        border-radius: .06rem;
                    }
                }
            }
            .right:before{
                content: "";
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: .2rem;
                height: 2.01rem;
                background: url(../../../../assets/image/bus-detail-2.png) no-repeat;
                background-size:100% 100%;
            }
        }
    }
    .up-enter-active, .up-leave-active {
        transition: transform .5s;
    }
    .up-enter, .up-leave-to /* .fade-leave-active below version 2.1.8 */ {
        transform:translateY(100%)
    }
</style>
