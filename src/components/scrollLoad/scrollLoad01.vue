<template>
  <div class="daq-scroll-load" :class="classname">
    <slot name="list" />
    <p class="daq-no-data-text" v-if = "noMore"><span>没有更多了</span></p>
    <div class="daq-no-data" v-if="noData"></div>
  </div>
</template>
<script>
  import Ajax from '../../service/index.js'
  export default {
    name: 'daq-scroll-load',
    props: {
      classname: String,
      list: Array,
      requestName: {
        type: String,
        require: true
      },
      limit: {
        type: Number,
        default: 10
      },
      params: {
        type: Object
      },
      isScroll: {
        type: Boolean,
        default: true
      },
      defaultParams: {
        type: Boolean,
        default: true
      },
      token: Boolean
    },
    data () {
      return {
        // 当前页数
        page: 1,
        // 总页数
        totalPage: 1,
        // 是否允许加载
        flag: true,
        // 无更多数据
        noMore: false,
        // 无数据
        noData: false,
        parameter: this.params ? this.params : {}
      }
    },
    created () {
      if (!this.params || this.defaultParams) {
        this.getList()
      }
    },
    methods: {
      /**
       * [获取列表]
       * @returns
       */
      getList () {
        if (this.flag) {
          this.flag = false
          Ajax[this.requestName](Object.assign({}, this.parameter, {
            page: this.page,
            limitPage: this.limit
          }), this.token).then((data) => {
            // 允许加载
            this.flag = true
            let total = 0
            if (data.page) {
              total = data.page.total
            }
            this.dataList(data.datas, total)
            if (!data.page) {
              this.noData = true
              this.noMore = false
              return false
            } else {
              this.noData = false
              // 总页数
              if (this.page === 1) {
                this.totalPage = data.page.totalPage
              }
              // 没有更多数据
              if (this.totalPage === this.page && this.isScroll) {
                this.noMore = true
              }
            }
          })
        }
      },
      /**
       * [将数据传到父级去]
       * @returns
       */
      dataList (arr, total) {
        this.$emit('list', arr, total)
      },
      /**
       * [获取滚动条当前的位置]
       * @return {[Number]} [scrollTop]
       */
      getScrollTop () {
        let scrollTop = 0
        if (document.documentElement && document.documentElement.scrollTop) {
          scrollTop = document.documentElement.scrollTop
        } else if (document.body) {
          scrollTop = document.body.scrollTop
        }
        return scrollTop
      },
      /**
       * [获取当前可视范围的高度]
       * @return {[Number]} [clientHeight]
       */
      getClientHeight () {
        let clientHeight = 0
        if (document.body.clientHeight && document.documentElement.clientHeight) {
          clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight)
        } else {
          clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight)
        }
        return clientHeight
      },
      /**
       * [获取当前可视范围的高度]
       * @return {[Number]} [clientHeight]
       */
      getScrollHeight () {
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
      },
      scrollHander () {
        let _this = this
        // 判断是否到达可滚动加载
        if (_this.isScroll && _this.getScrollTop() + _this.getClientHeight() + 50 > _this.getScrollHeight()) {
          if (_this.page < _this.totalPage && _this.flag) {
            _this.page++
            if (_this.page > _this.totalPage) {
              return false
            } else {
              _this.getList(_this.page)
            }
          }
        }
      }
    },
    mounted () {
      /**
       * [滚动加载]
       */
      window.addEventListener('scroll', this.scrollHander)
    },
    watch: {
      /**
       * [深入监听params参数是否有变化]
       */
      params: {
        handler (value) {
          this.noData = false
          this.noMore = false
          this.page = 1
          this.parameter = value
          this.getList()
        },
        deep: true
      }
    },
    destroyed () {
      /**
       * [销毁滚动加载]
       */
      window.removeEventListener('scroll', this.scrollHander)
    }
  }
</script>
<style lang="scss" scoped>
  .daq-no-data-text {
    text-align: center;
    line-height: 0.88rem;
    color: $fc09;
    font-size: $f28;
    span{
      position: relative;
      display: inline-block;
      &:before {
        content: "";
        position: absolute;
        left: -0.3rem;
        top: 0.45rem;
        width: 0.2rem;
        height: 0;
        border-top: 1px solid $fc09;
      }
      &:after {
        content: "";
        position: absolute;
        right: -0.3rem;
        top: 0.45rem;
        width: 0.2rem;
        height: 0;
        border-top: 1px solid $fc09;
      }
    }
  }
</style>
