import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'example' }
      }
    ]
  },


  {
    path: '/recharge',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'RechargeIndex',
        component: () => import('@/views/recharge/index'),
        meta: { title: '充值', icon: 'money' }
      }
    ]
  },
  {
    path: '/revenue',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'RevenueIndex',
        component: () => import('@/views/revenue/index'),
        meta: { title: '买单', icon: 'edit' }
      }
    ]
  },
  {
    path: '/payment',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'PaymentList',
        component: () => import('@/views/payment/list'),
        meta: { title: '营收', icon: 'form' }
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'Setting',
        component: () => import('@/views/set/index'),
        meta: { title: '设置', icon: 'set' }
      },
      {
        path: 'change-password',
        name: 'SettingPassword',
        component: () => import('@/views/set/changePassword'),
        meta: { title: '修改密码', icon: 'set' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    name: 'User',
    meta: {
      title: '会员',
      icon: 'peoples'
    },
    children: [
      {
        path: 'add',
        name: 'UserAdd',
        component: () => import('@/views/user/add'),
        meta: { title: '新增会员', icon: 'user' }
      },
      {
        path: 'list',
        name: 'UserList',
        component: () => import('@/views/user/list'),
        meta: { title: '会员列表', icon: 'nested' }
      },
      {
        path: 'payment/:mobile',
        name: 'UserPayment',
        component: () => import('@/views/user/payment'),
        meta: { title: '会员流水', icon: 'form' },
        hidden: true
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
