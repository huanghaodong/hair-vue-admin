<template>
  <el-row :gutter="10" class="panel-group">

    <el-col :xs="6" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-header">
          <span class="card-panel-header-title">今日订单金额
            <span class="card-panel-header-rate card-panel-header-rate-bottom">
              <i class="el-icon-bottom" />5%
            </span>
          </span>
          <span class="card-panel-header-value">742,249.24</span>
        </div>
        <pie-chart :chart-data="amountCharData" />
      </div>
    </el-col>
    <el-col :xs="6" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-header">
          <span class="card-panel-header-title">今日订单笔数
            <span class="card-panel-header-rate card-panel-header-rate-up">
              <i class="el-icon-top" />5%
            </span>
          </span>
          <span class="card-panel-header-value">24296</span>
        </div>
        <pie-chart :chart-data="countCharData" />
      </div>
    </el-col>
    <el-col :xs="6" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-header">
          <span class="card-panel-header-title">今日访问UV
            <span class="card-panel-header-rate card-panel-header-rate-up">
              <i class="el-icon-top" />5%
            </span>
          </span>
          <span class="card-panel-header-value">400</span>
        </div>
        <line-chart height="100px" :chart-data="uvCharData" />

      </div>
    </el-col>
  </el-row>
</template>

<script>

import PieChart from './PieChart'
import LineChart from './LineChart'
import Moment from 'moment'

export default {
  components: {
    LineChart,
    PieChart
  },
  data() {
    return {
      amountCharData: {
        data: [
          { value: 546544.06, name: '支付宝', itemStyle: { color: '#3988FF' }},
          { value: 262343.31, name: '微信', itemStyle: { color: '#09BB07' }},
          { value: 0, name: '现金', itemStyle: { color: '#e84230' }}
        ],
        radius: '80%',
        legend: ['微信', '支付宝', '现金'],
        roseType: ''
      },
      countCharData: {
        data: [
          { value: 14170, name: '支付宝', itemStyle: { color: '#3988FF' }},
          { value: 10120, name: '微信', itemStyle: { color: '#09BB07' }},
          { value: 0, name: '现金', itemStyle: { color: '#e84230' }}
        ],
        radius: ['60%', '80%'],
        legend: ['微信', '支付宝', '现金'],
        roseType: 'radius'
      },
      uvCharData: {
        data: [9, 30, 10, 90, 8, 10, 2, 20, 199, 222, 86],
        category: ['2016-1', '2016-2', '2016-3', '2016-4', '2016-5', '2016-6', '2016-7', '2016-8', '2016-9', '2016-10', '2016-11'],
        showX: false,
        showY: false
      }
    }
  },
  created() {
    const startDate = Moment().startOf("days").valueOf();
    const endDate = Moment().endOf("days").valueOf();
    console.log(startDate, endDate)
  },
  methods: {
  
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;
  }
  .card-panel {
    height: 150px;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    padding: 10px;
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
         background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shopping {
        background: #34bfa3
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shopping {
      color: #34bfa3
    }
    .card-panel-header {
      font-size: 14px;
      padding-bottom: 10px;
      color: rgba(0,0,0,0.45);
    }
    .card-panel-header-title {
      line-height: 28px;
    }
    .card-panel-header-value {
      font-weight: 500;
      font-size: 20px;
      color: #323233;
      float: right;
      line-height: 28px;
    }
    .card-panel-header-more {
      font-size: 12px;
      line-height: 28px;
      color: #999;
      float: right;
      cursor: pointer;
    }
    .card-panel-header-rate {
      font-size: 12px;
    }
    .card-panel-header-rate-up {
      color: #409EFF;
    }
    .card-panel-header-rate-bottom {
      color: #F56C6C;
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
    .card-panel-item {
      margin-bottom: 10px;
    }
    .card-panel-value {
      float: right;
      margin-left: 10px;
    }
  }
}
</style>
