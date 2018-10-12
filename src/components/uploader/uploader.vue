<template>
<div class="daq-uploader">
  <!--视频弹窗 start-->
  <transition name="fade">
    <div class="video-wrapper" v-show="fileType === 'video' && playVideo.checked" @click="hideVideo">
      <span class="close"></span>
      <video id="video" :src="playVideo.url"  width="320" height="240"></video>
    </div>
  </transition>
  <!--视频弹窗 end-->
  <ul class="daq-uploader-list">
    <li class="daq-uploader-item" v-for="(item, index) in list" :key="index" v-show = "item">
      <span class="close" @click="deleteHandler(index)"></span>
      <div class="pic-wrap">
        <i class="ued-mobile video-icon" v-show="fileType === 'video'" @click="play(item)">&#xe6fc;</i>
        <img :src="item" alt="" v-if="fileType === 'default'" @click="showPic(index)">
      </div>
    </li>
    <li class="daq-uploader-item daq-uploader-file" :class="classes" @click="toastHandler">
      <div class="pic-wrap">
        <form action="javascript:;" method="post"
                enctype="multipart/form-data" @change="fileImage($event)">
          <input type="file" name="Filedata" class="file" multiple/>
          <input type="hidden" name="path" value="geekerUI-mobile"/>
        </form>
        <span class="text">{{fileType === 'default' ? '图片' : '视频'}}限{{limit}}{{fileType === 'default' ? '张' : '个'}}</span>
      </div>
    </li>
  </ul>
  <daq-check-photo :show="show" :list="list" @hide="hideHandler" :initialSlide="initialSlide"></daq-check-photo>
