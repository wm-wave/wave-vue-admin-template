<!--
 * @Author: your name
 * @Date: 2020-10-14 16:40:34
 * @LastEditTime: 2020-10-15 15:00:50
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \custom-element-themec:\Users\27485\Desktop\PM\jmcyAdminTemplate\src\layout\components\AppMain.vue
-->
<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 60px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
