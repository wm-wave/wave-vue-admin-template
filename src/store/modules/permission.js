import { asyncRoutes, constantRoutes } from '@/router'

function hasPermission(permissions, route) {
    if (route.meta && route.meta.role) {
        return permissions.some(role => route.meta.role === role)
    } else {
        return true
    }
}

const permission = {
    namespaced: true,
    state: {
        routes: constantRoutes,
        addRouters: [],
        sidebarLoading: true
    },
    getDefaultState() {
        return {
            routes: constantRoutes,
            addRouters: [],
            sidebarLoading: true
        }
    },
    mutations: {
        SET_ROUTERS: (state, routes) => {
            state.addRouters = routes
            state.routes = constantRoutes.concat(routes)
        },
        SET_SIDEBARITEM_LOADING: (state, flag) => {
            state.sidebarLoading = flag
        }
    },
    actions: {
        GenerateRoutes({ commit }, data) {
            console.log(data)
            return new Promise(resolve => {
                const { role_data: { permission_ids } } = data
                console.log(permission_ids)
                const permissions = permission_ids.split(',').map(item => Number(item))
                const accessedRouters = asyncRoutes.filter(v => {
                    // console.log(permissions.indexOf('admin'))
                    // if (permissions.indexOf('admin') >= 0) return true
                    if (hasPermission(permissions, v)) {
                        if (v.children && v.children.length > 0) {
                            v.children = v.children.filter(child => {
                                if (hasPermission(permissions, child)) {
                                    return child
                                }
                                return false
                            })
                            return v
                        } else {
                            return v
                        }
                    }
                    return false
                })
                console.log(accessedRouters)
                commit('SET_ROUTERS', accessedRouters)
                resolve()
            })
        }
    }
}

export default permission