</div>
</template>
<script>
import axios from 'axios'
import Toast from '../toast/index.js'
export default {
  name: 'daq-uploader',
  props: {
    fileType: {
      type: String,
      validator: (value) => {
        return ['default', 'video'].indexOf(value) !== -1
      },
      default: 'default'
    },
    defaultList: {
      type: Array
    },
    type: {
      type: [String, Number]
    },
    limit: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      // 控制图片弹窗显示隐藏
      show: false,
      // 控制图片下标
      initialSlide: 0,
      // 当前播放视频url,checked
      playVideo: {
        checked: false
      },
      // 向父组件返回的值
      list: []
    }
  },
  computed: {
    classes () {
      if (this.list.length >= this.limit) {
        return 'daq-uploader-disabled'
      }
    }
  },
  methods: {
    /**
     *关闭图片弹窗
     */
    hideHandler () {
      this.show = false
    },
    /**
     *显示视频弹窗
     */
    showPic (index) {
      this.show = true
      this.initialSlide = index
    },
    /**
     * 播放视频
     */
    play (item) {
      let video = document.getElementById('video')
      this.playVideo.url = item
      this.playVideo.checked = true
      video.play()
    },
    /**
     *隐藏视频
     */
    hideVideo () {
      let video = document.getElementById('video')
      this.playVideo.checked = false
      video.pause()
    },
    /**
     * [提交form表单]
     */
    fileImage: function (e) {
      let formData = new FormData(e.currentTarget)
      event.preventDefault()
      this.submitForm(formData)
      return false
    },
    /**
     * [ajax请求]
     */
    submitForm (params) {
      let _this = this
      let t = null
      let timmer = null
      // 判断是否有加载
      t = Toast({
        type: 'loading',
        message: '加载中...',
        duration: 10000000
      })
      if (timmer) {
        clearTimeout(timmer)
      }
      axios.post('http://file.geeker.com.cn/uploadOSS', params)
        .then((data) => {
          t.show = false
          switch (this.fileType) {
            case 'default':
              _this.list.push(data.data.url)
              _this.$emit('getPicList', _this.list, _this.type)
              break
            case 'video':
              let url = data.data.url
              let extensions = 'MP4,MOV,mp4,mov,ogg,OGG'
              let v = url.substring(url.lastIndexOf('.') + 1, url.length)
              if (extensions.indexOf(v) === -1) {
                Toast({
                  message: '你上传的格式有误,请重新上传'
                })
                return false
              }
              // 判断上传时长不兼容
              // _this.durationchange(data.data.url)
              _this.list.push(data.data.url)
              _this.$emit('getPicList', _this.list, _this.type)
              break
          }
        })
        .catch(() => {
          t.type = 'error'
          t.message = '服务器错误'
          timmer = setTimeout(() => {
            t.show = false
          }, 1000)
        })
    },
    /**
     *视频是否加载完成
     */
    durationchange (data) {
      let _this = this
      let video = document.getElementById('video')
      _this.playVideo.url = data
      _this.list.push(data)
      video.addEventListener('canplaythrough', function () {
        if (video.duration.toFixed(0) >= 10) {
          Toast({
            message: '最多只能上传10s的视频'
          })
          _this.playVideo.url = ''
          _this.list.splice(_this.list.length, 1)
        } else {
          _this.$emit('getPicList', _this.list, _this.type)
        }
      })
    },
    /**
     * [删除list指定下标的数据]
     */
    deleteHandler (index) {
      this.list.splice(index, 1)
      this.$emit('getPicList', this.list, this.type)
    },
    toastHandler () {
      if (this.list.length >= this.limit) {
        Toast({
          message: `您最多只能上传${this.limit}${this.fileType === 'default' ? '张图片' : '个视频'}`
        })
      }
    }
  },
  watch: {
    defaultList (value) {
      this.list = value
    }
  }
}
</script>
<style lang="scss" scoped>
.daq-uploader{
  .video-wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    left:0;
    top:0;
    bottom: 0;
    right: 0;
    z-index: 1000;
    background:#000;
    video{
      width: 100%;
    }
    .close{
      position: absolute;
      right:-1rem;
      top:-1rem;
      width: 2rem;
      height: 2rem;
      background:rgba(255,255,255,.5);
      border-radius:50%;
      &:after,
      &:before{
        position: absolute;
        bottom:.55rem;
        left:.4rem;
        content:'';
        width:.4rem;
        height: .04rem;
        background:rgba(255,255,255,.6);
        border-radius:.02rem;
      }
      &:after{
        transform:rotate(45deg)
      }
      &:before{
        transform:rotate(-45deg)
      }
    }
  }
  padding:0 .18rem .18rem .18rem;
  &-list{
    display: flex;
    flex-wrap:wrap;
  }
  &-item{
    position:relative;
    width:25%;
    height:1.72rem;
    padding:.12rem;
    .close{
      position:absolute;
      top:-.25rem;
      right:-.25rem;
      width:.8rem;
      height:.8rem;
      z-index: 10;
      &:after{
        content: '+';
        position:absolute;
        left:50%;
        top:50%;
        width:.3rem;
        height:.3rem;
        margin:-.15rem 0 0 -.15rem;
        background:red;
        color:#fff;
        font-size:$f26;
        text-align:center;
        line-height:.24rem;
        border-radius:50%;
        transform:rotate(45deg)
      }
    }
    .pic-wrap{
      position: relative;
      width:100%;
      height:100%;
      background:$bg03;
      overflow:hidden;
      .video-icon{
        width:100%;
        height: 100%;
        position: absolute;
        left: 0;
        top:0;
        font-size:.5rem;
        line-height: 1.48rem;
        text-align: center;
        color:#b4b4b4;
      }
      video{
        opacity: 0;
      }
    }
    img{
      width:100%;
      height:100%;
    }
  }
  &-file{
    .pic-wrap{
      position:relative;
      border:1px solid $bor06;
      &:after,
      &:before{
        content: '';
        position:absolute;
        background:$bor03;
        left:50%;
        top:50%;
      }
      &:after{
        width:.6rem;
        height:.04rem;
        margin:-.12rem 0 0 -.3rem;
      }
      &:before{
        height:.6rem;
        width:.04rem;
        margin:-.4rem 0 0 -.02rem;
      }
      &:active{
        background:$btn06;
        &:after,
        &:before{
          background:$btn01;
        }
        .text{
          color:$fc01;
        }
      }
      .text{
        position:absolute;
        left:0;
        bottom:.16rem;
        width:100%;
        font-size:$f20;
        color:$fc08;
        text-align:center;
      }
    }
    form{
      position:absolute;
      left:0;
      top:0;
      z-index:1;
      width:100%;
      height:100%;
    }
    .file{
      width:100%;
      height:100%;
      opacity: 0;
    }
  }
  &-disabled{
    form{
      display: none;
    }
    .pic-wrap{
      background:$bg03;
      &:after,
      &:before{
        background:#e5e5e5;
      }
      .text{
        color:$fc09;
      }
      &:active{
        background:$bg03;
        &:after,
        &:before{
          background:#e5e5e5;
        }
        .text{
          color:$fc09;
        }
      }
    }
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
