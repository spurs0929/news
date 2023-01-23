import { IHeaderInfo } from '@/typings'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

// header路由設置
export const headerInfos: Array<IHeaderInfo> = [
  // 首頁
  {
    // 路由名稱
    name: 'Home',
    // header標題
    title: '新聞頭條',
    // 左側icon是否顯示
    left: false,
    // 右側icon是否顯示
    right: true,
    // 左側icon顯示名稱
    leftIcon: '',
    // 右側icon顯示名稱
    rightIcon: 'mine',
    // 左側icon路由
    leftPath: '',
    rightPath: '/mynews'
  },
  // 詳情頁
  {
    // 路由名稱
    name: 'Detail',
    // header標題
    title: '新聞詳情',
    // 左側icon是否顯示
    left: true,
    // 右側icon是否顯示
    right: true,
    // 左側icon顯示名稱
    leftIcon: 'arrow-right',
    // 右側icon顯示名稱
    rightIcon: 'star-o',
    // 左側icon路由
    leftPath: '',
    rightPath: ''
  },
  // 收藏列表頁
  {
    // 路由名稱
    name: 'MyNews',
    // header標題
    title: '收藏列表',
    // 左側icon是否顯示
    left: true,
    // 右側icon是否顯示
    right: false,
    // 左側icon顯示名稱
    leftIcon: 'arrow-right',
    // 右側icon顯示名稱
    rightIcon: '',
    // 左側icon路由
    leftPath: '',
    rightPath: ''
  }
] 

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/detail/:uniquekey/:from',
    name: 'Detail',
    component: () => import(/*webpackChunkName: "detail"*/'../views/Detail.vue')
  },
  {
    path: '/mynews',
    name: 'MyNews',
    component: () => import(/*webpackChunkName: "mynews"*/'../views/MyNews.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
