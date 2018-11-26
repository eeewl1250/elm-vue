<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="description">
          {{ seller.description }} / {{ seller.deliveryTime }}分钟送达
        </div>
        <div class="support" v-if="seller.supports">
          <support-icon :type="seller.supports[0].type" size="12" icon-style="1"></support-icon>
          <span class="text">{{ seller.supports[0].description }}</span>
          <span class="count" @click="showDetail">{{ seller.supports.length }} 个<i class="icon-keyboard_arrow_right"></i></span>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="title"></span>
      <span class="text">{{ seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%">
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <div class="name">{{seller.name}}</div>
            <score :score="seller.score" size="large"></score>
            <div class="supports" v-if="seller.supports">
              <title-line text="优惠信息"></title-line>
              <ul>
                <li class="support-item" v-for="support in seller.supports" :key="support.description">
                  <support-icon :type="support.type" size="16" icon-style="2"></support-icon>
                  <span class="text">{{ support.description }}</span>
                </li>
              </ul>
            </div>
            <div class="bulletin">
              <title-line text="商家公告"></title-line>
              <div class="text">{{ seller.bulletin }}</div>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import titleLine from '@/components/titleLine/titleLine'
import supportIcon from '@/components/supportIcon/supportIcon'
import score from '@/components/score/score'

export default {
  name: 'Header',
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    'title-line': titleLine,
    'support-icon': supportIcon,
    'score': score
  },
  data () {
    return {
      detailShow: false
    }
  },
  methods: {
    showDetail () {
      this.detailShow = true
    },
    hideDetail () {
      this.detailShow = false
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"

.header
  position: relative
  color: #ffffff
  background-color: rgba(7, 17, 27, 0.5)
  .content-wrapper
    display: flex
    align-items: center
    padding: 24px 12px 18px 24px
    font-size； 0
    .avatar
      width: 64px
      height: 64px
      img
        border-radius: 2px
    .content
      flex-grow: 2
      margin-left: 16px
      .title
        line-height: 18px
        .brand
          display: inline-block
          width: 30px
          height: 18px
          bg-image("brand")
          background-size: 30px 18px
          background-repeat: no-repeat
          empty-span()
        .name
          margin-left: 6px
          font-weight: bold
          font-size: 16px
      .description
        margin: 8px 0 10px 0
        font-size: 12px
        line-height: 12px
      .support
        position: relative
        vertical-align: middle
        font-size: 10px
        line-height: 12px
        .text
          vertical-align: middle
        .count
          display: inline-block
          position: absolute
          right: 0
          bottom: -7px
          vertical-align: middle
          padding: 7px 8px
          font-size: 10px
          line-height: 12px
          background-color: rgba(0,0,0,0.2)
          border-radius: 20px
          .icon-keyboard_arrow_right
            vertical-align: middle
            margin-left: 2px
            line-height: 12px
  .bulletin-wrapper
    position: relative
    height: 28px
    line-height: 28px
    padding: 0 18px 0 12px
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis
    background-color: rgba(7, 17, 27, 0.2)
    font-size: 10px
    .title
      display: inline-block
      vertical-align: top
      width: 22px
      height: 28px
      bg-image("bulletin")
      background-size: 22px 12px
      background-repeat: no-repeat
      background-position: center
      empty-span()
    .text
      vertical-align: top
      margin: 0 4px
      height: 28px
    .icon-keyboard_arrow_right
      position: absolute
      right: 12px
      bottom: 8px
      vertical-align: top
  .background
    display: flex
    align-items: center
    position: absolute
    width: 100%
    height: 100%
    left: 0
    top: 0
    z-index: -1
    overflow: hidden
    img
      object-fit: cover
      filter: blur(10px)
  .detail
    position: fixed
    z-index: 100
    top: 0
    left: 0
    width: 100%
    height: 100%
    overflow: auto
    background-color: rgba(7, 17, 27, 0.8)
    -webkit-backdrop-filter: blur(10px)
    text-align: center
    .detail-wrapper
      min-height: 100%
      .detail-main
        padding: 64px 36px
        .name
          font-size: 16px
          font-weight: 700
          line-height: 16px
        .score
          margin-top: 16px
        .supports
          margin-top: 28px
          ul
            padding: 24px 12px 0
            text-align: left
            li
              margin-bottom: 12px
              &:last-child
                margin-bottom: 0
              .text
                vertical-align: middle
                margin-left: 6px
                font-size: 12px
                line-height: 12px
        .bulletin
          margin-top: 28px
          .text
            padding: 24px 12px 0
            font-size: 12px
            line-height: 24px
            text-align: left
    .detail-close
      position: relative
      margin-top: -48px
      text-align: center
      font-size: 32px
      opacity: 0.5
  .fade-enter-active, .fade-leave-active
    transition: opacity 0.5s
  .fade-enter, .fade-leave-to
    opacity: 0
</style>
