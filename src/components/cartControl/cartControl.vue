<template>
  <div class="cart-control">
    <transition name="move">
      <span v-if="count"
            class="icon icon-remove_circle_outline"
            @click="reduceQuantity"
      ></span>
    </transition>
    <transition name="move">
      <span v-if="count" class="number">{{count}}</span>
    </transition>
    <span class="icon icon-add_circle" @click="addQuantity"></span>
  </div>
</template>

<script>
export default {
  name: 'cartControl',
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  methods: {
    reduceQuantity () {
      this.$emit('reduceCount')
    },
    addQuantity () {
      this.$emit('addCount')
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.cart-control
  position: absolute
  bottom: 0
  right: 0
  font-size: 24px
  line-height: 24px
  color: #00a0dc
  .move-enter-active, .move-leave-active
    transition: all 0.3s
  .move-enter-to, .move-leave
    position: relative
    right: 0
    opacity: 1
  .move-enter, .move-leave-to
    position: relative
    right: -44px
    opacity: 0
  .icon
    vertical-align: middle
    empty-span()
  .number
    vertical-align: middle
    font-size: 10px
    color: #93999f
</style>
