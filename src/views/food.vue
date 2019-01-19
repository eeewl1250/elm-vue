<template>
  <div class="view-food">
    <div class="back" @click="back">
      <span class="icon icon-arrow_lift"></span>
    </div>
    <div class="image">
      <img :src="food.image" height="375"/>
    </div>
    <div class="info">
      <div class="title">{{ food.name }}</div>
      <div class="assessment">
        <span>月售{{ food.sellCount }}份</span>
        <span>好评率{{ food.rating }}%</span>
      </div>
      <div class="prices">
        <span class="price"><span class="unit">￥</span>{{ food.price }}</span>
        <span class="old-price" v-if="food.oldPrice"><span class="unit">￥</span>{{ food.oldPrice }}</span>
      </div>
      <div class="add" @click="addToCart">加入购物车</div>
    </div>
    <split></split>
    <dl class="intro">
      <dt>商品介绍</dt>
      <dd>{{ food.description }}</dd>
    </dl>
    <split></split>
    <div class="comment">
      <div class="title">商品评价</div>
      <rating-selector
        :counts="counts"
        :onlyContent="onlyContent"
        :selectorType="selectorType"
        @contentSelector="toggleOnlyContent"
        @changeType="changeSelectorType"
      ></rating-selector>
      <ul class="food-ratings">
        <li v-for="(rating, rKey) in selectedRatings" :key="rKey">
          <div class="rating-info">
            <span class="rate-time">{{ $util.timeConvert(rating.rateTime)}}</span>
            <span class="user">
              <span class="username">{{ rating.username }}</span>
              <span class="avatar">
                <img :src="rating.avatar" width="12" height="12" />
              </span>
            </span>
          </div>
          <div class="comment">
            <span class="icon"
                  :class="[
                    {'icon-thumb_down':rating.rateType},
                    {'icon-thumb_up':!rating.rateType}
                  ]"
            ></span>
            <span class="text">{{ rating.text }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import split from '@/components/split/split'
import ratingSelector from '@/components/ratingSelector/ratingSelector'

const selectorTypes = {
  ALL: 'all',
  SATISFIED: 'satisfied',
  UNSATISFIED: 'unsatisfied'
}
export default {
  name: 'food',
  props: {
    food: {
      type: Object
    }
  },
  components: {
    split,
    'rating-selector': ratingSelector
  },
  data () {
    return {
      ratings: [],
      onlyContent: false,
      selectorType: selectorTypes.ALL
    }
  },
  computed: {
    counts () {
      return [
        this.food.ratings.length,
        this.food.ratings.filter(item => item.rateType === 0).length,
        this.food.ratings.filter(item => item.rateType === 1).length
      ]
    },
    selectedRatings () {
      return new Map([
        [selectorTypes.ALL, this.food.ratings],
        [selectorTypes.SATISFIED, this.food.ratings.filter(item => item.rateType === 0)],
        [selectorTypes.UNSATISFIED, this.food.ratings.filter(item => item.rateType === 1)]
      ]).get(this.selectorType)
        .filter(item => item.text || !this.onlyContent)
    }
  },
  methods: {
    back () {
      this.$emit('hideDetail', false)
    },
    toggleOnlyContent (onlyContent) {
      this.onlyContent = onlyContent
    },
    changeSelectorType (type) {
      this.selectorType = type
    },
    addToCart () {
      this.$store.dispatch('addFoodsCountByOne', this.food.index)
      this.back()
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../common/stylus/mixin.styl'

.view-food
  position: fixed
  left: 0
  right: 0
  top: 0
  bottom: 48px
  width: 100%
  z-index: 20
  font-size: 0
  background-color: #ffffff
  overflow: auto
  &::-webkit-scrollbar
    display: none
  .back
    position: absolute
    left: 0
    top: 0
    padding: 20px 15px
    .icon
      font-size: 15px
      color: #ffffff
  .image
    height: 375px
    img
      display: block
      margin: 0 auto
  .info
    position: relative
    padding: 18px
    .title
      font-size: 14px
      line-height: 14px
      font-weight: 700
      color: #07111b
    .assessment
      margin-top: 8px
      font-size: 10px
      line-height: 10px
      color: #93999f
    .prices
      margin-top: 18px
      .price
        font-size: 14px
        line-height: 24px
        font-weight: 700
        color: #f01414
      .old-price
        margin-left: 6px
        font-size: 10px
        line-height: 24px
        font-weight: 700
        text-decoration: line-through
        color: #93999f
      .unit
        font-size: 10px
        font-weight: normal
    .add
      position: absolute
      right: 18px
      bottom: 18px
      display: inline-block
      padding: 6px 12px
      font-size: 10px
      line-height: 12px
      color: #ffffff
      background-color: #00a0dc
      border-radius: 12px
  .intro
    padding: 18px
    dt
      font-size: 14px
      line-height: 14px
      color: #07111b
    dd
      margin: 6px 8px
      font-size: 12px
      line-height: 24px
      color: #07111b
  .comment
    .title
      margin: 18px 18px 0 18px
      font-size: 14px
      line-height: 14px
      color: #07111b
    .food-ratings
      li
        margin: 0 18px
        padding: 16px 0
        border-1px(rgba(7, 17, 27, 0.1))
        .rating-info
          display: flex
          justify-content: space-between
          font-size: 10px
          line-height: 12px
          color: #93999f
          .user
            text-align: right
            .avatar
              margin-left: 6px
              img
                border-radius: 50%
        .comment
          display: flex
          align-items: top
          margin-top: 6px
          .icon
            font-size: 12px
            line-height: 18px
            &.icon-thumb_up
              color: #00a0dc
            &.icon-thumb_down
              color: #b7bbbf
          .text
            margin-left: 4px
            font-size: 12px
            line-height: 16px
            color: #07111b
            vertical-align: middle
</style>
