<template>
  <el-row :gutter="10" class="panel-group">

    <el-col :xs="6" :sm="12" :lg="8" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-header">
          <span class="card-panel-header-title">今日收入金额
            <span class="card-panel-header-rate card-panel-header-rate-bottom">
              <i class="el-icon-bottom" />5%
            </span>
          </span>
          <span class="card-panel-header-value">{{amountCharData.total | Fen2YuanFormate}}</span>
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
          <span class="card-panel-header-value">{{countCharData.total}}</span>
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
import { getRevenueToday, getOrderToday } from '@/api/index' 
import { Fen2YuanFormate } from '@/utils/filter'
export default {
  components: {
    LineChart,
    PieChart
  },
  data() {
    return {
      amountCharData: {
        data: [
          { value: 0, name: '支付宝', itemStyle: { color: '#3988FF' }},
          { value: 0, name: '微信', itemStyle: { color: '#09BB07' }},
          { value: 0, name: '现金', itemStyle: { color: '#e84230' }}
        ],
        radius: '80%',
        legend: ['微信', '支付宝', '现金'],
        roseType: '',
        total: 0
      },
      countCharData: {
        data: [
          { value: 0, name: '支付宝', itemStyle: { color: '#3988FF' }},
          { value: 0, name: '微信', itemStyle: { color: '#09BB07' }},
          { value: 0, name: '现金', itemStyle: { color: '#e84230' }}
        ],
        radius: ['60%', '80%'],
        legend: ['微信', '支付宝', '现金'],
        roseType: 'radius',
        total: 0
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
    this._getRevenueToday()
    this._getOrderToday()
  },
  methods: {
    _getRevenueToday() {
      const data = {
        start_time: Moment().startOf("days").valueOf()/1000,
        end_time: Moment().endOf("days").valueOf()/1000
      }
      getRevenueToday(data).then(response => {
        let temp = response.data[0]
        for(let k in temp){
          if(k === 'ali'){
            this.amountCharData.data[0] = { value: Fen2YuanFormate(temp[k]), name: '支付宝', itemStyle: { color: '#3988FF' }}
          }else if(k === 'wx'){
            this.amountCharData.data[1] = { value: Fen2YuanFormate(temp[k]), name: '微信', itemStyle: { color: '#09BB07' }}
          }else if(k === 'cash'){
            this.amountCharData.data[2] = { value: Fen2YuanFormate(temp[k]), name: '现金', itemStyle: { color: '#e84230' }}
          }else if(k === 'total'){
            this.amountCharData.total = temp[k]
          }
        }
      })
    },
    _getOrderToday() {
      const data = {
        start_time: Moment().startOf("days").valueOf()/1000,
        end_time: Moment().endOf("days").valueOf()/1000
      }
      getOrderToday(data).then(response => {
        let temp = response.data[0]
        for(let k in temp){
          if(k === 'ali'){
            this.countCharData.data[0] = { value: temp[k], name: '支付宝', itemStyle: { color: '#3988FF' }}
          }else if(k === 'wx'){
            this.countCharData.data[1] = { value: temp[k], name: '微信', itemStyle: { color: '#09BB07' }}
          }else if(k === 'cash'){
            this.countCharData.data[2] = { value: temp[k], name: '现金', itemStyle: { color: '#e84230' }}
          }else if(k === 'total'){
            this.countCharData.total = temp[k]
          }
        }
      })
    }
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
