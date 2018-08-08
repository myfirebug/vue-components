<template>
  <div class="rooms-kind-list">
    <div class="rooms-kind-item">
      <div class="pic-wrap">
        <img src="" alt="">
        <span class="num">1</span>
      </div>
      <div class="content">
        <h3 class="title">豪华单间</h3>
        <p class="info">28m².窗</p>
        <p class="labels"><span>1.8m*1</span></p>
      </div>
      <div class="opera">￥<span class="min-price">100</span>起</div>
    </div>
    <ul class="room-list">
      <li class="room-item">
        <div class="content">
          <h4 class="title">XXX酒店豪华单间</h4>
          <p class="info">28m².无线</p>
        </div>
        <div class="price">￥<span class="sell-price">100</span></div>
        <a class="book-button">预订</a>
      </li>
      <li class="room-item">
        <div class="content">
          <h4 class="title">XXX酒店豪华单间</h4>
          <p class="info">28m².无线</p>
        </div>
        <div class="price">￥<span class="sell-price">100</span></div>
        <a class="book-button">预订</a>
      </li>
      <li class="room-item">
        <div class="content">
          <h4 class="title">XXX酒店豪华单间</h4>
          <p class="info">28m².无线</p>
        </div>
        <div class="price">￥<span class="sell-price">100</span></div>
        <a class="book-button">预订</a>
      </li>
      <li class="room-button">点击展开全部价格</li>
    </ul>
    <div class="rooms-button">点击展开全部</div>
  </div>
</template>
<script>
export default {}
</script>
<style lang='scss' scoped>
  .rooms-kind-list {
    background:#fff;
    .rooms-button {
      text-align: center;
      line-height: .9rem;
      font-size: $f30;
      padding-right: .15rem;
    }
  }
  // 房间列表
  .rooms-kind-item {
    display: flex;
    align-items: center;
    padding: .4rem .3rem .4rem 0;
    margin-left: .3rem;
    height: 2rem;
    border-bottom: 1px solid $bor06;
    .pic-wrap {
      position: relative;
      width: 1.6rem;
      height: 1.2rem;
      border-radius: .03rem;
      background: $bg02;
      overflow: hidden;
      .num {
        position: absolute;
        right: .08rem;
        bottom: .08rem;
        min-width: .3rem;
        height: .24rem;
        line-height: $f24;
        padding: 0 .1rem;
        font-size: $f20;
        text-align: center;
        border-radius: .03rem;
        background: rgba(0, 0, 0, .5);
        color: $fc10;
      }
    }
    .content {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      text-align: left;
      flex: 1;
      padding-left: .2rem;
      height: 100%;
      line-height: 1;
      overflow: hidden;
    }
    .title {
      font-size: .3rem;
      line-height: .42rem;
      padding: 0;
      font-weight: normal;
      @include ellipsis;
    }
    .info {
      @include ellipsis;
      color: $fc08;
      font-size: $f24;
    }
    .labels {
      span {
        display: inline-block;
        height: .32rem;
        margin: .08rem .08rem 0 0;
        padding: 0 .1rem;
        line-height: .32rem;
        color: $fc02;
        font-size: $f20;
        background: $assist05;
        border-radius: .03rem;
        max-width: 2rem;
        @include ellipsis();
      }
    }
    .opera {
      position: relative;
      padding-right: .34rem;
      font-size: $f24;
      color: $fc01;
      .min-price {
        padding: 0 .05rem;
        font-size: $f40;
      }
      &:after {
        content: '';
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: .02rem;
        width: .16rem;
        height: .16rem;
        border-left: 2px solid $fc01;
        border-bottom: 2px solid $fc01;
        transform: rotate(135deg)
      }
    }
    .on {
      &:after {
        content: '';
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -.1rem;
        width: .16rem;
        height: .16rem;
        border-left: 2px solid $fc08;
        border-bottom: 2px solid $fc08;
        transform: rotate(-45deg)
      }
    }
  }

  .room-list {
    background: $bg03;
    padding-left: .3rem;
    .room-button {
      text-align: center;
      line-height: .9rem;
      font-size: $f30;
      padding-right: .15rem;
    }
  }

  .room-item {
    padding: .3rem .3rem .3rem 0;
    display: flex;
    height: 1.4rem;
    align-items: center;
    border-bottom: 1px solid $bor06;
    .content {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      text-align: left;
      flex: 1;
      height: 100%;
      line-height: 1;
      overflow: hidden;
    }
    .title {
      font-size: $f30;
      line-height: .42rem;
      padding: 0;
      @include ellipsis;
    }
    .info {
      @include ellipsis;
      color: $fc08;
      font-size: $f24;
    }
    .price {
      padding-right: .35rem;
      color: $fc01;
      font-size: $f24;
    }
    .sell-price {
      font-size: $f40;
    }
    .book-button {
      width: 1.28rem;
      height: .6rem;
      display: inline-block;
      border-radius: .05rem;
      font-size: $f30;
      text-align: center;
      line-height: .6rem;
      background: $btn02;
      color: $fc10;
      &:active {
        background: $btn02hover;
      }
    }
  }

  .details-room {
    position: relative;
    padding: .2rem .3rem 1.3rem .3rem;
    max-height: 8rem;
    overflow: hidden;
    overflow-y: auto;
    .title {
      padding: .2rem 0;
      line-height: .4rem;
      font-size: $f32;
    }
    &-hd {
      .content {
        font-size: $f24;
        color: $fc08;
      }
    }
    &-bd {
      .content {
        color: $fc07;
      }
    }
    &-ft {
      display: flex;
      position: fixed;
      left: 0;
      bottom: 0;
      right: 0;
      height: .96rem;
      line-height: .96rem;
      border-top: 1px solid $bor06;
      background: $bg04;
      .order-button,
      .price {
        flex: 1;
      }
      .price {
        padding-left: .3rem;
        font-size: $f28;
        span {
          font-size: .48rem;
          color: $fc01;
        }
      }
      .order-button {
        text-align: center;
        background: $btn03;
        color: $fc10;
        &:active {
          background: $btn04hover;
        }
      }
    }
  }
</style>
