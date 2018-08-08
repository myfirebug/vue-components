<template>
    <div class="daq-train-location-wrap">
        <div class="daq-search">
            <form class="daq-search-wrap" action="javascript:;" @submit="setKey()">
                <p class="daq-search-remind" v-show="showRemind" @click="clearRemind"><i class="ued-mobile ic-search"></i>请输入关键字进行搜索</p>
                <input type="text" class="daq-search-input" maxlength="20" ref="key" @blur="setKey"/>
            </form>
        </div>
        <div class="city-orientation">
            <!--当前定位-->
            <div class="city-orientation-address" v-show="block1">
                <p class="city-orientation-name">当前定位</p>
                <div class="map-container" id="containerMap"></div>
                <button class="daq-button daq-button-default daq-button-large daq-button-location" @click="locationInit"><i class="ued-mobile">&#xe645;</i>{{formattedAddress}}</button>
            </div>
            <!--历史记录-->
            <div v-if="historyItems.length > 0" v-show="block2" class="city-orientation-address">
                <p class="city-orientation-name">历史记录</p>
                <div>
                    <button v-for="item in historyItems" :data-id="item.id" class="daq-button daq-button-default daq-button-small" :key="item.id" @click="getStation(item)">{{item.name}}</button>
                </div>
            </div>

            <!--索引字母-中间-->
            <div class="city-orientation-letter-main" v-show="block5">
                <p class="city-orientation-name">字母搜索</p>
                <a v-for="(letter, index) in letterList" :class="{active: index===num}" @click="chooseLetter(index)" :key="letter.id" href="javascript:;" class="letter">{{letter}}</a>
            </div>
            <!--索引结果-中间-->
            <ul class="city-list" v-show="block4">
                <li>
                    <a href="javascript:;">
                        <p class="letter">{{this.initial}}</p>
                        <p v-for="item in stations" @click="getStation(item)" :key="item.id" class="name">{{item.name}}</p>
                    </a>
                </li>
            </ul>

        </div>
    </div>
</template>

