<template>
  <div class="goods" ref="goods">
    <scroll-list class="menu-wrapper" ref="menu-wrapper">
      <ul ref="menu-items">
        <li
          class="menu-item"
          v-for="(item, index) in goods"
          :key="index"
          :class="{current: currentIndex === index}"
          @click="selectMenu(index)"
        >
          <span class="text border-1px">
            <support-icon v-if="item.type >= 0" :type="item.type" icon-style="3"></support-icon>
            {{ item.name }}
          </span>
        </li>
      </ul>
    </scroll-list>
    <scroll-list class="foods-wrapper" ref="foods-wrapper" v-on:scroll="getFoodsScrollY">
      <ul ref="type-items">
        <li class="type-item"
            v-for="(item, index) in goods"
            :key="index"
        >
          <div class="title">{{ item.name }}</div>
          <ul>
            <li class="food-item border-1px" v-for="(food, idx) in item.foods" :key="idx">
              <div class="image" @click="showFoodDetail(food, [index, idx])">
                <img :src="food.image" width="57" height="57">
              </div>
              <div class="content">
                <div class="name">{{ food.name }}</div>
                <div class="description">{{ food.description }}</div>
                <div class="evaluation">
                  <span class="selling">月售{{ food.sellCount }}份</span>
                  <span class="rating">好评率{{ food.rating }}%</span>
                </div>
                <div class="price">
                  <span class="new"><span class="symbol">¥</span>{{ food.price }}</span>
                  <span class="old" v-if="food.oldPrice"><span class="symbol">¥</span>{{ food.oldPrice }}</span>
                </div>
                <div class="quantity">
                  <cart-control :count="foods[index][idx].count"
                                @addCount="addCount([index, idx])"
                                @reduceCount="reduceCount([index, idx])"
                  ></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </scroll-list>
    <food :food="showedFood" v-if="isDetailShowed" @hideDetail="hideFoodDetail"></food>
  </div>
</template>

<script>
import scrollList from '@/components/scrollList/scrollList'
import supportIcon from '@/components/supportIcon/supportIcon'
import cart from '@/components/cart/cart'
import cartControl from '@/components/cartControl/cartControl'
import viewFood from '@/views/food'

const ERR_OK = 0

export default {
  name: 'Goods',
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    supportIcon,
    'scroll-list': scrollList,
    cart,
    'cart-control': cartControl,
    food: viewFood
  },
  data () {
    return {
      goods: [],
      typeItemHeight: [],
      foodsScrollY: 0,
      currentIndex: 0,
      foodsQuantity: 0,
      isDetailShowed: false,
      showedFood: {},
      resizeTimer: false
    }
  },
  computed: {
    foods () {
      return this.$store.state.foods
    }
  },
  watch: {
    foodsScrollY () {
      let foodsScrollY = this.foodsScrollY
      let heightFrom = 0
      let heightTo = 0
      for (let i = 0, len = this.typeItemHeight.length; i < len; i++) {
        heightFrom = i ? heightTo : 0
        heightTo += this.typeItemHeight[i]
        if (foodsScrollY >= heightFrom && foodsScrollY < heightTo) {
          this.currentIndex = i
          this.$refs['menu-wrapper'].vScrollToEl(this.$refs['menu-items'].getElementsByClassName('menu-item')[i], 500)
          return
        }
      }
      this.currentIndex = 0
    }
  },
  created () {
    this.$http.get('/api/goods')
      .then(res => {
        res = res.data
        if (res.errno === ERR_OK) {
          this.goods = res.data
          this._initFoods()
          this.$nextTick(() => {
            this._calculateHeight()
          })
        }
      })
  },
  mounted () {
    this.$nextTick(() => {
      window.onresize = () => {
        if (!this.resizeTimer) {
          this.resizeTimer = true
          this.$router.go(0)
          setTimeout(() => {
            this.resizeTimer = false
          }, 400)
        }
      }
    })
  },
  methods: {
    _initFoods () {
      let foods = []
      for (let good of this.goods) {
        let typeFoods = []
        for (let food of good.foods) {
          typeFoods.push({
            name: food.name,
            price: food.price,
            count: 0
          })
        }
        foods.push(typeFoods)
      }
      this.$store.dispatch('initFoods', foods)
    },
    _calculateHeight () {
      let typeItems = this.$refs['type-items'].getElementsByClassName('type-item')
      Array.prototype.forEach.call(typeItems, item => {
        this.typeItemHeight.push(item.clientHeight)
      })
    },
    selectMenu (index) {
      this.currentIndex = index
      this.$refs['foods-wrapper'].vScrollToEl(this.$refs['type-items'].getElementsByClassName('type-item')[index], 500)
    },
    getFoodsScrollY (scrollY) {
      this.foodsScrollY = scrollY
    },
    addCount (index) {
      this.$store.dispatch('addFoodsCountByOne', index)
    },
    reduceCount (index) {
      this.$store.dispatch('reduceFoodsCountByOne', index)
    },
    showFoodDetail (food, index) {
      this.isDetailShowed = true
      this.showedFood = food
      this.showedFood.index = index
    },
    hideFoodDetail (isDetailShowed) {
      this.isDetailShowed = isDetailShowed
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../common/stylus/mixin.styl'

.goods
  display: flex
  font-size: 0
  position: absolute
  top: 174px
  bottom: 48px
  width: 100%
  overflow: hidden
  .menu-wrapper
    flex: 0 0 80px
    .menu-item
      display: table
      width: 56px
      padding: 0 12px
      background-color: #f3f5f7
      .text
        display: table-cell
        vertical-align: middle
        padding: 21px 0
        font-size: 12px
        border-1px(rgba(7, 17, 27, 0.1))
      &.current
        position: relative
        top: -1px
        background-color: #fff
        .text
          border-none()
  .foods-wrapper
    flex: 1
    .type-item
      .title
        padding: 7px 14px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: #93999f
        background-color: #f3f5f7
      .food-item
        display: flex
        padding: 18px 0
        margin: 0 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
        .image
          flex: 0 0 57px
          width: 57px
        .content
          flex: 1
          position: relative
          margin-left: 10px
          .name
            margin-top: 2px
            font-size: 14px
            line-height: 14px
            color: #07111b
          .description
            margin-top: 8px
            font-size: 10px
            line-height: 12px
            color: #93999f
          .evaluation
            margin-top: 8px
            .selling, .rating
              font-size: 10px
              line-height: 10px
              color: #93999f
            .rating
              margin-left: 12px
          .price
            .new
              line-height: 24px
              font-size: 14px
              font-weight: 700
              color: #f01414
              .symbol
                font-size: 10px
                font-weight: normal
            .old
              margin-left: 8px
              line-height: 24px
              font-size: 10px
              font-weight: 700
              text-decoration: line-through
              color: #93999f
              .symbol
                font-weight: normal
          .quantity
            position: relative
</style>
