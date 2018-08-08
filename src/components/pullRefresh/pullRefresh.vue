<template>
    <div class="daq-pull-refresh" ref="pullRefresh" @touchstart="touchstartHandler" @touchmove="touchmoveHandler" @touchend="touchendHandler">
      <p class="pull-status"><span class="ued-mobile" :class="loading"  ref="pullStatatus" v-html="icon"></span>{{text}}</p>
      <slot />
    </div>
</template>

<script>
    import Ajax from '../../service'
    export default {
        name: 'daq-pullRefresh',
        props: {
          // ajax请求的name
          requestName: {
            type: String,
            require: true
          },
          params: Object
        },
        data () {
          return {
            // 开始位置
            start: 0,
            // 结束位置
            end: 0,
            // 移动的距离
            offset: 80,
            // 加载动画样式
            loading: '',
            // 图标
            icon: '&#xe659;',
            // 文案
            text: '准备加载',
            // 是否加载
            flag: true
          }
        },
        methods: {
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
           * [设置样式]
           */
          translate (diff) {
            this.$refs.pullRefresh.style.transform = 'translate(0, ' + diff + 'px)'
          },
          /**
           * [设置动画时间]
           */
          setTransition (time) {
            this.$refs.pullRefresh.style.transition = 'all ' + time + 's'
          },
          /**
           * [处理touchstart事件]
           */
          touchstartHandler (e) {
            if (this.getScrollTop() <= 0 && this.flag) {
              let ev = e.originalEvent ? e.originalEvent.changedTouches[0] : e.changedTouches[0]
              // 移动的开始距离
              this.start = ev.pageY
              // 初始化动画时间
              this.setTransition(0)
              // 初始化icon
              this.icon = '&#xe659;'
              // 初始化文案
              this.text = '准备加载'
            }
          },
          /**
           * [处理touchstart事件]
           */
          touchmoveHandler (e) {
            if (this.getScrollTop() <= 0) {
              let ev = e.originalEvent ? e.originalEvent.changedTouches[0] : e.changedTouches[0]
              this.end = ev.pageY
              // 判断是否可以move
              if (this.start < this.end && this.flag) {
                e.preventDefault()
                // 初始化动画时间
                this.setTransition(0)
                // 移动的距离
                this.translate(this.end - this.start)
                // loading下移旋转
                this.$refs.pullStatatus.style.transform = 'rotate(' + (this.end - this.start) + 'deg)'
              }
            }
          },
          /**
           * [处理touchstart事件]
           */
          touchendHandler (e) {
            if (this.getScrollTop() <= 0) {
              // 是否可以加载数据
              if (this.end - this.start >= this.offset && this.flag) {
                this.setTransition(1)
                this.translate(80)
                this.loading = 'loading'
                this.icon = '&#xe65c;'
                this.text = '加载中...'
                this.flag = false
                // ajax请求
                this.ajaxRequest()
              } else {
                this.setTransition(1)
                this.translate(0)
              }
            }
          },
          ajaxRequest () {
            Ajax[this.requestName](this.params)
              .then((data) => {
                let d = data.datas || data.data
                this.$emit('pull', d)
                this.setTransition(1)
                this.translate(0)
                this.$refs.pullStatatus.style.transform = 'rotate(0deg)'
                this.icon = '&#xe723;'
                this.loading = ''
                this.text = '加载成功'
                this.flag = true
              })
              .catch(() => {
                this.setTransition(1)
                this.translate(0)
                this.$refs.pullStatatus.style.transform = 'rotate(0deg)'
                this.icon = '&#xe6f0;'
                this.loading = ''
                this.text = '加载失败'
                this.flag = true
              })
          }
        }
    }
</script>

<style lang="scss" scoped>
  .daq-pull-refresh{
    margin-top: .9rem;
    position: relative;
    .pull-status{
      position: absolute;
      top: -.9rem;
      left:0;
      width:100%;
      height: .9rem;
      line-height: .9rem;
      text-align:center;
      color:$fc08;
      font-size:$f28;
      .ued-mobile{
        width:.4rem;
        height: .4rem;
        text-align:center;
        line-height: .4rem;
        font-size:$f30;
        color:$fc08;
        vertical-align: middle;
        display: inline-block;
      }
      .loading{
        animation: rotate linear 3s infinite
      }
      @keyframes rotate {
        0% {
          transform:rotate(0deg)
        }

        to {
          transform:rotate(720deg)
        }
      }
    }
  }
</style>