<script>
    import config from '../../../service/config.js'
    import Toast from '../../../components/toast'
    import Ajax from '../../../service/index.js'
    let map

    export default {
        data () {
            return {
                num: '',
                block1: true,
                block2: true,
                block3: true,
                block4: false,
                block5: true,
                showRemind: true,
                longitude: config.longitude,
                latitude: config.latitude,
                formattedAddress: '未知位置',
                historyItems: this.$parent.historyItems.reverse(),
                initial: '',
                stations: [],
                letterList: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
            }
        },
        props: {
            show: {
                type: Boolean
            },
            type: {
                type: Number
            }
        },
        created () {
            this.locationInit()
            if (this.historyItems.length > 12) {
              this.historyItems.length = 12
            }
        },
        methods: {
            getHistoryList () {
            },
            getHotCityList () {
            },
            chooseLetter (index) {
                let _this = this
                this.hideAllBlocks()
                this.num = index
                this.initial = this.letterList[index]
                let params = {
                    initial: this.initial,
                    ignoreSiteCode: 1
                }
                Ajax.getStationName(params).then(function (data) {
                    _this.stations = data.datas
                }).catch(function (err) {
                    console.log(err)
                })
            },
            hideAllBlocks () {
                this.block1 = false
                this.block2 = false
                this.block3 = false
                this.block4 = true
            },
            clearRemind () {
                let $this = $('.daq-search-input')
                this.showRemind = false
                $this.focus()
            },
            setKey () {
                let $this = $('.daq-search-input')
                let val = $this.val()
                $this.blur()
                if (val) {
                    this.showRemind = false
                } else {
                    this.showRemind = true
                }
                this.searchStationByName(val)
                return false
            },
            locationInit () {
                let _this = this
                map = new AMap.Map('containerMap', {
                    resizeEnable: true,
                    zoom: 16,
                    center: [_this.longitude, _this.latitude]
                })
                // 定位当前位置
                let geolocation
                map.plugin('AMap.Geolocation', () => {
                    geolocation = new AMap.Geolocation({
                        enableHighAccuracy: true,
                        timeout: 10000,
                        maximumAge: 0,
                        convert: true,
                        showButton: true,
                        buttonPosition: 'LB',
                        buttonOffset: new AMap.Pixel(10, 20),
                        showMarker: false,
                        showCircle: true,
                        panToLocation: false,
                        zoomToAccuracy: false
                    })
                    map.addControl(geolocation)
                    geolocation.getCurrentPosition()
                    AMap.event.addListener(geolocation, 'complete', _this.onComplete)
                    AMap.event.addListener(geolocation, 'error', _this.onError)
                })
            },
            onComplete (data) {
                // 当前位置
                let _this = this
                _this.longitude = data.position.lng
                _this.latitude = data.position.lat
                _this.formattedAddress = data.addressComponent.city
                map.setCenter([_this.longitude, _this.latitude])
            },
            onError () {
                this.formattedAddress = '未能获取当前位置，请开启定位'
                Toast({
                    type: 'html',
                    duration: 2000,
                    message: '未能获取当前位置，请开启定位'
                })
            },
            getStation (value) {
                this.$emit('getStation', value, this.type)
            },
            searchStationByName (name) {
                if (!name) return
                let _this = this
                let params = {
                    name: name,
                    ignoreSiteCode: 1
                }
                Ajax.getStationName(params).then((data) => {
                    _this.hideAllBlocks()
                    _this.block5 = false
                    _this.stations = data.datas
                }).catch((err) => {
                    console.log(err)
                })
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

    html, body, #app {
        height: 100%
    }
    .daq-train-location-wrap {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        width: 100%;
        height: 100%;
        background-color: $bg04;
    }
    .daq-search {
        position: fixed;
        left: 0;
        top:0;
        z-index: 200;
        width: 100%;
        height: .88rem;
        display: flex;
        align-items: center;
        padding: 0 .3rem;
        line-height: .88rem;
        background: $bg02;
        &-remind {
            position: absolute;
            left: 0;
            top: 0;
            z-index: 1;
            width: 100%;
            line-height: .88rem;
        }
        .ic-search {
            vertical-align: middle;
            padding-right: .1rem
        }
        &-input {
            width: 90%;
            height: .6rem;
            padding: .16rem 0;
            margin: 0 auto;
            font-size: $f28;
            color: $fc06;
            line-height: $f28 ;
            text-align: center;
            background: none;
        }
        &-wrap {
            flex: 1;
            height: .6rem;
            text-align: center;
            line-height: .6rem;
            border-radius: .3rem;
            font-size: $f28;
            color: $fc09;
            background: $bg04;
        }
    }
    .city-orientation {
        padding-top: 0.88rem;
        background: $bg04;
        &-name {
            font-size: $f26;
            color: $fc08;
            line-height: $f26;
        }
        &-address {
            padding: 0.32rem 0.32rem 0;
            font-size: 0;
            .daq-button-large {
                height: .6rem;
                line-height: .6rem;
                color: $fc01;
                font-size: $f26;
                border-radius: 0.05rem;
                .ued-mobile {
                    font-size: $f24;
                    margin-right: 0.08rem;
                }
            }
            .daq-button-small {
                margin: 0.16rem 0.16rem 0 0;
                @include ellipsis($w: 1.54rem);
                &:active {
                    background: $btn06;
                    color: $fc01;
                    border-color: $bor01;
                }
            }
        }
        .city-list {
            margin-top: 0.4rem;
            .letter {
                height: 0.56rem;
                padding: 0 0.32rem;
                background: $bg02;
                font-size: $f28;
                color: $fc06;
                line-height: 0.56rem;
                cursor: pointer;
            }
            .name {
                margin-left: 0.32rem;
                margin-right: 0.54rem;
                height: 0.96rem;
                font-size: $f32;
                color: $fc06;
                line-height: 0.96rem;
                border-bottom: 1px solid $bor06;
                &:active {
                    color: $fc01;
                }
                &:last-child {
                    border-bottom: none;
                }
            }
        }
        &-letter-main {
            margin-top: 0.4rem;
            padding: 0 0.24rem;
            font-size: 0;
            .city-orientation-name {
                margin-left: 0.08rem;
                padding-bottom: 0.08rem;
            }
            .letter {
                display: inline-block;
                width: 1rem;
                height: 1rem;
                margin: 0.16rem 0.08rem 0 0.08rem;
                text-align: center;
                line-height: 1rem;
                color: $fc06;
                font-size: $f30;
                border: 1px solid $bor06;
                overflow: hidden;
                border-radius: 0.05rem;
                cursor: pointer;
                &:active,
                &.active {
                    background: $btn06;
                    color: $fc01;
                    border-color: $bor01;
                }
            }
        }
    }
    .daq-button-large {
        width: 100%;
        height: .88rem;
        font-size: $f34;
        border-radius: .1rem;
    }
    .daq-button-default {
        border: 1px solid $bor06;
        background: $bg04;
    }
    .daq-button {
        margin-top: .2rem;
        box-sizing: border-box;
        transition: all .25s ease 0s;
    }
    .daq-button-small {
        min-width: 1.28rem;
        height: .6rem;
        padding: 0 .24rem;
        font-size: $f26;
        border-radius: .05rem;
    }
    .map-container {
        display: none;
        width: 1rem;
        height: 1rem;
    }
    .daq-button-location {
        &:active {
            color: $fc10;
            background: $btn01;
        }
    }
</style>
