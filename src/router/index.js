import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }
]

export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '总览', icon: 'dashboard', role: 1 }
    }],
    meta: { title: '总览', icon: 'dashboard' }
  },

  {
    path: '/dashboard1',
    redirect: '/dashboard1/dashboard1/dashboard111',
    component: Layout,
    children: [{
      path: 'dashboard1',
      name: 'Dashboard1',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '总览1', icon: 'dashboard', role: 1 },
      children: [{
        path: 'dashboard111',
        name: 'Dashboard111',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '总览111', icon: 'dashboard', role: 1 }
      },

      {
        path: 'dashboard112',
        name: 'Dashboard112',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '总览112', icon: 'dashboard', role: 1 }
      }
      ]
    },

    {
      path: 'dashboard11',
      name: 'Dashboard11',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '总览11', icon: 'dashboard', role: 1 }
    }
    ],
    meta: { title: '总览1', icon: 'dashboard' }
  },

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
