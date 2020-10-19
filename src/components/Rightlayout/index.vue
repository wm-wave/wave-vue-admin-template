<template>
  <div class="right-layout">
    <div class="module-title">
      <slot name="title"></slot>
    </div>

    <div v-loading="rightLoading" class="main">
      <div class="header">
        <slot name="header"></slot>
      </div>

      <div class="content">
        <slot name="table"></slot>
        <slot name="content"></slot>
      </div>
      <div v-if="isShowPaging" class="paging">
        <el-pagination
          :current-page="currentPage"
          background
          :page-sizes="pageSizes"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Rightlayout',
  props: {
    pageSizes: {
      type: Array,
      default: () => [10, 20, 50, 100]
    },

    pageSize: {
      type: Number,
      default: () => 10
    },

    total: {
      type: Number,
      default: () => 10
    },

    currentPage: {
      type: Number,
      default: () => 1
    },

    isShowPaging: {
      type: Boolean,
      default: () => true
    }
  },
  data() {
    return {
      rightLoading: false
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.$emit('handleSizeChange', val)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.$emit('handleCurrentChange', val)
    },

    // 开始请求数据
    initStart() {
      this.rightLoading = true
    },

    // 数据获取完成
    initFinish() {
      if (this.rightLoading) this.rightLoading = false
    }
  }
}
</script>

<style scoped>
.right-layout {
  width: 100%;
  height: 100%;
  /* background-color: #dddddd; */
  padding: 20px 40px;
}

.module-title {
  font-size: 28px;
  padding: 10px 0;
  border-bottom: 2px solid #ebeef5;
}

.header {
  margin-top: 20px;
  margin-bottom: 10px;
}

.table {
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.paging {
  margin-top: 20px;
}
</style>
