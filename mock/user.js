const tokens = {
  '15073864715': {
    code: '123',
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    info: {
      username: 'wave',
      role_data: {
        permission_ids: '0,1,2,3',
        role_name: '测试角色'
      }
    }
  }
}

module.exports = [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      console.log(config.body)
      const { phone, code } = config.body
      console.log(phone, code)
      const token = tokens[phone]['token']
      // mock error
      if (!token && code === tokens[phone]['code']) {
        return {
          code: 1,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 0,
        data: {
          token
        }
      }
    }
  },

  // get user info
  {
    url: '/info/get/info',
    type: 'post',
    response: () => {
      return {
        code: 20000,
        data: users['admin-token']['info']
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
