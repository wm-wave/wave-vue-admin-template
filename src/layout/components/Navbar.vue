<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <!-- <breadcrumb class="breadcrumb-container" /> -->
    <div class="top-nav-bar">
      <Topbar />
    </div>

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img src="../../imgs/defaultAvatar.png" class="user-avatar" />

          <div class="role-name-row">
            <div>{{ role }}</div>
            <div class="name">{{ name }}</div>
          </div>

          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>回到首页</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="modUserName">
            <span style="display: block">修改用户名</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-dialog
      title="修改用户名"
      :visible.sync="userNameFormVisible"
      width="30%"
      @close="handleClose('userNameForm')"
    >
      <el-form
        ref="userNameForm"
        :model="userNameForm"
        label-position="left"
        :rules="userNameRules"
      >
        <el-form-item prop="username" label="新用户名：" label-width="100px">
          <el-input v-model="userNameForm.username" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userNameFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('userNameForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Topbar from './Topbar'

import { modUserName } from '@/api/user'
export default {
  components: {
    // Breadcrumb,
    Hamburger,
    Topbar
  },

  data() {
    return {
      userNameFormVisible: false,
      userNameForm: {
        username: ''
      },
      userNameRules: {
        username: [
          { required: true, message: '新用户名不能为空~', trigger: 'blur' }
        ]
      }
    }
  },

  computed: {
    ...mapGetters(['sidebar', 'name', 'role'])
  },

  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    modUserName() {
      this.userNameFormVisible = true
    },
    handleClose(formName) {
      this.$refs[formName].resetFields()
    },

    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          console.log(this[formName])
          const { code, msg } = await modUserName(this[formName])
          if (code === 0) {
            this.$message({
              type: 'success',
              message: '修改用户名成功~'
            })
            // 更新用户信息
            this.$store.dispatch('user/getInfo')
            this.userNameFormVisible = false
          } else {
            this.$message({
              type: 'warning',
              message: msg
            })
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  display: flex;
  height: 60px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 56px;
    height: 100%;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
  }

  .right-menu {
    height: 100%;
    line-height: 60px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 10px;
        position: relative;
        display: flex;
        align-items: center;
        cursor: pointer;

        .role-name-row {
          display: flex;
          flex-direction: column;
          margin: 0 8px;

          div {
            line-height: 18px;
          }

          .name {
            font-size: 16px;
            font-weight: bold;
          }
        }

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          font-size: 12px;
        }
      }
    }
  }
}

.top-nav-bar {
  flex-grow: 1;
  margin-right: 10px;
}
</style>
