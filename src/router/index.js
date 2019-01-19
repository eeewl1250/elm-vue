import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/views/goods'
import Ratings from '@/views/ratings'
import Seller from '@/views/seller'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/goods',
      component: Goods
    },
    {
      path: '/ratings',
      component: Ratings
    },
    {
      path: '/seller',
      component: Seller
    }
  ],
  linkActiveClass: 'active'
})
