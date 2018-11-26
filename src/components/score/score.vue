<template>
  <div class="score">
    <span v-for="(starType, index) in starTypes" :key="index" :class="['star', starType, size]" ></span>
  </div>
</template>

<script>
export default {
  name: 'score',
  props: {
    score: {
      type: Number,
      default: 0
    },
    size: {
      type: String,
      default: 'small'
    }
  },
  computed: {
    starTypes () {
      const LEN = 5
      const TYPES = ['on', 'half', 'off']
      const SCORE = Number(this.score)
      let result = []
      let resMap = new Map([
        [TYPES[0], Math.floor(SCORE)],
        [TYPES[1], SCORE * 10 % 10 >= 5 ? 1 : 0]
      ])
      resMap.set(TYPES[2], LEN - resMap.get(TYPES[0]) - resMap.get(TYPES[1]))
      for (let i = 0; i < TYPES.length; i++) {
        let re = Array.apply(null, { length: resMap.get(TYPES[i]) }).fill(TYPES[i])
        Array.prototype.push.apply(result, re)
      }
      return result
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixin.styl'

star-bg($size)
  &.on
    bg-image('star' + $size + '_on')
  &.half
    bg-image('star' + $size + '_half')
  &.off
    bg-image('star' + $size + '_off')

.score
  display: flex
  justify-content: center
  .star
    background-repeat: no-repeat
    &.small
      width: w = 12px
      height: w
      margin: 0 6px
      background-size: w
      star-bg('24')
    &.medium
      width: w = 18px
      height: w
      margin: 0 9px
      background-size: w
      star-bg('36')
    &.large
      width: w = 24px
      height: w
      margin: 0 12px
      background-size: w
      star-bg('48')
</style>
