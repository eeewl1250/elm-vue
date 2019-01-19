<template>
  <div class="scroll-list" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'scrollList',
  props: {
    click: {
      type: Boolean,
      default: true
    },
    probeType: {
      type: Number,
      default: 3
    }
  },
  created () {
    this.$nextTick(() => {
      this._initScroll()
    })
  },
  methods: {
    _initScroll () {
      if (!this.$refs.wrapper) { return }
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: this.click,
        probeType: this.probeType
      })
      this.scroll.on('scroll', (pos) => {
        this.$emit('scroll', Math.abs(Math.round(pos.y)))
      })
    },
    vScrollToEl (scrollToEl, time) {
      this.scroll.scrollToElement(scrollToEl, time)
    }
  }
}
</script>
