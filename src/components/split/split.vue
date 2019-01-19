<template>
  <div class="component-split border-1px"></div>
</template>

<script>
export default {
  name: 'split'
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'

.component-split
  width: 100%
  height: 16px
  border-1px(rgba(7, 17, 27, 0.1))
  border-1px-before(rgba(7, 17, 27, 0.1))
  background-color: #f3f5f7
</style>
