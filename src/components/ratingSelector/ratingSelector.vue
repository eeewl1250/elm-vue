<template>
  <div class="component-rating-selector border-1px">
    <ul class="type-selector border-1px">
      <li v-for="(selector, key) in selectors"
          :key="key"
          :class="[
            selector.type,
            {'selected': selectorType===selector.type}
          ]"
          @click="changeType(selector.type)"
      >
        <span class="name">{{ selector.name}}</span>
        <span class="count">{{ counts[key] }}</span>
      </li>
    </ul>
    <div class="content-selector"
         :class="{'only-content': onlyContent}"
         @click="toggleOnlyContent"
    >
      <span class="icon icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
const selectorTypes = {
  ALL: 'all',
  SATISFIED: 'satisfied',
  UNSATISFIED: 'unsatisfied'
}

export default {
  name: 'ratingSelector',
  props: {
    counts: {
      type: Array,
      default () {
        return [0, 0, 0]
      }
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    selectorType: {
      type: String
    }
  },
  data () {
    return {
      selectorTypes: {
        ALL: 'all',
        SATISFIED: 'satisfied',
        UNSATISFIED: 'unsatisfied'
      },
      selectors: [
        {
          type: selectorTypes.ALL,
          name: '全部'
        },
        {
          type: selectorTypes.SATISFIED,
          name: '满意'
        },
        {
          type: selectorTypes.UNSATISFIED,
          name: '不满意'
        }
      ]
    }
  },
  methods: {
    changeType (type) {
      this.$emit('changeType', type)
    },
    toggleOnlyContent () {
      this.$emit('contentSelector', !this.onlyContent)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'

.component-rating-selector
  padding: 0 18px
  border-1px(rgba(7, 17, 27, 0.1))
  .type-selector
    padding: 18px 0
    font-size: 0
    border-1px(rgba(7, 17, 27, 0.1))
    li
      display: inline-block
      padding: 8px 12px
      margin-left: 8px
      color: #4d555d
      line-height: 16px
      border-radius: 1px
      &:first-child
        margin-left: 0
      .name
        font-size: 12px
      .count
        margin-left: 4px
        font-size: 8px
      &.all
        background-color: #00a0dc
      &.satisfied
        background-color: rgba(0, 160, 220, 0.2)
      &.unsatisfied
        background-color: rgba(77, 85, 93, 0.2)
      &.selected
        color: #ffffff
  .content-selector
    padding: 12px 0
    line-height: 24px
    color: #93999f
    .icon
      font-size: 24px
      vertical-align: middle
    .text
      font-size: 12px
      vertical-align: middle
    &.only-content
      color: #00a0dc
</style>
