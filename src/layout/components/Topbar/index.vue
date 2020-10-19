<template>
  <div v-loading="sidebarLoading" class="top-bar-box">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      text-color="#000000"
      :active-text-color="variables.menuActiveText"
      @select="handleSelect"
    >
      <template v-for="(route, index) in filterRoutes">
        <el-menu-item :key="index" :index="index + ''">
          {{ route.meta.title }}
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import variables from '@/styles/variables.scss'

let activeIndex = ''

export default {
  computed: {
    ...mapGetters(['addRouters', 'sidebarLoading', 'routes']),

    filterRoutes() {
      return this.routes.filter((item) => !item.hidden)
    },

    activeMenu() {
      const route = this.$route
      const { meta, path } = route

      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },

    variables() {
      return variables
    },

    activeIndex() {
      const route = this.$route
      const { path } = route
      const targetPath = path.substr(path.lastIndexOf('/') + 1)

      const tempIndex = this.getActiveIndex(this.filterRoutes, targetPath)

      // set
      this.$store.dispatch('app/updateSideBarActive', tempIndex)

      return tempIndex
    }
  },

  methods: {
    handleSelect(key) {
      this.$router.push('/' + this.filterRoutes[key]['children'][0]['path'])
    },

    findActiveIndex(arr, target) {
      const tempIndex = activeIndex
      // 只考虑三层
      arr.some((item, index) => {
        // 暂时只考虑 三级
        if (item.children) {
          item.children.some((itemChildItem) => {
            console.log(itemChildItem.path, target, 1)
            if (itemChildItem.path === target) {
              activeIndex = index + ''
              return true
            } else {
              if (itemChildItem.children) {
                itemChildItem.children.some((leastChidItem) => {
                  console.log(leastChidItem.path, target, 2)
                  if (leastChidItem.path === target) {
                    activeIndex = index + ''
                    return true
                  }
                })

                // 跳出some
                if (activeIndex !== tempIndex) {
                  return true
                }
              }
            }
          })
        }

        // 跳出some
        if (activeIndex !== tempIndex) {
          console.log(activeIndex, 886)
          return true
        }
      })
    },

    getActiveIndex(arr, target) {
      this.findActiveIndex(arr, target)

      return activeIndex
    }
  }
}
</script>

<style scoped>
.scrollbar-wrapper {
  height: 100%;
}
.el-menu {
  height: 100%;
}
.top-bar-item {
  width: 100px;
  height: 100%;
}
.top-bar-box {
  height: 100%;
}
</style>
