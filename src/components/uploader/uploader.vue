<template>
<div class="daq-uploader">
  <ul class="daq-uploader-list">
    <li class="daq-uploader-item" v-for="(item, index) in list" :key="index">
      <span class="close" @click="deleteHandler(index)"></span>
      <div class="pic-wrap">
        <img :src="item" alt="">
      </div>
    </li>
    <li class="daq-uploader-item daq-uploader-file" :class="classes" @click="toastHandler">
      <div class="pic-wrap">
        <form action="javascript:;" method="post"
                enctype="multipart/form-data" @change="fileImage($event)">
          <input type="file" name="Filedata" class="file" multiple/>
          <input type="hidden" name="path" value="geekerUI-mobile"/>
        </form>
        <span class="text">图片限{{limit}}张</span>
      </div>
    </li>
  </ul>
</div>
</template>
<script>
import axios from 'axios'
import Toast from '../toast/index.js'
export default {
  name: 'daq-uploader',
  props: {
    limit: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
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
      axios.post('http://file.geeker.com.cn/uploadOSS', params)
        .then((data) => {
          _this.list.push(data.data.url)
          _this.$emit('getPicList', _this.list)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    /**
     * [删除list指定下标的数据]
     */
    deleteHandler (index) {
      this.list.splice(index, 1)
    },
    toastHandler () {
      if (this.list.length >= this.limit) {
        Toast({
          message: `您最多只能上传${this.limit}张图片`
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.daq-uploader{
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
    .pic-wrap{
      width:100%;
      height:100%;
      background:$bg03;
      overflow:hidden;
    }
    .close{
      position:absolute;
      top:-.25rem;
      right:-.25rem;
      width:.8rem;
      height:.8rem;
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
</style>
