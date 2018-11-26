<template>
  <span
    class="support-icon"
    :class="[classMap[type], 'style' + iconStyle]"
    :style="{'--size': size + 'px'}"
  ></span>
</template>

<script>
export default {
  name: 'support-icon',
  data () {
    return {
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  },
  computed: {

  },
  props: {
    type: {
      type: Number,
      default: 0
    },
    size: {
      type: String,
      default: '12'
    },
    iconStyle: {
      type: String,
      default: '1'
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'

support-bg($type)
  &.style1
    bg-image($type + "_1")
  &.style2
    bg-image($type + "_2")
  &.style3
    bg-image($type + "_3")
  &.style4
    bg-image($type + "_4")

.support-icon
  display: inline-block
  vertical-align: middle
  width: var(--size, 12px)
  height: var(--size, 12px)
  background-size: var(--size, 12px)
  background-repeat: no-repeat
  empty-span()
  &.decrease
    support-bg("decrease")
  &.discount
    support-bg("discount")
  &.invoice
    support-bg("invoice")
  &.special
    support-bg("special")
  &.guarantee
    support-bg("guarantee")
</style>
