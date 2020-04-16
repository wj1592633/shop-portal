import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../components/Login.vue'
import GoodsList from '../components/GoodsList.vue'
import Index from '../components/Index.vue'
import GoodsInfo from '../components/GoodsInfo.vue'
import OrderList from '../components/OrderList.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/index',
    redirect: '/index/goods'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/index',
    name: 'index',
    component: Index,
    children: [
      {
        path: 'goods',
        name: 'goods',
        component: GoodsList
      },
      {
        path: 'order',
        name: 'order',
        component: OrderList
      },
      {
        path: 'goodsinfo',
        name: 'goodsInfo',
        component: GoodsInfo
      }
    ]
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
