<template>
  <h1
    :style="{
      fontSize: fontSize + 'px',
      lineHeight: lineHeight + 'px',
      '--margin': marginSides + 'px'
    }"
  >
    {{ text }}
  </h1>
</template>

<script>
export default {
  name: 'title-line',
  props: {
    text: {
      type: String,
      default: ''
    },
    fontSize: {
      type: String,
      default: '14'
    },
    lineHeight: {
      type: String,
      default: '14'
    },
    marginSides: {
      type: String,
      default: '12'
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
h1
  display: flex
  align-items: center
  font-weight: 700
  &:after, &:before
    content: ''
    flex: 1
    border-bottom: 1px solid rgba(255, 255, 255, 0.2)
    margin-right: var(--margin, 12px)
  &:after
    margin: 0 0 0 var(--margin, 12px)
</style>
