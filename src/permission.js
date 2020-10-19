import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { Message } from 'element-ui'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      Message({
        message: '您已经是登录状态~'
      })
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfoRoles = store.getters.roles

      if (hasGetUserInfoRoles.length === 0) {
        store.dispatch('user/getInfo').then(data => {
          store.dispatch('permission/GenerateRoutes', data).then(() => { // 生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表

            // remove loading
            store.commit('permission/SET_SIDEBARITEM_LOADING', false)

            // 无任何权限
            if (store.getters.addRouters.length === 0) {
              next('/404')
              return
            }

            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
          })
        })
        // next()
      } else {
        // 当有用户权限的时候，说明所有可访问路由已生成
        console.log('next')
        next()
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
