<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils/util'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null,
      sidebarElm: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.initChart()
    if (this.autoResize) {
      this.__resizeHandler = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHandler)
    }

    // 监听侧边栏的变化
    this.sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    this.sidebarElm && this.sidebarElm.addEventListener('transitionend', this.sidebarResizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHandler)
    }

    this.sidebarElm && this.sidebarElm.removeEventListener('transitionend', this.sidebarResizeHandler)

    this.chart.dispose()
    this.chart = null
  },
  methods: {
    sidebarResizeHandler(e) {
      if (e.propertyName === 'width') {
        this.__resizeHandler()
      }
    },
    setOptions({ data, category, showX, showY } = {}) {
      this.chart.setOption({
        legend: {
          type:'scroll',
          height:0,
          show:false,
          data:['销售额/元']
        },
        xAxis: {
          show: true,
          type: 'category',
          data: category,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 0,
          right: 0,
          bottom: 10,
          top: 10
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // type: 'cross',
          },
          padding: [5, 10]
        },
        yAxis: {
          show: true,
          type: 'value',
          splitLine: {
            show: false
          },
          splitNumber: 4,
          axisTick: {
            show: false
          }
        },
        series: [{
          name: '销售额/元',
          smooth: true,
          areaStyle: {},
          type: 'line',
          data: data,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        }]
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    }
  }
}
</script>
