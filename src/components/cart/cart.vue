<template>
  <div class="cart">
    <div class="summary">
      <span class="logo-wrapper" @click="toggleDetail">
        <span class="logo icon-shopping_cart"
              :class="{ sufficient: totalQuantity > 0 }"
        ></span>
        <span class="quantity" v-if="totalQuantity > 0">{{ totalQuantity }}</span>
      </span>
      <span class="price" :class="{ sufficient: subtotal > 0}">¥{{ subtotal }}</span>
      <span class="delivery">另需配送费¥{{ seller.deliveryPrice }}元</span>
      <span class="pay sufficient" v-if="aboveMinPrice >= 0">结算</span>
      <span class="pay" v-else>还差¥{{ -aboveMinPrice }}元起送</span>
    </div>
    <div class="detail-wrapper" v-show="isDetailShowed" @click.self="hideDetail">
      <div class="detail">
        <div class="detail-title border-1px">
          <span class="text">购物车</span>
          <button class="clear" @click="clear">清空</button>
        </div>
        <ul class="content">
          <li class="border-1px" v-for="(food, fKey) in foodsList" :key="fKey" v-if="food.count">
            <div class="food-info">
              <span class="name">{{ food.name }}</span>
              <span class="food-price"><span class="unit">￥</span>{{ food.price }}</span>
            </div>
            <div class="control-bar">
              <cart-control :count="food.count"
                            @addCount="addCount(food.index)"
                            @reduceCount="reduceCount(food.index)"
              ></cart-control>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import cartControl from '../cartControl/cartControl'

export default {
  name: 'cart',
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      isDetailShowed: false
    }
  },
  components: {
    'cart-control': cartControl
  },
  computed: {
    foods () {
      return this.$store.state.foods
    },
    foodsList () {
      let foods = []
      for (let i = 0, fLen = this.foods.length; i < fLen; i++) {
        let typeFoods = this.foods[i]
        for (let j = 0, tLen = typeFoods.length; j < tLen; j++) {
          let food = typeFoods[j]
          food.index = [i, j]
          if (food.count) {
            foods.push(food)
          }
        }
      }
      return foods
    },
    totalQuantity () {
      let sum = 0
      for (let typeFoods of this.foods) {
        for (let food of typeFoods) {
          sum += food.count
        }
      }
      return sum
    },
    subtotal () {
      let sum = 0
      for (let typeFoods of this.foods) {
        for (let food of typeFoods) {
          sum += food.count * food.price
        }
      }
      return sum
    },
    aboveMinPrice () {
      return this.subtotal - this.seller.minPrice
    }
  },
  watch: {
    foodsList (val) {
      if (val.length) return
      this.isDetailShowed = false
    }
  },
  methods: {
    toggleDetail () {
      if (this.isDetailShowed) {
        this.hideDetail()
      } else {
        this.showDetail()
      }
    },
    showDetail () {
      if (this.foodsList.length) {
        this.isDetailShowed = true
      }
    },
    hideDetail () {
      this.isDetailShowed = false
    },
    reduceCount (index) {
      this.$store.dispatch('reduceFoodsCountByOne', index)
    },
    addCount (index) {
      this.$store.dispatch('addFoodsCountByOne', index)
    },
    clear () {
      this.$store.dispatch('clearFoodsCount')
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'

.cart
  position: relative
  .summary
    display: flex
    position: fixed
    z-index: 21
    left: 0
    bottom: 0
    align-items: center
    height: 48px
    width: 100%
    background-color: #141d27
    font-size: 12px
    line-height: 48px
    text-align: center
    color: rgba(255, 255, 255, 0.4)
    .logo-wrapper
      margin-left: 12px
      position: relative
      top: -4px
      border: 6px solid #141d27
      border-radius: 100%
      background-color: #141d27
      .logo
        display: inline-block
        padding: 10px
        line-height: 24px
        font-size: 24px
        border-radius: 50%
        background-color: rgba(255, 255, 255, 0.2)
        &.sufficient
          color: #ffffff
          background-color: #00a0dc
      .quantity
        position: absolute
        z-index: 22
        top: -6px
        right: -6px
        padding: 0 6px
        font-size: 9px
        line-height: 16px
        font-weight: 700
        color: #ffffff
        border-radius: 12px
        background-color: #f01414
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.4)
    .price
      margin: 12px 0
      padding: 0 12px
      line-height: 24px
      font-size: 16px
      font-weight: 700
      border-right: 1px solid rgba(255, 255, 255, 0.1)
      &.sufficient
        color: #ffffff
    .delivery
      flex: 1
    .pay
      padding: 0 8px
      min-width: 97px
      font-weight: 700
      background-color: #2b333b
      &.sufficient
        color: #ffffff
        background-color: #00b43c
  .detail-wrapper
    position: fixed
    z-index: 20
    top: 0
    bottom: 0
    right: 0
    left: 0
    background-color: rgba(7, 17, 27, 0.6)
    .detail
      position: fixed
      bottom: 48px
      width: 100%
      .detail-title
        display: flex
        justify-content: space-between
        padding: 0 18px
        line-height: 40px
        background-color: #f3f5f7
        border-1px(rgba(7, 17, 27, 0.1))
        border-1px-before(rgba(7, 17, 27, 0.1))
        .text
          font-size: 14px
          color: #07000b
        .clear
          font-size: 12px
          color: #00a0dc
      .content
        max-height: 224px
        overflow-y: auto
        padding: 0 18px 18px
        background-color: #fff
        &::-webkit-scrollbar
          display: none
        li
          display: flex
          justify-content: space-between
          padding: 12px 0
          border-1px(rgba(7, 17, 27, 0.1))
          .food-info
            flex: 1
            height: 24px
            .name
              float: left
              font-size: 14px
              line-height: 24px
              color: #07000b
            .food-price
              float: right
              font-size: 14px
              line-height: 24px
              font-weight: 700
              color: #f01414
              .unit
                font-size: 10px
                font-weight: normal
          .control-bar
            position: relative
            flex: 0 0 90px
</style>
