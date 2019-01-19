<template>
  <div class="ratings">
    <div class="overview">
      <dl class="overview-score border-1px-right">
        <dd class="score">{{ seller.score }}</dd>
        <dt class="title">综合评分</dt>
        <dd class="rank">高于周边商家{{ seller.rankRate }}%</dd>
      </dl>
      <div class="overview-star">
        <dl class="service">
          <dt>服务态度</dt>
          <dd><star :score="seller.serviceScore" size="medium-ratings"></star></dd>
          <dd>{{ seller.serviceScore }}</dd>
        </dl>
        <dl class="service">
          <dt>商品评分</dt>
          <dd><star :score="seller.foodScore" size="medium-ratings">></star></dd>
          <dd>{{ seller.foodScore }}</dd>
        </dl>
        <dl class="delivery">
          <dt>送达时间</dt>
          <dd>{{ seller.deliveryTime }}分钟</dd>
        </dl>
      </div>
    </div>
    <split></split>
    <rating-selector
      :counts="counts"
      :onlyContent="onlyContent"
      :selectorType="selectorType"
      @contentSelector="toggleOnlyContent"
      @changeType="changeSelectorType"
    ></rating-selector>
    <ul class="detail">
      <li class="border-1px" v-for="(rating, key) in selectedRatings" :key="key">
        <div class="avatar">
          <img :src="rating.avatar" width="28" height="28" />
        </div>
        <div class="content">
          <div class="user">
            <div class="username">{{ rating.username }}</div>
            <div class="rate-time">{{ $util.timeConvert(rating.rateTime) }}</div>
          </div>
          <div class="rating">
            <div class="score">
              <star :score="rating.score" size="small-ratings"></star>
            </div>
            <div class="delivery clearfix" v-if="rating.deliveryTime">{{ rating.deliveryTime }}分钟送达</div>
          </div>
          <div class="comment">{{ rating.text }}</div>
          <div class="recommend">
            <dt class="icon"
                  :class="[
                    {'icon-thumb_down':rating.rateType},
                    {'icon-thumb_up':!rating.rateType}
                  ]"
            ></dt>
            <dd class="food"
                v-for="(recommendItem, rKey) in rating.recommend"
                :key="rKey"
            >{{ recommendItem }}</dd>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import star from '@/components/score/score'
import split from '@/components/split/split'
import ratingSelector from '@/components/ratingSelector/ratingSelector'

const ERR_OK = 0

const selectorTypes = {
  ALL: 'all',
  SATISFIED: 'satisfied',
  UNSATISFIED: 'unsatisfied'
}

export default {
  name: 'Ratings',
  props: {
    seller: {
      type: Object
    }
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
        this.ratings.length,
        this.ratings.filter(item => item.rateType === 0).length,
        this.ratings.filter(item => item.rateType === 1).length
      ]
    },
    selectedRatings () {
      return new Map([
        [selectorTypes.ALL, this.ratings],
        [selectorTypes.SATISFIED, this.ratings.filter(item => item.rateType === 0)],
        [selectorTypes.UNSATISFIED, this.ratings.filter(item => item.rateType === 1)]
      ]).get(this.selectorType)
        .filter(item => item.text || !this.onlyContent)
    }
  },
  components: {
    star,
    split,
    'rating-selector': ratingSelector
  },
  created () {
    this.$http.get('/api/ratings')
      .then(res => {
        res = res.data
        if (res.errno === ERR_OK) {
          this.ratings = res.data
        }
      })
  },
  methods: {
    toggleOnlyContent (onlyContent) {
      this.onlyContent = onlyContent
    },
    changeSelectorType (type) {
      this.selectorType = type
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../common/stylus/mixin.styl'

.ratings
  position: fixed
  top: 174px
  bottom: 48px
  width: 100%
  overflow: auto
  font-size: 0
  &::-webkit-scrollbar
    display: none
  .overview
    display: flex
    align-items: center
    .overview-score
      flex: 0.5
      margin: 18px auto
      text-align: center
      border-1px-right(rgba(7, 17, 27, 0.1))
      .score
        margin-bottom: 6px
        font-size: 24px
        line-height: 28px
        font-weight: 700
        color: #ff9900
      .title
        margin-bottom: 8px
        font-size: 12px
        line-height: 12px
        color: #07111b
      .rank
        margin-bottom: 6px
        font-size: 10px
        line-height: 10px
        color: #93999f
    .overview-star
      flex: 1
      dl
        display: flex
        align-items: center
        margin-top: 8px
        padding: 0 12px
        &:first-child
          margin-top: 0
        dt, dd
          font-size: 12px
          line-height: 18px
        dt
          color: #07111b
        dd
          margin-left: 12px
          color: #ff9900
        @media only screen and (max-width: 352px)
          padding: 0 8px
          dd
            margin-left: 6px
          .score
            .star.medium-ratings
              margin: 0 2px
      .delivery
        dd
          color: #93999f
  .detail
    li
      display: flex
      margin: 0 18px
      padding: 18px 0
      border-1px(rgba(7, 17, 27, 0.1))
      .avatar
        flex: 0 0 28px
        width: 28px
        height: 28px
        border-radius: 50%
        overflow: hidden
      .content
        flex: 1
        margin-left: 12px
        .user
          display: flex
          justify-content: space-between
          .username
            font-size: 10px
            line-height: 12px
            color: #07111b
          .rate-time
            font-size: 10px
            line-height: 12px
            color: #93999f
        .rating
          display: flex
          margin-top: 4px
          .delivery
            margin-left: 6px
            font-size: 10px
            line-height: 12px
            color: #93999f
        .comment
          margin-top: 6px
          font-size: 12px
          line-height: 18px
          color: #07111b
        .recommend
          display: flex
          flex-wrap: wrap
          margin-top: 4px
          .icon
            margin-top: 4px
            font-size: 12px
            line-height: 16px
            &.icon-thumb_up
              color: #00a0dc
            &.icon-thumb_down
              color: #b7bbbf
          .food
            margin: 4px 0 0 8px
            padding: 0 6px
            font-size: 9px
            line-height: 16px
            color: #93999f
            border: 1px solid rgba(7, 17, 27, 0.1)
            border-radius: 2px
</style>
