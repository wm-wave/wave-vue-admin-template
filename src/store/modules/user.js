import { login, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import permission from './permission'
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    role: '',
    avatar: '../../imgs/defaultAvatar.png',
    roles: [],
    uId: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())

    // 重置权限
    Object.assign(permission.state, permission.getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ROLE: (state, roleName) => {
    state.role = roleName

    console.log(state.role, 'rolename')
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_UID: (state, uId) => {
    state.uId = uId
    localStorage.setItem('uId', uId)
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login((userInfo)).then(res => {
        if (res.code === 0) {
          console.log(res)
          const { data } = res

          commit('SET_TOKEN', data.token)
          setToken(data.token)
        }

        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(res => {
        const { data } = res

        if (!data) {
          reject('校验失败，请重新登录~')
        }

        console.log(data, '用户信息')

        const { username, role_data: { permission_ids, role_name } } = data

        commit('SET_ROLE', role_name)
        commit('SET_NAME', username)
        commit('SET_ROLES', permission_ids.split(',').map(item => Number(item)))
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    console.log('11')
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

