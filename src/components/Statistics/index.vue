<template>
  <div class="statistics-component-box">
    <div v-for="item in computedStatic" :key="item.title" class="statistic-item">
      <div class="statistic-item-title">{{ item.title }}</div>
      <div class="statistic-item-value">{{ item.value }}</div>
    </div>
  </div>
</template>

<script>
const titleData = {
  customer_count: '客户总数/个',
  customer_not_check_count: '待审核/个',
  not_mark_count: '未标注/个',
  today_visit_count: '今日已拜访客户/个',
  today_visit_rate: '今日拜访覆盖率',
  today_new_customer: '今日新增客户/个',
  business_car_count: '业务车数量/辆',
  car_count: '车辆总数/辆',
  distribution_car_count: '配送车数量/辆',
  late_count: '今日迟到人数/人',
  early_count: '今日早退人数/人',
  not_sign: '今日未打卡人数/人',
  dimission_count: '今日离岗人数/人',
  totay_alarm_count: '今日报警次数/次',
  today_alarm_person: '今日报警人数/人',
  month_alarm_person: '本月报警人数/人',
  month_alarm_count: '本月报警次数/次',
  business_user_count: '业务员人数/人',
  user_count: '员工总数/人',
  distribution_user_count: '配送员人数/人'
}

export default {
  props: {
    statisticsData: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    computedStatic() {
      console.log(this.statisticsData)
      return this.handleStaticData(this.statisticsData)
    }
  },

  methods: {
    handleStaticData(data) {
      const tempStaticArr = []

      for (const key in data) {
        const obj = {}
        obj.title = titleData[key]

        obj.value = data[key]

        tempStaticArr.push(obj)
      }

      return tempStaticArr
    }
  }
}
</script>

<style scoped>
.statistics-component-box {
  width: 100%;
  display: flex;
  font-size: 16px;
  font-weight: bold;
}

.statistic-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2px 10px;
}

.statistic-item + .statistic-item {
  margin-left: 20px;
}
.statistic-item-value {
  margin-top: 2px;
}
</style>
