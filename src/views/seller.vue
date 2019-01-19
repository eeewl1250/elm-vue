<template>
  <div class="seller">
    <div class="overview">
      <div class="main-info border-1px">
        <dl class="info">
          <dt class="name">{{ seller.name }}</dt>
          <dd class="star">
            <star :score="seller.score" size="medium-ratings"></star>
          </dd>
          <dd class="rating-count">({{ seller.ratingCount}})</dd>
          <dd class="sell-count">月售{{ seller.sellCount}}单</dd>
        </dl>
        <dl class="collection" @click="collecte">
          <dd class="icon icon-favorite" :class="{'is-collected':isCollected}"></dd>
          <dt class="text" v-if="isCollected">已收藏</dt>
          <dt class="text" v-else>收藏</dt>
        </dl>
      </div>
      <div class="statistic">
        <dl class="min-price border-1px-right">
          <dt>起送价</dt>
          <dd>{{ seller.minPrice }}<span class="unit">元</span></dd>
        </dl>
        <dl class="delivery-price border-1px-right">
          <dt>商家配送</dt>
          <dd>{{ seller.deliveryPrice }}<span class="unit">元</span></dd>
        </dl>
        <dl class="delivery-time border-1px-right">
          <dt>评价配送时间</dt>
          <dd>{{ seller.deliveryTime }}<span class="unit">分钟</span></dd>
        </dl>
      </div>
    </div>
    <split></split>
    <dl class="detail">
      <dt>公告与活动</dt>
      <dd class="bulletin border-1px">{{ seller.bulletin }}</dd>
      <dd class="activities border-1px"
          v-for="(activity, key) in seller.supports"
          :key="key"
      >
        <support-icon :type="activity.type" size="16" icon-style="3"></support-icon>
        <span class="text">{{ activity.description }}</span>
      </dd>
    </dl>
    <split></split>
    <dl class="pics">
      <dt>商家实景</dt>
      <dd>
        <img v-for="(pic, pKey) in seller.pics"
             :key="pKey"
             :src="pic"
             width="120"
             height="90"
        />
      </dd>
    </dl>
    <split></split>
    <dl class="infos">
      <dt class="border-1px">商家信息</dt>
      <dd class="border-1px" v-for="(info, iKey) in seller.infos" :key="iKey">{{ info }}</dd>
    </dl>
  </div>
</template>

<script>
import split from '@/components/split/split'
import star from '@/components/score/score'
import supportIcon from '@/components/supportIcon/supportIcon'

export default {
  name: 'Seller',
  data () {
    return {
      isCollected: false
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    split,
    star,
    'support-icon': supportIcon
  },
  methods: {
    collecte () {
      this.isCollected = !this.isCollected
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../common/stylus/mixin.styl'

.seller
  position: fixed
  top: 174px
  bottom: 48px
  width: 100%
  overflow: auto
  font-size: 0
  &::-webkit-scrollbar
    display: none
  .overview
    padding: 18px
    .main-info
      display: flex
      justify-content: space-between
      border-1px(rgba(7, 17, 27, 0.1))
      .info
        padding-bottom: 18px
        dt.name
          margin-bottom: 8px
          font-size: 14px
          line-height: 14px
          color: #07111b
        dd
          display: inline-block
          height: 18px
          vertical-align: middle
          font-size: 10px
          line-height: 18px
          color: #4d555d
          &.rating-count
            margin-left: 8px
          &.sell-count
            margin-left: 12px
      .collection
        width: 40px
        text-align: center
        .icon
          font-size: 24px
          line-height: 24px
          color: #4d555d
          &.is-collected
            color: #f01414
        .text
          margin-top: 4px
          font-size: 10px
          line-height: 10px
          color: #4d555d
    .statistic
      display: flex
      justify-content: space-between
      padding-top: 18px
      font-size: 12px
      dl
        width: 33%
        text-align: center
        border-1px-right(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
        dt
          font-size: 10px
          line-height: 10px
          color: #93999f
        dd
          margin-top: 4px
          font-size: 24px
          line-height: 24x
          color: #07111b
          .unit
            font-size: 10px
  .detail
    padding: 18px 18px 0 18px
    dt
      font-size: 14px
      line-height: 14px
      color: #07111b
    dd
      border-1px(rgba(7, 17, 27, 0.1))
      &:last-child
        border-none()
    .bulletin
      padding: 8px 12px 16px
      font-size: 12px
      line-height: 24px
      color: #f01414
    .activities
      padding: 16px 12px 16px 16px
      font-size: 12px
      .support-icon
        vertical-align: middle
      .text
        margin-left: 6px
        vertical-align: middle
  .pics
    padding: 18px
    dt
      font-size: 14px
      line-height: 14px
      color: #07111b
    dd
      display: flex
      justify-content: flex-start
      flex: 1
      margin-top: 12px
      overflow-x: scroll
      &::-webkit-scrollbar
        display: none
      img
        margin-left: 6px
      &:first-child
        margin-left: 0
  .infos
    padding: 18px 18px 0 18px
    dt
      padding-bottom: 12px
      font-size: 14px
      line-height: 14px
      color: #07111b
      border-1px(rgba(7, 17, 27, 0.1))
    dd
      padding: 16px 12px
      font-size: 12px
      line-height: 16px
      color: #07111b
      border-1px(rgba(7, 17, 27, 0.1))
      &:last-child
        border-none()
</style>
