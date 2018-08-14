<template>
    <div class="bus-box">
        <ul class="otherbus-list">
            <li v-for="(item, index) in list" :key="index">
                <div class="top">
                    <div class="name"><i class="ued-mobile"></i>{{item.name}}</div>
                    <div>距您 <span>{{item.distance.length > 3 ? (item.distance / 1000).toFixed(1) + '公里' : item.distance + '米'}}</span></div>
                </div>
                <ul class="other-list">
                    <li v-for="(a, index) in item.address.split(';')" :key="index">{{a}}</li>
                </ul>
            </li>
        </ul>
        <div class="daq-no-data" v-if="list && list.length === 0"></div>
    </div>
</template>
<script>
import Ajax from '../../../../service'
export default {
    data () {
      return {
          params: {
              radius: 500,
              location: this.$route.query.location,
              ignoreSiteCode: 1
          },
          list: []
      }
    },
    created () {
        Ajax.busAround(this.params)
            .then((data) => {
                if (data.code === 1) {
                    this.list = []
                } else {
                    this.list = data.datas
                }
            })
    }
}
</script>
<style lang="scss" scoped>
    .otherbus-list{
        >li{
            padding-left: .32rem;
            padding-right: .32rem;
            padding-top: .4rem;
            margin-bottom: .16rem;
            width:100%;
            background-color: white;
            .top{
                display:flex;
                .name{
                    flex:1;
                    @include ellipsis;
                }
                div{
                    height:.6rem;
                    line-height:.6rem;
                    font-size:.32rem;
                    i{
                        margin-right: .25rem;
                        color:#00ceb9;
                    }
                    span{
                        margin-right: .1rem;
                        color:#00ceb9;
                    }
                }
                div:last-of-type{
                    color:#999;
                    text-align: right;
                }
            }

        }
    }
    .other-list{
        margin-top: .25rem;
        display:flex;
        flex-wrap:wrap;
        >li{
            margin-right: .24rem;
            margin-bottom: .24rem;
            padding:0 .24rem;
            height:.6rem;
            background-color: #f5f5f5;
            line-height:.6rem;
            font-size:.26rem;
            text-align: center;
        }
        //>li.ls-li{margin-right:0;}
    }
</style>
