<template>
  <div class="login-container">
    <div class="login-box">
      <div class="switch-way-box">
        <img
          :src="
            loginWay ? require('./img/pc.png') : require('./img/qr-code.png')
          "
          alt
          @click="handleSwitch(loginWay ? 0 : 1)"
        />

        <div class="switch-cover"></div>
      </div>
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        :class="'login-form ' + (loginWay ? 'box-hide' : 'box-show')"
        auto-complete="on"
        label-position="left"
      >
        <div class="title-container">
          <h3 class="title">盛祥商贸 后台</h3>
        </div>

        <el-form-item prop="phone">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="phone"
            v-model="loginForm.phone"
            placeholder="请输入手机号"
            name="phone"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>

        <div class="form-item-code">
          <el-form-item prop="code">
            <el-input
              ref="code"
              v-model="loginForm.code"
              placeholder="请输入手机验证码"
              name="password"
              tabindex="3"
            />
          </el-form-item>

          <el-button
            :loading="verifyLoading"
            type="primary"
            class="get-code-btn"
            :disabled="loginForm.phone.length <= 0"
            @click="handlesendSms"
          >
            获取验证码
            <span v-show="verifyLoading">({{ downCount }})</span>
          </el-button>
        </div>

        <el-button
          :loading="loginLoading"
          type="primary"
          style="width: 100%; margin-bottom: 30px"
          @click.native.prevent="handleLogin"
          >登录</el-button
        >
      </el-form>
    </div>

    <div :class="'qr-code-box ' + (loginWay ? 'box-show' : 'box-hide')">
      <h3 class="title">盛祥商贸 后台</h3>

      <div id="qrCode"></div>
    </div>
  </div>
</template>

<script>
import { sendSms } from '@/api/user.js'
export default {
  name: 'Login',
  //  case 'phone':
  //           return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!/^1[2|3|4|5|6|7|8|9][0-9]{9}$/.test(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }

    return {
      // 1 二维码登陆  0 验证码登录
      loginWay: 0,
      loginForm: {
        phone: '15073864715',
        code: '123'
      },
      loginRules: {
        phone: [
          {
            required: true,
            message: '手机号不能为空',
            trigger: 'blur'
          },

          { validator: validatePhone, trigger: 'blur' }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空',
            trigger: 'change'
          }
        ]
      },
      loginLoading: false,
      verifyLoading: false,
      downCount: 60,
      redirect: undefined
    }
  },

  mounted() {
    const s = document.createElement('script')
    s.type = 'text/javascript'
    s.src = 'http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js'
    const wxElement = document.body.appendChild(s)

    wxElement.onload = function () {
      new WxLogin({
        self_redirect: true,
        id: 'qrCode', // 需要显示的容器id
        appid: 'wx958180f7fb366662',
        scope: 'snsapi_login', // 网页默认即可
        redirect_uri: encodeURIComponent('http://www.admin.dreamacro.cn:81'), // 授权成功后回调的url
        state: Math.ceil(Math.random() * 1000), // 可设置为简单的随机数加session用来校验
        style: 'black' // 提供"black"、"white"可选。二维码的样式
      })
    }
  },
  // watch: {
  //   $route: {
  //     handler: (route) => {
  //       this.redirect = route.query && route.query.redirect
  //     },
  //     immediate: true
  //   }
  // },
  methods: {
    handleSwitch(way) {
      console.log(way)
      this.loginWay = way
    },

    handlesendSms() {
      this.$refs.loginForm.validateField('phone', (err) => {
        if (!err) {
          this.verifyLoading = true
          sendSms({
            phone: this.loginForm.phone
          }).then((res) => {
            if (res.code === 0) {
              this.$message({
                message: '验证码发送成功',
                type: 'success'
              })
            } else {
              this.$message({
                message: res.msg,
                type: 'error'
              })
            }
          })
          this.verifyTimer = setInterval(() => {
            this.downCount -= 1
            if (this.downCount === 0) {
              clearInterval(this.verifyTimer)
              this.downCount = 60
              this.verifyLoading = false
            }
          }, 1000)
        }
      })
    },

    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loginLoading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then((res) => {
              if (res.code === 0) {
                this.$message({
                  message: '登录成功~',
                  type: 'success'
                })

                this.$router.push('/')
              } else {
                this.$message({
                  message: res.msg,
                  type: 'error'
                })
              }
              this.loginLoading = false
            })
            .catch(() => {
              this.loginLoading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .box-hide {
    display: none;
  }

  .box-show {
    display: block;
  }

  .qr-code-box {
    width: 350px;
    height: 350px;
    padding-top: 160px;
    margin: 0 auto;

    img {
      width: inherit;
      height: inherit;
    }
  }

  .login-box {
    position: relative;
    width: 520px;
    margin: 0 auto;

    .switch-way-box {
      position: absolute;
      z-index: 3;
      right: 0;
      top: 50px;
      .switch-cover {
        position: absolute;
        z-index: 4;
        bottom: -90%;
        left: -85%;
        background-color: $bg;
        width: 110px;
        height: 110px;
        border-radius: 50%;
      }
      img {
        width: 65px;
        cursor: pointer;
      }
    }

    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      overflow: hidden;

      .form-item-code {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 22px;
        .el-form-item {
          flex-shrink: 0;
          height: 52px;
          margin-bottom: 0;
        }
        .get-code-btn {
          height: 40px;
        }
      }
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
  }

  .title {
    font-size: 26px;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
