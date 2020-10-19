<template>
  <div class="search-box">
    <div v-if="isSearchDate" class="search-time">
      <el-date-picker
        v-model="searchForm.date"
        :picker-options="pickerOptions"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="handleDatePickerChange"
      ></el-date-picker>
    </div>

    <div v-if="isSearchTimeDate">
      <el-time-select
        v-model="searchForm.start_time"
        placeholder="起始时间"
        :picker-options="{
          start: '08:30',
          step: '00:15',
          end: '18:30'
        }"
        @change="handleDatePickerChange"
      ></el-time-select>
      <el-time-select
        v-model="searchForm.end_time"
        placeholder="结束时间"
        :picker-options="{
          start: '08:30',
          step: '00:15',
          end: '18:30',
          minTime: searchForm.start_time
        }"
        @change="handleDatePickerChange"
      ></el-time-select>
    </div>

    <div v-if="isSearchQeury" class="search-ipt">
      <el-input
        v-model="searchForm.key"
        :placeholder="placeholderTip"
        clearable
        @clear="handleSearch"
        @keyup.enter.native="handleSearch"
      ></el-input>
    </div>
    <el-button class="search-btn" type="primary" @click="handleSearch">搜索</el-button>
  </div>
</template>

<script>
let lastKey = ''
let lastDate = ''
let lastTime = ''

export default {
  props: {
    isSearchDate: {
      type: Boolean,
      default: () => true
    },

    isSearchTimeDate: {
      type: Boolean,
      default: () => false
    },

    isSearchQeury: {
      type: Boolean,
      default: () => true
    },

    placeholderTip: {
      type: String,
      default: () => '搜索关键字'
    }
  },

  data() {
    return {
      searchForm: {
        date: '',
        key: '',
        start_time: '',
        end_time: ''
      },
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }
    }
  },
  methods: {
    handleSearch() {
      const { date, key, start_time, end_time } = this.searchForm

      // 如果上次(初始)搜索和新的关键字都为空，那么不触发事件

      if (
        !date &&
        !lastDate &&
        !key &&
        !lastKey &&
        !start_time &&
        !end_time &&
        !lastTime
      ) {
        return
      }

      if (this.isSearchDate) {
        if (date) {
          if (typeof date[0] !== 'number') {
            date[0] = Math.ceil(date[0].getTime() / 1000)

            date[1] = Math.ceil(date[1].getTime() / 1000) + 86400
          }
        } else {
          lastDate = date
          lastKey = key

          this.$emit('handleSearch', {
            key,
            date: [0, 0]
          })

          return
        }
      }

      lastTime = start_time || end_time
      lastDate = date
      lastKey = key

      this.$emit('handleSearch', this.searchForm)
    },

    switchStatus() {
      this.searchForm = {
        date: '',
        key: ''
      }
    },

    handleDatePickerChange(val) {
      if (val === null) {
        this.handleSearch()
      }
    }
  }
}
</script>

<style scoped>
.search-box {
  display: flex;
}

.search-box > div:nth-of-type(2) {
  margin-left: 50px;
}

.search-btn {
  margin-left: 20px;
}

.el-date-editor + .el-date-editor {
  margin-left: 10px;
}
</style>
