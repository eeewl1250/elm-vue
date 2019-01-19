import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    foods: []
  },
  mutations: {
    initFoods (state, foods) {
      state.foods = foods
    },
    addFoodsCountByOne (state, index) {
      state.foods[index[0]][index[1]].count++
    },
    reduceFoodsCountByOne (state, index) {
      const oldCount = state.foods[index[0]][index[1]].count
      state.foods[index[0]][index[1]].count = oldCount ? oldCount - 1 : 0
    },
    clearFoodsCount (state) {
      for (let typeFoods of state.foods) {
        for (let food of typeFoods) {
          food.count = 0
        }
      }
    }
  },
  actions: {
    initFoods ({ commit }, foods) {
      commit('initFoods', foods)
    },
    addFoodsCountByOne ({ commit }, index) {
      commit('addFoodsCountByOne', index)
    },
    reduceFoodsCountByOne ({ commit }, index) {
      commit('reduceFoodsCountByOne', index)
    },
    clearFoodsCount ({ commit }) {
      commit('clearFoodsCount')
    }
  }
})

export default store
